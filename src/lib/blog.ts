import fs from 'fs';
import path from 'path';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  featured: boolean;
  published: boolean;
  image: string;
}

const blogsDirectory = path.join(process.cwd(), 'content', 'blog');

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(blogsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(blogsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.json'))
    .map(fileName => {
      const fullPath = path.join(blogsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      try {
        const post = JSON.parse(fileContents) as BlogPost;
        return post;
      } catch (e) {
        console.error(`Error parsing ${fileName}`, e);
        return null;
      }
    })
    .filter((post): post is BlogPost => post !== null && post.published);
    
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllPosts();
  return posts.find(post => post.slug === slug);
}
