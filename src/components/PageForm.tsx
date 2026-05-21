import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { AlertCircle, X, Upload, Loader, Eye, Edit } from 'lucide-react';
import RichEditor from './RichEditor';
import { API_BASE_URL } from '@/config/api';

interface PageFormProps {
  pageId?: string | null;
  onClose: (refetch?: boolean) => void;
  token: string;
}

interface PageData {
  title: string;
  pageName: string;
  route: string;
  content: string;
  images: string[];
  seoKeywords: string[];
  seoDescription: string;
  seoTitle: string;
  published: boolean;
}

export default function PageForm({ pageId, onClose, token }: PageFormProps) {
  const [formData, setFormData] = useState<PageData>({
    title: '',
    pageName: '',
    route: '',
    content: '',
    images: [],
    seoKeywords: [],
    seoDescription: '',
    seoTitle: '',
    published: false,
  });

  const [newKeyword, setNewKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');

  useEffect(() => {
    if (pageId) {
      fetchPageData();
    }
  }, [pageId]);

  const fetchPageData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/pages/${pageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch page');

      const data = await response.json();
      setFormData(data);
    } catch (err) {
      setError('Failed to load page data');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      published: e.target.checked,
    }));
  };

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !formData.seoKeywords.includes(newKeyword)) {
      setFormData((prev) => ({
        ...prev,
        seoKeywords: [...prev.seoKeywords, newKeyword.trim()],
      }));
      setNewKeyword('');
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setFormData((prev) => ({
      ...prev,
      seoKeywords: prev.seoKeywords.filter((k) => k !== keyword),
    }));
  };

  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setImageLoading(true);

    for (const file of files) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, base64],
        }));
      };
      reader.readAsDataURL(file);
    }

    setImageLoading(false);
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.title || !formData.pageName || !formData.route) {
        setError('Title, Page Name, and Route are required');
        setLoading(false);
        return;
      }

      // Ensure route starts with /
      const route = formData.route.startsWith('/') ? formData.route : `/${formData.route}`;

      const url = pageId
        ? `${API_BASE_URL}/pages/${pageId}`
        : `${API_BASE_URL}/pages`;

      const method = pageId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          route,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Failed to save page');
        setLoading(false);
        return;
      }

      onClose(true);
    } catch (err) {
      setError('Failed to save page');
      setLoading(false);
    }
  };

  return (
    <div className="page-form-container">
      <div className="page-form">
        <div className="form-header">
          <h2>{pageId ? 'Edit Page' : 'Create New Page'}</h2>
          <Button
            onClick={() => onClose(false)}
            variant="ghost"
            size="sm"
          >
            <X size={20} />
          </Button>
        </div>

        {error && (
          <div className="form-error">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="form-content">
          {/* Basic Information */}
          <div className="form-section">
            <h3>Basic Information</h3>

            <div className="form-group">
              <label>Page Title *</label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Web Development Services"
                required
              />
            </div>

            <div className="form-group">
              <label>Page Name *</label>
              <Input
                type="text"
                name="pageName"
                value={formData.pageName}
                onChange={handleInputChange}
                placeholder="e.g., Web Development"
                required
              />
            </div>

            <div className="form-group">
              <label>Route Path * (e.g., /web-development)</label>
              <Input
                type="text"
                name="route"
                value={formData.route}
                onChange={handleInputChange}
                placeholder="/page-name"
                required
              />
              <small>Must start with / and use lowercase with hyphens</small>
            </div>
          </div>

          {/* Content */}
          <div className="form-section">
            <h3>Content</h3>
            
            {/* Content Tabs */}
            <div className="content-tabs">
              <button
                type="button"
                className={`tab-btn ${activeTab === 'edit' ? 'active' : ''}`}
                onClick={() => setActiveTab('edit')}
              >
                <Edit size={16} />
                Edit Content
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
                onClick={() => setActiveTab('preview')}
              >
                <Eye size={16} />
                Preview
              </button>
            </div>

            {/* Edit Tab */}
            {activeTab === 'edit' && (
              <div className="form-group">
                <RichEditor
                  value={formData.content}
                  onChange={(content) =>
                    setFormData((prev) => ({
                      ...prev,
                      content,
                    }))
                  }
                />
                <small className="text-muted-foreground mt-2 block">
                  Format your content using the toolbar. Add headings, lists, quotes, and more!
                </small>
              </div>
            )}

            {/* Preview Tab */}
            {activeTab === 'preview' && (
              <div className="preview-section">
                <div className="preview-content">
                  <h1 className="text-4xl font-bold mb-6">{formData.title || 'Page Title'}</h1>
                  
                  {formData.seoDescription && (
                    <p className="text-lg text-muted-foreground mb-8 pb-6 border-b">
                      {formData.seoDescription}
                    </p>
                  )}

                  {/* Images Preview */}
                  {formData.images.length > 0 && (
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold mb-4">Gallery</h2>
                      <div className={`grid gap-6 ${
                        formData.images.length === 1
                          ? 'grid-cols-1'
                          : formData.images.length === 2
                          ? 'grid-cols-1 md:grid-cols-2'
                          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                      }`}>
                        {formData.images.map((image, index) => (
                          <div
                            key={index}
                            className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                          >
                            <img
                              src={image}
                              alt={`Gallery ${index + 1}`}
                              className="w-full h-64 object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Content Preview */}
                  {formData.content && (
                    <div className="prose prose-invert max-w-none">
                      <div
                        className="content-preview"
                        dangerouslySetInnerHTML={{
                          __html: formData.content,
                        }}
                      />
                    </div>
                  )}

                  {/* Keywords Preview */}
                  {formData.seoKeywords.length > 0 && (
                    <div className="mt-8 pt-6 border-t">
                      <h3 className="text-xl font-bold mb-4">Related Topics</h3>
                      <div className="flex flex-wrap gap-2">
                        {formData.seoKeywords.map((keyword) => (
                          <span
                            key={keyword}
                            className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm"
                          >
                            #{keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* SEO Information */}
          <div className="form-section">
            <h3>SEO Information</h3>

            <div className="form-group">
              <label>SEO Title</label>
              <Input
                type="text"
                name="seoTitle"
                value={formData.seoTitle}
                onChange={handleInputChange}
                placeholder="SEO title for search engines"
              />
              <small>Recommended: 50-60 characters</small>
            </div>

            <div className="form-group">
              <label>SEO Description</label>
              <textarea
                name="seoDescription"
                value={formData.seoDescription}
                onChange={handleInputChange}
                placeholder="Meta description for search engines"
                rows={3}
                className="form-textarea"
                maxLength={10000}
              />
              <small>
                {formData.seoDescription.length}/10000 characters 
                {formData.seoDescription.length > 160 && (
                  <span style={{ color: '#ff9800' }}>
                    {' '}(Ideally 150-160 for optimal display)
                  </span>
                )}
              </small>
            </div>

            <div className="form-group">
              <label>SEO Keywords</label>
              <div className="keyword-input-group">
                <Input
                  type="text"
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddKeyword();
                    }
                  }}
                  placeholder="Add a keyword and press Enter"
                />
                <Button type="button" onClick={handleAddKeyword} variant="outline">
                  Add
                </Button>
              </div>

              {formData.seoKeywords.length > 0 && (
                <div className="keywords-display">
                  {formData.seoKeywords.map((keyword) => (
                    <span key={keyword} className="keyword-item">
                      {keyword}
                      <button
                        type="button"
                        onClick={() => handleRemoveKeyword(keyword)}
                        className="remove-keyword"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Images */}
          <div className="form-section">
            <h3>Images</h3>

            <div className="form-group">
              <label>Upload Images</label>
              <div className="image-upload">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleAddImage}
                  disabled={imageLoading}
                  id="image-input"
                />
                <label htmlFor="image-input" className="upload-btn">
                  <Upload size={20} />
                  <span>Click to upload images</span>
                </label>
              </div>
            </div>

            {formData.images.length > 0 && (
              <div className="images-preview">
                {formData.images.map((image, index) => (
                  <div key={index} className="image-preview-item">
                    <img src={image} alt={`Preview ${index}`} />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="remove-image"
                    >
                      <X size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Publishing Options */}
          <div className="form-section">
            <h3>Publishing</h3>

            <div className="form-group checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={handleCheckboxChange}
                />
                Publish this page (make it visible publicly)
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <Button type="button" onClick={() => onClose(false)} variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader size={18} className="spinner-icon" />
                  Saving...
                </>
              ) : (
                pageId ? 'Update Page' : 'Create Page'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
