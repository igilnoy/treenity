import React, { memo } from 'react';
import { areEqualDebug } from '../src/helpers';
import { getItemProps, useExpanded, useSelected } from '../src';
import data from './mock';

const Item = memo(props => {
  const { noChildren, label, depth, expanded, selected, visible, getSelectedProps, getExpandedProps, getKeyboardProps } = props;
  return (
    <>
      {visible ? (
        <div {...getKeyboardProps()} {...getSelectedProps()} style={{ marginLeft: depth * 10, backgroundColor: selected ? '#84F28F' : '#FFFFFF' }}>
          <button {...getExpandedProps()} style={{ opacity: noChildren ? 0 : 1 }}>
            {expanded ? '-' : '+'}
          </button>
          {label}
        </div>
      ) : null}
    </>
  );
}, areEqualDebug);

export default () => {
  const selectedProps = useSelected();
  const expandedProps = useExpanded();

  return (
    <>
      {data.map(item => (
        <Item key={item.itemId} {...getItemProps({ ...item, ...selectedProps, ...expandedProps })} />
      ))}
    </>
  );
};
