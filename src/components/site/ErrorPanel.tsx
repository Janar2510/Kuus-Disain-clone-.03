"use client";

type ErrorPanelProps = {
  error: Error & { digest?: string };
  reset: () => void;
  title: string;
};

/**
 * Visible failure state. Without this, a runtime error leaves an empty body and
 * the page looks blank, which hides the actual message.
 */
export function ErrorPanel({ error, reset, title }: ErrorPanelProps) {
  return (
    <div
      style={{
        padding: "48px 32px",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
        color: "#302620",
        background: "#f6f2eb",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ fontSize: "20px", marginBottom: "10px" }}>{title}</h1>
      <p style={{ marginBottom: "16px", fontSize: "14px", opacity: 0.75 }}>
        The error boundary caught this instead of leaving a blank page.
      </p>
      <pre
        style={{
          whiteSpace: "pre-wrap",
          fontSize: "13px",
          lineHeight: 1.5,
          background: "#ede6d8",
          padding: "16px",
          maxWidth: "90ch",
          overflowX: "auto",
        }}
      >
        {error.message}
      </pre>
      <button
        type="button"
        onClick={reset}
        style={{
          marginTop: "20px",
          padding: "11px 20px",
          fontSize: "12px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          background: "#302620",
          color: "#f6f2eb",
          border: "none",
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  );
}
