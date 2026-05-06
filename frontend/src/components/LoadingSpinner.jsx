export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center w-full min-h-[300px]">
      <div className="relative w-12 h-12">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500/20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
