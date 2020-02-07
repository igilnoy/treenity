import { memoize, values } from 'lodash';

const getSelectedProps = memoize(
  (id, setSelected) => ({
    getSelectedProps: () => ({
      onClick: () => {
        setSelected(id);
      },
    }),
  }),
  (...args) => values(args).join('_')
);

export default getSelectedProps;
