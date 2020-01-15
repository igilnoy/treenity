export { default as useSelected } from './hooks/useSelected';
export { default as useExpanded } from './hooks/useExpanded';
export { default as useLoading } from './hooks/useLoading';
export { default as useLoadingMore } from './hooks/useLoadingMore';
export { default as getItemProps } from './props/getItemProps';
export { default as getSelectedProps } from './props/getSelectedProps';
export { default as getExpandedProps } from './props/getExpandedProps';
export { default as getLoadingProps } from './props/getLoadingProps';
export { default as enhancerWithMore } from './enhancers/enhancerWithMore';

export const treeIterator = (items, handler) =>
  items.map((item, idx) => handler({ isLastTreeItem: idx === items.length - 1, isFirstTreeItem: idx === 0, ...item }, idx));
