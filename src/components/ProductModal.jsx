import Modal from 'react-modal';
import { useProducts } from '../context/ProductContext';

Modal.setAppElement('#root');

const ProductModal = () => {
  const { selectedProduct, isModalOpen, setIsModalOpen } = useProducts();

  if (!selectedProduct) return null;

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
      className="product-modal"
      overlayClassName="modal-overlay"
    >
      <button className="close-modal" onClick={() => setIsModalOpen(false)}>
        ✕
      </button>
      <img src={selectedProduct.product_image} alt={selectedProduct.product_title} />
      <h2>{selectedProduct.product_title}</h2>
      <p>Rating: {selectedProduct.product_rating}</p>
      <p>
        Price: <del>₹{selectedProduct.original_price.toLocaleString('en-IN')}</del>{' '}
        <strong>₹{selectedProduct.discounted_price.toLocaleString('en-IN')}</strong>
      </p>
      <p>Discount: {selectedProduct.discount_percentage}%</p>
      <p>Delivery Date: {selectedProduct.delivery_date}</p>
      <p>Sustainability Tags: {selectedProduct.sustainability_tags}</p>
      <p>Coupon: {selectedProduct.has_coupon ? 'Available' : 'Not available'}</p>
      <p>{selectedProduct.is_sponsored ? 'Sponsored Product' : 'Organic Listing'}</p>
    </Modal>
  );
};

export default ProductModal;
