import { EntityId } from '@reduxjs/toolkit';

export type Update<T> = {
  id: EntityId; // The ID of the item to update
  changes: Partial<T>; // An object containing the changes to apply
};
