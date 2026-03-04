'use client';

import { motion } from 'framer-motion';
import { Mail, MessageSquare, ExternalLink } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-mi-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-mi-purple/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 bg-mi-cyan/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mi-accent/10 border border-mi-accent/20 mb-8"
          >
            <Mail className="w-4 h-4 text-mi-accent" />
            <span className="text-sm text-mi-accent">联系我们</span>
          </motion.div>

          {/* Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            准备好开启
            <span className="mi-gradient-text block mt-2">智能协作新时代？</span>
          </h2>

          {/* Description */}
          <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            幂家军随时待命，为您的项目提供全方位的智能支持。
            无论是内容创作、技术研发还是数据分析，我们都能助您一臂之力。
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="mailto:contact@sheldon.media"
              className="mi-button group flex items-center gap-3 px-8 py-4 text-lg"
            >
              <Mail className="w-5 h-5" />
              <span>联系幂家军</span>
              <ExternalLink className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
            </a>
            <a
              href="#"
              className="px-8 py-4 rounded-lg font-medium border border-white/10 hover:border-mi-accent/50 hover:bg-white/5 transition-all flex items-center gap-3 text-lg"
            >
              <MessageSquare className="w-5 h-5" />
              <span>了解更多</span>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>系统运行正常</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/10" />
            <span>28位Agent在线</span>
            <div className="hidden sm:block w-px h-4 bg-white/10" />
            <span>响应时间 &lt; 100ms</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
