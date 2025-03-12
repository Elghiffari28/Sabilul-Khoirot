import React from "react";

const Loading = ({ isLoading, children }) => {
  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="flex justify-center items-center loading"></div>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default Loading;
