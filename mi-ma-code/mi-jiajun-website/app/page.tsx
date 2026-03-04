'use client';

import { motion } from 'framer-motion';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import TeamSection from '@/components/TeamSection';
import AgentGrid from '@/components/AgentGrid';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 mi-grid-pattern opacity-50 pointer-events-none" />
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-mi-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-mi-purple/10 rounded-full blur-3xl pointer-events-none" />
      
      {/* Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        <Stats />
        <TeamSection />
        <AgentGrid />
        <CTASection />
        <Footer />
      </motion.div>
    </main>
  );
}
