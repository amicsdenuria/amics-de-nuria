type Part = string | { type: 'link'; href: string; text: string };

const SpanWithLink = (parts: Part[]) => {
  return (
    <div>
      {parts.map((part, i) =>
        typeof part === 'string' ? (
          <span key={i}>{part}</span>
        ) : (
          <a
            href={part.href}
            key={i}
            target="_blank"
            rel="noreferrer"
          >
            {part.text}
          </a>
        ),
      )}
    </div>
  );
};

export default SpanWithLink;
