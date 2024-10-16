// Sidebar.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SidebarProps {
  text: string;
  setText: (text: string) => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const Sidebar: React.FC<SidebarProps> = ({
  text,
  setText,
  onImageUpload,
  fileInputRef,
}) => {
  return (
    <aside className="w-64 p-4 bg-gray-50 overflow-y-auto">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="text">Add Text</Label>
          <Input
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Button onClick={() => fileInputRef.current?.click()}>
            Upload Image
          </Button>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={onImageUpload}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
