import styled, { css } from 'styled-components';
import React from 'react';

export const THEME = {
  LIGHT: {
    primary: '#84F28F',
    primaryText: '#3F3D56',
    surface: '#F4F4F4',
    surfaceText: '#3F3D56',
  },
  DARK: {
    primary: '#84F28F',
    primaryText: '#3F3D56',
    surface: '#3F3D56',
    surfaceText: '#FFFFFF',
  },
};

export const Wrapper = styled.div`
  color: ${({ theme }) => theme.surfaceText};
  background-color: ${({ theme }) => theme.surface};
  padding: 10px;
`;

export const StyledItem = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ selected, theme }) => (selected ? theme.primary : theme.surface)};
  color: ${({ selected, theme }) => (selected ? theme.primaryText : theme.surfaceText)};
  margin-left: ${({ depth }) => depth * 20}px;
  padding: 7px 10px 7px 0;
  cursor: pointer;
  transition: background-color 250ms, color 250ms;
`;

export const StyledButton = styled.div`
  width: 25px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 250ms;
  transform: rotate(${({ expanded }) => (expanded ? '90deg' : '0')});
`;

const lineCss = css`
  ::before {
    content: ' ';
    position: absolute;
    height: 100%;
    width: 1px;
    border-left: 1px dotted black;
    left: 50%;
  }
`;

const Line = styled.div`
  position: relative;
  ${({ noLine }) => !noLine && lineCss};
  width: 20px;
  height: 37px;
`;

export const StyledItemWithLine = styled(StyledItem).attrs(({ depth, children }) => ({
  children: (
    <>
      {Array.apply(null, Array(depth)).map(() => (
        <Line depth={depth} noLine={!depth} />
      ))}
      {children}
    </>
  ),
}))`
  padding: 0;
  margin: 0;
`;
