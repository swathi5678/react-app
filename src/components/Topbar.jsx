import { FiMenu } from 'react-icons/fi';
import { useProducts } from '../context/ProductContext';

const Topbar = ({ onMenuClick }) => {
  const { filters, setFilters } = useProducts();

  const toggleFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <header className="topbar">
      <button className="menu-button" onClick={onMenuClick}>
        <FiMenu />
      </button>
      <input
        type="text"
        placeholder="Search product title..."
        value={filters.search}
        onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
      />
      <div className="toggle-group">
        <label>
          <input
            type="checkbox"
            checked={filters.rating4Plus}
            onChange={() => toggleFilter('rating4Plus')}
          />
          Rating 4+
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.bestSellerOnly}
            onChange={() => toggleFilter('bestSellerOnly')}
          />
          Best Seller
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.sponsoredOnly}
            onChange={() => toggleFilter('sponsoredOnly')}
          />
          Sponsored
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.couponOnly}
            onChange={() => toggleFilter('couponOnly')}
          />
          Coupon
        </label>
      </div>
    </header>
  );
};

export default Topbar;
