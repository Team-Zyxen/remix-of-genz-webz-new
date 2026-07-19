import { getAllPosts } from '@/lib/blog';
import BlogListingClient from './client';

export const metadata = {
  title: 'The Discourse | Zyxen Blog',
  description: 'Exploring the intersection of neural intelligence, human elegance, and digital engineering.',
};

export default function BlogListingPage() {
  const posts = getAllPosts();
  return <BlogListingClient posts={posts} />;
}
