import React, { memo } from 'react';
import areEqualDebug from './areEqualDebug';
import { getItemProps, useExpanded, useSelected } from '../src';
import data from './mock';

const getStyle = ({ depth, selected }) => ({ style: { marginLeft: depth * 10, backgroundColor: selected ? '#84F28F' : '#FFFFFF' } });
const getButtonStyle = ({ noChildren }) => ({ style: { opacity: noChildren ? 0 : 1 } });
const getButtonText = ({ expanded }) => (expanded ? '-' : '+');

const Item = memo(({ noChildren, label, depth, expanded, selected, visible, ...props }) => {
  const { getSelectedProps, getExpandedProps, getKeyboardProps } = props;

  return (
    <>
      {visible && (
        <div {...getKeyboardProps()} {...getSelectedProps()} {...getStyle({ depth, selected })}>
          <button {...getExpandedProps()} {...getButtonStyle({ noChildren })}>
            {getButtonText({ expanded })}
          </button>
          {label}
        </div>
      )}
    </>
  );
}, areEqualDebug);

export default () => {
  const stateProps = { ...useSelected(), ...useExpanded() };

  return (
    <>
      {data.map(item => (
        <Item key={item.id} {...getItemProps({ ...item, ...stateProps })} />
      ))}
    </>
  );
};
