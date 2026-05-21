import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Plus, Trash2, Edit2, LogOut } from 'lucide-react';
import PageForm from './PageForm';
import { API_BASE_URL } from '../config/api';

interface Page {
  _id: string;
  title: string;
  pageName: string;
  route: string;
  seoKeywords: string[];
  published: boolean;
  createdAt: string;
}

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPage, setEditingPage] = useState<string | null>(null);
  const [error, setError] = useState('');

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/pages`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch pages');

      const data = await response.json();
      setPages(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load pages');
      setLoading(false);
    }
  };

  const handleDeletePage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this page?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/pages/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete page');

      setPages(pages.filter((p) => p._id !== id));
    } catch (err) {
      alert('Failed to delete page');
    }
  };

  const handleFormClose = (refetch = false) => {
    setShowForm(false);
    setEditingPage(null);
    if (refetch) {
      fetchPages();
    }
  };

  if (loading) {
    return (
      <div className="admin-loader">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Manage your SEO pages and content</p>
        </div>
        <Button onClick={onLogout} variant="outline">
          <LogOut size={18} />
          Logout
        </Button>
      </div>

      {error && <div className="admin-error">{error}</div>}

      {showForm ? (
        <PageForm
          pageId={editingPage}
          onClose={handleFormClose}
          token={token!}
        />
      ) : (
        <div className="pages-section">
          <div className="section-header">
            <h2>SEO Pages</h2>
            <Button onClick={() => setShowForm(true)}>
              <Plus size={18} />
              New Page
            </Button>
          </div>

          {pages.length === 0 ? (
            <div className="empty-state">
              <p>No pages created yet</p>
              <p>Click "New Page" to create your first SEO page</p>
            </div>
          ) : (
            <div className="pages-grid">
              {pages.map((page) => (
                <div key={page._id} className="page-card">
                  <div className="page-card-header">
                    <div>
                      <h3>{page.title}</h3>
                      <p className="page-route">{page.route}</p>
                    </div>
                    <span className={`status-badge ${page.published ? 'published' : 'draft'}`}>
                      {page.published ? 'Published' : 'Draft'}
                    </span>
                  </div>

                  <div className="page-card-body">
                    <p className="page-name">
                      <strong>Page Name:</strong> {page.pageName}
                    </p>
                    <div className="seo-keywords">
                      <strong>Keywords:</strong>
                      <div className="keywords-list">
                        {page.seoKeywords.length > 0
                          ? page.seoKeywords.slice(0, 3).map((keyword, idx) => (
                              <span key={idx} className="keyword-tag">
                                {keyword}
                              </span>
                            ))
                          : <span className="no-keywords">No keywords</span>}
                        {page.seoKeywords.length > 3 && (
                          <span className="keyword-tag more">+{page.seoKeywords.length - 3}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="page-card-footer">
                    <small>{new Date(page.createdAt).toLocaleDateString()}</small>
                    <div className="card-actions">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingPage(page._id);
                          setShowForm(true);
                        }}
                      >
                        <Edit2 size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeletePage(page._id)}
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
