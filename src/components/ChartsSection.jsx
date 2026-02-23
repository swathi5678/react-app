import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  Legend
} from 'recharts';
import { useProducts } from '../context/ProductContext';

const COLORS = ['#0ea5e9', '#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#14b8a6', '#8b5cf6'];

const ChartsSection = () => {
  const { filteredProducts } = useProducts();

  const topProducts = [...filteredProducts]
    .sort((a, b) => b.purchased_last_month - a.purchased_last_month)
    .slice(0, 10)
    .map((p) => ({ name: p.product_title.slice(0, 12), sales: p.purchased_last_month }));

  const salesTrend = filteredProducts.reduce((acc, product) => {
    acc[product.data_collected_at] = (acc[product.data_collected_at] || 0) + product.purchased_last_month;
    return acc;
  }, {});

  const trendData = Object.entries(salesTrend)
    .map(([date, sales]) => ({ date, sales }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const categoryDistribution = Object.entries(
    filteredProducts.reduce((acc, product) => {
      acc[product.product_category] = (acc[product.product_category] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const sponsoredDistribution = Object.entries(
    filteredProducts.reduce(
      (acc, product) => {
        if (product.is_sponsored) acc.Sponsored += 1;
        else acc.Organic += 1;
        return acc;
      },
      { Sponsored: 0, Organic: 0 }
    )
  ).map(([name, value]) => ({ name, value }));

  return (
    <section className="charts-grid">
      <article className="chart-card">
        <h3>Top 10 Products by Purchased Last Month</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={topProducts}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#0ea5e9" />
          </BarChart>
        </ResponsiveContainer>
      </article>

      <article className="chart-card">
        <h3>Sales Trend by Collection Date</h3>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </article>

      <article className="chart-card">
        <h3>Category Distribution</h3>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie data={categoryDistribution} dataKey="value" nameKey="name" outerRadius={85} label>
              {categoryDistribution.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </article>

      <article className="chart-card">
        <h3>Sponsored vs Organic</h3>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie data={sponsoredDistribution} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90}>
              {sponsoredDistribution.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </article>
    </section>
  );
};

export default ChartsSection;
