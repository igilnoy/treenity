import React, { memo, useState, Fragment } from 'react';
import areEqualDebug from './areEqualDebug';
import { enhancerWithMore, useExpanded } from '../src';
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
  const { noChildren, expanded, visible, depth, label, getExpandedProps } = props;
  return (
    <>
      {visible ? (
        <Li depth={depth} noChildren={noChildren}>
          {label}
          {!noChildren && <Toggle {...getExpandedProps()}>[{expanded ? '-' : '+'}]</Toggle>}
        </Li>
      ) : null}
    </>
  );
}, areEqualDebug);

const StyledMore = styled(Li)`
  cursor: pointer;
  :hover {
    color: blue;
    font-weight: bold;
  }
`;

const More = ({ depth, noChildren, onMore, ...props }) => {
  const moreHandler = () => onMore({ depth, noChildren, ...props });
  return (
    <StyledMore depth={depth + 1} noChildren={noChildren} onClick={moreHandler}>
      +
    </StyledMore>
  );
};

const getItemPropsEnhanced = enhancerWithMore();

export default () => {
  const [data, setData] = useState(mock);
  const expandedProps = useExpanded();

  const items = data.reduce((acc, { depth, ...item }, idx) => {
    const nodes = getItemPropsEnhanced({ depth, ...item, isLast: idx === data.length - 1, ...expandedProps });

    nodes.forEach(node => {
      const { visible, ...props } = node;
      if (visible) acc.push({ visible, ...props });
    });

    return acc;
  }, []);

  const addItem = ({ itemId, ...item }) => {
    let itemPositionIndex = data.findIndex(({ itemId }) => item.renderedItemId === itemId);
    if (itemPositionIndex === data.length - 1) itemPositionIndex++;
    const itemCloneIndex = (function(startIdx) {
      const { depth } = items[startIdx];
      const cloneIndex = items.slice(startIdx + 1).findIndex(item => item.depth === depth);

      return cloneIndex + startIdx;
    })(items.findIndex(({ itemId }) => item.origItemId === itemId));

    const itemToClone = { ...items[itemCloneIndex], label: 'new stuff', noChildren: true };

    setData(data => {
      return [
        ...data.slice(0, itemPositionIndex),
        { ...itemToClone, itemId: `${itemToClone.itemId}${new Date().getUTCMilliseconds()}` },
        ...data.slice(itemPositionIndex),
      ];
    });
  };

  return (
    <>
      <Ul>
        {items.map(({ isMoreItem, ...item }) => (
          <Fragment key={item.itemId + 'fragment'}>{isMoreItem ? <More {...item} onMore={addItem} /> : <Item {...item} />}</Fragment>
        ))}
      </Ul>
      <Info>
        Total items rendered <b>{items.length}</b> (including +)
      </Info>
    </>
  );
};
