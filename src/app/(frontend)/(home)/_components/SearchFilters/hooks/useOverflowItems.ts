import { RefObject, useEffect, useRef, useState } from "react";

interface IOverflowItemsProps<T> {
  items: T[];
  reserveSpace?: number;
}

/**
 * @description A custom hook that calculates the visible and hidden items in a container based on the available width. It uses ResizeObserver to handle dynamic resizing of the container.
 *
 * @param   items
 *          The array of items to be displayed.
 * @param   reserveSpace
 *          The space to reserve for other elements (like button or gap between items).
 *
 * @returns An object with:
 *  - visibleItems: Visible items that fit in the container.
 *  - hiddenItems: Items that overflow the container.
 *  - containerRef: Ref to the container element.
 *  - itemRefs: Refs to individual item elements.
 *
 * @example
 * const { visibleItems, hiddenItems, containerRef, itemRefs } = useOverflowItems({
 *   items: categories,
 *   reserveSpace: viewMoreButtonWidth + categories.length * 6,
 * });
 */

export const useOverflowItems = <T>({
  items,
  reserveSpace = 0,
}: IOverflowItemsProps<T>): {
  containerRef: RefObject<HTMLDivElement | null>;
  hiddenItems: T[];
  itemRefs: RefObject<(HTMLElement | null)[]>;
  visibleItems: T[];
} => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const [visibleItems, setVisibleItems] = useState<T[]>([]);
  const [hiddenItems, setHiddenItems] = useState<T[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const calculate = () => {
      const containerWidth =
        (containerRef.current?.offsetWidth || 0) - reserveSpace;
      let totalWidth = 0;
      const visible: T[] = [];
      const hide: T[] = [];

      items.forEach((item, i) => {
        const el = itemRefs.current[i];

        if (!el) return;

        totalWidth += el.offsetWidth;

        if (totalWidth <= containerWidth) {
          visible.push(item);
        } else {
          hide.push(item);
        }
      });

      setVisibleItems(visible);
      setHiddenItems(hide);
    };

    const observer = new ResizeObserver(calculate);
    calculate();

    observer.observe(containerRef.current);
    window.addEventListener("resize", calculate);

    return () => {
      window.removeEventListener("resize", calculate);
      observer.disconnect();
    };
  }, [items, reserveSpace]);

  return { containerRef, hiddenItems, itemRefs, visibleItems };
};
