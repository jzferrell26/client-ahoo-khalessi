[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [string]$CsvPath,

  [string]$LocationId = 'hFh6QMpFXIBxyuqN9LLy',

  [string]$TagName = 'ahoos mailers first list',

  [ValidateRange(0, 1000000)]
  [int]$StartIndex = 0,

  [ValidateRange(1, 1000000)]
  [int]$Count = 250,

  [switch]$Apply
)

$ErrorActionPreference = 'Stop'

if (-not (Test-Path -LiteralPath $CsvPath -PathType Leaf)) {
  throw "CSV not found: $CsvPath"
}

$pit = $env:GHL_PIT
if ([string]::IsNullOrWhiteSpace($pit)) {
  throw 'Set GHL_PIT in the current process before running this script.'
}

$headers = @{
  Authorization  = "Bearer $pit"
  Version        = '2021-07-28'
  Accept         = 'application/json'
  'Content-Type' = 'application/json'
  'User-Agent'   = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Codex-CTC-Repair/1.0'
}

function Invoke-GhlRequest {
  param(
    [Parameter(Mandatory = $true)]
    [ValidateSet('Get', 'Post', 'Put')]
    [string]$Method,

    [Parameter(Mandatory = $true)]
    [string]$Uri,

    [string]$Body
  )

  $attempt = 0
  while ($true) {
    try {
      if ([string]::IsNullOrWhiteSpace($Body)) {
        return Invoke-RestMethod -Method $Method -Uri $Uri -Headers $headers
      }

      return Invoke-RestMethod -Method $Method -Uri $Uri -Headers $headers -Body $Body
    }
    catch {
      $attempt++
      $status = $null
      if ($_.Exception.Response) {
        $status = [int]$_.Exception.Response.StatusCode
      }

      if ($attempt -ge 6 -or ($status -ne 429 -and $status -lt 500)) {
        throw
      }

      $delaySeconds = [Math]::Min(20, [Math]::Pow(2, $attempt))
      Start-Sleep -Seconds $delaySeconds
    }
  }
}

function Normalize-Phone {
  param([string]$Value)
  if ([string]::IsNullOrWhiteSpace($Value)) {
    return ''
  }

  $digits = $Value -replace '\D', ''
  if ($digits.Length -eq 11 -and $digits.StartsWith('1')) {
    return $digits.Substring(1)
  }

  return $digits
}

function Normalize-IdentityPart {
  param([string]$Value)
  if ([string]::IsNullOrWhiteSpace($Value)) {
    return ''
  }

  return (($Value.ToLowerInvariant()) -replace '[^a-z0-9]', '')
}

function Get-IdentityKey {
  param(
    [string]$FirstName,
    [string]$LastName,
    [string]$Address
  )

  return '{0}|{1}|{2}' -f (Normalize-IdentityPart $FirstName), (Normalize-IdentityPart $LastName), (Normalize-IdentityPart $Address)
}

function Add-CustomFieldValue {
  param(
    [System.Collections.ArrayList]$Target,
    [hashtable]$FieldIds,
    [string]$FieldKey,
    [object]$Value
  )

  $textValue = [string]$Value
  if ([string]::IsNullOrWhiteSpace($textValue)) {
    return
  }

  if (-not $FieldIds.ContainsKey($FieldKey)) {
    throw "Required GHL field is missing: $FieldKey"
  }

  [void]$Target.Add(@{
      id          = $FieldIds[$FieldKey]
      field_value = $textValue.Trim()
    })
}

$customFieldResponse = Invoke-GhlRequest -Method Get -Uri "https://services.leadconnectorhq.com/locations/$LocationId/customFields"
$fieldIds = @{}
foreach ($field in $customFieldResponse.customFields) {
  $fieldIds[$field.fieldKey] = $field.id
}

$requiredFieldKeys = @(
  'contact.borrower_1_fico',
  'contact.property_address',
  'contact.1st_mortgage_street_address',
  'contact.1st_mortgage_street_city',
  'contact.1st_mortgage_street_state',
  'contact.1st_mortgage_street_zip_code',
  'contact.1st_mortgage_current_balance',
  'contact.1st_mortgage_balance_when_opened',
  'contact.1st_mortgage_payment',
  'contact.1st_mortgage_rate',
  'contact.1st_mortgage_program'
)

foreach ($fieldKey in $requiredFieldKeys) {
  if (-not $fieldIds.ContainsKey($fieldKey)) {
    throw "Required GHL field is missing: $fieldKey"
  }
}

$contactByPhone = @{}
$contactByIdentity = @{}
$page = 1
$total = $null
do {
  $searchBody = @{
    locationId = $LocationId
    page       = $page
    pageLimit  = 100
    filters    = @(
      @{
        field    = 'tags'
        operator = 'contains'
        value    = $TagName
      }
    )
  } | ConvertTo-Json -Depth 5

  $search = Invoke-GhlRequest -Method Post -Uri 'https://services.leadconnectorhq.com/contacts/search' -Body $searchBody
  if ($null -eq $total) {
    $total = [int]$search.total
  }

  foreach ($contact in $search.contacts) {
    $normalizedPhone = Normalize-Phone $contact.phone
    if (-not [string]::IsNullOrWhiteSpace($normalizedPhone)) {
      $contactByPhone[$normalizedPhone] = $contact
    }

    $identityKey = Get-IdentityKey $contact.firstName $contact.lastName $contact.address1
    if (-not $contactByIdentity.ContainsKey($identityKey)) {
      $contactByIdentity[$identityKey] = $contact
    }
    else {
      $contactByIdentity[$identityKey] = $null
    }
  }

  $page++
} while ($contactByPhone.Count -lt $total -and @($search.contacts).Count -gt 0)

