export function getInitials(name: string): string {
  const clean = name
    .replace(/Dr\.|H\.|S\.Pd\.|M\.Pd\.|M\.Sc\.|S\.Kom\.|,/g, '')
    .trim();
  const parts = clean.split(' ').filter(Boolean);
  const first = parts[0]?.[0] || '';
  const second = parts[1]?.[0] || '';
  return (first + second).toUpperCase() || '??';
}
