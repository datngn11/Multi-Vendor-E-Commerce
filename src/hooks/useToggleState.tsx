import { useState } from "react";

/**
 * @description A custom hook that manages the open/close state
 *
 * @returns An object with:
 * - isOpen: boolean - The current state (open or closed)
 * - handleOpen: function - A function to set the state to open
 * - handleClose: function - A function to set the state to closed
 *
 * @param initialState Initial state (open or closed)
 * */

export const useToggleState = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  const toggle = () => setIsOpen((prev) => !prev);

  return {
    handleClose,
    handleOpen,
    isOpen,
    toggle,
  };
};
