import { memoize, values } from 'lodash';

const getKeyboardProps = memoize(
  (itemId, setSelected, setExpanded) => ({
    getKeyboardProps: () => ({
      onKeyDown: e => {
        switch (e.keyCode) {
          case 39:
            setExpanded && setExpanded(itemId, true);
            break;
          case 37:
            setExpanded && setExpanded(itemId, false);
            break;
          case 40:
            setSelected && setSelected();
            break;
          case 38:
            setSelected && setSelected();
            break;
          default:
            return;
        }
      },
      tabIndex: 1,
    }),
  }),
  (...args) => values(args).join('_')
);

export default getKeyboardProps;
