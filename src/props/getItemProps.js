import React from 'react';
import getSelectedProps from './getSelectedProps';
import getExpandedProps from './getExpandedProps';
import getLoadingProps from './getLoadingProps';
import getKeyboardProps from './getKeyboardProps';

const getItemProps = ({
  itemId,
  depth,
  setExpanded,
  setSelected,
  setLoading,
  isExpanded,
  isVisible,
  isSelected,
  isLoading,
  isLastTreeItem: isLast, // TODO: document and think if to pass it on
  isFirstTreeItem: isFirst, // TODO: document and think if to pass it on
  onRender, // // TODO: Think if needed
  ...props
}) => {
  const nextProps = {
    itemId,
    depth,
    ...(isVisible ? { visible: isVisible(itemId, depth) } : {}),
    ...(isExpanded ? { expanded: isExpanded(itemId, depth) } : {}),
    ...(isSelected ? { selected: isSelected(itemId) } : {}),
    ...(isLoading ? { loading: isLoading(itemId) } : {}),
    ...(setSelected ? { setSelected } : {}),
    ...(setLoading ? { setLoading } : {}),
    ...(setExpanded ? { setExpanded } : {}),
    ...props,
  };

  //onRender && onRender({ ...nextProps, ...(isLast !== undefined ? { isLast } : {}), ...(isFirst !== undefined ? { isFirst } : {}) });

  return {
    ...nextProps,
    ...(setSelected ? getSelectedProps(itemId, setSelected) : {}),
    ...(setExpanded ? getExpandedProps(itemId, setExpanded, nextProps.expanded) : {}),
    ...(setLoading ? getLoadingProps(itemId, setLoading) : {}),
    ...getKeyboardProps(itemId, setSelected, setExpanded),
  };
};

export default getItemProps;
