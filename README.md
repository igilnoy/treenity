# treenity

[logo]: ./assets/logo.svg 'Treenity'

Treenity is a flexable, performant and stripped UI component that is not dependent on any data structure, CSS or any UI library.

The component only offer set of hooks to manage the state, a HOC and an enhancer method to add the ability to add sections to each nodes.

There are some examples that cover some common use cases such as styling and windowing for performance boost.

Please use it wisely :)

### Table Of Contents

**[Installation](installation)**\
**[Basic Usage](basic-usage)**\
**[Data Structure](#data-structure)**\
**[Hooks](#hooks)**\
**[getItemProps](#getItemProps)**\
**[Sections](#sections)**\
**[HOC](#hoc)**\
**[Advanced Usage](#advanced-usage)**\

# Installation

```javascript
npm install treenity
```

```javascript
yarn add treenity
```

#Basic Usage

```javascript
import React, { memo } from 'react';
import { getItemProps, useExpanded, useSelected } from 'treenity';

const Item = memo(({ label, expanded, visible, getSelectedProps, getExpandedProps }) => (
  <>
    {visible && (
      <div {...getSelectedProps()}>
        <button {...getExpandedProps()}>{expanded ? '-' : '+'}</button>
        {label}
      </div>
    )}
  </>
));

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

# Data Structure

The idea behind this package is not to stick with any data structure, you can provide any structure you like. The motivation behind it that i was working on several projects that were using a tree but each one of them had a different structure, one add a "regular" structure and the second had a flat structure, and i wanted to have something generic that i can use for both.

In addition i didnt want to provide any UI items since each implementation is different, one was using `styled-components` and other `css modules`, so the responsability for building the UI components is on you!! The package provides some helpers and a lot of examples to help you do it right.

There are 2 parameters that are required for basic structuring of the tree:

| Name  | Type   | Desc                                                                                                 |
| ----- | ------ | ---------------------------------------------------------------------------------------------------- |
| id    | string | a _unique_ value of the item rendered                                                                |
| depth | number | the depth of the node, this parameter is important for setting up the state of each item in the tree |


For example:

```javascript
[
  { depth: 0, id: 'Treenity', label: 'Treenity' },
  { depth: 1, id: 'src', label: 'src' },
  { depth: 2, id: 'components', label: 'components' },
  { depth: 3, id: 'grid', label: 'grid' },
  { depth: 1, id: 'tests', label: 'tests' },
  { depth: 1, id: 'other', label: 'other' },
];
```

# Hooks


For managing the state of your tree component, the package provides the following hooks: `useSelected`, `useExpanded` and `useLoading`

Each hook expose some helpers functions that for managing the state.

## useSelected
 
```javascript
const {setSelected, isSelected} = useSelected();
```

#### setSelected
> function(id: string) | optional

Set the selected item by it's id. If passing no value then nothing will be selected

#### isSelected
> function(id: string): boolean | required

check if specific item is selected

## useExpanded
 
```javascript
const {setExpanded, isExpanded, isVisible} = useExpanded();
```

#### setExpanded
> function(id: string, isExpanded: boolean) | required

Set the expanded item by it's id.

#### isVisible
> function(id: string): boolean | required

check if specific item is visible

#### isExpanded
> function(id: string): boolean | required

check if specific item is expanded

Please note: If you will like to use this `isExpanded` and `isVisible` while managing your own custom logic, make sure to call both methods - start with `isVisible` method and end with `isExpanded` method - order is important!.

## useLoading
 
```javascript
const { setLoading, isLoading } = useLoading();
```

#### setLoading
> function(id: string, isLoading: boolean) | required

Set the loading item by it's id.

#### isLoading
> function(id: string): boolean | required

check if specific item is loaded


combineClickProps
enhancedGetItemPropsWithSections
#### need to talk about clearing the cache of lodash.memoize - if replacing the cache type - how do we handle ?
