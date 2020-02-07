import enhancedGetItemPropsWithSections from '../../src/enhancers/enhancedGetItemPropsWithSections';
import { flatten } from 'lodash';

const isSelected = jest.fn(() => true);
const isLoading = jest.fn(() => true);

describe('enhancedGetItemPropsWithSections', () => {
  it('check header is displayed first when reaching the end of the loop', () => {
    const getItemProps = enhancedGetItemPropsWithSections();
    const data = [
      { id: 'a', depth: 0, itemHeader: true, expanded: true, visible: true },
      { id: 'a-1', depth: 1 },
      { id: 'a-1-1', depth: 2 },
      { id: 'a-1-2', depth: 2 },
    ];

    let results = data.map((item, idx) => getItemProps({ ...item, isLast: idx === data.length - 1 }));

    results = flatten(results);
    expect(results).toHaveLength(5);
    expect(results[1]).toMatchObject({
      id: 'a_HEADER_ITEM',
      expanded: true,
      visible: true,
      origItemId: 'a',
      renderedItemId: 'a-1',
      footer: false,
      header: true,
      loading: false,
      selected: false,
    });
  });

  it('check isSelected and isLoading are called', () => {
    const getItemProps = enhancedGetItemPropsWithSections();
    const data = [
      { id: 'a', depth: 0, itemHeader: true, expanded: true, visible: true },
      { id: 'a-1', depth: 1 },
      { id: 'a-1-1', depth: 2 },
      { id: 'a-1-2', depth: 2 },
    ];

    data.map((item, idx) => getItemProps({ ...item, isSelected, isLoading, isLast: idx === data.length - 1 }));

    expect(isLoading).toHaveBeenNthCalledWith(1, 'a');
    expect(isSelected).toHaveBeenNthCalledWith(1, 'a');
  });

  it('check footer is displayed at the end when reaching the end of the loop', () => {
    const getItemProps = enhancedGetItemPropsWithSections();
    const data = [
      { id: 'a', depth: 0, itemFooter: true, expanded: true, visible: true },
      { id: 'a-1', depth: 1 },
      { id: 'a-1-1', depth: 2 },
      { id: 'a-1-2', depth: 2 },
    ];

    let results = data.map((item, idx) => getItemProps({ ...item, isLast: idx === data.length - 1 }));

    results = flatten(results);
    expect(results).toHaveLength(5);
    expect(results[4]).toMatchObject({
      id: 'a_FOOTER_ITEM',
      expanded: true,
      visible: true,
      origItemId: 'a',
      renderedItemId: 'a-1-2',
      footer: true,
      header: false,
      loading: false,
      selected: false,
    });
  });

  it('check header and footer are displayed when last in the list', () => {
    const getItemProps = enhancedGetItemPropsWithSections();
    const data = [
      { id: 'a', depth: 0, itemFooter: true, itemHeader: true, expanded: true, visible: true },
      { id: 'a-1', depth: 1 },
      { id: 'a-1-1', depth: 2 },
      { id: 'a-1-2', depth: 2 },
    ];

    let results = data.map((item, idx) => getItemProps({ ...item, isLast: idx === data.length - 1 }));

    results = flatten(results);
    expect(results).toHaveLength(6);
    expect(results[1]).toMatchObject({
      id: 'a_HEADER_ITEM',
      expanded: true,
      visible: true,
      origItemId: 'a',
      renderedItemId: 'a-1',
      footer: false,
      header: true,
      loading: false,
      selected: false,
    });

    expect(results[5]).toMatchObject({
      id: 'a_FOOTER_ITEM',
      expanded: true,
      visible: true,
      origItemId: 'a',
      renderedItemId: 'a-1-2',
      footer: true,
      header: false,
      loading: false,
      selected: false,
    });
  });

  it('check header and footer are displayed when there is a sibling', () => {
    const getItemProps = enhancedGetItemPropsWithSections();
    const data = [
      { id: 'a', depth: 0, itemFooter: true, itemHeader: true, expanded: true, visible: true },
      { id: 'a-1', depth: 1 },
      { id: 'a-1-1', depth: 2 },
      { id: 'a-1-2', depth: 2 },
      { id: 'b', depth: 0, itemFooter: true, itemHeader: true, expanded: false, visible: true },
    ];

    let results = data.map((item, idx) => getItemProps({ ...item, isLast: idx === data.length - 1 }));

    results = flatten(results);
    expect(results).toHaveLength(7);
    expect(results[1]).toMatchObject({
      id: 'a_HEADER_ITEM',
      expanded: true,
      visible: true,
      origItemId: 'a',
      renderedItemId: 'a-1',
      footer: false,
      header: true,
      loading: false,
      selected: false,
    });

    expect(results[5]).toMatchObject({
      id: 'a_FOOTER_ITEM',
      expanded: true,
      visible: true,
      origItemId: 'a',
      renderedItemId: 'b',
      footer: true,
      header: false,
      loading: false,
      selected: false,
    });
  });

  it('check header and footer are displayed when there is no children', () => {
    const getItemProps = enhancedGetItemPropsWithSections();
    const data = [{ id: 'a', depth: 0, itemHeader: true, itemFooter: true, expanded: true, visible: true }];

    let results = data.map((item, idx) => getItemProps({ ...item, isLast: idx === data.length - 1 }));

    results = flatten(results);
    expect(results).toHaveLength(3);
    expect(results[1]).toMatchObject({
      id: 'a_HEADER_ITEM',
      expanded: true,
      visible: true,
      origItemId: 'a',
      renderedItemId: 'a',
      footer: false,
      header: true,
      loading: false,
      selected: false,
    });

    expect(results[2]).toMatchObject({
      id: 'a_FOOTER_ITEM',
      expanded: true,
      visible: true,
      origItemId: 'a',
      renderedItemId: 'a',
      footer: true,
      header: false,
      loading: false,
      selected: false,
    });
  });

  it('check header and footer are are returned as React components', () => {
    const getItemProps = enhancedGetItemPropsWithSections();

    const data = [{ id: 'a', depth: 0, itemHeader: true, itemFooter: true, expanded: true, visible: true }];

    let results = data.map((item, idx) =>
      getItemProps(
        { ...item, isLast: idx === data.length - 1 },
        { Item: props => <div {...props} />, Header: props => <div {...props} />, Footer: props => <div {...props} /> }
      )
    );

    results = flatten(results);
    expect(results[0].$$typeof).toBeDefined();
    expect(results[1].$$typeof).toBeDefined();
    expect(results[1].props).toMatchObject({
      id: 'a_HEADER_ITEM',
      expanded: true,
      visible: true,
      origItemId: 'a',
      renderedItemId: 'a',
      footer: false,
      header: true,
      loading: false,
      selected: false,
    });

    expect(results[2].$$typeof).toBeDefined();
    expect(results[2].props).toMatchObject({
      id: 'a_FOOTER_ITEM',
      expanded: true,
      visible: true,
      origItemId: 'a',
      renderedItemId: 'a',
      footer: true,
      header: false,
      loading: false,
      selected: false,
    });
  });
});
