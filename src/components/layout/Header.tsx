import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

import { THIRTY } from '@/constants';
import CartSheet from '../cart/CartSheet';

function Header() {
  return (
    <header className="flex justify-between">
      <Link to="/">
        <span className="flex items-center gap-2 text-3xl font-semibold underline">
          <ShoppingBag className="text-orange-600" size={THIRTY} />
          Shoppy
        </span>
      </Link>
      <CartSheet />
    </header>
  );
}

export default Header;