$rows = @(Import-Csv -LiteralPath $CsvPath)
$selectedRows = @($rows | Select-Object -Skip $StartIndex -First $Count)

$stats = [ordered]@{
  apply_mode       = [bool]$Apply
  tag_contacts     = $total
  csv_rows         = $rows.Count
  selected_rows    = $selectedRows.Count
  matched_contacts = 0
  matched_by_identity = 0
  updated_contacts = 0
  missing_contacts = 0
  failed_updates   = 0
}

$processed = 0
foreach ($row in $selectedRows) {
  $processed++
  $phone = Normalize-Phone $row.'Phone Number'
  $contact = $null
  if (-not [string]::IsNullOrWhiteSpace($phone) -and $contactByPhone.ContainsKey($phone)) {
    $contact = $contactByPhone[$phone]
  }
  else {
    $identityKey = Get-IdentityKey $row.'First name' $row.'Last name' $row.'Full Street Address. E.g. 142 S Main St'
    if ($contactByIdentity.ContainsKey($identityKey) -and $null -ne $contactByIdentity[$identityKey]) {
      $contact = $contactByIdentity[$identityKey]
      $stats.matched_by_identity++
    }
  }

  # The tagged-contact search can omit a contact when its stored phone uses an
  # unexpected format. Use HighLevel's official duplicate lookup as a targeted
  # fallback before declaring the CSV row unmatched.
  if ($null -eq $contact -and -not [string]::IsNullOrWhiteSpace($phone)) {
    $lookupNumber = if ($phone.Length -eq 10) { "+1$phone" } else { $phone }
    $encodedNumber = [Uri]::EscapeDataString($lookupNumber)
    try {
      $duplicate = Invoke-GhlRequest -Method Get -Uri "https://services.leadconnectorhq.com/contacts/search/duplicate?locationId=$LocationId&number=$encodedNumber"
      if ($null -ne $duplicate.contact) {
        $contact = $duplicate.contact
      }
    }
    catch {
      # A missing duplicate is expected for genuinely unmatched rows. The row is
      # counted below so the run remains auditable instead of failing wholesale.
    }
  }

  if ($null -eq $contact) {
      $stats.missing_contacts++
      continue
  }

  $stats.matched_contacts++
  $customFields = New-Object System.Collections.ArrayList

  Add-CustomFieldValue $customFields $fieldIds 'contact.borrower_1_fico' $row.'TOTAL SCORE'
  Add-CustomFieldValue $customFields $fieldIds 'contact.property_address' $row.'Full Street Address. E.g. 142 S Main St'
  Add-CustomFieldValue $customFields $fieldIds 'contact.1st_mortgage_street_address' $row.'Full Street Address. E.g. 142 S Main St'
  Add-CustomFieldValue $customFields $fieldIds 'contact.1st_mortgage_street_city' $row.'City name'
  Add-CustomFieldValue $customFields $fieldIds 'contact.1st_mortgage_street_state' $row.'Two letter state abbreviation'
  Add-CustomFieldValue $customFields $fieldIds 'contact.1st_mortgage_street_zip_code' $row.'5 digit zip code'
  Add-CustomFieldValue $customFields $fieldIds 'contact.1st_mortgage_current_balance' $row.'Current balance amount of 1st Open mortgage trade with highest interest rate'
  Add-CustomFieldValue $customFields $fieldIds 'contact.1st_mortgage_balance_when_opened' $row.'High Credit amount of 1st Open mortgage trade with highest interest rate'
  Add-CustomFieldValue $customFields $fieldIds 'contact.1st_mortgage_payment' $row.'Payment Due Amount of 1st Open mortgage trade with highest interest rate'
  Add-CustomFieldValue $customFields $fieldIds 'contact.1st_mortgage_rate' $row.'Estimated INTEREST RATE of 1st open mortgage trade with highest interest rate'
  Add-CustomFieldValue $customFields $fieldIds 'contact.1st_mortgage_program' $row.'Mortgage Loan Type of 1st open mortgage trade with highest interest rate'

  if (-not $Apply -or $customFields.Count -eq 0) {
    continue
  }

  try {
    $updateBody = @{ customFields = @($customFields) } | ConvertTo-Json -Depth 5
    $null = Invoke-GhlRequest -Method Put -Uri "https://services.leadconnectorhq.com/contacts/$($contact.id)" -Body $updateBody
    $stats.updated_contacts++
  }
  catch {
    $stats.failed_updates++
  }

  if (($processed % 100) -eq 0) {
    Write-Output ("progress={0}/{1}; updated={2}; failed={3}" -f $processed, $selectedRows.Count, $stats.updated_contacts, $stats.failed_updates)
  }
}

[PSCustomObject]$stats | ConvertTo-Json -Compress
