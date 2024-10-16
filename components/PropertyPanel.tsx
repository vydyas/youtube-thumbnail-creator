// PropertyPanel.tsx
import React from "react";

interface PropertyPanelProps {
  selectedElement: string;
  imageWidth: number;
  setImageWidth: React.Dispatch<React.SetStateAction<number>>;
  imageHeight: number;
  setImageHeight: React.Dispatch<React.SetStateAction<number>>;
  textPositionX: number;
  setTextPositionX: React.Dispatch<React.SetStateAction<number>>;
  textPositionY: number;
  setTextPositionY: React.Dispatch<React.SetStateAction<number>>;
}

const PropertyPanel: React.FC<PropertyPanelProps> = ({
  imageWidth,
  setImageWidth,
  imageHeight,
  setImageHeight,
}) => {
  return (
    <div className="property-panel">
      <h2>Property Panel</h2>
      <div>
        <label>Image Width:</label>
        <input
          type="range"
          min="50"
          max="500"
          value={imageWidth}
          onChange={(e) => setImageWidth(Number(e.target.value))}
        />
        <span>{imageWidth}px</span>
      </div>
      <div>
        <label>Image Height:</label>
        <input
          type="range"
          min="50"
          max="500"
          value={imageHeight}
          onChange={(e) => setImageHeight(Number(e.target.value))}
        />
        <span>{imageHeight}px</span>
      </div>
      {/* Add other controls for textPositionX and textPositionY */}
    </div>
  );
};

export default PropertyPanel;
