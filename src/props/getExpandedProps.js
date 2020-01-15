const getExpandedProps = ({ itemId, setExpanded, expanded }) => ({
  onClick: () => {
    setExpanded(itemId, !expanded);
  },
});

export default getExpandedProps;
