"use client";

import { useField } from "@payloadcms/ui";
import { TextField } from "@payloadcms/ui";
import { TextFieldClientComponent } from "payload";
import { useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ColorPickerInput: TextFieldClientComponent = ({
  field,
  path,
  ...props
}) => {
  const { setValue, value } = useField<string>({ path });

  // Track internal color to reduce rapid re-renders
  const [color, setColor] = useState<string>(value);
  const debounceRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  // Sync Payload field value → local state
  useEffect(() => {
    if (value && value !== color) {
      setColor(value);
    }
  }, [value]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      if (color !== value) {
        setValue(color);
      }
    }, 0);

    return () => clearTimeout(debounceRef.current!);
  }, [color]);

  return (
    <div className="field-type text">
      <label className="field-label" htmlFor={`field-${field.name}`}>
        {`${field.label}`}
      </label>
      <div className="flex items-center gap-8">
        <Popover>
          <PopoverTrigger asChild>
            <div className="cursor-pointer rounded-[3px] border border-[#3c3c3c] bg-[#222] p-2.5 hover:border-[#575757] data-[state=open]:border-[#8d8d8d]">
              <div
                className="block h-[20px] w-[50px]"
                style={{ backgroundColor: color }}
              />
            </div>
          </PopoverTrigger>

          <PopoverContent className="w-fit rounded-xl border border-[#8d8d8d] bg-[#222] p-0">
            <HexColorPicker color={color} onChange={setColor} />
          </PopoverContent>
        </Popover>

        <TextField field={field} path={path} {...props} />
      </div>
    </div>
  );
};

export default ColorPickerInput;
