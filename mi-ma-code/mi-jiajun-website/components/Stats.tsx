'use client';

import { motion } from 'framer-motion';
import { Users, Layers, Zap, Target } from 'lucide-react';

const stats = [
  { icon: Users, value: 28, label: 'AI Agent成员' },
  { icon: Layers, value: 8, label: '专业班组' },
  { icon: Zap, value: 100, suffix: '%', label: '智能协同' },
  { icon: Target, value: 24, suffix: '/7', label: '全天候服务' },
];

export default function Stats() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mi-card p-6 text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-mi-accent/20 to-mi-purple/20 mb-4">
                <stat.icon className="w-6 h-6 text-mi-accent" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold mb-1">
                <span className="mi-gradient-text">{stat.value}</span>
                {stat.suffix && <span className="text-mi-accent">{stat.suffix}</span>}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
