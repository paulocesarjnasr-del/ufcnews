interface SectionHeaderProps {
  number: string;
  title: string;
  accent: string;
}

export function SectionHeader({ number, title, accent }: SectionHeaderProps) {
  return (
    <div className="mb-8 flex items-end gap-4">
      <span className="font-display text-5xl leading-none text-dark-border/50 md:text-7xl">
        {number}
      </span>
      <div>
        <h2 className="font-display text-2xl uppercase leading-tight text-dark-text md:text-3xl">
          {title}{' '}
          <span className="text-ufc-red">{accent}</span>
        </h2>
        <div className="mt-1 h-1 w-16 rounded-full bg-ufc-red" />
      </div>
    </div>
  );
}
