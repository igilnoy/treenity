const areEqualDebug = (prevProps, nextProps) => {
  let isEqual = true;
  Object.entries(prevProps).forEach(([prevPropName, prevPropValue]) => {
    if (prevPropValue !== nextProps[prevPropName]) {
      const isStyle = prevPropName === 'style';

      console.log(
        `%crendering %c${prevProps.itemId} %csince %c${prevPropName} %chas changed from %c${
          typeof prevPropValue === 'function' ? 'function' : prevPropValue
        } %cto %c${typeof nextProps[prevPropName] === 'function' ? 'function' : nextProps[prevPropName]}`,
        !isStyle ? 'font-weight: normal;color: black;' : 'color: #CCC',
        !isStyle ? 'font-weight: bold;color: blue;' : 'color: #CCC',
        !isStyle ? 'font-weight: normal;color: black;' : 'color: #CCC',
        !isStyle ? 'font-weight: bold;color: red;' : 'color: #CCC',
        !isStyle ? 'font-weight: normal;color: black;' : 'color: #CCC',
        !isStyle ? 'font-weight: bold;color: blue;' : 'color: #CCC',
        !isStyle ? 'font-weight: normal;color: black;' : 'color: #CCC',
        !isStyle ? 'font-weight: bold;color: blue;' : 'color: #CCC'
      );

      isEqual = false;
    }
  });

  return isEqual;
};

export default areEqualDebug;
