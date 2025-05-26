

export function DashboardSkeleton() {
    return (
      <div className="p-4 animate-pulse">
        <div className="mb-8 flex flex-wrap gap-4">
          <div className="h-10 bg-gray-200 rounded-md w-[200px]"></div>
          <div className="h-10 bg-gray-200 rounded-md w-[180px]"></div>
          <div className="h-10 bg-gray-200 rounded-md w-[150px]"></div>
          <div className="h-10 bg-gray-200 rounded-md w-[220px]"></div>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-gray-200 rounded-lg p-4 h-64">
            <div className="h-5 bg-gray-300 w-1/3 mb-2 rounded"></div>
            <div className="h-4 bg-gray-300 w-1/4 mb-4 rounded"></div>
            <div className="bg-gray-300 h-[160px] rounded-md"></div>
          </div>
  
          <div className="bg-gray-200 rounded-lg p-4 h-64">
            <div className="h-5 bg-gray-300 w-1/3 mb-2 rounded"></div>
            <div className="h-4 bg-gray-300 w-1/4 mb-4 rounded"></div>
            <div className="bg-gray-300 h-[160px] rounded-md"></div>
          </div>
  
          <div className="bg-gray-200 rounded-lg p-4 h-64 md:col-span-2 lg:col-span-1">
            <div className="h-5 bg-gray-300 w-1/3 mb-2 rounded"></div>
            <div className="h-4 bg-gray-300 w-1/4 mb-4 rounded"></div>
            <div className="bg-gray-300 h-[160px] rounded-md"></div>
          </div>
        </div>
  
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-32 bg-gray-200 rounded-lg"></div>
          <div className="h-32 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    )
  }