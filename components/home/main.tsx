"useclinet";
import React from "react";

export default function HomeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 py-8 mx-40 mt-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Home Listing
          </h1>
          <p className="text-xl text-gray-600">
            Discover your dream home with all the details you need
          </p>
        </div>

        {children}

        <div className="text-center mt-8">
          <p className="text-gray-600">
            This is a comprehensive home listing component built with React and
            shadcn/ui
          </p>
        </div>
      </div>
    </div>
  );
}
