import React, { memo } from 'react';
import { FixedSizeList as List, areEqual } from 'react-window';
import { ThemeProvider } from 'styled-components';
import { areEqualDebug } from '../src/helpers';
import { getItemProps, getSelectedProps, getExpandedProps, useExpanded, useSelected } from '../src';
import { StyledItem, StyledButton, Wrapper, THEME } from './styled.helpers';
import data from './mock';

const RowNode = memo(({ index, style, data }) => {
  const { items } = data;
  const itemProps = items[index];

  return (
    <span style={style}>
      <Item {...itemProps} />
    </span>
  );
}, areEqual);

const generateItemKey = (index, { items }) => items[index].itemId;

const Item = memo(props => {
  const { noChildren, label, depth, expanded, selected, visible } = props;
  return (
    <>
      {visible ? (
        <StyledItem {...getSelectedProps(props)} {...{ depth, selected }}>
          <StyledButton {...getExpandedProps(props)} {...{ expanded }}>
            {!noChildren ? '▸' : ''}
          </StyledButton>
          {label}
        </StyledItem>
      ) : null}
    </>
  );
}, areEqualDebug);

const withReactWindow = () => {
  const selectedProps = useSelected();
  const expandedProps = useExpanded();

  const items = data.reduce((acc, { depth, ...item }) => {
    const { visible, ...props } = getItemProps({ depth, ...item, ...selectedProps, ...expandedProps });

    if (visible) acc.push({ visible, ...props });

    return acc;
  }, []);

  return (
    <ThemeProvider theme={THEME.DARK}>
      <Wrapper>
        <List height={300} width={400} itemCount={items.length} itemSize={40} itemData={{ items }} itemKey={generateItemKey}>
          {RowNode}
        </List>
      </Wrapper>
    </ThemeProvider>
  );
};

export default withReactWindow;
