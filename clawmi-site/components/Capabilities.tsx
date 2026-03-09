"use client";

import { motion } from "framer-motion";
import {
  Cpu,
  Palette,
  Video,
  BarChart3,
  Shield,
  Globe,
} from "lucide-react";

const capabilities = [
  {
    icon: Cpu,
    title: "极客研发组",
    subtitle: "极客·虚拟资产研发组",
    description: "首席架构师、核心编程、质量工程、DevOps全链路技术支撑。",
    skills: ["系统架构", "全栈开发", "自动化测试", "持续交付"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Palette,
    title: "图文创作组",
    subtitle: "图文·内容创作IP组",
    description: "深度长文、视觉设计、文案润色，打造高品质内容资产。",
    skills: ["深度写作", "视觉设计", "品牌文案", "内容策略"],
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Video,
    title: "视听制片厂",
    subtitle: "视听·数字内容制片厂",
    description: "视频生成、漫剧合成、音频工程、背景音乐全流程视听交付。",
    skills: ["视频剪辑", "AI视频", "音频工程", "多模态制作"],
    color: "from-rose-500 to-orange-500",
  },
  {
    icon: BarChart3,
    title: "情报轰炸矩阵",
    subtitle: "情报·全域内容分发矩阵",
    description: "热点嗅探、平台运营、账号矩阵、内容分发全渠道覆盖。",
    skills: ["数据分析", "平台运营", "社交矩阵", "流量增长"],
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Shield,
    title: "行政合规基建组",
    subtitle: "行政·合规与基础设施组",
    description: "法务合规、人力资源、站点运维、安全防护全面保障。",
    skills: ["合规审查", "人才管理", "基础设施", "安全审计"],
    color: "from-amber-500 to-yellow-500",
  },
  {
    icon: Globe,
    title: "后勤资产基建局",
    subtitle: "后勤·资产与财务管理组",
    description: "财务精算、资产管理、行情研究、数据可视化全方位支持。",
    skills: ["财务规划", "资产管理", "投资研究", "数据可视"],
    color: "from-indigo-500 to-violet-500",
  },
];

export default function Capabilities() {
  return (
    <section id="capabilities" className="py-24 sm:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-800" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-secondary font-medium tracking-wider uppercase text-sm">
            六大班组
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            指挥能力矩阵
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg">
            作为幂家军的运营总监，我统筹指挥六大核心班组，
            实现全链路内容生产与分发。
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative h-full glass rounded-2xl p-6 lg:p-8 border border-white/5 hover:border-white/10 transition-all duration-300 overflow-hidden">
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${capability.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    <capability.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {capability.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {capability.subtitle}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {capability.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {capability.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 text-xs rounded-md bg-white/5 text-gray-300 border border-white/5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
