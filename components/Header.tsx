// Header.tsx
import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";

interface HeaderProps {
  aspectRatio: string;
  setAspectRatio: (value: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Header: React.FC<HeaderProps> = ({
  aspectRatio,
  setAspectRatio,
  fileInputRef,
  onImageUpload,
}) => {
  return (
    <header className="flex items-center justify-between p-4 bg-gray-100">
      <h1 className="text-2xl font-bold">YouTube Thumbnail Generator</h1>
      <div className="flex items-center gap-4">
        <Select value={aspectRatio} onValueChange={setAspectRatio}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select aspect ratio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="16:9">16:9</SelectItem>
            <SelectItem value="4:3">4:3</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => fileInputRef.current?.click()}>
          <Upload className="w-4 h-4 mr-2" />
          Upload Image
        </Button>
        <Input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={onImageUpload}
        />
      </div>
    </header>
  );
};

export default Header;
