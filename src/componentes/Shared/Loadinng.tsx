
function Loading() {
  return (
    <div className="flex justify-center items-center h-48">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      <span className="ml-3 text-gray-600"><svg className="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24"></svg></span>
    </div>
  );
}

export default Loading;