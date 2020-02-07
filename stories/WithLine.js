import { ThemeProvider } from 'styled-components';
import React, { memo } from 'react';
import areEqualDebug from './areEqualDebug';
import { getItemProps, useExpanded, useSelected } from '../src';
import { StyledItemWithLine, StyledButton, Wrapper, THEME } from './styled.helpers';

const data = [
  { id: 'Treenity', label: 'Treenity', depth: 0 },
  { id: 'src', label: 'src', depth: 1 },
  { id: 'components', label: 'components', depth: 2 },
  { id: 'preview', label: 'preview', depth: 3 },
  { id: 'actions', label: 'actions', depth: 2 },
  { id: 'tests', label: 'tests', depth: 1 },
  { id: 'storybook', label: 'storybook', depth: 1 },
  { id: 'config', label: 'config', depth: 1 },
  { id: 'babel', label: 'babel', depth: 2 },
  { id: 'webpack', label: 'webpack', depth: 3 },
  { id: 'other', label: 'other', depth: 1, noChildren: true },
];

const Item = memo(props => {
  const { noChildren, label, depth, expanded, selected, visible, getSelectedProps, getExpandedProps } = props;
  return (
    <>
      {visible ? (
        <StyledItemWithLine {...getSelectedProps()} depth={depth} selected={selected}>
          <StyledButton {...getExpandedProps()} expanded={expanded}>
            {!noChildren ? '▸' : ''}
          </StyledButton>
          {label}
        </StyledItemWithLine>
      ) : null}
    </>
  );
}, areEqualDebug);

export default () => {
  const selectedProps = useSelected();
  const expandedProps = useExpanded();

  return (
    <ThemeProvider theme={THEME.LIGHT}>
      <Wrapper>
        {data.map(item => (
          <Item key={item.id} {...getItemProps({ ...item, ...selectedProps, ...expandedProps })} />
        ))}
      </Wrapper>
    </ThemeProvider>
  );
};
