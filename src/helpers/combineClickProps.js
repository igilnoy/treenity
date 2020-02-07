export default ({ getExpandedProps, getSelectedProps }) => () => {
  const { onClick: expandedClick } = getExpandedProps();
  const { onClick: selectedClick } = getSelectedProps();

  expandedClick();
  selectedClick();
};
