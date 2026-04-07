import { useEffect, useMemo, useState } from 'react';
import './styles.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const navigateTo = (path) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

const AuthCard = ({ title, subtitle, children }) => (
  <div className="auth-shell">
    <div className="auth-card">
      <h1>{title}</h1>
      <p>{subtitle}</p>
      {children}
    </div>
  </div>
);

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.message || 'Failed to register.');
      }

      navigateTo('/login');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Create account" subtitle="Join the platform securely.">
      <form onSubmit={onSubmit} className="form-grid">
        <label>
          Name
          <input name="name" value={form.name} onChange={onChange} required />
        </label>

        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={onChange} required />
        </label>

        <label>
          Password
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            minLength={6}
            required
          />
        </label>

        {error && <p className="error-text">{error}</p>}

        <button type="submit" disabled={loading}>{loading ? 'Creating account...' : 'Register'}</button>
      </form>

      <p className="helper-text">
        Already registered? <a href="/login" onClick={(event) => { event.preventDefault(); navigateTo('/login'); }}>Sign in</a>
      </p>
    </AuthCard>
  );
};

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.message || 'Login failed.');
      }

      localStorage.setItem('user', JSON.stringify(payload.user));
      onLogin(payload.user);
      navigateTo('/dashboard');
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard title="Welcome back" subtitle="Use your account credentials to continue.">
      <form onSubmit={onSubmit} className="form-grid">
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={onChange} required />
        </label>

        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={onChange} required />
        </label>

        {error && <p className="error-text">{error}</p>}

        <button type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
      </form>

      <p className="helper-text">
        No account yet? <a href="/register" onClick={(event) => { event.preventDefault(); navigateTo('/register'); }}>Create one</a>
      </p>
    </AuthCard>
  );
};

const Dashboard = ({ user, onLogout }) => {
  useEffect(() => {
    if (!user) {
      navigateTo('/login');
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="dashboard-shell">
      <div className="dashboard-card">
        <h1>Dashboard</h1>
        <p>Welcome, {user.name}! Your account is authenticated.</p>
        <p className="muted">Email: {user.email}</p>
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem('user');
            onLogout();
            navigateTo('/login');
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

const NotFound = () => (
  <AuthCard title="Page not found" subtitle="The page you requested does not exist.">
    <button type="button" onClick={() => navigateTo('/login')}>Go to Login</button>
  </AuthCard>
);

const App = () => {
  const [path, setPath] = useState(window.location.pathname);
  const [user, setUser] = useState(() => getStoredUser());

  useEffect(() => {
    const listener = () => setPath(window.location.pathname);
    window.addEventListener('popstate', listener);
    return () => window.removeEventListener('popstate', listener);
  }, []);

  const page = useMemo(() => {
    if (path === '/') {
      navigateTo(user ? '/dashboard' : '/login');
      return null;
    }

    if (path === '/register') {
      return <Signup />;
    }

    if (path === '/login') {
      return <Login onLogin={setUser} />;
    }

    if (path === '/dashboard') {
      return <Dashboard user={user} onLogout={() => setUser(null)} />;
    }

    return <NotFound />;
  }, [path, user]);

  return <>{page}</>;
};

export default App;
