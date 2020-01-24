import getExpandedPropsMemo from '../../src/props/getExpandedProps';

const setExpanded = jest.fn();

describe('getExpandedProps', () => {
  beforeEach(() => {});

  it('check methods exist', () => {
    const { getExpandedProps } = getExpandedPropsMemo('treenity', setExpanded, true);
    const { onClick } = getExpandedProps();

    expect(onClick).toBeDefined();
  });

  it('activate on click method', () => {
    const { getExpandedProps } = getExpandedPropsMemo('treenity', setExpanded, true);
    const { onClick } = getExpandedProps();

    onClick();

    expect(setExpanded).toHaveBeenNthCalledWith(1, 'treenity', false);
  });
});

//
// import { memoize, values } from 'lodash';
//
// const getExpandedProps = memoize(
//     (itemId, setExpanded, expanded) => ({
//         getExpandedProps: () => ({
//             onClick: () => {
//                 setExpanded(itemId, !expanded);
//             },
//         }),
//     }),
//     (...args) => values(args).join('_')
// );
//
// export default getExpandedProps;
