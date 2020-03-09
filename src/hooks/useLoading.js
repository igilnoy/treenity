import { useCallback, useEffect, useState } from 'react';
import isArray from 'lodash/isArray';
import getLoadingProps from '../props/getLoadingProps';

export const useLoading = () => {
  const [loadingIds, setLoadingIds] = useState(new Set());

  useEffect(() => () => getLoadingProps.cache.clear(), []);

  const setLoading = useCallback(
    (ids, isProgress) => {
      ids = isArray(ids) ? ids : [ids];

      setLoadingIds(state => {
        ids.forEach(id => {
          isProgress ? state.add(id) : state.delete(id);
        });

        return new Set(state);
      });
    },
    [setLoadingIds]
  );
  const isLoading = useCallback(id => loadingIds.has(id), [loadingIds]);
  return {
    setLoading,
    isLoading,
  };
};

export default useLoading;
