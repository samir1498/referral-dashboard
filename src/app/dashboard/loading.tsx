import React from "react";

export default function loading() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="border-t-transparent border-solid rounded-full border-blue-500 border-2 h-12 w-12 animate-spin"></div>
    </div>
  );
}
