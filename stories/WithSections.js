import React, { memo } from 'react';
import { withSections, useExpanded, useLoading, useSelected } from '../src';
import mock from './mock';
import { Ul, Item, Header, Footer } from './styled.helpers';

const ItemWithSection = withSections(Item, { Header, Footer });

export default () => {
  const stateProps = { ...useSelected(), ...useExpanded(), ...useLoading() };

  return (
    <Ul>
      {mock.map((item, idx) => (
        <ItemWithSection key={item.id} {...{ isLast: idx === mock.length - 1, ...item, ...stateProps }} />
      ))}
    </Ul>
  );
};
