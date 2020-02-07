import React, { memo, Fragment } from 'react';
import areEqualDebug from './areEqualDebug';
import { enhancedGetItemPropsWithSections, useExpanded, useLoading, useSelected } from '../src';
import mock from './mock';
import styled from 'styled-components';
import { Ul, Item, Header, Footer } from './styled.helpers';


const Info = styled.p`
  background-color: #f4f4f4;
  border-radius: 4px;
  padding: 10px;
  font-size: 12px;
`;

const getItemProps = enhancedGetItemPropsWithSections();

export default () => {
  const stateProps = { ...useSelected(), ...useExpanded(), ...useLoading() };

  const items = mock.reduce((acc, { depth, ...item }, idx) => {
    const resultItems = getItemProps({ depth, ...item, isLast: idx === mock.length - 1, ...stateProps });

    resultItems.forEach(item => {
      const { visible, ...props } = item;
      if (visible) acc.push({ visible, ...props });
    });

    return acc;
  }, []);

  return (
    <>
      <Ul>
        {items.map(({ footer, header, ...item }) => (
          <Fragment key={`${item.id}-fragment`}>{footer ? <Footer {...item} /> : header ? <Header {...item} /> : <Item {...item} />}</Fragment>
        ))}
      </Ul>
      <Info>
        Total items rendered <b>{items.length}</b> (including +)
      </Info>
    </>
  );
};
