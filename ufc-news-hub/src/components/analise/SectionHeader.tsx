export function SectionHeader({ number, title, accent }: { number: string; title: string; accent?: string }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-ufc-red/20 font-display text-lg text-ufc-red">
        {number}
      </span>
      <h2 className="font-display text-2xl uppercase tracking-wide text-dark-text md:text-3xl">
        {title} {accent && <span className="text-ufc-red">{accent}</span>}
      </h2>
    </div>
  );
}
