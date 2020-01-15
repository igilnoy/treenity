import { useCallback, useState } from 'react';

export const useSelected = () => {
  const [selected, setSelected] = useState();
  const isSelected = useCallback(nodeId => nodeId === selected, [selected]);

  return {
    setSelected,
    isSelected,
  };
};

export default useSelected;
