import React, { memo } from 'react';
import { FixedSizeList as List, areEqual } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import styled, { ThemeProvider } from 'styled-components';
import { areEqualDebug } from '../src/helpers';
import { useExpanded, useLoading, enhancerWithMore } from '../src';
import { DualRing } from 'react-awesome-spinners';

import { StyledItem, StyledButton, Wrapper, THEME } from './styled.helpers';
import data from './mock';

const getItemPropsEnhanced = enhancerWithMore();

const RowNode = memo(({ index, style, data }) => {
  const { items } = data;
  const { isMoreItem, ...itemProps } = items[index];

  return <span style={style}>{isMoreItem ? <More {...itemProps} /> : <Item {...itemProps} />}</span>;
}, areEqual);

const generateItemKey = (index, { items }) => items[index].itemId;

const Item = memo(props => {
  const { noChildren, label, depth, expanded, visible, getExpandedProps } = props;
  return (
    <>
      {visible ? (
        <StyledItem {...getExpandedProps()} depth={depth}>
          <StyledButton expanded={expanded}>{!noChildren ? '▸' : ''}</StyledButton>
          {label}
        </StyledItem>
      ) : null}
    </>
  );
}, areEqualDebug);

const StyledMore = styled(StyledItem)`
  color: #ffde03;
  font-weight: 500;
`;

const More = memo(({ depth, visible, setLoading, loading, itemId }) => {
  const onClick = () => {
    setLoading(itemId, true);
    setTimeout(() => {
      setLoading(itemId, false);
    }, 2000);
  };

  return (
    <>
      {visible ? (
        <StyledMore {...{ depth }} onClick={onClick}>
          {loading ? <DualRing size={16} width={35} height={26} color={'#ffde03'} /> : <StyledButton>+</StyledButton>}
          Load More
        </StyledMore>
      ) : null}
    </>
  );
}, areEqualDebug);

export default () => {
  const expandedProps = useExpanded();
  const loadingProps = useLoading();

  const items = data.reduce((acc, { depth, ...item }, idx) => {
    const nodes = getItemPropsEnhanced({ depth, ...item, isLast: idx === data.length - 1, ...expandedProps, ...loadingProps });

    nodes.forEach(node => {
      const { visible, ...props } = node;
      if (visible) acc.push({ visible, ...props });
    });

    return acc;
  }, []);

  return (
    <ThemeProvider theme={THEME.DARK}>
      <Wrapper>
        <AutoSizer>
          {({ width }) => (
            <List height={500} width={width} itemCount={items.length} itemSize={40} itemData={{ items }} itemKey={generateItemKey}>
              {RowNode}
            </List>
          )}
        </AutoSizer>
      </Wrapper>
    </ThemeProvider>
  );
};
