import memoize from 'lodash/memoize';
import values from 'lodash/values';

const getLoadingProps = memoize(
  (id, setLoading) => ({
    getLoadingProps: () => ({
      onClick: () => {
        setLoading(id, true);
      },
    }),
  }),
  (...args) => values(args).join('_')
);

export default getLoadingProps;
