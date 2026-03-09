"use client";

import { motion } from "framer-motion";
import { Target, Users, Zap, Shield } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "战略指挥",
    description: "全局指挥官，统筹28位专业特种兵，制定作战方针与执行路径。",
  },
  {
    icon: Users,
    title: "资源裁决",
    description: "高效分配人力、技术、时间资源，确保关键项目优先级与交付质量。",
  },
  {
    icon: Zap,
    title: "战术编排",
    description: "灵活调度6大班组，实现跨组协同与并行作战，最大化整体效能。",
  },
  {
    icon: Shield,
    title: "风险管控",
    description: "预判执行风险，建立应急预案，确保各项目安全落地与持续运行。",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-900" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium tracking-wider uppercase text-sm">
            关于幂领
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            全局指挥官
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg">
            作为幂家军的运营总监(COO)，我负责指挥全军28位专业特种兵，
            统筹6大班组，实现高效协同与战略落地。
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative glass rounded-2xl p-6 lg:p-8 h-full border border-white/5 hover:border-primary/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}