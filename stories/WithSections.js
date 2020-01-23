import React, { memo, Fragment } from 'react';
import { areEqualDebug } from '../src/helpers';
import { withSections, useExpanded, useLoading, useSelected } from '../src';
import mock from './mock';
import styled from 'styled-components';

const Ul = styled.ul`
  display: block;
  list-style-type: disc;
  font-family: Menlo, Consolas, monospace;
`;

const Li = styled.li`
  display: list-item;
  margin-left: ${({ depth }) => depth * 25}px;
  font-weight: ${({ noChildren }) => (noChildren ? 'normal' : 'bold')};
  list-style-type: ${({ noChildren }) => (noChildren ? 'circle' : 'disc')};
  line-height: 1.5;
  color: ${({ selected }) => (selected ? '#84F28F' : 'black')};
`;

const Toggle = styled.span`
  cursor: pointer;
`;

const Info = styled.p`
  background-color: #f4f4f4;
  border-radius: 4px;
  padding: 10px;
  font-size: 12px;
`;

const Item = memo(props => {
  const { noChildren, expanded, visible, selected, depth, label, getExpandedProps, getSelectedProps } = props;

  return (
    <>
      {visible ? (
        <Li depth={depth} noChildren={noChildren} selected={selected} {...getSelectedProps()}>
          {label}
          {!noChildren && <Toggle {...getExpandedProps()}>[{expanded ? '-' : '+'}]</Toggle>}
        </Li>
      ) : null}
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

const Footer = ({ itemId, depth, loading, noChildren, setLoading, label }) => {
  const onClick = () => {
    setLoading(itemId, true);
    setTimeout(() => {
      setLoading(itemId, false);
    }, 1500);
  };

  return (
    <StyledFooter depth={depth} noChildren={noChildren} onClick={onClick}>
      {loading ? 'doing something...wait' : `I'm footer of ${label} and i can do something`}
    </StyledFooter>
  );
};

const StyledHeader = styled(StyledSection)``;

const Header = ({ itemId, depth, selected, noChildren, setSelected, label }) => {
  const onClick = () => {
    setSelected(itemId);
  };

  return (
    <StyledHeader depth={depth} noChildren={noChildren} onClick={onClick}>
      {selected ? 'im selected, OH OH!!!' : `I'm header of ${label} and not selected`}
    </StyledHeader>
  );
};

const ItemWithSection = withSections(Item, { Header, Footer });

export default () => {
  const selectedProps = useSelected();
  const expandedProps = useExpanded();
  const loadingProps = useLoading();

  return (
    <>
      <Ul>
        {mock.map(({ itemId, ...itemProps }, idx) => {
          return (
            <ItemWithSection
              key={itemId}
              {...{ itemId, isLast: idx === mock.length - 1, ...itemProps, ...selectedProps, ...expandedProps, ...loadingProps }}
            />
          );
        })}
      </Ul>
    </>
  );
};
