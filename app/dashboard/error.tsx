'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Dashboard Error:', error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
        <AlertCircle className="w-8 h-8 text-red-600" />
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-3">
        Something went wrong!
      </h2>
      <p className="text-gray-500 max-w-md mb-8">
        We encountered an unexpected error while loading this dashboard section. 
        Please try refreshing the page or contact support if the issue persists.
      </p>
      
      <button
        onClick={() => reset()}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Try again</span>
      </button>
      
      {/* Optional: Display actual error message in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-red-50 text-red-600 rounded-lg text-sm text-left max-w-2xl overflow-auto border border-red-100">
          <p className="font-semibold mb-1">Developer Details:</p>
          <p className="font-mono">{error.message}</p>
        </div>
      )}
    </div>
  );
}
