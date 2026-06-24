import type { FaqItem } from "./JsonLd";

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div>
      {items.map((item, i) => (
        <details key={i} className="qa">
          <summary>
            <span>{item.q}</span>
            <span className="plus">+</span>
          </summary>
          <p className="ans" dangerouslySetInnerHTML={{ __html: item.a }} />
        </details>
      ))}
    </div>
  );
}