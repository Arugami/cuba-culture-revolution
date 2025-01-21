import React from "react";

const Loading = React.memo(() => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cuba-red"></div>
    </div>
  );
});

Loading.displayName = "Loading";

export default Loading;