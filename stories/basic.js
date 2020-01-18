import React, { memo } from 'react';
import { areEqualDebug } from '../src/helpers';
import { getItemProps, useExpanded, useSelected } from '../src';
import data from './mock';

const Item = memo(props => {
  const { noChildren, label, depth, expanded, selected, visible, getSelectedProps, getExpandedProps } = props;
  return (
    <>
      {visible ? (
        <div {...getSelectedProps()} style={{ marginLeft: depth * 10, backgroundColor: selected ? '#84F28F' : '#FFFFFF' }}>
          <button {...getExpandedProps()} style={{ opacity: noChildren ? 0 : 1 }}>
            {expanded ? '-' : '+'}
          </button>
          {label}
        </div>
      ) : null}
    </>
  );
}, areEqualDebug);

const Basic = () => {
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

export default Basic;
