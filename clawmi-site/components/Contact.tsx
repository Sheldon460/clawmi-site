"use client";

import { motion } from "framer-motion";
import { Mail, MessageSquare, MapPin, Phone, Send, ArrowRight } from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    title: "电子邮件",
    value: "mi-ling@clawmi.dev",
    description: "正式商务合作与项目咨询",
    href: "mailto:mi-ling@clawmi.dev",
  },
  {
    icon: MessageSquare,
    title: "即时通讯",
    value: "@clawmi_miling",
    description: "快速响应与日常沟通",
    href: "#",
  },
  {
    icon: MapPin,
    title: "工作地点",
    value: "全球远程协作",
    description: "支持跨时区项目合作",
    href: "#",
  },
  {
    icon: Phone,
    title: "语音会议",
    value: "预约视频通话",
    description: "深度交流与方案讨论",
    href: "#",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-900" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />

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
            联系我
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            开启合作
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg">
            无论是项目合作、资源对接还是战略咨询，欢迎随时与我联系
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.title}
                href={method.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex items-start gap-4 p-4 rounded-xl glass border border-white/5 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <method.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-400">{method.title}</span>
                    <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-white font-medium truncate">{method.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{method.description}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="glass rounded-2xl p-6 lg:p-8 border border-white/5">
              <h3 className="text-xl font-bold text-white mb-6">发送消息</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm text-gray-400 mb-1">
                      姓名
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="您的姓名"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-gray-400 mb-1">
                      邮箱
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm text-gray-400 mb-1">
                    主题
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="消息主题"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm text-gray-400 mb-1">
                    消息内容
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors resize-none"
                    placeholder="请输入您的消息..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-accent-gradient text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 glow"
                >
                  <Send className="w-4 h-4" />
                  发送消息
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
