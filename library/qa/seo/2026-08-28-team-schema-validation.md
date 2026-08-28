# Team schema validation - 2026-08-28

## Scope

Validated the JSON-LD added to the indexable `/team` page. The page describes a roster, so it uses `CollectionPage` plus `ItemList` and five linked `Person` entities. It does not use `ProfilePage`, which is intended for a page whose primary subject is one person or organization.

## Render verification

Local TanStack Start render at `http://127.0.0.1:4173/team` produced:

- One `CollectionPage`
- One `ItemList` with `numberOfItems: 5`
- Five `Person` entities in the visible roster order: Ahoo Khalessi, Ben Mokri, Bobby Khalessi, Susan O'Donovan, Dong-Jin Kim
- No invented NMLS value for Bobby Khalessi

## Validator results

| Validator | Result | Evidence |
| --- | --- | --- |
| Schema Markup Validator | Pass | 0 errors, 0 warnings. Detected `CollectionPage` and its linked graph. |
| Google Rich Results Test | Expected not eligible | No rich-result items detected. `CollectionPage`, `ItemList`, and `Person` do not create a Google rich-result enhancement on this page. The JSON-LD remains useful for entity disambiguation and machine comprehension. |

## Build checks

- `npm run build`: pass
- Targeted ESLint for `TeamMembers.tsx` and `team.tsx`: pass with 0 errors and 0 warnings
