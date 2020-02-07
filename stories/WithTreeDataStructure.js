import React, { memo, Fragment, useCallback } from 'react';
import { ThemeProvider } from 'styled-components';
import { useSelected, useExpanded, getItemProps, combineClickProps } from '../src';
import { StyledItem, StyledButton, Wrapper, THEME } from './styled.helpers';
import areEqualDebug from './areEqualDebug';
import data from './mockTree';

const Item = memo(({ noChildren, label, depth, expanded, selected, visible, ...props }) => {
  const { getExpandedProps, getSelectedProps } = props;
  const onClick = useCallback(() => combineClickProps({ getExpandedProps, getSelectedProps })(), [getExpandedProps, getSelectedProps]);

  return (
    <>
      {visible && (
        <StyledItem onClick={onClick} {...{ depth, selected }}>
          <StyledButton {...{ expanded }}>{!noChildren ? '▸' : ''}</StyledButton>
          {label}
        </StyledItem>
      )}
    </>
  );
}, areEqualDebug);

export default () => {
  const stateProps = { ...useSelected(), ...useExpanded() };

  const renderChildren = (items, depth) => (items && items.length > 0 ? renderItems(items, depth) : null);

  const renderItems = (items, depth) => {
    return items.map(({ id, children, ...item }) => {
      return (
        <Fragment key={id}>
          <Item {...getItemProps({ depth, id, ...item, ...stateProps })} />
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
