import { renderHook, act } from '@testing-library/react-hooks';

const clearMock = jest.fn();

jest.doMock('../../src/props/getLoadingProps', () => ({
  __esModule: true,
  default: {
    cache: {
      clear: clearMock,
    },
  },
}));

const { default: useLoading } = require('../../src/hooks/useLoading');

describe('useLoading', () => {
  it('check methods exists', () => {
    const { result } = renderHook(() => useLoading());

    expect(result.current.setLoading).toBeDefined();
    expect(result.current.isLoading).toBeDefined();
  });

  it('set loading to true for single value', () => {
    const { result } = renderHook(() => useLoading());

    act(() => {
      result.current.setLoading('1111', true);
    });

    expect(result.current.isLoading('1111')).toBeTruthy();
  });

  it('set loading to false for single value', () => {
    const { result } = renderHook(() => useLoading());

    act(() => {
      result.current.setLoading('1111', true);
      result.current.setLoading('1111', false);
    });

    expect(result.current.isLoading('1111')).toBeFalsy();
  });

  it('set loading to true for mulitple value', () => {
    const { result } = renderHook(() => useLoading());

    act(() => {
      result.current.setLoading(['1111', '2222', '3333'], true);
    });

    expect(result.current.isLoading('1111')).toBeTruthy();
    expect(result.current.isLoading('2222')).toBeTruthy();
    expect(result.current.isLoading('3333')).toBeTruthy();
  });

  it('set loading to false for multiple value', () => {
    const { result } = renderHook(() => useLoading());

    act(() => {
      result.current.setLoading(['1111', '2222', '3333'], true);
      result.current.setLoading(['1111', '2222'], false);
    });

    expect(result.current.isLoading('1111')).toBeFalsy();
    expect(result.current.isLoading('2222')).toBeFalsy();
    expect(result.current.isLoading('3333')).toBeTruthy();
  });

  it('check cache is cleared on unmount', () => {
    const { unmount } = renderHook(() => useLoading());

    act(() => {
      unmount();
    });

    expect(clearMock).toHaveBeenCalledTimes(1);
  });
});
