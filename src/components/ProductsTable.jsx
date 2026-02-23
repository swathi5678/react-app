import { useMemo } from 'react';
import { useProducts } from '../context/ProductContext';

const PAGE_SIZE = 8;

const ProductsTable = () => {
  const { filteredProducts, openModal, currentPage, setCurrentPage } = useProducts();

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, currentPage]);

  return (
    <section className="table-section">
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Rating</th>
              <th>Reviews</th>
              <th>Discount %</th>
              <th>Discounted Price</th>
              <th>Purchased Last Month</th>
              <th>Buy Box</th>
              <th>Sustainability Tags</th>
              <th>Product Page</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((product) => (
              <tr key={product.id} onClick={() => openModal(product)}>
                <td>
                  <img src={product.product_image} alt={product.product_title} />
                </td>
                <td>{product.product_title}</td>
                <td>{product.product_category}</td>
                <td>{product.product_rating}</td>
                <td>{product.total_reviews}</td>
                <td>{product.discount_percentage}%</td>
                <td>₹{product.discounted_price.toLocaleString('en-IN')}</td>
                <td>{product.purchased_last_month}</td>
                <td>{product.buy_box_availability ? 'Yes' : 'No'}</td>
                <td>{product.sustainability_tags}</td>
                <td>
                  <a href={product.product_url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                    Open
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>
          Prev
        </button>
        <span>
          Page {currentPage} / {totalPages}
        </span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </section>
  );
};

export default ProductsTable;
