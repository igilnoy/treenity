import { last } from 'lodash';
import { getItemProps } from '../';

const enhancerWithMore = (fn = getItemProps) => {
  let depths = [];

  return data => {
    const props = fn(data);
    const { itemId, depth, isLast, expanded, visible, progress, more } = props;
    const itemsToRender = [{ ...{ itemId, depth, expanded, visible, progress, ...props } }];
    const lastDepth = last(depths) || {};

    const getPagingItem = ({ itemId, renderedItemId, depth }) => ({
      ...props,
      isMoreItem: true,
      origItemId: itemId,
      itemId: `${itemId}_MORE_ITEM`,
      renderedItemId,
      depth,
    });

    if (lastDepth.depth >= depth) {
      const { itemId: depthItemId, ...props } = depths.pop();
      itemsToRender.unshift(getPagingItem({ itemId: depthItemId, renderedItemId: itemId, ...props }));
    }

    more && expanded && visible && depths.push({ depth, itemId, expanded, visible });

    if (isLast) {
      depths = depths.reverse().filter(({ depth, itemId: depthItemId, expanded }) => {
        if (expanded) itemsToRender.push(getPagingItem({ ...props, itemId: depthItemId, renderedItemId: itemId, depth }));
        return false;
      });
    }

    return itemsToRender;
  };
};

export default enhancerWithMore;
