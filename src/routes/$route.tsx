import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CursorGlow } from '@/components/CursorGlow';
import { ScrollProgress } from '@/components/ScrollProgress';
import { ParticlesBackground } from '@/components/ParticlesBackground';
import { BackToTop } from '@/components/BackToTop';
import { PageLoader } from '@/components/PageLoader';
import { API_BASE_URL } from '@/config/api';

function DynamicPageComponent() {
  const { route } = Route.useParams();
  const [page, setPage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPage = async () => {
      try {
        console.log(`📄 Fetching page for route: ${route}`);
        const response = await fetch(
          `${API_BASE_URL}/pages/public/${route}`
        );

        console.log(`Response status: ${response.status}`);

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error response:', errorData);
          setError('Page not found');
          setLoading(false);
          return;
        }

        const data = await response.json();
        console.log(`✓ Page loaded:`, data);
        setPage(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching page:', err);
        setError('Failed to load page');
        setLoading(false);
      }
    };

    fetchPage();
  }, [route]);

  // Update document title and meta tags for SEO when page loads
  useEffect(() => {
    if (page?.seoTitle) {
      document.title = page.seoTitle;
    } else if (page?.title) {
      document.title = page.title;
    } else if (error) {
      document.title = 'Page Not Found - Digi Mate';
    } else {
      document.title = 'Loading - Digi Mate';
    }

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    if (page?.seoDescription) {
      metaDescription.setAttribute('content', page.seoDescription);
    }

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    if (page?.seoKeywords && page.seoKeywords.length > 0) {
      metaKeywords.setAttribute('content', page.seoKeywords.join(', '));
    }

    // Update OG tags for better social sharing
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    if (page?.seoTitle) {
      ogTitle.setAttribute('content', page.seoTitle);
    }

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    if (page?.seoDescription) {
      ogDescription.setAttribute('content', page.seoDescription);
    }
  }, [page, error]);

  if (loading) {
    return (
      <div className="relative min-h-screen overflow-x-hidden">
        <PageLoader />
        <ScrollProgress />
        <CursorGlow />
        <ParticlesBackground />

        <div className="relative z-10 flex min-h-screen items-center justify-center">
          <Navbar />
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
            <p className="mt-6 text-lg text-foreground font-medium">Loading page...</p>
          </div>
          <Footer />
        </div>

        <BackToTop />
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="relative min-h-screen overflow-x-hidden">
        <PageLoader />
        <ScrollProgress />
        <CursorGlow />
        <ParticlesBackground />

        <div className="relative z-10">
          <Navbar />
          <main className="flex min-h-[70vh] items-center justify-center px-4">
            <div className="max-w-md text-center">
              <h1 className="text-8xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">404</h1>
              <h2 className="mt-6 text-2xl font-bold text-foreground">Page Not Found</h2>
              <p className="mt-3 text-muted-foreground">
                The page you're looking for doesn't exist or has been removed.
              </p>
              <div className="mt-8">
                <a
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full gradient-primary px-8 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
                >
                  <ArrowLeft size={18} />
                  Go Home
                </a>
              </div>
            </div>
          </main>
          <Footer />
        </div>

        <BackToTop />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <PageLoader />
      <ScrollProgress />
      <CursorGlow />
      <ParticlesBackground />

      <div className="relative z-10">
        <Navbar />
        <main className="min-h-screen bg-gradient-to-b from-background via-background to-background">
          {/* Back Button */}
          <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
            <div className="container mx-auto px-4 py-4">
              <a
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors pt-2"
              >
                
                
              </a>
            </div>
          </div>

          {/* Main Content */}
          <div className="container mx-auto px-4 pt-30 pb-16">
            {/* Header Section */}
            <div className="mb-12 max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                {page.title}
              </h1>
              
              {page.seoDescription && (
                <p className="text-xl text-muted-foreground leading-relaxed mb-8 pb-8 border-b border-border">
                  {page.seoDescription}
                </p>
              )}

              {page.pageName && (
                <div className="inline-block">
                  <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm">
                    {page.pageName}
                  </span>
                </div>
              )}
            </div>

            {/* Images Gallery */}
            {page.images && page.images.length > 0 && (
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-foreground mb-8">Gallery</h2>
                <div className={`${
                  page.images.length === 1
                    ? 'flex justify-center'
                    : `grid gap-8 ${
                        page.images.length === 2
                          ? 'grid-cols-1 md:grid-cols-2'
                          : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                      }`
                }`}>
                  {page.images.map((image: string, index: number) => (
                    <div
                      key={index}
                      className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary to-secondary/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 ${
                        page.images.length === 1 ? 'max-w-2xl w-full' : ''
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${page.title} - Image ${index + 1}`}
                        className={`w-full ${
                          page.images.length === 1 ? 'h-96' : 'h-72'
                        } object-cover group-hover:brightness-110 transition-all duration-300`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Main Content */}
            {page.content && (
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-foreground mb-8">Content</h2>
                <div className="prose prose-invert max-w-none">
                  <div
                    className="text-foreground leading-relaxed space-y-6 text-lg"
                    dangerouslySetInnerHTML={{
                      __html: page.content.replace(/\n/g, '<br />'),
                    }}
                  />
                </div>
              </div>
            )}

            {/* Keywords Section */}
            {page.seoKeywords && page.seoKeywords.length > 0 && (
              <div className="max-w-4xl mx-auto mt-16 pt-12 border-t border-border">
                <h3 className="text-2xl font-bold text-foreground mb-6">Related Topics</h3>
                <div className="flex flex-wrap gap-3">
                  {page.seoKeywords.map((keyword: string, index: number) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full bg-gradient-to-r from-primary/20 to-purple-600/20 border border-primary/30 px-4 py-2 text-sm font-medium text-foreground hover:border-primary/60 hover:bg-primary/30 transition-all cursor-pointer"
                    >
                      #{keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer CTA */}
          <div className="mt-20 border-t border-border bg-gradient-to-r from-primary/5 to-purple-600/5 py-16">
            <div className="container mx-auto px-4 text-center">
              <p className="text-muted-foreground mb-6">Ready to take your digital presence to the next level?</p>
              <a
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full gradient-primary px-8 py-3 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg"
              >
                Get Started Today
              </a>
            </div>
          </div>
        </main>
        <Footer />
      </div>

      <BackToTop />
    </div>
  );
}

export const Route = createFileRoute('/$route')({
  component: DynamicPageComponent,
});
