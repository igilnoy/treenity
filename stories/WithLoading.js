import { ThemeProvider } from 'styled-components';
import React, { memo, useCallback, useState, useEffect } from 'react';
import areEqualDebug from './areEqualDebug';
import { getItemProps, useExpanded, useLoading } from '../src';
import { StyledItem, StyledButton, Wrapper, THEME } from './styled.helpers';
import { DualRing } from 'react-awesome-spinners';
import randomWords from 'random-words';
import uniqid from 'uniqid';

const api = {
  load: ({ depth, total = 20 }) => {
    const items = [];
    for (let i = 0; i < total; i++) {
      const label = randomWords();
      items.push({ id: `${label}-${uniqid()}`, label, depth });
    }

    return items;
  },
};

const Item = memo(props => {
  const { id, noChildren, label, depth, expanded, selected, setLoading, loading, visible, onExpand, getExpandedProps } = props;

  const { onClick } = getExpandedProps();
  const onExpandClick = useCallback(() => {
    onClick();
    !expanded && onExpand({ id, depth });
  }, [onClick, id, depth, expanded, onExpand]);

  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  return (
    <>
      {visible ? (
        <StyledItem {...{ depth, selected }}>
          {loading ? (
            <DualRing size={16} width={35} height={26} color={THEME.DARK.primary} />
          ) : (
            <StyledButton onClick={onExpandClick} expanded={expanded}>
              {!noChildren ? '▸' : ''}
            </StyledButton>
          )}
          {label}
        </StyledItem>
      ) : null}
    </>
  );
}, areEqualDebug);

const isLoadNewData = (data, { id, depth }) => {
  const itemIndex = data.findIndex(item => item.id === id);
  return data[itemIndex + 1] && data[itemIndex + 1].depth !== depth + 1;
};

const loadNewData = (data, { id, depth }) => {
  const itemIndex = data.findIndex(item => item.id === id);
  return [...data.slice(0, itemIndex + 1), ...api.load({ depth: depth + 1 }), ...data.slice(itemIndex + 1)];
};

export default () => {
  const [data, setData] = useState(api.load({ depth: 0, total: 3 }));
  const expandedProps = useExpanded();
  const { setLoading, ...loadingProps } = useLoading();

  const onExpand = useCallback(
    ({ id, depth }) => {
      setData(data => {
        if (isLoadNewData(data, { id, depth })) {
          setLoading(id, true);
          setTimeout(() => {
            setData(data => {
              setLoading(id, false);
              return loadNewData(data, { id, depth });
            });
          }, 1000);
        }
        return data;
      });
    },
    [setLoading, setData]
  );

  return (
    <ThemeProvider theme={THEME.DARK}>
      <Wrapper>
        {data.map(item => (
          <Item key={item.id} {...getItemProps({ ...item, setLoading, ...expandedProps, ...loadingProps })} onExpand={onExpand} />
        ))}
      </Wrapper>
    </ThemeProvider>
  );
};
