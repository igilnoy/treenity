import { getItemProps } from '../';

const TYPE_HEADER = 'HEADER';
const TYPE_FOOTER = 'FOOTER';
const isFooter = ({ itemFooter, expanded, visible, ..._ }) => itemFooter && expanded && visible;
const isHeader = ({ itemHeader, expanded, visible, ..._ }) => itemHeader && expanded && visible;
const getFooterItemId = itemId => `${itemId}_${TYPE_FOOTER}_ITEM`;
const getHeaderItemId = itemId => `${itemId}_${TYPE_HEADER}_ITEM`;

const getSectionItemProps = (type = TYPE_FOOTER, itemProps) => {
  const { itemId: renderedItemId, origItemId, origItemProps, depth } = itemProps;
  const { isLoading, isSelected } = origItemProps;
  const itemId = type === TYPE_HEADER ? getHeaderItemId(origItemId) : getFooterItemId(origItemId);

  return {
    ...origItemProps,
    itemId,
    origItemId,
    renderedItemId,
    depth,
    footer: type === TYPE_FOOTER,
    header: type === TYPE_HEADER,
    visible: true,
    expanded: true,
    loading: isLoading ? isLoading(itemId) : false,
    selected: isSelected ? isSelected(itemId) : false,
  };
};

const enhancedGetItemPropsWithSections = () => {
  let footers = [];
  let headers = [];
  return props => {
    const itemProps = getItemProps(props);
    const { isLast } = props;
    const { itemId, depth, expanded } = itemProps;

    const itemsToRender = [itemProps];
    const { depth: lastDepthInFooters } = footers[footers.length - 1] || {};

    if (lastDepthInFooters >= depth) itemsToRender.unshift(getSectionItemProps(TYPE_FOOTER, footers.pop()));
    if (headers.length) itemsToRender.unshift(getSectionItemProps(TYPE_HEADER, headers.pop()));

    isFooter(itemProps) && footers.push({ depth, origItemId: itemId, expanded, origItemProps: props });
    isHeader(itemProps) && headers.push({ depth, origItemId: itemId, expanded, origItemProps: props });

    if (isLast) {
      headers = headers.reverse().filter(({ expanded, ...headerProps }) => {
        expanded && itemsToRender.push(getSectionItemProps(TYPE_HEADER, headerProps));
        return false;
      });

      footers = footers.reverse().filter(({ expanded, ...footerProps }) => {
        expanded && itemsToRender.push(getSectionItemProps(TYPE_FOOTER, footerProps));
        return false;
      });
    }

    return itemsToRender;
  };
};

export default enhancedGetItemPropsWithSections;
