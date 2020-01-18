import { memoize, values } from 'lodash';

const getLoadingProps = memoize(
  (itemId, setLoading) => ({
    getLoadingProps: () => ({
      onClick: () => {
        setLoading(itemId, true);
      },
    }),
  }),
  (...args) => values(args).join('_')
);

export default getLoadingProps;
