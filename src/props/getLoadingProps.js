const getLoadingProps = ({ itemId, setLoading }) => ({
  onClick: () => {
    setLoading(itemId, true);
  },
});

export default getLoadingProps;
