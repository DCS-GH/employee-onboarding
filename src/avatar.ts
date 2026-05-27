import type React from 'react';

const palettes = [
  ['#0f766e', '#ccfbf1'],
  ['#4f46e5', '#e0e7ff'],
  ['#be123c', '#ffe4e6'],
  ['#0369a1', '#e0f2fe'],
  ['#7c2d12', '#ffedd5'],
  ['#166534', '#dcfce7'],
];

function initialsFor(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
}

export function avatarDataUri(name: string, paletteIndex = 0) {
  const [bg, accent] = palettes[paletteIndex % palettes.length];
  const initials = initialsFor(name) || 'OE';
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
      <rect width="160" height="160" rx="80" fill="${bg}"/>
      <circle cx="118" cy="42" r="40" fill="${accent}" opacity="0.26"/>
      <circle cx="45" cy="126" r="52" fill="${accent}" opacity="0.18"/>
      <text x="50%" y="54%" text-anchor="middle" dominant-baseline="middle"
        font-family="Inter, Arial, sans-serif" font-size="54" font-weight="800" fill="white">${initials}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export function useAvatarFallback(name: string, paletteIndex = 0) {
  return (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = avatarDataUri(name, paletteIndex);
  };
}
