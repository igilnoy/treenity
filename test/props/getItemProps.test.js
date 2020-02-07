import getItemProps from '../../src/props/getItemProps';

const isVisible = jest.fn(() => true);
const isExpanded = jest.fn(() => true);
const isSelected = jest.fn(() => true);
const isLoading = jest.fn(() => true);
const setExpanded = jest.fn();
const setSelected = jest.fn();
const setLoading = jest.fn();

describe('getItemProps', () => {
  it('check params passing are returning', () => {
    const result = getItemProps({ id: 'treenity', depth: 0, param1: 'param1', param2: 'param2' });

    expect(result).toMatchObject({ id: 'treenity', depth: 0, param1: 'param1', param2: 'param2' });
  });

  it('check visible is triggered with the right params', () => {
    const result = getItemProps({ id: 'treenity', depth: 0, isVisible });
    expect(result.visible).toBeTruthy();
    expect(isVisible).toHaveBeenNthCalledWith(1, 'treenity', 0);
  });

  it('check setExpanded is passed', () => {
    const result = getItemProps({ setExpanded });
    expect(result).toMatchObject({ setExpanded });
  });

  it('check setLoading is passed', () => {
    const result = getItemProps({ setLoading });
    expect(result).toMatchObject({ setLoading });
  });

  it('check setSelected is passed', () => {
    const result = getItemProps({ setSelected });
    expect(result).toMatchObject({ setSelected });
  });

  it('check isExpanded is triggered with the right params', () => {
    const result = getItemProps({ id: 'treenity', depth: 0, isExpanded });
    expect(result.expanded).toBeTruthy();
    expect(isExpanded).toHaveBeenNthCalledWith(1, 'treenity', 0);
  });

  it('check isLoading is triggered with the right params', () => {
    const result = getItemProps({ id: 'treenity', depth: 0, isLoading });
    expect(result.loading).toBeTruthy();
    expect(isLoading).toHaveBeenNthCalledWith(1, 'treenity');
  });

  it('check isSelected is triggered with the right params', () => {
    const result = getItemProps({ id: 'treenity', depth: 0, isSelected });
    expect(result.selected).toBeTruthy();
    expect(isSelected).toHaveBeenNthCalledWith(1, 'treenity');
  });
});
