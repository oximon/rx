import { useEffect } from 'react';
import { FilterStore } from '../mobx';

export function useEmptyFilterStoreHook(): void {
  useEffect(() => {
    return () => FilterStore.resetFilterValuesObject();
  }, []);
}
