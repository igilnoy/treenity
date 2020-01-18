import { useCallback, useState } from 'react';
import getSelectedProps from '../props/getSelectedProps';

export const useSelected = () => {
  const [selected, setSelected] = useState();
  const isSelected = useCallback(nodeId => nodeId === selected, [selected]);

  //getSelectedProps.cache.delete();

  //console.log(getSelectedProps.cache);

  return {
    setSelected,
    isSelected,
  };
};

export default useSelected;
