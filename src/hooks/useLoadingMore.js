import { useCallback, useState } from 'react';
import { findIndex, isEqual } from 'lodash';

export const useLoadingMore = () => {
  const [progressNodes, setProgressNodes] = useState([]);

  const setProgressMore = useCallback(
    (node, isProgress) => {
      setProgressNodes(progressNodes => {
        if (isProgress) {
          for (let progressNode of progressNodes) {
            if (isEqual(progressNode, node)) return progressNodes;
          }
          return [...progressNodes, ...[node]];
        }

        return progressNodes.filter(progressNode => !isEqual(progressNode, node));
      });
    },
    [setProgressNodes]
  );
  const getIsProgressMore = useCallback(
    node => {
      return findIndex(progressNodes, progressNode => isEqual(progressNode, node)) > -1;
    },
    [progressNodes]
  );

  return {
    setProgressMore,
    getIsProgressMore,
  };
};

export default useLoadingMore;
