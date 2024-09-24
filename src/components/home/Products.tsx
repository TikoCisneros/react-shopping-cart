import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '@/api';
import Spinner from '@/components/ui/Spinner';
import Product from './Product';

function Products() {
  const { data, isLoading, error } = useQuery({ queryKey: ['products'], queryFn: fetchProducts });

  return <div className="flex flex-row flex-wrap gap-x-6 gap-y-3 justify-center">{renderBody()}</div>;

  function renderBody() {
    if (isLoading) return <Spinner />;

    if (error) {
      return <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-red-600">{error.message}</h4>;
    }

    const { products } = data!;
    return products.map((product) => <Product key={product.id} data={product} />);
  }
}

export default Products;
