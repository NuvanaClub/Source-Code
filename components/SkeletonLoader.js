export default function SkeletonLoader({ type = "card", count = 1 }) {
  const renderSkeleton = () => {
    switch (type) {
      case "card":
        return (
          <div className="card animate-pulse">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="h-6 bg-green-800/30 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-green-800/20 rounded w-1/2"></div>
              </div>
              <div className="h-6 bg-green-800/20 rounded w-16"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-green-800/20 rounded w-full"></div>
              <div className="h-4 bg-green-800/20 rounded w-5/6"></div>
              <div className="h-4 bg-green-800/20 rounded w-4/6"></div>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="h-6 bg-green-800/20 rounded w-16"></div>
              <div className="h-6 bg-green-800/20 rounded w-20"></div>
            </div>
          </div>
        );
      
      case "strain-card":
        return (
          <div className="card hover:bg-green-900/30 hover:border-green-600/50 transition-all duration-300 group animate-pulse">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="h-6 bg-green-800/30 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-green-800/20 rounded w-1/2"></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-6 bg-green-800/20 rounded w-16"></div>
                <div className="h-6 bg-green-800/20 rounded w-6"></div>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-green-800/20 rounded w-full"></div>
              <div className="h-4 bg-green-800/20 rounded w-5/6"></div>
            </div>
            <div className="flex gap-2">
              <div className="h-6 bg-green-800/20 rounded w-16"></div>
              <div className="h-6 bg-green-800/20 rounded w-20"></div>
              <div className="h-6 bg-green-800/20 rounded w-14"></div>
            </div>
          </div>
        );
      
      case "grow-entry":
        return (
          <div className="card animate-pulse">
            <div className="flex items-center justify-between mb-3">
              <div className="h-5 bg-green-800/30 rounded w-32"></div>
              <div className="h-4 bg-green-800/20 rounded w-20"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-green-800/20 rounded w-full"></div>
              <div className="h-4 bg-green-800/20 rounded w-3/4"></div>
            </div>
            <div className="flex gap-2 mt-3">
              <div className="h-6 bg-green-800/20 rounded w-12"></div>
              <div className="h-6 bg-green-800/20 rounded w-16"></div>
            </div>
          </div>
        );
      
      case "comment":
        return (
          <div className="border-l-2 border-green-700/30 pl-4 py-2 animate-pulse">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-4 bg-green-800/20 rounded w-20"></div>
              <div className="h-3 bg-green-800/20 rounded w-16"></div>
            </div>
            <div className="space-y-1">
              <div className="h-4 bg-green-800/20 rounded w-full"></div>
              <div className="h-4 bg-green-800/20 rounded w-3/4"></div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="card animate-pulse">
            <div className="h-6 bg-green-800/30 rounded w-1/2 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-green-800/20 rounded w-full"></div>
              <div className="h-4 bg-green-800/20 rounded w-5/6"></div>
              <div className="h-4 bg-green-800/20 rounded w-4/6"></div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div key={i}>{renderSkeleton()}</div>
      ))}
    </>
  );
}
