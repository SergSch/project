import { useGetAllGoodsQuery } from '../store/reducers/apiGoodsSlice';
import { useMemo } from 'react';

const useFindBiggestDiscount = () => {
  const { data } = useGetAllGoodsQuery();
  const result = useMemo(() => {
    if (!data || !data.length) return [null, null];

    let mostDiscountObj;
    let maxDiscountPercentage = 0;

    data
      ?.filter((product) => product.discont_price !== null)
      .forEach((product) => {
        const discountPercentage = Math.round(
          ((product.price - product.discont_price) / product.price) * 100
        );
        if (discountPercentage > maxDiscountPercentage) {
          maxDiscountPercentage = discountPercentage;
          mostDiscountObj = { ...product, discountPercentage };
        }
      });

    return [mostDiscountObj, maxDiscountPercentage];
  }, [data]);

  return result;
};

export default useFindBiggestDiscount;
