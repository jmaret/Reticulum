export function playgroundHref(code: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}/play/#code=${encodeURIComponent(code)}`;
}
