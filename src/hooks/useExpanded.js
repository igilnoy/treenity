import { useCallback, useRef, useState, useEffect } from 'react';
import { isArray } from 'lodash';
import getExpandedProps from '../props/getExpandedProps';

export const useExpanded = () => {
  const lastCollapsedDepth = useRef();
  const [expandedIds, setExpandedIds] = useState(new Set());

  useEffect(() => () => getExpandedProps.cache.clear(), []);

  const setExpanded = useCallback(
    (nodeIds, isExpanded) => {
      nodeIds = isArray(nodeIds) ? nodeIds : [nodeIds];
      setExpandedIds(state => {
        nodeIds.forEach(nodeId => {
          isExpanded ? state.add(nodeId) : state.delete(nodeId);
        });

        return new Set(state);
      });
    },
    [setExpandedIds]
  );

  const isExpanded = useCallback(
    (nodeId, depth) => {
      const isExpanded = expandedIds.has(nodeId);
      if (!isExpanded) {
        if (lastCollapsedDepth.current === undefined || depth < lastCollapsedDepth.current.depth) {
          lastCollapsedDepth.current = { nodeId, depth };
        }
      } else {
        if (lastCollapsedDepth.current && lastCollapsedDepth.current.depth >= depth) {
          lastCollapsedDepth.current = undefined;
        }
      }

      return isExpanded;
    },
    [expandedIds, lastCollapsedDepth]
  );
  const isVisible = useCallback(
    (nodeId, depth) => {
      const isVisible = !lastCollapsedDepth.current || depth <= lastCollapsedDepth.current.depth || depth === 0;

      return isVisible;
    },

    [expandedIds, lastCollapsedDepth]
  );

  return {
    setExpanded,
    isExpanded,
    isVisible,
  };
};

export default useExpanded;
