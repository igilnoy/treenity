import getSelectedPropsMemo from '../../src/props/getSelectedProps';

const setSelected = jest.fn();

describe('getSelectedProps', () => {
  beforeEach(() => {});

  it('check methods exist', () => {
    const { getSelectedProps } = getSelectedPropsMemo('treenity', setSelected);
    const { onClick } = getSelectedProps();

    expect(onClick).toBeDefined();
  });

  it('activate on click method', () => {
    const { getSelectedProps } = getSelectedPropsMemo('treenity', setSelected);
    const { onClick } = getSelectedProps();

    onClick();

    expect(setSelected).toHaveBeenNthCalledWith(1, 'treenity');
  });
});

//
// import { memoize, values } from 'lodash';
//
// const getSelectedProps = memoize(
//     (itemId, setSelected, expanded) => ({
//         getSelectedProps: () => ({
//             onClick: () => {
//                 setSelected(itemId, !expanded);
//             },
//         }),
//     }),
//     (...args) => values(args).join('_')
// );
//
// export default getSelectedProps;
