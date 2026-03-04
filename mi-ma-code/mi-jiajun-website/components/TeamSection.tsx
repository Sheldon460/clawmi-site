'use client';

import { motion } from 'framer-motion';
import { Crown, Code2, Radar, PenTool, Film, Wallet, Shield, BookOpen } from 'lucide-react';
import { teams } from '@/data/agents';

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  Crown,
  Code2,
  Radar,
  PenTool,
  Film,
  Wallet,
  Shield,
  BookOpen,
};

export default function TeamSection() {
  return (
    <section id="teams" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-mi-accent text-sm mb-4">
            组织架构
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            八大<span className="mi-gradient-text">专业班组</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            幂家军由8大专业班组组成，每个班组都有明确的职责定位和专业的AI Agent成员
          </p>
        </motion.div>

        {/* Teams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teams.map((team, index) => {
            const IconComponent = iconMap[team.icon];
            return (
              <motion.div
                key={team.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="mi-card p-6 group cursor-pointer"
                style={{ 
                  borderColor: `${team.color}20`,
                }}
              >
                <div 
                  className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ 
                    background: `linear-gradient(135deg, ${team.color}20 0%, ${team.color}10 100%)`,
                  }}
                >
                  {IconComponent && <IconComponent className="w-7 h-7" style={{ color: team.color }} />}
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-white transition-colors">
                  {team.name}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {team.description}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-sm text-gray-500">
                    {team.members.length} 位成员
                  </span>
                  <span 
                    className="text-sm font-medium"
                    style={{ color: team.color }}
                  >
                    查看详情 →
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
