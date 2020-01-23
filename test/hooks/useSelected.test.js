import { renderHook, act } from '@testing-library/react-hooks';

const clearMock = jest.fn();

jest.doMock('../../src/props/getSelectedProps', () => ({
  __esModule: true,
  default: {
    cache: {
      clear: clearMock,
    },
  },
}));

const { default: useSelected } = require('../../src/hooks/useSelected');

describe('useSelected', () => {
  it('check methods exists', () => {
    const { result } = renderHook(() => useSelected());

    expect(result.current.setSelected).toBeDefined();
    expect(result.current.isSelected).toBeDefined();
  });

  it('check setSelected state', () => {
    const { result } = renderHook(() => useSelected());

    act(() => {
      result.current.setSelected('12345678');
    });

    expect(result.current.isSelected('12345678')).toBeTruthy();
  });

  it('check cache is cleared on unmount', () => {
    const { unmount } = renderHook(() => useSelected());

    act(() => {
      unmount();
    });

    expect(clearMock).toHaveBeenCalledTimes(1);
  });
});
