"use client";

import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';
import SmoothTransitionsProvider from '@/components/animations/smooth-transitions';
import { Calendar, Clock, User, ArrowLeft, ChevronRight, Share2 } from 'lucide-react';
import Link from 'next/link';
import { marked } from 'marked';
import { motion, useScroll, useSpring } from 'framer-motion';
import { use, useEffect, useState } from 'react';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const post = getPostBySlug(slug);
  const relatedPosts = post ? getAllPosts().filter(p => p.category === post.category && p.id !== post.id).slice(0, 3) : [];
  const [contentHtml, setContentHtml] = useState('');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    if (post) {
      // Configure marked for better formatting
      marked.setOptions({
        gfm: true,
        breaks: true,
      });
      
      const html = marked.parse(post.content);
      if (html instanceof Promise) {
        html.then(setContentHtml);
      } else {
        setContentHtml(html);
      }
    }
  }, [post]);

  if (!post) {
    notFound();
  }

  return (
    <SmoothTransitionsProvider>
      <div className="min-h-screen bg-black text-white antialiased selection:bg-purple-500 selection:text-white overflow-x-hidden">
        <Header />
        
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600 z-[100] origin-left"
          style={{ scaleX }}
        />

        <main className="pt-32 pb-40 relative">
          {/* Background Decorations */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none">
            <div className="absolute top-[10%] left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px]" />
            <div className="absolute top-[30%] right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px]" />
          </div>

          <article className="max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link 
                href="/blogs"
                className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 hover:text-white mb-20 transition-all group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-2" />
                Back to Discourse
              </Link>
            </motion.div>

            <header className="mb-24 space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center justify-between"
              >
                <span className="px-5 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-[10px] font-bold tracking-[0.4em] uppercase text-purple-400">
                  {post.category}
                </span>
                <button className="p-3 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 transition-colors text-white/40 hover:text-white group">
                  <Share2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </button>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight"
              >
                {post.title}
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="flex flex-wrap items-center gap-10 text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 border-y border-white/5 py-10"
              >
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-purple-500" />
                  <span className="text-white/60">{post.author}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  <span className="text-white/60">{post.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-purple-500" />
                  <span className="text-white/60">{post.readTime}</span>
                </div>
              </motion.div>
            </header>

            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="relative aspect-[21/9] rounded-[4rem] overflow-hidden mb-32 border border-white/10 group shadow-2xl shadow-purple-500/5"
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-[4s] group-hover:scale-105"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="prose prose-invert prose-purple max-w-none w-full
                prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
                prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-24 md:prose-h2:mt-32 prose-h2:mb-12
                prose-h3:text-2xl md:prose-h3:text-3xl prose-h3:mt-16 md:prose-h3:mt-20 prose-h3:mb-8
                prose-p:text-white/70 prose-p:text-lg md:prose-p:text-xl prose-p:font-light prose-p:leading-[2.2] prose-p:mb-12
                prose-strong:text-white prose-strong:font-semibold
                prose-blockquote:border-l-4 prose-blockquote:border-purple-600 prose-blockquote:bg-purple-950/20 prose-blockquote:px-8 md:prose-blockquote:px-12 prose-blockquote:py-8 md:prose-blockquote:py-10 prose-blockquote:rounded-3xl prose-blockquote:not-italic prose-blockquote:text-white/90 prose-blockquote:text-xl md:prose-blockquote:text-2xl prose-blockquote:font-normal prose-blockquote:my-20 prose-blockquote:leading-[1.8]
                prose-ul:list-disc prose-ul:ml-8 md:prose-ul:ml-12 prose-ul:space-y-6 prose-ul:my-12
                prose-li:text-white/70 prose-li:text-lg md:prose-li:text-xl prose-li:leading-[1.8] prose-li:pl-4
                prose-img:rounded-[2rem] md:prose-img:rounded-[3rem] prose-img:border prose-img:border-white/10 prose-img:my-24 prose-img:w-full prose-img:shadow-2xl
                prose-hr:border-white/5 prose-hr:my-24"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-32 p-10 md:p-16 rounded-[3rem] border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-2xl relative overflow-hidden group max-w-4xl mx-auto text-center"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] -z-10 group-hover:bg-purple-600/20 transition-colors duration-700" />
              
              <div className="relative z-10">
                <h3 className="text-3xl md:text-5xl font-bold tracking-tighter mb-6">Ready to Transform Your Process?</h3>
                <p className="text-white/60 text-lg md:text-xl font-light mb-10 leading-relaxed max-w-2xl mx-auto">
                  Don't let manual tracking and raw material wastage eat into your profits. Get in touch with our experts today and discover how Zyxen can elevate your production line.
                </p>
                <Link href="/contact" className="inline-block px-12 py-5 bg-white text-black font-bold uppercase tracking-[0.2em] text-xs rounded-full hover:scale-105 active:scale-95 transition-all">
                  Contact Us Now
                </Link>
              </div>
            </motion.div>

            {/* Related Blogs Section */}
            {relatedPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-32 border-t border-white/10 pt-20"
              >
                <h3 className="text-3xl md:text-4xl font-bold tracking-tighter mb-12">Read More Related Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedPosts.map(rp => (
                    <Link key={rp.id} href={`/blogs/${rp.slug}`} className="group flex flex-col gap-4">
                      <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10">
                        <Image src={rp.image} alt={rp.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                      </div>
                      <div className="flex items-center gap-3 mt-4">
                        <span className="px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-[9px] font-bold tracking-widest uppercase text-purple-400">
                          {rp.category}
                        </span>
                        <span className="text-xs text-white/40">{rp.date}</span>
                      </div>
                      <h4 className="text-xl font-bold tracking-tight text-white group-hover:text-purple-400 transition-colors line-clamp-2">
                        {rp.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Footer Navigation */}
            <div className="mt-24 pt-12 border-t border-white/5 flex items-center justify-between">
               <Link href="/blogs" className="group flex items-center gap-4 text-white/40 hover:text-white transition-colors">
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">All Articles</span>
               </Link>
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </SmoothTransitionsProvider>
  );
}
