// ColorPicker.tsx
import { HexColorPicker } from "react-colorful";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"; // Importing Popover components
import { Button } from "@/components/ui/button";

const ColorPicker = ({
  color,
  onChange,
  label,
}: {
  color: string;
  onChange: (color: string) => void;
  label: string;
}) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        className="w-[80px] h-[30px] p-0"
        style={{ backgroundColor: color }}
        aria-label={`Select ${label}`}
      />
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0">
      <HexColorPicker color={color} onChange={onChange} />
    </PopoverContent>
  </Popover>
);

export default ColorPicker;
