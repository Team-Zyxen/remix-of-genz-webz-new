'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function AdminPage() {
  useEffect(() => {
    // Netlify Identity initialization
    const initIdentity = () => {
      if (window.netlifyIdentity) {
        window.netlifyIdentity.on('init', (user: any) => {
          if (!user) {
            window.netlifyIdentity.on('login', () => {
              document.location.href = '/admin/';
            });
            window.netlifyIdentity.open();
          }
        });
      }
    };

    if (window.netlifyIdentity) {
      initIdentity();
    } else {
      document.addEventListener('netlifyIdentityInit', initIdentity);
    }

    return () => {
      document.removeEventListener('netlifyIdentityInit', initIdentity);
    };
  }, []);

  const handleCMSLoad = () => {
    if (window.CMS) {
      console.log('Initializing Decap CMS manually with full config...');
      window.CMS.init({
        config: {
          backend: {
            name: 'git-gateway',
            branch: 'main',
          },
          local_backend: false,
          media_folder: 'public/images/uploads',
          public_folder: '/images/uploads',
          collections: [
            {
              name: 'blog',
              label: 'Blog',
              folder: 'content/blog',
              create: true,
              slug: '{{slug}}',
              extension: 'json',
              format: 'json',
              fields: [
                { label: 'ID', name: 'id', widget: 'string' },
                { label: 'Slug', name: 'slug', widget: 'string' },
                { label: 'Title', name: 'title', widget: 'string' },
                { label: 'Excerpt', name: 'excerpt', widget: 'text' },
                { label: 'Content', name: 'content', widget: 'markdown' },
                { label: 'Author', name: 'author', widget: 'string' },
                { label: 'Date', name: 'date', widget: 'date', format: 'YYYY-MM-DD' },
                { label: 'Read Time', name: 'readTime', widget: 'string' },
                { label: 'Category', name: 'category', widget: 'string' },
                { label: 'Featured', name: 'featured', widget: 'boolean', default: false },
                { label: 'Published', name: 'published', widget: 'hidden', default: true },
                { label: 'Image', name: 'image', widget: 'image' },
              ],
            },
          ],
        },
      });
    }
  };

  return (
    <>
      <Script
        src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"
        strategy="afterInteractive"
        onLoad={handleCMSLoad}
      />
      <div id="nc-root" />
      <style jsx global>{`
        #nc-root {
          min-height: 100vh;
        }
        body {
          margin: 0;
        }
      `}</style>
    </>
  );
}
