export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 28 }}>
      <h2
        style={{
          fontFamily: "var(--display)",
          fontSize: "1.4rem",
          marginBottom: 10,
          color: "var(--ink)",
        }}
      >
        {title}
      </h2>
      <div style={{ color: "#33485a", lineHeight: 1.7 }}>{children}</div>
    </section>
  );
}

export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "var(--sand)",
        borderLeft: "4px solid var(--tiffany)",
        borderRadius: 10,
        padding: "14px 18px",
        marginTop: 14,
        color: "#33485a",
      }}
    >
      {children}
    </div>
  );
}