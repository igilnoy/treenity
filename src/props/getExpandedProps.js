import memoize from 'lodash/memoize';
import values from 'lodash/values';

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
