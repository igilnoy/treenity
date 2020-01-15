const getSelectedProps = ({ itemId, setSelected }) => ({
  onClick: () => {
    setSelected(itemId);
  },
});

export default getSelectedProps;
