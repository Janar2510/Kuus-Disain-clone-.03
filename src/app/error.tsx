"use client";

import { ErrorPanel } from "@/components/site/ErrorPanel";

export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorPanel error={error} reset={reset} title="This route hit a runtime error" />;
}
