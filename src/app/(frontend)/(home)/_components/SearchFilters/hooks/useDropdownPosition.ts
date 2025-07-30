import { useCallback, useEffect, useState } from "react";

const DEFAULT_DROPDOWN_WIDTH = 192;
const DEFAULT_OFFSET = 16;

/**
 * @description A custom hook that calculates the position of a dropdown
 *
 * @param ref React ref to the element to calculate the position for
 * @param trigger Boolean to trigger the calculation
 *
 * @returns An object with:
 * - left: number - The left position of the dropdown
 */

export const useDropdownPosition = (
  ref: React.RefObject<HTMLDivElement | null>, // This ref is now on the parent (div.relative)
  trigger: boolean = false,
) => {
  const [position, setPosition] = useState({ left: 0 });

  const calculatePosition = useCallback(() => {
    if (!ref.current || !trigger) {
      return;
    }

    const parentRect = ref.current.getBoundingClientRect(); // Get the position of the parent `div.relative`

    let calculatedLeft = 0;

    // Calculate where the right edge of the dropdown would be in the viewport
    // if it were aligned to the left of the parent.
    const dropdownWouldBeRightEdgeInViewport =
      parentRect.left + DEFAULT_DROPDOWN_WIDTH;

    // Check if the dropdown would overflow the right edge of the screen
    if (
      dropdownWouldBeRightEdgeInViewport >
      window.innerWidth - DEFAULT_OFFSET
    ) {
      // If it overflows, align the dropdown to the right edge of the parent instead.
      calculatedLeft = parentRect.width - DEFAULT_DROPDOWN_WIDTH;

      // Add a sanity check: ensure it doesn't go off-screen to the left if the parent is very narrow
      // and close to the left edge.
      if (parentRect.left + calculatedLeft < DEFAULT_OFFSET) {
        calculatedLeft = 0;
      }
    }

    setPosition({
      left: calculatedLeft,
    });
  }, [ref, trigger]);

  useEffect(() => {
    calculatePosition();

    window.addEventListener("resize", calculatePosition);

    return () => {
      window.removeEventListener("resize", calculatePosition);
    };
  }, [calculatePosition]);

  return position;
};
