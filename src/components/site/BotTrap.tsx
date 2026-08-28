export function BotTrap() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: "-10000px",
        width: 1,
        height: 1,
        overflow: "hidden",
      }}
    >
      <label>
        Leave this field blank
        <input name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
