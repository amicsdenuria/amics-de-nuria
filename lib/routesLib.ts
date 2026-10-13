export function formatAlternativeRoutePoints(points?: string[]): string | undefined {
  if (!points?.length) return undefined;

  return `via ${[
    points.slice(0, 2).join(' | '),
    ...points.slice(2),
  ].join(' - ')}`;
}

export function formatDistance(meters: number): string {
  return `${(meters / 1000).toFixed(1)} km`;
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}min`;
}
