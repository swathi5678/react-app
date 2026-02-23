import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import StatsCards from './components/StatsCards';
import ChartsSection from './components/ChartsSection';
import ProductsTable from './components/ProductsTable';
import ProductModal from './components/ProductModal';
import { useProducts } from './context/ProductContext';

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { stats } = useProducts();

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="main-content">
        <Topbar onMenuClick={() => setSidebarOpen((prev) => !prev)} />
        <StatsCards />
        <p className="top-product">
          Top Product: <strong>{stats.topProduct?.product_title || 'N/A'}</strong>
        </p>
        <ChartsSection />
        <ProductsTable />
      </main>
      <ProductModal />
    </div>
  );
};

export default App;
