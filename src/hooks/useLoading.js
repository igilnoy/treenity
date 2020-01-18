import { useCallback, useEffect, useState } from 'react';
import { isArray } from 'lodash';
import getLoadingProps from '../props/getLoadingProps';

export const useLoading = () => {
  const [loadingIds, setLoadingIds] = useState(new Set());

  useEffect(() => () => getLoadingProps.cache.clear(), []);

  const setLoading = useCallback(
    (itemIds, isProgress) => {
      itemIds = isArray(itemIds) ? itemIds : [itemIds];

      setLoadingIds(state => {
        itemIds.forEach(itemId => {
          isProgress ? state.add(itemId) : state.delete(itemId);
        });

        return new Set(state);
      });
    },
    [setLoadingIds]
  );
  const isLoading = useCallback(itemId => loadingIds.has(itemId), [loadingIds]);
  return {
    setLoading,
    isLoading,
  };
};

export default useLoading;
