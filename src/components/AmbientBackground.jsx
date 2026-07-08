export default function AmbientBackground({ blobs = [], grid = true, animatedGrid = false }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {grid && (
        <div
          className={`absolute inset-0 ${animatedGrid ? 'animate-grid-pan opacity-[0.05]' : 'opacity-[0.03]'}`}
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      )}
      {blobs.map((blob, i) => (
        <div
          key={i}
          className={`absolute rounded-full blur-3xl ${blob.className} ${blob.animation ?? 'animate-drift'}`}
        />
      ))}
    </div>
  )
}
