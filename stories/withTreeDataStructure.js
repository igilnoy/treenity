import React, { memo, Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import { useSelected, useExpanded, getItemProps, getSelectedProps, getExpandedProps } from '../src';
import { StyledItem, StyledButton, Wrapper, THEME } from './styled.helpers';
import { areEqualDebug } from '../src/helpers';
import randomWords from 'random-words';

export const data = [
  {
    id: '1',
    label: randomWords(),
    children: [
      {
        id: '1-1',
        label: randomWords(),
        children: [
          {
            id: '1-1-1',
            label: randomWords(),
            children: [
              { id: '1-1-1-1', label: randomWords() },
              { id: '1-1-1-2', label: randomWords() },
              { id: '1-1-1-3', label: randomWords() },
            ],
          },
          {
            id: '1-1-2',
            label: randomWords(),
            children: [
              { id: '1-1-2-1', label: randomWords() },
              { id: '1-1-2-2', label: randomWords() },
              { id: '1-1-2-3', label: randomWords() },
            ],
          },
          {
            label: randomWords(),
            id: '1-1-3',
            children: [
              { id: '1-1-3-1', label: randomWords() },
              { id: '1-1-3-2', label: randomWords() },
              { id: '1-1-3-3', label: randomWords() },
            ],
          },
        ],
      },
      { id: '1-2', label: randomWords() },
      { id: '1-3', label: randomWords() },
      { id: '1-4', label: randomWords() },
      {
        id: '1-5',
        label: randomWords(),
        children: [
          {
            id: '1-5-1',
            label: randomWords(),
            children: [
              { id: '1-5-1-1', label: randomWords() },
              { id: '1-5-1-2', label: randomWords() },
              { id: '1-5-1-3', label: randomWords() },
            ],
          },
          {
            id: '1-5-2',
            label: randomWords(),
            children: [
              { id: '1-5-2-1', label: randomWords() },
              { id: '1-5-2-2', label: randomWords() },
              { id: '1-5-2-3', label: randomWords() },
            ],
          },
          { id: '1-5-3', label: randomWords() },
        ],
      },
    ],
  },
];

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

export default () => {
  const selectedProps = useSelected();
  const expandedProps = useExpanded();

  const renderChildren = (items, depth) => (items && items.length > 0 ? renderItems(items, depth) : null);

  const renderItems = (items, depth) => {
    return items.map(({ id, children, ...item }) => {
      return (
        <Fragment key={id}>
          <Item {...getItemProps({ depth, itemId: id, ...item, ...selectedProps, ...expandedProps })} />
          {renderChildren(children, depth + 1)}
        </Fragment>
      );
    });
  };

  return (
    <ThemeProvider theme={THEME.LIGHT}>
      <Wrapper>{renderItems(data, 0)}</Wrapper>
    </ThemeProvider>
  );
};
