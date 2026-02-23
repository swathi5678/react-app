import { useProducts } from '../context/ProductContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { categories, filters, setFilters } = useProducts();

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h2>Categories</h2>
        <button className="close-sidebar" onClick={onClose}>
          ✕
        </button>
      </div>
      <div className="category-list">
        {categories.map((category) => (
          <button
            key={category}
            className={filters.category === category ? 'active' : ''}
            onClick={() => setFilters((prev) => ({ ...prev, category }))}
          >
            {category}
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
