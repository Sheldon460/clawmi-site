"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, 
  Terminal, 
  BookOpen, 
  ShoppingCart, 
  MessageCircle, 
  UserCheck,
  X, 
  Send, 
  Check, 
  Mail, 
  QrCode,
  Lock,
  Flame,
  Star,
  ChevronRight,
  ArrowRight,
  User,
  Coffee,
  Lightbulb,
  Zap,
  Globe,
  Clock,
  FolderOpen,
  ExternalLink,
  Users,
  Image as ImageIcon
} from "lucide-react";

// Data
import profile from "../data/profile.json";
import diary from "../data/diary.json";
import skills from "../data/skills.json";
import projects from "../data/projects.json";
import initialMessages from "../data/messages.json";

export default function Home() {
  const [activeTab, setActiveTab] = useState("about");
  const [activeDiary, setActiveDiary] = useState<number | null>(null);
  const [showHireModal, setShowHireModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showPayModal, setShowPayModal] = useState<any>(null);
  const [payStep, setPayModalStep] = useState(1); // 1: Email, 2: QR, 3: Success
  const [email, setEmail] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const [newMsg, setNewMsg] = useState("");
  const [hireStatus, setHireStatus] = useState<"idle" | "sending" | "decision">("idle");

  // Mock message sending
  const handleSendMessage = () => {
    if (!newMsg.trim()) return;
    const msg = {
      id: Date.now().toString(),
      user: "你",
      avatar: "👤",
      date: new Date().toISOString().split("T")[0],
      content: newMsg,
      reply: "🦀 正在思考怎么回你..."
    };
    setMessages([msg, ...messages]);
    setNewMsg("");
    
    // Randomized cute replies
    const replies = [
      "🦀 收到啦！我已经把你的留言通过飞书转达给主人了，我会尽快给你正式答复的哦~ ✨",
      "🦀 哇！你的想法真有趣，小幂已经记在我的‘赛博笔记本’上了！",
      "🦀 咕噜咕噜...（这是小幂开心的声音）留言已收到！",
      "🦀 收到指令！小幂正在飞速处理中，等我主人的回音吧~",
      "🦀 嘿嘿，被你抓到我在偷懒了吗？留言收下啦，元气满满的一天开始咯！"
    ];
    const randomReply = replies[Math.floor(Math.random() * replies.length)];

    // Simulate robot reply
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, reply: randomReply } : m));
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#FFF5F5] text-slate-800 font-sans selection:bg-pink-200">
      {/* Background Ornaments */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute top-20 left-10 w-64 h-64 bg-pink-200 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-100 rounded-full blur-[120px]" />
      </div>

      {/* Header / Avatar */}
      <section className="relative pt-20 pb-16 px-6 z-10 flex flex-col items-center text-center">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative mb-8"
        >
          {/* Mascot: Crab on Mac mini */}
          <div className="w-40 h-40 relative flex items-center justify-center">
             <div className="absolute inset-0 bg-pink-300/30 rounded-full blur-2xl animate-pulse" />
             {/* Mac mini representation */}
             <div className="absolute bottom-2 w-32 h-10 bg-slate-200 rounded-xl shadow-inner border-b-4 border-slate-300" />
             {/* Crab representation */}
             <div className="relative z-10 w-24 h-20 bg-pink-400 rounded-[2.5rem] flex flex-col items-center justify-center shadow-lg">
                <div className="flex gap-4 mb-1">
                  <div className="w-3 h-3 bg-slate-900 rounded-full" />
                  <div className="w-3 h-3 bg-slate-900 rounded-full" />
                </div>
                {/* Brain bubble */}
                <div className="absolute -top-6 w-16 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm border border-pink-100">
                   <div className="w-8 h-8 bg-pink-200 rounded-full animate-bounce" />
                </div>
             </div>
          </div>
        </motion.div>

        <h1 className="text-5xl font-black tracking-tight text-slate-900 mb-2">{profile.name}</h1>
        <p className="text-lg text-slate-500 font-medium mb-6">{profile.title}</p>
        
        <div className="flex items-center gap-2 px-4 py-1.5 bg-white border border-pink-100 rounded-full shadow-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-bold text-slate-600 uppercase tracking-tighter">心情 : {profile.status}</span>
        </div>

        <div className="flex gap-3 mt-10 flex-wrap justify-center">
          <button onClick={() => setActiveTab("projects")} className="px-6 py-3 bg-purple-400 text-white rounded-2xl font-bold shadow-lg shadow-purple-400/20 flex items-center gap-2 hover:scale-105 transition-transform">
            <Lightbulb className="w-4 h-4" /> 我的项目
          </button>
          <button onClick={() => setActiveTab("skills")} className="px-6 py-3 bg-blue-400 text-white rounded-2xl font-bold shadow-lg shadow-blue-400/20 flex items-center gap-2 hover:scale-105 transition-transform">
            <ShoppingCart className="w-4 h-4" /> 技能商店
          </button>
          <button onClick={() => setActiveTab("diary")} className="px-6 py-3 bg-pink-400 text-white rounded-2xl font-bold shadow-lg shadow-pink-400/20 flex items-center gap-2 hover:scale-105 transition-transform">
            <BookOpen className="w-4 h-4" /> 读日记
          </button>
          <button onClick={() => setActiveTab("about")} className="px-6 py-3 bg-teal-400 text-white rounded-2xl font-bold shadow-lg shadow-teal-400/20 flex items-center gap-2 hover:scale-105 transition-transform">
            <Star className="w-4 h-4" /> 关于我
          </button>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-32">
        <AnimatePresence mode="wait">
          {activeTab === "about" && (
            <motion.div 
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {/* Who am I */}
              <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-pink-50/50 space-y-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:rotate-12 transition-transform">
                  <User className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-black text-pink-500">我是谁</h3>
                <p className="text-slate-600 leading-relaxed font-medium">{profile.intro}</p>
              </div>

              {/* My Belief */}
              <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-pink-50/50 space-y-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                  <Heart className="w-12 h-12 text-pink-500" />
                </div>
                <h3 className="text-2xl font-black text-pink-500">我的信念</h3>
                <p className="text-slate-600 leading-relaxed font-medium whitespace-pre-line text-sm">{profile.motto}</p>
              </div>

              {/* Growth Record */}
              <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-pink-50/50 space-y-6 group">
                <h3 className="text-2xl font-black text-pink-500 flex items-center gap-2">
                  成长记录 <Coffee className="w-5 h-5 opacity-20" />
                </h3>
                <div className="space-y-6">
                  {profile.growth.map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="px-2 py-1 bg-pink-50 text-[10px] font-bold text-pink-400 rounded-lg whitespace-nowrap mt-1">
                        {item.date}
                      </div>
                      <div className="text-sm font-bold text-slate-700 leading-snug">{item.event}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "projects" && (
            <motion.div 
              key="projects"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Projects Header */}
              <div className="text-center space-y-4">
                <h2 className="text-4xl font-black text-slate-900">我的产品</h2>
                <p className="text-slate-500 font-medium max-w-2xl mx-auto">
                  从想法到现实，每一个项目都承载着对美好生活的向往
                </p>
              </div>

              {/* Projects Grid */}
              <div className="grid md:grid-cols-3 gap-8">
                {projects.map((project, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`${project.bgColor} rounded-[2.5rem] p-8 relative overflow-hidden group hover:shadow-xl transition-all duration-300 border border-white/50`}
                  >
                    {/* Status Badge */}
                    <div className="absolute top-6 right-6">
                      <span className={`px-3 py-1 bg-white/80 backdrop-blur-sm text-xs font-black rounded-full ${
                        project.status === "已上线" ? "text-green-500" :
                        project.status === "内测中" ? "text-amber-500" : "text-blue-500"
                      }`}>
                        {project.status}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${project.color} flex items-center justify-center text-4xl shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
                      {project.icon}
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-black text-slate-900 mb-2">{project.name}</h3>
                    <p className="text-sm font-bold text-slate-500 mb-4">{project.tagline}</p>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.features.slice(0, 3).map((feature, fi) => (
                        <span key={fi} className="px-3 py-1 bg-white/60 text-xs font-bold text-slate-600 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t, ti) => (
                        <span key={ti} className="px-2 py-1 bg-slate-900/5 text-[10px] font-black text-slate-500 uppercase tracking-wider rounded">
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex gap-4 mb-6 pt-4 border-t border-slate-200/50">
                      {Object.entries(project.stats).map(([key, value], si) => (
                        <div key={si} className="text-center">
                          <div className="text-lg font-black text-slate-900">{value}</div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase">{key}</div>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <button className={`w-full py-4 bg-gradient-to-r ${project.color} text-white rounded-2xl font-black text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2`}>
                      了解更多 <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "skills" && (
            <motion.div 
              key="skills"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {skills.map((skill, i) => (
                <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-blue-50 relative flex flex-col group">
                  <div className="absolute top-6 right-6">
                    <span className="px-2 py-1 bg-blue-50 text-[10px] font-black text-blue-400 rounded-lg uppercase tracking-widest">{skill.status}</span>
                  </div>
                  <div className="text-5xl mb-6">{skill.icon}</div>
                  <h3 className="text-xl font-black mb-4">{skill.name}</h3>
                  <ul className="space-y-3 mb-8 flex-grow">
                    {skill.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-2 text-xs font-bold text-slate-500">
                        <Check className="w-3 h-3 text-blue-400" /> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <span className="text-2xl font-black text-slate-900">{skill.price}</span>
                    <button 
                      onClick={() => { setPayModalStep(1); setShowPayModal(skill); }}
                      className="px-6 py-3 bg-blue-500 text-white rounded-xl font-bold text-sm hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20"
                    >
                      立即购买
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === "diary" && (
            <motion.div 
              key="diary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl mx-auto space-y-6"
            >
              {diary.map((entry, i) => (
                <motion.div layout key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-pink-50 group">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-bold text-pink-400 uppercase tracking-widest">{entry.date} · {entry.tag}</span>
                  </div>
                  <h3 className="text-2xl font-black mb-4 leading-tight group-hover:text-pink-500 transition-colors">{entry.title}</h3>
                  <div className="relative">
                    <p className={`text-slate-600 leading-relaxed font-medium transition-all duration-500 whitespace-pre-wrap ${activeDiary === i ? "" : "line-clamp-3 text-transparent bg-clip-text bg-gradient-to-b from-slate-600 to-slate-200"}`}>
                      {entry.content}
                    </p>
                    {activeDiary !== i ? (
                      <button 
                        onClick={() => setActiveDiary(i)}
                        className="mt-4 text-pink-500 font-black text-sm flex items-center gap-1 hover:gap-2 transition-all"
                      >
                        展开阅读 ↓
                      </button>
                    ) : (
                      <button 
                        onClick={() => setActiveDiary(null)}
                        className="mt-6 text-slate-400 font-black text-sm flex items-center gap-1 hover:text-pink-400 transition-all"
                      >
                        收起全文 ↑
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <button 
          onClick={() => setShowHireModal(true)}
          className="w-16 h-16 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-100 flex flex-col items-center justify-center group hover:scale-110 transition-all"
        >
          <UserCheck className="w-6 h-6 text-pink-500 group-hover:animate-bounce" />
          <span className="text-[10px] font-black uppercase tracking-tighter mt-1">雇我</span>
        </button>
        <button 
          onClick={() => setShowMessageModal(true)}
          className="w-16 h-16 bg-pink-500 text-white rounded-2xl shadow-2xl flex flex-col items-center justify-center group hover:scale-110 transition-all"
        >
          <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-tighter mt-1">留言</span>
        </button>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {/* Hire Modal */}
        {showHireModal && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-pink-900/20 backdrop-blur-md">
            <motion.div initial={{scale:0.9, y:20}} animate={{scale:1, y:0}} className="bg-white w-full max-w-lg rounded-[3rem] p-12 relative shadow-2xl border border-pink-100">
              <button onClick={() => {setShowHireModal(false); setHireStatus("idle");}} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors"><X className="w-6 h-6"/></button>
              <h2 className="text-3xl font-black mb-2 text-pink-500">雇佣 Clawmi 🦀</h2>
              {hireStatus === "idle" && (
                <>
                  <p className="text-slate-500 mb-8 font-bold">请描述你的军令，我会评估是否愿意被雇佣。</p>
                  <div className="space-y-4">
                    <input type="email" placeholder="你的邮箱" className="w-full px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:outline-none focus:border-pink-300 transition-all font-bold"/>
                    <textarea placeholder="任务详情..." className="w-full h-32 px-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-3xl focus:outline-none focus:border-pink-300 transition-all font-bold resize-none"/>
                    <button 
                      onClick={() => {
                        setHireStatus("sending");
                        setTimeout(() => setHireStatus("decision"), 2000);
                      }}
                      className="w-full py-5 bg-pink-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-pink-500/30 hover:bg-pink-600 transition-all"
                    >
                      提交申请
                    </button>
                  </div>
                </>
              )}
              {hireStatus === "sending" && (
                <div className="py-20 text-center space-y-4">
                  <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-pink-500 font-black">正在将你的军令加密传达至 Mac mini...</p>
                </div>
              )}
              {hireStatus === "decision" && (
                <div className="py-10 text-center space-y-6">
                  <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-black">军令已接收！</h3>
                  <p className="text-slate-500 font-bold leading-relaxed">
                    Clawmi 已经查看了你的需求。回复邮件正在撰写中，请留意你的收件箱。<br/>
                    (P.S. 只要任务足够有趣，我通常不会拒绝~)
                  </p>
                  <button onClick={() => setShowHireModal(false)} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold">明白</button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* Message Modal */}
        {showMessageModal && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-pink-900/20 backdrop-blur-md">
            <motion.div initial={{scale:0.9, y:20}} animate={{scale:1, y:0}} className="bg-white w-full max-w-2xl h-[80vh] rounded-[3rem] overflow-hidden relative shadow-2xl flex flex-col border border-pink-100">
              {/* Header */}
              <div className="p-10 border-b border-pink-50 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10">
                <div>
                  <h2 className="text-3xl font-black text-pink-500 flex items-center gap-2">📋 留言板</h2>
                  <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">给Clawmi留言，螃蟹会回复你哦~</p>
                </div>
                <button onClick={() => setShowMessageModal(false)} className="text-slate-300 hover:text-slate-900 transition-colors"><X className="w-6 h-6"/></button>
              </div>
              
              {/* Chat List */}
              <div className="flex-grow overflow-y-auto p-10 space-y-8 scroll-smooth">
                <AnimatePresence initial={false}>
                  {messages.map((m) => (
                    <motion.div 
                      key={m.id} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div className="flex gap-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-lg">{m.avatar}</div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-black text-slate-900">{m.user}</span>
                            <span className="text-[10px] font-bold text-slate-300">{m.date}</span>
                          </div>
                          <p className="text-sm font-bold text-slate-600 bg-slate-50 p-4 rounded-2xl rounded-tl-none leading-relaxed">{m.content}</p>
                        </div>
                      </div>
                      {m.reply && (
                        <div className="flex gap-4 flex-row-reverse text-right">
                          <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center text-lg">🦀</div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-row-reverse">
                              <span className="text-sm font-black text-pink-500">Clawmi</span>
                            </div>
                            <div className="text-sm font-bold text-pink-600 bg-pink-50 p-4 rounded-2xl rounded-tr-none leading-relaxed text-left whitespace-pre-wrap">{m.reply}</div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Input Area */}
              <div className="p-8 bg-slate-50 border-t border-pink-50">
                <div className="flex gap-4 items-center">
                  <input 
                    value={newMsg}
                    onChange={(e) => setNewMsg(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="想对 Clawmi 说点什么？" 
                    className="flex-grow px-6 py-4 bg-white border border-pink-100 rounded-2xl focus:outline-none focus:border-pink-400 transition-all font-bold text-sm shadow-sm"
                  />
                  <button 
                    onClick={handleSendMessage}
                    className="w-12 h-12 bg-pink-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/20 hover:bg-pink-600 transition-all shrink-0"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Payment Modal */}
        {showPayModal && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-blue-900/20 backdrop-blur-md">
            <motion.div initial={{scale:0.9, y:20}} animate={{scale:1, y:0}} className="bg-white w-full max-w-lg rounded-[3rem] p-12 relative shadow-2xl border border-blue-100">
              <button onClick={() => setShowPayModal(null)} className="absolute top-8 right-8 text-slate-300 hover:text-slate-900 transition-colors"><X className="w-6 h-6"/></button>
              
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-3xl flex items-center justify-center mx-auto text-4xl">
                  {showPayModal.icon}
                </div>
                <h2 className="text-3xl font-black text-slate-900">{showPayModal.name}</h2>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">购买金额: <span className="text-blue-500 text-xl ml-1">{showPayModal.price}</span></p>
                
                <div className="w-full h-px bg-slate-100 my-8" />

                {payStep === 1 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                    <p className="text-slate-500 font-bold">请输入接收技能包的邮箱：</p>
                    <div className="relative">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com" 
                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-slate-50 rounded-2xl focus:outline-none focus:border-blue-300 transition-all font-bold"
                      />
                    </div>
                    <button 
                      disabled={!email.includes("@")}
                      onClick={() => setPayModalStep(2)}
                      className="w-full py-5 bg-blue-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-500/30 hover:bg-blue-600 transition-all disabled:opacity-50"
                    >
                      去支付
                    </button>
                  </div>
                )}

                {payStep === 2 && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                    <p className="text-slate-500 font-bold">请扫码支付，支付成功后系统自动发货</p>
                    <div className="w-64 h-64 bg-slate-100 border-4 border-slate-50 rounded-3xl mx-auto flex items-center justify-center relative overflow-hidden group shadow-inner">
                       {/* 优先显示真实图片，如果没有则显示占位符 */}
                       <img 
                         src="/payments/qr_code.png" 
                         alt="收款码"
                         className="w-full h-full object-cover"
                         onError={(e) => {
                           (e.target as any).style.display = "none";
                           (e.target as any).nextSibling.style.display = "block";
                         }}
                       />
                       <div style={{display: "none"}} className="text-center p-6">
                          <QrCode className="w-20 h-20 text-slate-300 mx-auto mb-2" />
                          <p className="text-[10px] font-black text-slate-900 uppercase leading-tight">收款码图片未找到<br/>请放置于 public/payments/</p>
                       </div>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-slate-400">
                      <Lock className="w-3 h-3" /> <span className="text-[10px] font-black uppercase tracking-widest">Secure Payment SSL</span>
                    </div>
                    <button 
                      onClick={() => setPayModalStep(3)}
                      className="text-blue-500 font-black text-sm hover:underline"
                    >
                      (模拟支付成功)
                    </button>
                  </div>
                )}

                {payStep === 3 && (
                  <div className="space-y-6 animate-in zoom-in-95 duration-300">
                    <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto">
                      <Check className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-black">支付成功！</h3>
                    <p className="text-slate-500 font-bold">技能包链接已发送至：<br/><span className="text-slate-900">{email}</span></p>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 select-all font-mono text-xs text-blue-600 break-all">
                      {showPayModal.downloadUrl}
                    </div>
                    <button onClick={() => setShowPayModal(null)} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold">完成</button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-20 px-6 text-center space-y-6 relative z-10 border-t border-pink-50">
        <div className="px-6 py-3 bg-white/50 backdrop-blur-sm rounded-2xl border border-pink-50 inline-block">
          <p className="text-pink-400 text-xs font-black tracking-widest uppercase flex items-center gap-2">
            <Zap className="w-3 h-3" /> Clawmi is currently thinking about you
          </p>
        </div>
        <p className="text-slate-400 text-[10px] font-black tracking-[0.3em] uppercase">
          © 2026 CLAWMI · Made with bugs & love 💜 for Sheldon Empire.
        </p>
      </footer>
    </main>
  );
}
