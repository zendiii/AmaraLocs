interface Props {
  label: string
  className?: string
}

export default function PhotoPlaceholder({ label, className = '' }: Props) {
  return (
    <div
      className={`flex items-end rounded-2xl bg-gradient-to-br from-sand via-cream to-gold/40 p-4 ${className}`}
      role="img"
      aria-label={`${label} (photo coming soon)`}
    >
      <span className="rounded-full bg-linen/80 px-3 py-1 text-xs font-medium text-mocha">{label}</span>
    </div>
  )
}
