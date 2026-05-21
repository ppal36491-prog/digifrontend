import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { AlertCircle, Loader } from 'lucide-react';
import { API_BASE_URL } from '@/config/api';

interface AdminLoginProps {
  onLoginSuccess: (token: string) => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState('admin@digimate.com');
  const [password, setPassword] = useState('Admin@123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
        setLoading(false);
        return;
      }

      onLoginSuccess(data.token);
    } catch (err) {
      setError('Failed to connect to server. Make sure backend is running on port 5000.');
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <div className="admin-login-header">
          <h1>Admin Login</h1>
          <p>Manage your SEO pages</p>
        </div>

        {error && (
          <div className="admin-error">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <Button type="submit" disabled={loading} className="admin-login-btn">
            {loading ? (
              <>
                <Loader size={18} className="spinner-icon" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </Button>
        </form>

        <div className="admin-login-footer">
          <p>
            <strong>Demo Credentials:</strong>
          </p>
          <p>Email: admin@digimate.com</p>
          <p>Password: Admin@123</p>
        </div>
      </div>
    </div>
  );
}
