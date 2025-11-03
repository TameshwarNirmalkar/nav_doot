import { createSelector } from "@reduxjs/toolkit";
import { selectDrawerById } from ".";

export const selectIsCollapsedById = createSelector(
  // 1. Input Selector: Returns the 'drawer' object
  selectDrawerById,
  // 2. Result Function: Takes the 'drawer' object and extracts the boolean
  (drawer) => {
    // If selectDrawerById returns null/undefined, default to false.
    return drawer ? drawer.isCollapsed : false;
  },
);
