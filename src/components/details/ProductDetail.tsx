import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Spinner from '@/components/ui/Spinner';
import { fetchProductById } from '@/api';

function ProductDetail() {
  const { productId } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({ queryKey: ['product', productId], queryFn: () => fetchProductById(productId!) });

  return <div className="flex flex-col">{renderBody()}</div>;

  function renderBody() {
    if (isLoading) return <Spinner />;

    if (error) {
      return <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-red-600">{error.message}</h4>;
    }

    const { title, images, description, price } = product!;

    return (
      <Fragment>
        <h1 className="text-orange-700 text-xl md:text-5xl text-center md:text-left font-extrabold tracking-tight">
          {title}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
          <img className="w-full h-full max-h-[38rem] object-contain" src={images[0]} alt={`img-${title}`} />
          <div className="flex flex-col flex-1 gap-5">
            <p className="text-base md:text-lg text-justify">{description}</p>
            <p className="font-bold text-3xl text-orange-600">${price}</p>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ProductDetail;
