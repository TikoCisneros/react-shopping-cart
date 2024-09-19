import { Link } from 'react-router-dom';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Product as ProductModel } from '@/models';

type ProductProps = {
  data: ProductModel;
};

function Product({ data }: ProductProps) {
  const { id, title, price, thumbnail } = data;

  return (
    <Link to={`/product/${id}`} className="w-full max-w-xs h-fit">
      <Card>
        <CardHeader className="p-0">
          <img className="rounded-t-lg h-[16rem] object-fill" src={thumbnail} alt={`img-${title}`} />
        </CardHeader>
        <CardFooter className="justify-between items-end px-4 pt-8 pb-5 gap-3">
          <div className="flex flex-col gap-2">
            <CardTitle>{title}</CardTitle>
            <CardDescription>
              $<span className="text-lg font-medium">{price}</span>
            </CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button>
                  <ShoppingCart />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="bg-black">
                <p>Add to cart</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default Product;
