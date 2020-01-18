import { memoize, values } from 'lodash';

const selectorFnDefault = (type, elem) => {
  switch (type) {
    case 'ArrowUp':
      return elem.previousSibling;
    case 'ArrowDown':
      return elem.nextSibling;
  }
};

const getKeyboardProps = memoize(
  (itemId, setSelected, setExpanded) => ({
    getKeyboardProps: (selectorFn = selectorFnDefault) => ({
      onKeyDown: e => {
        e.persist();
        let elem;
        switch (e.key) {
          case 'ArrowRight':
            setExpanded && setExpanded(itemId, true);
            break;
          case 'ArrowLeft':
            setExpanded && setExpanded(itemId, false);
            break;
          case 'Enter':
            setSelected && setSelected(itemId);
            break;
          case 'ArrowUp':
            elem = selectorFn('ArrowUp', e.target);
            if (elem) {
              elem.click();
              elem.focus();
            }
            break;
          case 'ArrowDown':
            elem = selectorFn('ArrowDown', e.target);
            if (elem) {
              elem.click();
              elem.focus();
            }
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
