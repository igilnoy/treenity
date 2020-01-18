import { memoize, values } from 'lodash';

const getExpandedProps = memoize(
  (itemId, setExpanded, expanded) => ({
    getExpandedProps: () => ({
      onClick: () => {
        setExpanded(itemId, !expanded);
      },
    }),
  }),
  (...args) => values(args).join('_')
);

export default getExpandedProps;
