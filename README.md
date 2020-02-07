# treenity

[logo]: ./assets/logo.svg 'Treenity'

Treenity is a flexable, performant and stripped UI component that is not dependent on any data structure, CSS or any UI library.

The component only offer set of hooks to manage the state, a HOC and an enhancer method to add the ability to add sections to each nodes.

There are some examples that cover some common use cases such as styling and windowing for performance boost.

Please use it wisely :)

### Table Of Contents

1. Installation
2. Basic Usage
3. Data Structure
4. Hooks
5. getItemProps
6. enhancers
7. HOC
8. advanced usage

#### need to talk about clearing the cache of lodash.memoize - if repalcing the cache type - how do we handle ?

# Installation

```javascript
npm install treenity
```

```javascript
yarn add treenity
```

# Basic Usage

```javascript
import React, { memo } from 'react';
import { getItemProps, useExpanded, useSelected } from 'treenity';

const Item = memo(({ noChildren, label, depth, expanded, selected, visible, ...props }) => {
  const { getSelectedProps, getExpandedProps } = props;

  return (
    <>
      {visible && (
        <div {...getSelectedProps()} {...getStyle({ depth, selected })}>
          <button {...getExpandedProps()}>{ expanded ? '-' : '+' }
          {label}
        </div>
      )}
    </>
  );
});

const Tree = () => {
  const selectedProps = useSelected();
  const expandedProps = useExpanded();

  return (
    <>
      {data.map(item => (
        <Item key={item.id} {...getItemProps({ ...item, ...selectedProps, ...expandedProps })} />
      ))}
    </>
  );
};
```

combineClickProps
enhancedGetItemPropsWithSections
