import React from 'react';
import { getItemProps } from '../';

const TYPE_HEADER = 'HEADER';
const TYPE_FOOTER = 'FOOTER';
const isAddToFooters = ({ itemFooter, expanded, visible, ..._ }) => itemFooter && expanded && visible;
const isAddToHeaders = ({ itemHeader, expanded, visible, ..._ }) => itemHeader && expanded && visible;
const getFooterId = id => `${id}_${TYPE_FOOTER}`;
const getHeaderId = id => `${id}_${TYPE_HEADER}`;
const isHeader = type => type === TYPE_HEADER;
const isFooter = type => type === TYPE_FOOTER;

const getItem = ({ id, ...props }, { Item }) => (Item ? <Item key={id} id={id} {...props} /> : { id, ...props });

const getSectionItem = (type = TYPE_FOOTER, itemProps, renderedProps, { Header, Footer }) => {
  const { origId, origProps, depth } = itemProps;
  const { id: renderedId } = renderedProps;
  const { isLoading, isSelected } = origProps;
  const id = isHeader(type) ? getHeaderId(origId) : getFooterId(origId);

  const props = {
    ...origProps,
    id,
    origId,
    renderedId,
    depth,
    footer: isFooter(type),
    header: isHeader(type),
    visible: true,
    expanded: true,
    loading: isLoading ? isLoading(id) : false,
    selected: isSelected ? isSelected(id) : false,
  };

  return isHeader(type) && Header ? <Header {...props} key={id} /> : isFooter(type) && Footer ? <Footer {...props} key={id} /> : props;
};

const getHeaderSection = (itemProps, props, options) => getSectionItem(TYPE_HEADER, itemProps, props, options);
const getFooterSection = (itemProps, props, options) => getSectionItem(TYPE_FOOTER, itemProps, props, options);

const enhancedGetItemPropsWithSections = () => {
  let footers = [];
  let headers = [];

  return (props, options = {}) => {
    const itemProps = getItemProps(props);
    const { isLast } = props;
    if (isLast === undefined) console.warn('isLast props is missing from props, please make sure to add it, please refer to docs for more info');
    const { id, depth, expanded } = itemProps;

    const items = [getItem(itemProps, options)];
    const { depth: lastDepthInFooters } = footers[footers.length - 1] || {};

    if (lastDepthInFooters >= depth) items.unshift(getFooterSection(footers.pop(), itemProps, options));
    if (headers.length) items.unshift(getHeaderSection(headers.pop(), itemProps, options));

    isAddToFooters(itemProps) && footers.push({ depth, origId: id, expanded, origProps: props });
    isAddToHeaders(itemProps) && headers.push({ depth, origId: id, expanded, origProps: props });

    if (isLast) {
      headers = headers.reverse().filter(({ expanded, ...headerProps }) => {
        expanded && items.push(getHeaderSection(headerProps, itemProps, options));
        return false;
      });

      footers = footers.reverse().filter(({ expanded, ...footerProps }) => {
        expanded && items.push(getFooterSection(footerProps, itemProps, options));
        return false;
      });
    }

    return items;
  };
};

export default enhancedGetItemPropsWithSections;
