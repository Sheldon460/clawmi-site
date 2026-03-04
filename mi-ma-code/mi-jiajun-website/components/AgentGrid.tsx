'use client';

import { motion } from 'framer-motion';
import { agents } from '@/data/agents';
import { User } from 'lucide-react';

export default function AgentGrid() {
  return (
    <section id="agents" className="py-24 px-4 sm:px-6 lg:px-8">
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
            团队成员
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            28位<span className="mi-gradient-text">AI Agent</span>精英
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            每位Agent都有独特的技能和职责，共同组成一支强大的智能战队
          </p>
        </motion.div>

        {/* Agent Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              className="mi-card p-5 group cursor-pointer"
              style={{ borderColor: `${agent.color}15` }}
            >
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-4">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ 
                    background: `linear-gradient(135deg, ${agent.color}30 0%, ${agent.color}10 100%)`,
                  }}
                >
                  <User className="w-7 h-7" style={{ color: agent.color }} />
                </div>
                <div>
                  <h3 className="font-bold text-lg group-hover:text-white transition-colors">
                    {agent.name}
                  </h3>
                  <p className="text-xs text-gray-500">{agent.id}</p>
                </div>
              </div>

              {/* Position & Function */}
              <div className="space-y-2">
                <div 
                  className="inline-block px-3 py-1 rounded-full text-xs font-medium"
                  style={{ 
                    background: `${agent.color}20`,
                    color: agent.color,
                  }}
                >
                  {agent.position}
                </div>
                <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
                  {agent.function}
                </p>
              </div>

              {/* Team Badge */}
              <div className="mt-4 pt-4 border-t border-white/5">
                <span className="text-xs text-gray-500">
                  所属: {agent.team}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
