import memoize from 'lodash/memoize';
import values from 'lodash/values';

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
