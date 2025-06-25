// components/property-card/HeartButton.client.tsx
"use client";

import React, { useState } from "react";

export default function HeartButton() {
  const [liked, setLiked] = useState(false);

  return (
    <button
      aria-label={liked ? "Remove from favorites" : "Add to favorites"}
      onClick={() => setLiked(!liked)}
      style={{
        position: "absolute",
        top: 10,
        right: 10,
        background: "transparent",
        border: "none",
        fontSize: 24,
        color: liked ? "red" : "gray",
        cursor: "pointer",
      }}
    >
      {liked ? "❤️" : "🤍"}
    </button>
  );
}
