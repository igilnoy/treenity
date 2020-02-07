import React from 'react';
import getSelectedProps from './getSelectedProps';
import getExpandedProps from './getExpandedProps';
import getLoadingProps from './getLoadingProps';
import getKeyboardProps from './getKeyboardProps';

const getItemProps = ({ id, depth, setExpanded, setSelected, setLoading, isExpanded, isVisible, isSelected, isLoading, ...props }) => {
  const nextProps = {
    id,
    depth,
    ...(isVisible ? { visible: isVisible(id, depth) } : {}),
    ...(isExpanded ? { expanded: isExpanded(id, depth) } : {}),
    ...(isSelected ? { selected: isSelected(id) } : {}),
    ...(isLoading ? { loading: isLoading(id) } : {}),
    ...(setSelected ? { setSelected } : {}),
    ...(setLoading ? { setLoading } : {}),
    ...(setExpanded ? { setExpanded } : {}),
    ...props,
  };

  return {
    ...nextProps,
    ...(setSelected ? getSelectedProps(id, setSelected) : {}),
    ...(setExpanded ? getExpandedProps(id, setExpanded, nextProps.expanded) : {}),
    ...(setLoading ? getLoadingProps(id, setLoading) : {}),
    ...(setSelected || setExpanded ? getKeyboardProps(id, setSelected, setExpanded) : {}),
  };
};

export default getItemProps;
