import React from 'react';
import { getItemProps } from '../';

const TYPE_HEADER = 'HEADER';
const TYPE_FOOTER = 'FOOTER';
const isAddToFooters = ({ itemFooter, expanded, visible, ..._ }) => itemFooter && expanded && visible;
const isAddToHeaders = ({ itemHeader, expanded, visible, ..._ }) => itemHeader && expanded && visible;
const getFooterItemId = itemId => `${itemId}_${TYPE_FOOTER}_ITEM`;
const getHeaderItemId = itemId => `${itemId}_${TYPE_HEADER}_ITEM`;
const isHeader = type => type === TYPE_HEADER;
const isFooter = type => type === TYPE_FOOTER;

const getItem = (props, { Item }) => (Item ? <Item {...props} /> : props);

const getSectionItem = (type = TYPE_FOOTER, itemProps, { Header, Footer }) => {
  const { itemId: renderedItemId, origItemId, origItemProps, depth } = itemProps;
  const { isLoading, isSelected } = origItemProps;
  const itemId = isHeader(type) ? getHeaderItemId(origItemId) : getFooterItemId(origItemId);

  const props = {
    ...origItemProps,
    itemId,
    origItemId,
    renderedItemId,
    depth,
    footer: isFooter(type),
    header: isHeader(type),
    visible: true,
    expanded: true,
    loading: isLoading ? isLoading(itemId) : false,
    selected: isSelected ? isSelected(itemId) : false,
  };

  return isHeader(type) && Header ? <Header {...props} key={itemId} /> : isFooter(type) && Footer ? <Footer {...props} key={itemId} /> : props;
};

const getHeaderSection = (itemProps, options) => getSectionItem(TYPE_HEADER, itemProps, options);
const getFooterSection = (itemProps, options) => getSectionItem(TYPE_FOOTER, itemProps, options);

const enhancedGetItemPropsWithSections = () => {
  let footers = [];
  let headers = [];
  return (props, options = {}) => {
    const itemProps = getItemProps(props);
    const { isLast } = props;
    if (isLast === undefined) console.warn('isLast props is missing from props, please make sure to add it, please refer to docs for more info');
    const { itemId, depth, expanded } = itemProps;

    const items = [getItem(itemProps, options)];
    const { depth: lastDepthInFooters } = footers[footers.length - 1] || {};

    if (lastDepthInFooters >= depth) items.unshift(getFooterSection(footers.pop(), options));
    if (headers.length) items.unshift(getHeaderSection(headers.pop(), options));

    isAddToFooters(itemProps) && footers.push({ depth, origItemId: itemId, expanded, origItemProps: props });
    isAddToHeaders(itemProps) && headers.push({ depth, origItemId: itemId, expanded, origItemProps: props });

    if (isLast) {
      headers = headers.reverse().filter(({ expanded, ...headerProps }) => {
        expanded && items.push(getHeaderSection(headerProps, options));
        return false;
      });

      footers = footers.reverse().filter(({ expanded, ...footerProps }) => {
        expanded && items.push(getFooterSection(footerProps, options));
        return false;
      });
    }

    return items;
  };
};

export const withSections = (Item, { Header, Footer }) => {
  const getItems = enhancedGetItemPropsWithSections();

  return props => getItems(props, { Item, Header, Footer });
};

export default enhancedGetItemPropsWithSections;
