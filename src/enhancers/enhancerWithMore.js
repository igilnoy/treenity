import { last } from 'lodash';
import { getItemProps } from '../';

const enhancerWithMore = (fn = getItemProps) => {
  let depths = [];

  return data => {
    const props = fn(data);
    const { itemId, depth, isLast, expanded, visible, progress, isLoading, more } = props;
    const itemsToRender = [{ ...{ itemId, depth, expanded, visible, progress, ...props } }];
    const lastDepth = last(depths) || {};

    //console.log(fn({ ...data, itemId: `${itemId}_MORE_ITEM`, isMoreItem: true, origItemId: itemId, depth }));

    const getMoreItem = ({ itemId, renderedItemId, depth }) => ({
      ...props,
      isMoreItem: true,
      origItemId: itemId,
      itemId: `${itemId}_MORE_ITEM`,
      ...(data.isLoading ? { loading: data.isLoading(`${itemId}_MORE_ITEM`) } : {}),
      renderedItemId,
      depth,
    });

    if (lastDepth.depth >= depth) {
      const { itemId: depthItemId, ...props } = depths.pop();
      itemsToRender.unshift(getMoreItem({ itemId: depthItemId, renderedItemId: itemId, ...props }));
    }

    more && expanded && visible && depths.push({ depth, itemId, expanded, visible });

    if (isLast) {
      depths = depths.reverse().filter(({ depth, itemId: depthItemId, expanded }) => {
        if (expanded) itemsToRender.push(getMoreItem({ ...props, itemId: depthItemId, renderedItemId: itemId, depth }));
        return false;
      });
    }

    return itemsToRender;
  };
};

export default enhancerWithMore;
