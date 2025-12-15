import React from "react";

const Shell = ({ children }) => {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8 relative z-10">
      {children}
    </div>
  );
};

export default Shell;