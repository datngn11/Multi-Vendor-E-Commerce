import { useEffect, useState } from "react";

const DEFAULT_DROPDOWN_WIDTH = 192;
const DEFAULT_OFFSET = 16;

/**
 * @description A custom hook that calculates the position of a dropdown
 *
 * @returns An object with:
 * - top: number - The top position of the dropdown
 * - left: number - The left position of the dropdown
 *
 * @param ref React ref to the element to calculate the position for
 * @param trigger Boolean to trigger the calculation
 */

export const useDropdownPosition = (
  ref: React.RefObject<HTMLDivElement | null>,
  trigger: boolean = false,
) => {
  const [position, setPosition] = useState({ left: 0, top: 0 });

  useEffect(() => {
    if (!ref.current || !trigger) return;

    const rect = ref.current.getBoundingClientRect();
    let left = rect.left + window.scrollX;
    const top = rect.bottom;

    // If the dropdown goes beyond the right edge of the screen, align it to the right
    if (left + DEFAULT_DROPDOWN_WIDTH > window.innerWidth) {
      left = window.innerWidth - DEFAULT_DROPDOWN_WIDTH - DEFAULT_OFFSET;

      if (left < 0) {
        left = DEFAULT_OFFSET;
      }
    }

    setPosition({ left, top });
  }, [ref.current, trigger]);

  return position;
};
