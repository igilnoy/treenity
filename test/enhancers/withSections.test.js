import React from 'react';
import { shallow } from 'enzyme';
const getItemsMock = jest.fn(() => {});

jest.doMock('../../src/enhancers/enhancedGetItemPropsWithSections', () => ({
  __esModule: true,
  default: jest.fn(() => getItemsMock),
}));

const { default: withSectionsTest } = require('../../src/enhancers/withSections');

describe('withSections', () => {
  it('check HOC is called with params', () => {
    const Item = withSectionsTest('ITEM', { Header: 'HEADER', Footer: 'FOOTER' });
    shallow(<Item />);

    expect(getItemsMock).toHaveBeenNthCalledWith(1, {}, { Header: 'HEADER', Footer: 'FOOTER', Item: 'ITEM' });
  });
});
