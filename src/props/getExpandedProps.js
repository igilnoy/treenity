import { memoize, values } from 'lodash';

const getExpandedProps = memoize(
  (id, setExpanded, expanded) => ({
    getExpandedProps: () => ({
      onClick: () => {
        setExpanded(id, !expanded);
      },
    }),
  }),
  (...args) => values(args).join('_')
);

export default getExpandedProps;
