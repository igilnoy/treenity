import { ThemeProvider } from 'styled-components';
import React, { memo } from 'react';
import { areEqualDebug } from '../src/helpers';
import { getItemProps, getSelectedProps, getExpandedProps, useExpanded, useSelected } from '../src';
import { StyledItem, StyledButton, Wrapper, THEME } from './styled.helpers';

const data = [
  { itemId: 'Treenity', label: 'Treenity', depth: 0 },
  { itemId: 'src', label: 'src', depth: 1 },
  { itemId: 'components', label: 'components', depth: 2 },
  { itemId: 'preview', label: 'preview', depth: 3 },
  { itemId: 'actions', label: 'actions', depth: 2 },
  { itemId: 'tests', label: 'tests', depth: 1 },
  { itemId: 'storybook', label: 'storybook', depth: 1 },
  { itemId: 'config', label: 'config', depth: 1 },
  { itemId: 'babel', label: 'babel', depth: 2 },
  { itemId: 'webpack', label: 'webpack', depth: 3 },
  { itemId: 'other', label: 'other', depth: 1, noChildren: true },
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

const withStyledComponents = () => {
  const selectedProps = useSelected();
  const expandedProps = useExpanded();

  return (
    <ThemeProvider theme={THEME.DARK}>
      <Wrapper>
        {data.map(item => (
          <Item key={item.itemId} {...getItemProps({ ...item, ...selectedProps, ...expandedProps })} />
        ))}
      </Wrapper>
    </ThemeProvider>
  );
};

export default withStyledComponents;
