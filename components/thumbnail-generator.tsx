import React, { useState, useRef } from "react";
import {
  Stage,
  Layer,
  Rect,
  Text,
  Image as KonvaImage,
  Transformer,
} from "react-konva";
import Konva from "konva";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HexColorPicker } from "react-colorful";
import {
  Upload,
  Image,
  Type,
  Layers,
  Grid,
  Bold,
  Italic,
  Underline,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const STAGE_WIDTH = 800;
const STAGE_HEIGHT = 500;

type Template = {
  name: string;
  backgroundColor: string;
  texts: Array<{
    text: string;
    fontSize: number;
    color: string;
    x: number;
    y: number;
    fontStyle: string;
    textDecoration: string;
    fontFamily: string;
  }>;
};

const templates: Template[] = [
  {
    name: "Bold Title",
    backgroundColor: "#ff4d4d",
    texts: [
      {
        text: "BOLD TITLE",
        fontSize: 64,
        color: "#ffffff",
        x: 50,
        y: 200,
        fontStyle: "bold",
        textDecoration: "",
        fontFamily: "Arial",
      },
      {
        text: "Subtitle goes here",
        fontSize: 32,
        color: "#ffffff",
        x: 50,
        y: 280,
        fontStyle: "normal",
        textDecoration: "",
        fontFamily: "Arial",
      },
    ],
  },
  {
    name: "Minimalist",
    backgroundColor: "#ffffff",
    texts: [
      {
        text: "Simple & Clean",
        fontSize: 48,
        color: "#000000",
        x: 50,
        y: 225,
        fontStyle: "normal",
        textDecoration: "",
        fontFamily: "Helvetica",
      },
    ],
  },
  {
    name: "Vibrant",
    backgroundColor: "#4a0e4e",
    texts: [
      {
        text: "VIBRANT!",
        fontSize: 72,
        color: "#ffd700",
        x: 50,
        y: 200,
        fontStyle: "bold",
        textDecoration: "",
        fontFamily: "Arial",
      },
      {
        text: "Eye-catching design",
        fontSize: 36,
        color: "#ffffff",
        x: 50,
        y: 290,
        fontStyle: "italic",
        textDecoration: "",
        fontFamily: "Arial",
      },
    ],
  },
  // New Templates
  {
    name: "Classic Black",
    backgroundColor: "#000000",
    texts: [
      {
        text: "Classic Design",
        fontSize: 48,
        color: "#ffffff",
        x: 50,
        y: 200,
        fontStyle: "normal",
        textDecoration: "",
        fontFamily: "Times New Roman",
      },
    ],
  },
  {
    name: "Ocean Breeze",
    backgroundColor: "#0099cc",
    texts: [
      {
        text: "Relaxing Vibes",
        fontSize: 56,
        color: "#ffffff",
        x: 50,
        y: 250,
        fontStyle: "bold",
        textDecoration: "",
        fontFamily: "Arial",
      },
    ],
  },
  {
    name: "Summer Fun",
    backgroundColor: "#ffcc00",
    texts: [
      {
        text: "Summer Vibes",
        fontSize: 64,
        color: "#ff6699",
        x: 50,
        y: 200,
        fontStyle: "bold",
        textDecoration: "",
        fontFamily: "Comic Sans MS",
      },
    ],
  },
  {
    name: "Nature's Beauty",
    backgroundColor: "#228B22",
    texts: [
      {
        text: "Breathe in Nature",
        fontSize: 48,
        color: "#ffffff",
        x: 50,
        y: 250,
        fontStyle: "italic",
        textDecoration: "",
        fontFamily: "Arial",
      },
    ],
  },
  {
    name: "City Lights",
    backgroundColor: "#333333",
    texts: [
      {
        text: "Urban Living",
        fontSize: 56,
        color: "#ffcc00",
        x: 50,
        y: 200,
        fontStyle: "bold",
        textDecoration: "",
        fontFamily: "Helvetica",
      },
    ],
  },
  {
    name: "Rustic Charm",
    backgroundColor: "#8B4513",
    texts: [
      {
        text: "Embrace the Rustic",
        fontSize: 48,
        color: "#ffffff",
        x: 50,
        y: 250,
        fontStyle: "normal",
        textDecoration: "",
        fontFamily: "Georgia",
      },
    ],
  },
  {
    name: "Tech Future",
    backgroundColor: "#1E90FF",
    texts: [
      {
        text: "Future Tech",
        fontSize: 72,
        color: "#ffffff",
        x: 50,
        y: 200,
        fontStyle: "bold",
        textDecoration: "underline",
        fontFamily: "Arial",
      },
    ],
  },
  {
    name: "Vintage Style",
    backgroundColor: "#d2b48c",
    texts: [
      {
        text: "Classic Vintage",
        fontSize: 60,
        color: "#000000",
        x: 50,
        y: 250,
        fontStyle: "italic",
        textDecoration: "underline",
        fontFamily: "Courier New",
      },
    ],
  },
  {
    name: "Abstract Art",
    backgroundColor: "#7B68EE",
    texts: [
      {
        text: "Artistic Expression",
        fontSize: 64,
        color: "#ffffff",
        x: 50,
        y: 200,
        fontStyle: "bold",
        textDecoration: "italic",
        fontFamily: "Arial",
      },
    ],
  },
  {
    name: "Funky Patterns",
    backgroundColor: "#FF69B4",
    texts: [
      {
        text: "Get Funky!",
        fontSize: 56,
        color: "#ffffff",
        x: 50,
        y: 200,
        fontStyle: "normal",
        textDecoration: "",
        fontFamily: "Comic Sans MS",
      },
    ],
  },
  {
    name: "Winter Wonderland",
    backgroundColor: "#F0F8FF",
    texts: [
      {
        text: "Winter Magic",
        fontSize: 48,
        color: "#1E90FF",
        x: 50,
        y: 250,
        fontStyle: "bold",
        textDecoration: "",
        fontFamily: "Arial",
      },
    ],
  },
  {
    name: "Bohemian Spirit",
    backgroundColor: "#FF6347",
    texts: [
      {
        text: "Free Spirit",
        fontSize: 56,
        color: "#ffffff",
        x: 50,
        y: 200,
        fontStyle: "normal",
        textDecoration: "underline",
        fontFamily: "Georgia",
      },
    ],
  },
  {
    name: "Geometric Shapes",
    backgroundColor: "#000000",
    texts: [
      {
        text: "Shape Your Ideas",
        fontSize: 60,
        color: "#FFFFFF",
        x: 50,
        y: 250,
        fontStyle: "bold",
        textDecoration: "",
        fontFamily: "Arial",
      },
    ],
  },
  {
    name: "Festival Joy",
    backgroundColor: "#FFD700",
    texts: [
      {
        text: "Celebrate Life!",
        fontSize: 64,
        color: "#FF4500",
        x: 50,
        y: 200,
        fontStyle: "bold",
        textDecoration: "underline",
        fontFamily: "Comic Sans MS",
      },
    ],
  },
  {
    name: "Magical Night",
    backgroundColor: "#4B0082",
    texts: [
      {
        text: "Night of Magic",
        fontSize: 72,
        color: "#FFD700",
        x: 50,
        y: 200,
        fontStyle: "bold",
        textDecoration: "",
        fontFamily: "Arial",
      },
    ],
  },
  {
    name: "Dreamy Pastels",
    backgroundColor: "#FFB6C1",
    texts: [
      {
        text: "Dream Big!",
        fontSize: 56,
        color: "#000000",
        x: 50,
        y: 250,
        fontStyle: "normal",
        textDecoration: "",
        fontFamily: "Arial",
      },
    ],
  },
  {
    name: "Joyful Colors",
    backgroundColor: "#FF4500",
    texts: [
      {
        text: "Spread Joy!",
        fontSize: 60,
        color: "#FFFFFF",
        x: 50,
        y: 200,
        fontStyle: "bold",
        textDecoration: "underline",
        fontFamily: "Comic Sans MS",
      },
    ],
  },
  {
    name: "Peaceful Greens",
    backgroundColor: "#98FB98",
    texts: [
      {
        text: "Nature's Peace",
        fontSize: 48,
        color: "#000000",
        x: 50,
        y: 250,
        fontStyle: "italic",
        textDecoration: "",
        fontFamily: "Georgia",
      },
    ],
  },
];

export default function ImageEditor() {
  const [backgroundImage, setBackgroundImage] =
    useState<HTMLImageElement | null>(null);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const borderWidth = 0;
  const borderColor = "#000000";
  const [texts, setTexts] = useState<
    Array<{
      id: string;
      text: string;
      fontSize: number;
      color: string;
      x: number;
      y: number;
      fontStyle: string;
      textDecoration: string;
      fontFamily: string;
    }>
  >([]);
  const [selectedId, selectShape] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [showPanel, setShowPanel] = useState(false);
  const [activeTab, setActiveTab] = useState("Templates");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const trRef = useRef<Konva.Transformer>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const img = new window.Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setBackgroundImage(img);
      };
    }
  };

  const handleAddText = () => {
    const getRandomPosition = (maxWidth: number, maxHeight: number) => {
      return {
        x: Math.floor(Math.random() * (maxWidth - 100)), // Ensuring some margin
        y: Math.floor(Math.random() * (maxHeight - 50)), // Ensuring some margin
      };
    };

    const { x, y } = getRandomPosition(STAGE_WIDTH, STAGE_HEIGHT);

    const newText = {
      id: `text-${texts.length + 1}`,
      text: "New Text",
      fontSize: 24,
      color: "#000000",
      x: x,
      y: y,
      fontStyle: "normal",
      textDecoration: "",
      fontFamily: "Arial",
    };

    setTexts([...texts, newText]);
  };

  const handleTextChange = (id: string, key: string, value: string | number) => {
    setTexts(texts.map((t) => (t.id === id ? { ...t, [key]: value } : t)));
  };

  const handleTransformEnd = (e: Konva.KonvaEventObject<Event>) => {
    const node = e.target;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();
    node.scaleX(1);
    node.scaleY(1);
    if (node instanceof Konva.Text) {
      handleTextChange(
        node.id(),
        "fontSize",
        Math.round(node.fontSize() * scaleX)
      );
    } else if (node instanceof Konva.Image) {
      node.width(node.width() * scaleX);
      node.height(node.height() * scaleY);
    }
  };

  const checkDeselect = (
    e: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
      setShowPanel(false);
    } else {
      setShowPanel(true);
    }
  };

  const handleDownload = () => {
    if (stageRef.current) {
      const dataURL = stageRef.current.toDataURL();
      const link = document.createElement("a");
      link.download = "youtube-thumbnail.png";
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const applyTemplate = (template: Template) => {
    setBackgroundColor(template.backgroundColor);
    setTexts(
      template.texts.map((text, index) => ({
        id: `text-${index + 1}`,
        ...text,
      }))
    );
  };

  const sidebarItems = [
    { icon: <Grid size={20} />, label: "Templates" },
    { icon: <Type size={20} />, label: "Text", action: handleAddText },
    { icon: <Image size={20} />, label: "Photos" },
    { icon: <Layers size={20} />, label: "Elements" },
  ];

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">YT Thumbnail Editor</h2>
          {sidebarItems.map((item, index) => (
            <Button
              key={index}
              variant={activeTab === item.label ? "secondary" : "ghost"}
              className="w-full justify-start mb-2"
              onClick={() => {
                setActiveTab(item.label);
                if (item.action) item.action();
              }}
            >
              {item.icon}
              <span className="ml-2">{item.label}</span>
            </Button>
          ))}
        </div>
        <ScrollArea className="flex-1 p-4">
          {activeTab === "Templates" && (
            <div className="grid grid-cols-2 gap-4">
              {templates.map((template, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center text-center p-2"
                  style={{ backgroundColor: template.backgroundColor }}
                  onClick={() => applyTemplate(template)}
                >
                  <span
                    className="text-xs"
                    style={{ color: template.texts[0].color }}
                  >
                    {template.name}
                  </span>
                </Button>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white shadow-sm p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4"></div>
          <div className="flex items-center space-x-4">
            {/* Image Upload Button */}
            <input
              type="file"
              accept="image/*"
              onChange={() => fileInputRef.current?.click()}
              style={{ display: "none" }}
              id="upload-button"
            />
            <label htmlFor="upload-button" style={{ cursor: "pointer" }}>
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
              >
                <Upload size={24} style={{ paddingRight: 10 }} />
                Upload Image
              </Button>
            </label>

            <Button onClick={handleDownload}>Download</Button>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex justify-center items-center relative">
          {/* Canvas Area */}
          <div className="border border-[#eee] rounded-lg bg-white shadow-lg overflow-hidden">
            <Stage
              width={STAGE_WIDTH}
              height={STAGE_HEIGHT}
              onMouseDown={checkDeselect}
              onTouchStart={checkDeselect}
              ref={stageRef}
              scaleX={scale}
              scaleY={scale}
            >
              <Layer>
                <Rect
                  width={STAGE_WIDTH}
                  height={STAGE_HEIGHT}
                  fill={backgroundColor}
                  stroke={borderColor}
                  strokeWidth={borderWidth}
                />
                {backgroundImage && (
                  <KonvaImage
                    image={backgroundImage}
                    width={STAGE_WIDTH}
                    height={STAGE_HEIGHT}
                    draggable
                    onClick={() => selectShape("image")}
                    onTap={() => selectShape("image")}
                    onTransformEnd={handleTransformEnd}
                  />
                )}
                {texts.map((textItem) => (
                  <Text
                    key={textItem.id}
                    id={textItem.id}
                    text={textItem.text}
                    fontSize={textItem.fontSize}
                    fontStyle={textItem.fontStyle}
                    textDecoration={textItem.textDecoration}
                    fontFamily={textItem.fontFamily}
                    fill={textItem.color}
                    x={textItem.x}
                    y={textItem.y}
                    draggable
                    onClick={() => selectShape(textItem.id)}
                    onTap={() => selectShape(textItem.id)}
                    onTransformEnd={handleTransformEnd}
                  />
                ))}
                {selectedId && (
                  <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                      if (newBox.width < 5 || newBox.height < 5) {
                        return oldBox;
                      }
                      return newBox;
                    }}
                  />
                )}
              </Layer>
            </Stage>
          </div>

          {/* Floating Property Panel */}
          {showPanel && (
            <div className="absolute top-4 right-4 w-64 bg-white shadow-md p-4 space-y-4 rounded-lg">
              <div>
                <Label>Background Color</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-8"
                      style={{ backgroundColor: backgroundColor }}
                    />
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <HexColorPicker
                      color={backgroundColor}
                      onChange={setBackgroundColor}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              {selectedId && selectedId.startsWith("text-") && (
                <>
                  <div>
                    <Label>Text</Label>
                    <Input
                      value={texts.find((t) => t.id === selectedId)?.text || ""}
                      onChange={(e) =>
                        handleTextChange(selectedId, "text", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <Label>Font Size</Label>
                    <Input
                      type="number"
                      value={
                        texts.find((t) => t.id === selectedId)?.fontSize || 24
                      }
                      onChange={(e) =>
                        handleTextChange(
                          selectedId,
                          "fontSize",
                          Number(e.target.value)
                        )
                      }
                    />
                  </div>
                  <div>
                    <Label>Font Family</Label>
                    <select
                      className="w-full border rounded p-2"
                      value={
                        texts.find((t) => t.id === selectedId)?.fontFamily ||
                        "Arial"
                      }
                      onChange={(e) =>
                        handleTextChange(
                          selectedId,
                          "fontFamily",
                          e.target.value
                        )
                      }
                    >
                      <option value="Arial">Arial</option>
                      <option value="Helvetica">Helvetica</option>
                      <option value="Times New Roman">Times New Roman</option>
                    </select>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handleTextChange(
                          selectedId,
                          "fontStyle",
                          texts.find((t) => t.id === selectedId)?.fontStyle ===
                            "bold"
                            ? "normal"
                            : "bold"
                        )
                      }
                    >
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handleTextChange(
                          selectedId,
                          "fontStyle",
                          texts.find((t) => t.id === selectedId)?.fontStyle ===
                            "italic"
                            ? "normal"
                            : "italic"
                        )
                      }
                    >
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handleTextChange(
                          selectedId,
                          "textDecoration",
                          texts.find((t) => t.id === selectedId)
                            ?.textDecoration === "underline"
                            ? ""
                            : "underline"
                        )
                      }
                    >
                      <Underline className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <Label>Text Color</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full h-8"
                          style={{
                            backgroundColor: texts.find(
                              (t) => t.id === selectedId
                            )?.color,
                          }}
                        />
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <HexColorPicker
                          color={texts.find((t) => t.id === selectedId)?.color}
                          onChange={(color) =>
                            handleTextChange(selectedId, "color", color)
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Bottom Bar with Zoom Slider */}
        <div className="bg-white shadow-sm p-4 flex items-center justify-end">
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="w-32"
            />
            <span>{Math.round(scale * 100)}%</span>
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageUpload}
        accept="image/*"
      />
    </div>
  );
}
