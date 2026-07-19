import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import BlogPostClient from './client';
import { Metadata } from 'next';

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Zyxen`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  
  if (!post) {
    notFound();
  }

  const relatedPosts = getAllPosts()
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  return <BlogPostClient post={post} relatedPosts={relatedPosts} />;
}
