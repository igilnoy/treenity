import { renderHook, act } from '@testing-library/react-hooks';

const clearMock = jest.fn();

jest.doMock('../../src/props/getExpandedProps', () => ({
  __esModule: true,
  default: {
    cache: {
      clear: clearMock,
    },
  },
}));

const { default: useExpanded } = require('../../src/hooks/useExpanded');

describe('useExpanded', () => {
  it('check methods exists', () => {
    const { result } = renderHook(() => useExpanded());

    expect(result.current.setExpanded).toBeDefined();
    expect(result.current.isExpanded).toBeDefined();
    expect(result.current.isVisible).toBeDefined();
  });

  it('set expanded to true for single value', () => {
    const { result } = renderHook(() => useExpanded());

    act(() => {
      result.current.setExpanded('1111', true);
    });

    expect(result.current.isExpanded('1111')).toBeTruthy();
  });

  it('set expanded to false for single value', () => {
    const { result } = renderHook(() => useExpanded());

    act(() => {
      result.current.setExpanded('1111', true);
      result.current.setExpanded('1111', false);
    });

    expect(result.current.isExpanded('1111')).toBeFalsy();
  });

  it('set expanded to true for mulitple value', () => {
    const { result } = renderHook(() => useExpanded());

    act(() => {
      result.current.setExpanded(['1111', '2222', '3333'], true);
    });

    expect(result.current.isExpanded('1111')).toBeTruthy();
    expect(result.current.isExpanded('2222')).toBeTruthy();
    expect(result.current.isExpanded('3333')).toBeTruthy();
  });

  it('set expanded to false for multiple value', () => {
    const { result } = renderHook(() => useExpanded());

    act(() => {
      result.current.setExpanded(['1111', '2222', '3333'], true);
      result.current.setExpanded(['1111', '2222'], false);
    });

    expect(result.current.isExpanded('1111')).toBeFalsy();
    expect(result.current.isExpanded('2222')).toBeFalsy();
    expect(result.current.isExpanded('3333')).toBeTruthy();
  });

  it('check is visible for items is correct with depth checking', () => {
    const { result } = renderHook(() => useExpanded());
    const { isVisible, isExpanded, setExpanded } = result.current;

    act(() => {
      setExpanded(['1111', '2222'], true);
    });

    expect(isVisible('1111', 0)).toBeTruthy();
    expect(isExpanded('1111', 0)).toBeTruthy();
    expect(isVisible('2222', 1)).toBeTruthy();
    expect(isExpanded('2222', 1)).toBeTruthy();
    expect(isVisible('3333', 2)).toBeTruthy();
    expect(isExpanded('3333', 2)).toBeFalsy();
    expect(isVisible('4444', 0)).toBeTruthy();
    expect(isExpanded('4444', 0)).toBeFalsy();
  });

  it('check is visible for items when only root is expanded', () => {
    const { result } = renderHook(() => useExpanded());
    const { isVisible, isExpanded } = result.current;

    expect(isVisible('1111', 0)).toBeTruthy();
    expect(isExpanded('1111', 0)).toBeFalsy();
  });

  it('check is visible for items is correct when moving beteen expanded to not expanded', () => {
    const { result } = renderHook(() => useExpanded());
    const { isVisible, isExpanded, setExpanded } = result.current;

    act(() => {
      setExpanded(['1111', '2222', '4444'], true);
    });

    expect(isVisible('1111', 0)).toBeTruthy();
    expect(isExpanded('1111', 0)).toBeTruthy();
    expect(isVisible('2222', 1)).toBeTruthy();
    expect(isExpanded('2222', 1)).toBeTruthy();
    expect(isVisible('3333', 2)).toBeTruthy();
    expect(isExpanded('3333', 2)).toBeFalsy();
    expect(isVisible('4444', 0)).toBeTruthy();
    expect(isExpanded('4444', 0)).toBeTruthy();
  });

  it('check is visible for items when everything is expanded', () => {
    const { result } = renderHook(() => useExpanded());
    const { isVisible, isExpanded, setExpanded } = result.current;

    act(() => {
      setExpanded(['1111', '2222', '3333', '4444'], true);
    });

    expect(isVisible('1111', 0)).toBeTruthy();
    expect(isExpanded('1111', 0)).toBeTruthy();
    expect(isVisible('2222', 1)).toBeTruthy();
    expect(isExpanded('2222', 1)).toBeTruthy();
    expect(isVisible('3333', 2)).toBeTruthy();
    expect(isExpanded('3333', 2)).toBeTruthy();
    expect(isVisible('4444', 0)).toBeTruthy();
    expect(isExpanded('4444', 0)).toBeTruthy();
  });

  it('check cache is cleared on unmount', () => {
    const { unmount } = renderHook(() => useExpanded());

    act(() => {
      unmount();
    });

    expect(clearMock).toHaveBeenCalledTimes(1);
  });
});
