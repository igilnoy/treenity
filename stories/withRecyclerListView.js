import React, { memo, useState, useEffect } from 'react';
import { areEqualDebug } from '../src/helpers';
import { getItemProps, useExpanded, useSelected } from '../src';
import mock from './mock';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview/web';

const Item = memo(props => {
  const { noChildren, label, depth, expanded, selected, visible, getSelectedProps, getExpandedProps } = props;
  return (
    <>
      {visible ? (
        <div {...getSelectedProps()} style={{ marginLeft: depth * 10, backgroundColor: selected ? '#84F28F' : '#EEE' }}>
          <button {...getExpandedProps()} style={{ opacity: noChildren ? 0 : 1 }}>
            {expanded ? '-' : '+'}
          </button>
          {label}
        </div>
      ) : null}
    </>
  );
}, areEqualDebug);

const rowRenderer = (type, item) => {
  return <Item {...item} />;
};

const Basic = () => {
  const selectedProps = useSelected();
  const expandedProps = useExpanded();

  const layoutProvider = new LayoutProvider(
    index => {
      return 'TREE';
    },
    (type, dim) => {
      dim.width = 500;
      dim.height = 25;
    }
  );

  const initDataProvider = new DataProvider((r1, r2) => {
    return r1 !== r2;
  });

  const data = mock.reduce((acc, { depth, ...item }) => {
    const { visible, ...props } = getItemProps({ depth, ...item, ...selectedProps, ...expandedProps });

    if (visible) acc.push({ visible, ...props });

    return acc;
  }, []);

  return (
    <RecyclerListView
      renderAheadOffset={0}
      layoutProvider={layoutProvider}
      dataProvider={initDataProvider.cloneWithRows(data)}
      rowRenderer={rowRenderer}
      style={{ height: 200, width: 500 }}
    />
  );
};

export default Basic;
