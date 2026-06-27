import { Fragment } from "react";

/**
 * Minimal markdown renderer for lesson content: handles ## / ### headings,
 * **bold** inline, and paragraphs. Lesson content is authored by us, so this
 * stays deliberately small rather than pulling in a full markdown dependency.
 */
function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

export function Markdown({ content }: { content: string }) {
  const blocks = content.split(/\n\n+/);
  return (
    <div className="space-y-4 text-[15px] leading-relaxed text-ink/90">
      {blocks.map((block, i) => {
        const trimmed = block.trim();
        if (trimmed.startsWith("### ")) {
          return (
            <h4 key={i} className="font-serif text-lg font-semibold text-ink">
              {trimmed.slice(4)}
            </h4>
          );
        }
        if (trimmed.startsWith("## ")) {
          return (
            <h3 key={i} className="font-serif text-xl font-semibold text-ink">
              {trimmed.slice(3)}
            </h3>
          );
        }
        return <p key={i}>{renderInline(trimmed)}</p>;
      })}
    </div>
  );
}
