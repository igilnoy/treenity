import { ThemeProvider } from 'styled-components';
import React, { memo } from 'react';
import areEqualDebug from './areEqualDebug';
import { getItemProps, useExpanded, useSelected } from '../src';
import { StyledItem, StyledButton, Wrapper, THEME } from './styled.helpers';
import data from './mock';

const Item = memo(({ noChildren, label, depth, expanded, selected, visible, ...props }) => {
  const { getSelectedProps, getExpandedProps } = props;

  return (
    <>
      {visible && (
        <StyledItem {...getSelectedProps()} {...{ depth, selected }}>
          <StyledButton {...getExpandedProps()} {...{ expanded }}>
            {!noChildren ? '▸' : ''}
          </StyledButton>
          {label}
        </StyledItem>
      )}
    </>
  );
}, areEqualDebug);

export default () => {
  const stateProps = { ...useSelected(), ...useExpanded() };

  return (
    <ThemeProvider theme={THEME.DARK}>
      <Wrapper>
        {data.map(item => (
          <Item key={item.id} {...getItemProps({ ...item, ...stateProps })} />
        ))}
      </Wrapper>
    </ThemeProvider>
  );
};
