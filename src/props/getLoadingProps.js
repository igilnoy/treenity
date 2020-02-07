import { memoize, values } from 'lodash';

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
