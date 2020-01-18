import { memoize, values } from 'lodash';

const getKeyboardProps = memoize(
  (itemId, setSelected, setExpanded) => ({
    getKeyboardProps: () => ({
      onKeyDown: e => {
        e.persist();

        switch (e.key) {
          case 'ArrowRight':
            setExpanded && setExpanded(itemId, true);
            break;
            return;
          case 'ArrowLeft':
            setExpanded && setExpanded(itemId, false);
            break;
            return;
          case 'Enter':
            setSelected && setSelected(itemId);
            break;
            return;
          case 'ArrowUp':
            if (e.target.previousSibling) {
              e.target.previousSibling.click();
              e.target.previousSibling.focus();
            }
            break;
            return;
          case 'ArrowDown':
            if (e.target.nextSibling) {
              e.target.nextSibling.click();
              e.target.nextSibling.focus();
            }
            break;
            return;
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
