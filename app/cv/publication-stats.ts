export function isLeadAuthor(item: { role: string }): boolean {
  return item.role.includes("First Author") || item.role.includes("Corresponding Author");
}

export function countLeadPublications(items: { role: string; href: string }[]): number {
  return new Set(items.filter(isLeadAuthor).map(item => item.href)).size;
}
