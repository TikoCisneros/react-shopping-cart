import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import Home from '@/pages/Home';
import Details from '@/pages/Details';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/:productId" element={<Details />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
