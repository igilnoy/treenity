import getLoadingPropsMemo from '../../src/props/getLoadingProps';

const setLoading = jest.fn();

describe('getLoadingProps', () => {
  beforeEach(() => {});

  it('check methods exist', () => {
    const { getLoadingProps } = getLoadingPropsMemo('treenity', setLoading, true);
    const { onClick } = getLoadingProps();

    expect(onClick).toBeDefined();
  });

  it('activate on click method', () => {
    const { getLoadingProps } = getLoadingPropsMemo('treenity', setLoading, true);
    const { onClick } = getLoadingProps();

    onClick();

    expect(setLoading).toHaveBeenNthCalledWith(1, 'treenity', true);
  });
});

//
// import { memoize, values } from 'lodash';
//
// const getLoadingProps = memoize(
//     (itemId, setLoading, expanded) => ({
//         getLoadingProps: () => ({
//             onClick: () => {
//                 setLoading(itemId, !expanded);
//             },
//         }),
//     }),
//     (...args) => values(args).join('_')
// );
//
// export default getLoadingProps;
