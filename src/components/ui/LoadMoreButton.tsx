export default function LoadMoreButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex justify-center py-6">
      <button
        onClick={onClick}
        className="px-6 py-2.5 bg-surface border border-border rounded-lg text-sm font-body text-gray-300 hover:text-accent hover:border-accent/30 transition-colors"
      >
        Load 20 more
      </button>
    </div>
  )
}
