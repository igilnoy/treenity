import { ThemeProvider } from 'styled-components';
import React, { memo, useCallback, useState, useEffect } from 'react';
import { areEqualDebug } from '../src/helpers';
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
      items.push({ itemId: `${label}-${uniqid()}`, label, depth });
    }

    return items;
  },
};

const Item = memo(props => {
  const { itemId, noChildren, label, depth, expanded, selected, setLoading, loading, visible, onExpand, getExpandedProps } = props;

  const { onClick } = getExpandedProps();
  const onExpandClick = useCallback(() => {
    onClick();
    !expanded && onExpand({ itemId, depth });
  }, [onClick]);

  useEffect(() => {
    setLoading(loading);
  }, [loading]);

  return (
    <>
      {visible ? (
        <StyledItem {...{ depth, selected }}>
          {loading ? (
            <DualRing size={16} width={35} height={26} color={THEME.DARK.primary} />
          ) : (
            <StyledButton onClick={onExpandClick} {...{ expanded }}>
              {!noChildren ? '▸' : ''}
            </StyledButton>
          )}
          {label}
        </StyledItem>
      ) : null}
    </>
  );
}, areEqualDebug);

const isLoadNewData = (data, { itemId, depth }) => {
  const itemIndex = data.findIndex(item => item.itemId === itemId);
  return data[itemIndex + 1] && data[itemIndex + 1].depth !== depth + 1;
};

const loadNewData = (data, { itemId, depth }) => {
  const itemIndex = data.findIndex(item => item.itemId === itemId);
  return [...data.slice(0, itemIndex + 1), ...api.load({ depth: depth + 1 }), ...data.slice(itemIndex + 1)];
};

const withLoading = () => {
  const [data, setData] = useState(api.load({ depth: 0, total: 3 }));
  const expandedProps = useExpanded();
  const { setLoading, ...loadingProps } = useLoading();

  const onExpand = useCallback(
    ({ itemId, depth }) => {
      setData(data => {
        if (isLoadNewData(data, { itemId, depth })) {
          setLoading(itemId, true);
          setTimeout(() => {
            setData(data => {
              setLoading(itemId, false);
              return loadNewData(data, { itemId, depth });
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
          <Item key={item.itemId} {...getItemProps({ ...item, setLoading, ...expandedProps, ...loadingProps })} onExpand={onExpand} />
        ))}
      </Wrapper>
    </ThemeProvider>
  );
};

export default withLoading;
