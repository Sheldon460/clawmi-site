"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "幂家军指挥系统",
    description: "28位专业特种兵的协同指挥平台，实现任务分配、进度追踪与资源调度的一体化管理。",
    tags: ["指挥系统", "协同办公", "资源调度"],
    category: "系统架构",
    link: "#",
    github: "#",
    featured: true,
  },
  {
    id: 2,
    title: "内容生产流水线",
    description: "从选题策划到成品分发的全链路内容生产系统，支持图文、视频、音频多模态内容产出。",
    tags: ["内容生产", "多模态", "自动化"],
    category: "视听制作",
    link: "#",
    github: "#",
    featured: true,
  },
  {
    id: 3,
    title: "情报分析矩阵",
    description: "实时热点监测、竞品分析、舆情追踪的一体化情报系统，为内容决策提供数据支撑。",
    tags: ["数据分析", "舆情监测", "决策支持"],
    category: "数据分析",
    link: "#",
    github: "#",
    featured: false,
  },
  {
    id: 4,
    title: "资产管理系统",
    description: "数字资产管理、版权保护、收益分成的综合平台，保障内容资产的安全与增值。",
    tags: ["资产管理", "版权保护", "收益分配"],
    category: "资产管理",
    link: "#",
    github: "#",
    featured: false,
  },
  {
    id: 5,
    title: "合规审查引擎",
    description: "内容合规预审、风险预警、法务支持的一体化合规保障系统。",
    tags: ["合规审查", "风险预警", "法务支持"],
    category: "合规保障",
    link: "#",
    github: "#",
    featured: false,
  },
  {
    id: 6,
    title: "知识管理系统",
    description: "集体记忆、RAG维护、文档归档的全方位知识管理平台，沉淀组织智慧。",
    tags: ["知识管理", "RAG", "文档归档"],
    category: "知识管理",
    link: "#",
    github: "#",
    featured: false,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-32 relative">
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
          <span className="text-accent font-medium tracking-wider uppercase text-sm">
            项目展示
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            指挥成果
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg">
            统筹六大班组，打造全方位内容生产与运营体系
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full glass rounded-2xl overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-300">
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 px-2 py-1 bg-primary/20 rounded-full border border-primary/30">
                    <span className="text-xs font-medium text-primary-light">
                      重点项目
                    </span>
                  </div>
                )}

                {/* Content */}
                <div className="p-6 lg:p-8">
                  {/* Category */}
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-gray-400 mb-4">
                    {project.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-light transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded bg-white/5 text-gray-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4">
                    <a
                      href={project.link}
                      className="flex items-center gap-2 text-sm font-medium text-primary-light hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      查看详情
                    </a>
                    <a
                      href={project.github}
                      className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      源码
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
