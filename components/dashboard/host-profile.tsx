import React from "react";

export default function HostProfile({
  children,
}: {
  children: React.ReactNode;
}) {
  // Ensure children is always an array
  const validChildren = React.Children.toArray(children).filter(Boolean);

  return (
    <div className="min-h-screen p-10">
      <div className="max-w-5xl mx-auto my-15">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {validChildren.map((child, index) => (
            <div
              key={index}
              className={validChildren.length === 1 ? "lg:col-span-2" : ""}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
