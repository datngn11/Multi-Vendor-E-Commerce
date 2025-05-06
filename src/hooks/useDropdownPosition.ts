//custom hook that recieve ref and calculates the position of a dropdown menu

import { useEffect, useState } from "react";

const DEFAULT_DROPDOWN_WIDTH = 192;
const DEFAULT_SCROLL_OFFSET = 16;

export const useDropdownPosition = (
  ref: React.RefObject<HTMLDivElement | null>,
) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    let left = rect.left + window.scrollX;
    let top = rect.bottom + window.scrollY;

    if (left + DEFAULT_DROPDOWN_WIDTH > window.innerWidth) {
      left = rect.right - DEFAULT_DROPDOWN_WIDTH + window.scrollX;
      if (left < 0) {
        left =
          window.innerWidth - DEFAULT_DROPDOWN_WIDTH - DEFAULT_SCROLL_OFFSET;
      }
      if (left < 0) {
        left = DEFAULT_SCROLL_OFFSET;
      }
    }

    setPosition({ top, left });
  }, [ref.current]);

  return position;
};
