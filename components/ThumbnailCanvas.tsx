// ThumbnailCanvas.tsx
import React from "react";

interface ThumbnailCanvasProps {
  thumbnailStyle: React.CSSProperties;
  text: string;
  textColor: string;
  fontSize: number;
  textPositionX: number;
  textPositionY: number;
  imageWidth: number; // New prop
  imageHeight: number; // New prop
}

const ThumbnailCanvas: React.FC<ThumbnailCanvasProps> = ({
  thumbnailStyle,
  text,
  textColor,
  fontSize,
  textPositionX,
  textPositionY,
  imageWidth, // New prop
  imageHeight, // New prop
}) => {
  return (
    <div
      style={{
        ...thumbnailStyle,
        width: `${imageWidth}px`,
        height: `${imageHeight}px`,
      }}
    >
      {/* Render text and any other elements */}
      <div
        style={{
          position: "absolute",
          left: `${textPositionX}%`,
          top: `${textPositionY}%`,
          color: textColor,
          fontSize: fontSize,
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default ThumbnailCanvas;
