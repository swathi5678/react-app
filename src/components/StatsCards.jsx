import { useProducts } from '../context/ProductContext';

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(
    value
  );

const StatsCards = () => {
  const { stats } = useProducts();

  const cards = [
    { label: 'Total Products', value: stats.totalProducts },
    { label: 'Average Rating', value: stats.avgRating.toFixed(2) },
    { label: 'Revenue Potential', value: formatCurrency(stats.totalRevenue) },
    { label: 'Best Sellers', value: stats.totalBestSellers },
    { label: 'Products with Coupons', value: stats.totalCouponProducts },
    { label: 'Discount > 50%', value: stats.discountEfficientCount }
  ];

  return (
    <section className="stats-grid">
      {cards.map((card) => (
        <article key={card.label} className="stat-card">
          <h4>{card.label}</h4>
          <p>{card.value}</p>
        </article>
      ))}
    </section>
  );
};

export default StatsCards;
