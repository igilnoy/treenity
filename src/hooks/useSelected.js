import { useCallback, useEffect, useState } from 'react';
import getSelectedProps from '../props/getSelectedProps';

export const useSelected = () => {
  const [selected, setSelected] = useState();
  const isSelected = useCallback(nodeId => nodeId === selected, [selected]);

  useEffect(() => () => getSelectedProps.cache.clear(), []);

  return {
    setSelected,
    isSelected,
  };
};

export default useSelected;
