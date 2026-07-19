"use client";

import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';
import SmoothTransitionsProvider from '@/components/animations/smooth-transitions';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/lib/blog';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function BlogListingClient({ posts }: { posts: BlogPost[] }) {
  const featuredPost = posts.find(p => p.featured) || posts[0];
  const regularPosts = posts.filter(p => p.id !== featuredPost?.id);

  return (
    <SmoothTransitionsProvider>
      <div className="min-h-screen bg-black text-white antialiased selection:bg-purple-500 selection:text-white">
        <Header />
        
        <main className="pt-32 pb-40">
          <div className="max-w-7xl mx-auto px-6">
            <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden mb-20">
              <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px]" />
              </div>
              
              <div className="relative z-10 text-center">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                  className="space-y-12"
                >
                  <motion.div variants={fadeInUp} className="flex justify-center">
                    <span className="px-5 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-[10px] font-bold tracking-[0.4em] uppercase text-purple-400">
                      Intelligence & Insights
                    </span>
                  </motion.div>
                  
                  <motion.h1
                    variants={fadeInUp}
                    className="text-6xl md:text-[9rem] font-bold tracking-tighter leading-[0.8] text-white"
                  >
                    THE <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-400 to-purple-800">DISCOURSE.</span>
                  </motion.h1>
                  
                  <motion.p
                    variants={fadeInUp}
                    className="text-lg md:text-2xl text-white/50 max-w-3xl mx-auto leading-relaxed font-light tracking-tight"
                  >
                    Exploring the intersection of neural intelligence, human elegance, and digital engineering.
                  </motion.p>
                </motion.div>
              </div>
            </section>

            {featuredPost && (
              <motion.section 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="mb-40 group"
              >
                <Link href={`/blogs/${featuredPost.slug}`} className="grid lg:grid-cols-2 gap-24 items-center p-12 md:p-20 rounded-[3rem] border border-white/10 bg-white/5 hover:bg-white/[0.08] transition-all duration-500">
                  <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  
                  <div className="space-y-10">
                    <div className="space-y-4">
                      <span className="inline-block text-purple-500 font-mono text-[10px] uppercase tracking-[0.5em]">Featured Transmission</span>
                      <h2 className="text-4xl md:text-5xl font-bold group-hover:text-purple-400 transition-colors leading-tight tracking-tighter">
                        {featuredPost.title}
                      </h2>
                    </div>
                    <p className="text-white/40 text-xl font-light leading-relaxed line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-8 text-[11px] font-mono uppercase tracking-[0.2em] text-white/20">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-purple-500" />
                        <span>{featuredPost.date}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-purple-500" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-3 text-white font-bold uppercase tracking-[0.2em] text-[10px] border-b border-white pb-2 group-hover:gap-6 transition-all">
                      Access Article <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              </motion.section>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {regularPosts.map((post, index) => (
                <motion.article 
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group flex flex-col h-full border border-white/10 rounded-[2.5rem] p-8 hover:bg-white/5 hover:border-purple-500/50 transition-all duration-500"
                >
                  <Link href={`/blogs/${post.slug}`} className="block flex-1">
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-10 border border-white/5">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="space-y-6">
                      <div className="text-purple-500 font-mono text-[10px] uppercase tracking-[0.4em]">
                        {post.category}
                      </div>
                      <h3 className="text-2xl font-bold line-clamp-2 group-hover:text-purple-400 transition-colors leading-tight tracking-tight">
                        {post.title}
                      </h3>
                      <p className="text-white/40 font-light leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                  
                  <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-white/20">
                    <div className="flex items-center gap-6">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </SmoothTransitionsProvider>
  );
}
