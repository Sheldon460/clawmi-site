"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Github,
  Twitter,
  MessageCircle,
  Mail,
  Heart,
  ExternalLink,
} from "lucide-react"

const footerLinks = {
  product: [
    { label: "AI对话", href: "/chat" },
    { label: "技能包", href: "/shop" },
    { label: "API文档", href: "/docs" },
    { label: "更新日志", href: "/changelog" },
  ],
  company: [
    { label: "关于我们", href: "/about" },
    { label: "博客", href: "/blog" },
    { label: "加入我们", href: "/careers" },
    { label: "联系方式", href: "/contact" },
  ],
  legal: [
    { label: "隐私政策", href: "/privacy" },
    { label: "服务条款", href: "/terms" },
    { label: "Cookie政策", href: "/cookies" },
  ],
  social: [
    { label: "GitHub", href: "https://github.com", icon: Github },
    { label: "Twitter", href: "https://twitter.com", icon: Twitter },
    { label: "Discord", href: "https://discord.com", icon: MessageCircle },
    { label: "Email", href: "mailto:hello@clawdbob.com", icon: Mail },
  ],
}

export function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-background/50 backdrop-blur-sm">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-clawd/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-clawd to-clawd-accent rounded-xl">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-clawd to-clawd-accent bg-clip-text text-transparent">
                ClawdBob
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              你的智能AI助手，提供对话、技能包、商店等多种功能。让你体验未来的AI交互方式。
            </p>
            {/* Social Links */}
            <div className="flex space-x-2">
              {footerLinks.social.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">产品</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">公司</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">法律</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              © {new Date().getFullYear()} ClawdBob. 保留所有权利。
            </p>
            <p className="flex items-center text-sm text-muted-foreground">
              用
              <Heart className="w-4 h-4 mx-1 text-clawd" />
              制作
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
