export default function DashboardLoading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
      <h2 className="text-xl font-semibold text-slate-800">
        Loading...
      </h2>
      <p className="text-gray-500 max-w-md mt-2">
        Please wait while we fetch the dashboard content.
      </p>
    </div>
  );
}
