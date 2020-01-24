import enhancedGetItemPropsWithSections from './enhancedGetItemPropsWithSections';

export const withSections = (Item, { Header, Footer }) => {
  const getItems = enhancedGetItemPropsWithSections();

  return props => getItems(props, { Item, Header, Footer });
};

export default withSections;
