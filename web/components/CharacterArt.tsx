'use client';

// SVG-based character art — hand-drawn vector graphics
// One SVG per bloodline, stored in public/characters/

const bloodlineSlug = (name: string): string => name.toLowerCase();

export default function CharacterArt({
  bloodline,
  size = 'lg',
}: {
  bloodline: string;
  size?: 'sm' | 'md' | 'lg';
}) {
  const slug = bloodlineSlug(bloodline);
  const dimensions = {
    sm: 'w-24 h-24',
    md: 'w-40 h-40',
    lg: 'w-64 h-64',
  }[size];

  return (
    <div className={`${dimensions} relative rounded-2xl overflow-hidden bg-dark-900/80 border border-dark-600 flex items-center justify-center`}>
      <img
        src={`/characters/${slug}.svg`}
        alt={bloodline}
        className="w-full h-full object-contain p-2"
        loading="lazy"
      />
    </div>
  );
}
