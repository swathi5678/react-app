import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import productsData from '../data/products.json';

const ProductContext = createContext(null);

const defaultFilters = {
  category: 'All',
  search: '',
  rating4Plus: false,
  bestSellerOnly: false,
  sponsoredOnly: false,
  couponOnly: false
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState(() => {
    const cached = localStorage.getItem('dashboard-filters');
    return cached ? JSON.parse(cached) : defaultFilters;
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  useEffect(() => {
    localStorage.setItem('dashboard-filters', JSON.stringify(filters));
    setCurrentPage(1);
  }, [filters]);

  const categories = useMemo(
    () => ['All', ...new Set(products.map((product) => product.product_category))],
    [products]
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        filters.category === 'All' || product.product_category === filters.category;
      const matchesSearch = product.product_title
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      const matchesRating = !filters.rating4Plus || product.product_rating >= 4;
      const matchesBestSeller = !filters.bestSellerOnly || product.is_best_seller;
      const matchesSponsored = !filters.sponsoredOnly || product.is_sponsored;
      const matchesCoupon = !filters.couponOnly || product.has_coupon;

      return (
        matchesCategory &&
        matchesSearch &&
        matchesRating &&
        matchesBestSeller &&
        matchesSponsored &&
        matchesCoupon
      );
    });
  }, [products, filters]);

  const stats = useMemo(() => {
    const totalProducts = filteredProducts.length;
    const avgRating =
      totalProducts === 0
        ? 0
        : filteredProducts.reduce((sum, p) => sum + p.product_rating, 0) / totalProducts;

    const totalRevenue = filteredProducts.reduce(
      (sum, p) => sum + p.discounted_price * p.purchased_last_month,
      0
    );

    const totalBestSellers = filteredProducts.filter((p) => p.is_best_seller).length;
    const totalCouponProducts = filteredProducts.filter((p) => p.has_coupon).length;
    const topProduct = [...filteredProducts].sort(
      (a, b) => b.purchased_last_month - a.purchased_last_month
    )[0];
    const discountEfficientCount = filteredProducts.filter((p) => p.discount_percentage > 50).length;

    return {
      totalProducts,
      avgRating,
      totalRevenue,
      totalBestSellers,
      totalCouponProducts,
      topProduct,
      discountEfficientCount
    };
  }, [filteredProducts]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const value = {
    products,
    filteredProducts,
    categories,
    filters,
    setFilters,
    stats,
    selectedProduct,
    isModalOpen,
    openModal,
    setIsModalOpen,
    currentPage,
    setCurrentPage
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};
