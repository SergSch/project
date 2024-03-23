export const blockBtnText = (category) => {
  switch (category) {
    case '1':
      return 'All products';
    case '2':
      return 'Discounted items';
    case '3':
      return 'Liked products';
    default:
      return null;
  }
};
