"use client";

import { ErrorPanel } from "@/components/site/ErrorPanel";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <ErrorPanel error={error} reset={reset} title="The app hit a runtime error" />
      </body>
    </html>
  );
}
