import styled, { css } from 'styled-components';
import React, { memo } from 'react';
import uniqid from 'uniqid';
import areEqualDebug from './areEqualDebug';

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
  height: 80vh;
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

export const StyledItemWithLine = styled(StyledItem).attrs(({ depth, children }) => {
  return {
    children: (
      <React.Fragment>
        {Array.apply(null, Array(depth)).map(() => (
          <Line key={`${uniqid()}`} depth={depth} noLine={!depth} />
        ))}
        {children}
      </React.Fragment>
    ),
  };
})`
  padding: 0;
  margin: 0;
`;

export const Ul = styled.ul`
  display: block;
  list-style-type: disc;
  font-family: Menlo, Consolas, monospace;
`;

export const Li = styled.li`
  display: list-item;
  margin-left: ${({ depth }) => depth * 25}px;
  font-weight: ${({ noChildren }) => (noChildren ? 'normal' : 'bold')};
  list-style-type: ${({ noChildren }) => (noChildren ? 'circle' : 'disc')};
  line-height: 1.5;
  color: ${({ selected }) => (selected ? '#84F28F' : 'black')};
`;

export const Toggle = styled.span`
  cursor: pointer;
`;

export const Item = memo(({ noChildren, expanded, visible, selected, depth, label, ...props }) => {
  const { getExpandedProps, getSelectedProps } = props;

  return (
    <>
      {visible && (
        <Li depth={depth} noChildren={noChildren} selected={selected} {...getSelectedProps()}>
          {label}
          {!noChildren && <Toggle {...getExpandedProps()}>[{expanded ? '-' : '+'}]</Toggle>}
        </Li>
      )}
    </>
  );
}, areEqualDebug);

const StyledSection = styled(Li)`
  cursor: pointer;
  background-color: #000;
  color: #fff;
  padding: 0 5px;
`;

const StyledFooter = styled(StyledSection)``;

export const Footer = ({ id, depth, loading, noChildren, setLoading, label }) => {
  const onClick = () => {
    setLoading(id, true);
    setTimeout(() => {
      setLoading(id, false);
    }, 1500);
  };

  return (
    <StyledFooter depth={depth} noChildren={noChildren} onClick={onClick}>
      {loading ? 'doing something...wait' : `I'm footer of ${label} and i can do something`}
    </StyledFooter>
  );
};

const StyledHeader = styled(StyledSection)``;

export const Header = ({ id, depth, selected, noChildren, setSelected, label }) => {
  const onClick = () => {
    setSelected(id);
  };

  return (
    <StyledHeader depth={depth} noChildren={noChildren} onClick={onClick}>
      {selected ? 'im selected, OH OH!!!' : `I'm header of ${label} and not selected`}
    </StyledHeader>
  );
};
