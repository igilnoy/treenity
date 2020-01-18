import { memoize, values } from 'lodash';

const getSelectedProps = memoize(
  (itemId, setSelected) => ({
    getSelectedProps: () => ({
      onClick: () => {
        setSelected(itemId);
      },
    }),
  }),
  (...args) => values(args).join('_')
);

export default getSelectedProps;
