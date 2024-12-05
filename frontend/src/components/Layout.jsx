import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="max-w-3xl mx-auto py-4 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-semibold text-primary mb-6">
        Drug Image Recognition
      </h1>
      {children}
    </div>
  );
};

export default Layout;
