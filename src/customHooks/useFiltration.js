import { useEffect, useState } from 'react';

export const useFiltration = (data, minPrice, maxPrice, sorted) => {
  const [products, setProducts] = useState(data || []);
  useEffect(() => {
    const filteredProducts = () => {
      const filteredProducts = data?.filter((product) => {
        return (
          (!minPrice || product.price >= +minPrice) &&
          (!maxPrice || product.price <= +maxPrice)
        );
      });

      if (sorted === '' || sorted === 'by default') {
        setProducts(filteredProducts);
      } else if (sorted === 'asc') {
        setProducts(filteredProducts?.toSorted((a, b) => a.price - b.price));
      } else if (sorted === 'desc') {
        setProducts(filteredProducts?.toSorted((a, b) => b.price - a.price));
      } else if (sorted === 'titleA') {
        setProducts(
          filteredProducts?.toSorted((a, b) => a.title.localeCompare(b.title))
        );
      } else if (sorted === 'titleZ') {
        setProducts(
          filteredProducts?.toSorted((a, b) => b.title.localeCompare(a.title))
        );
      }
    };
    const timerId = setTimeout(filteredProducts, 500);
    return () => clearTimeout(timerId);
  }, [data, minPrice, maxPrice, sorted]);

  return products;
};
