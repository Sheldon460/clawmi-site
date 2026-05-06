'use client'

import { useState } from 'react'

// 31 道题目数据
const questions = [
  {
    id: 1,
    title: '当你发现朋友在背后议论你，你会：',
    options: [
      { code: 'A', text: '直接找他对质，问个清楚' },
      { code: 'B', text: '表面装作不知道，暗中记仇' },
      { code: 'C', text: '反思自己是不是做错了什么' },
      { code: 'D', text: '当场翻脸，拉黑删除一条龙' }
    ],
    dimensions: ['E', 'I', 'N', 'S']
  },
  {
    id: 2,
    title: '聚会时，你通常扮演什么角色？',
    options: [
      { code: 'A', text: '控场王，话题中心' },
      { code: 'B', text: '安静听，偶尔点头' },
      { code: 'C', text: '默默观察谁在搞事情' },
      { code: 'D', text: '躲在角落，希望没人注意我' }
    ],
    dimensions: ['E', 'I', 'F', 'T']
  },
  {
    id: 3,
    title: '面对deadline，你的状态是：',
    options: [
      { code: 'A', text: '提前很久就搞完，稳得很' },
      { code: 'B', text: '最后一刻疯狂补' },
      { code: 'C', text: '经常忘记，第二天早上才想起来' },
      { code: 'D', text: '根本不在意，爱咋咋地' }
    ],
    dimensions: ['J', 'P', 'N', 'S']
  },
  {
    id: 4,
    title: '别人对你的评价通常是：',
    options: [
      { code: 'A', text: '靠谱，值得信赖' },
      { code: 'B', text: '有点怪，但还好' },
      { code: 'C', text: '想太多，活得累' },
      { code: 'D', text: '很难懂，不知道在想什么' }
    ],
    dimensions: ['F', 'T', 'N', 'S']
  },
    // 继续添加更多题目...
  {
    id: 5,
    title: '看到路边有人摔倒了，你的第一反应是：',
    options: [
      { code: 'A', text: '立刻冲上去扶起' },
      { code: 'B', text: '站在旁边观察情况' },
      { code: 'C', text: '假装没看见，快速离开' },
      { code: 'D', text: '拿出手机拍照录像' }
    ],
    dimensions: ['F', 'T', 'N', 'S']
  },
  {
    id: 6,
    title: '你的手机里主要是：',
    options: [
      { code: 'A', text: '工作群，各种消息' },
      { code: 'B', text: '表情包，memes' },
      { code: 'C', text: '学习资料，笔记' },
      { code: 'D', text: '空白，很少聊天' }
    ],
    dimensions: ['E', 'I', 'N', 'S']
  },
  {
    id: 7,
    title: '周末通常会怎么过？',
    options: [
      { code: 'A', text: '约朋友出去嗨' },
      { code: 'B', text: '宅在家里打游戏/追剧' },
      { code: 'C', text: '学习，提升自己' },
      { code: 'D', text: '睡觉，补觉' }
    ],
    dimensions: ['E', 'I', 'J', 'P']
  },
  {
    id: 8,
    title: '做决定时，你倾向于：',
    options: [
      { code: 'A', text: '快准狠，不纠结' },
      { code: 'B', text: '反复权衡，怕出错' },
      { code: 'C', text: '问朋友意见' },
      { code: 'D', text: '听天由命，随便' }
    ],
    dimensions: ['T', 'F', 'J', 'P']
  },
  {
    id: 9,
    title: '面对陌生环境，你会：',
    options: [
      { code: 'A', text: '主动探索，不害怕' },
      { code: 'B', text: '谨慎观察，确保安全' },
      { code: 'C', text: '紧张，想快点离开' },
      { code: 'D', text: '完全不在乎，该干嘛' }
    ],
    dimensions: ['E', 'I', 'N', 'S']
  },
  {
    id: 10,
    title: '朋友吵架，你会：',
    options: [
      { code: 'A', text: '两边都劝，当和事佬' },
      { code: 'B', text: '保持中立，不掺和' },
      { code: 'C', text: '站自己觉得对的一方' },
      { code: 'D', text: '看热闹，不说话' }
    ],
    dimensions: ['F', 'T', 'N', 'S']
  },
  {
    id: 11,
    title: '你的梦想是：',
    options: [
      { code: 'A', text: '改变世界' },
      { code: 'B', text: '过上小确幸的生活' },
      { code: 'C', text: '成为有钱人' },
      { code: 'D', text: '没有梦想，活着就行' }
    ],
    dimensions: ['N', 'S', 'E', 'I']
  },
  {
    id: 12,
    title: '被批评时，你的反应是：',
    options: [
      { code: 'A', text: '认真反思，努力改进' },
      { code: 'B', text: '表面接受，内心不服' },
      { code: 'C', text: '当场反驳，维护自己' },
      { code: 'D', text: '完全不在意，左耳进右耳出' }
    ],
    dimensions: ['F', 'T', 'E', 'I']
  },
  {
    id: 13,
    title: '看视频时，你偏爱：',
    options: [
      { code: 'A', text: '搞笑段子，娱乐至上' },
      { code: 'B', text: '知识科普，学习' },
      { code: 'C', text: '游戏直播，技术' },
      { code: 'D', text: '根本不看视频' }
    ],
    dimensions: ['N', 'S', 'E', 'I']
  },
  {
    id: 14,
    title: '遇到困难，你会：',
    options: [
      { code: 'A', text: '自己硬刚，不服输' },
      { code: 'B', text: '找朋友帮忙' },
      { code: 'C', text: '绕道而行，换方法' },
      { code: 'D', text: '直接放弃，不折腾' }
    ],
    dimensions: ['T', 'F', 'J', 'P']
  },
  {
    id: 15,
    title: '你的性格标签是：',
    options: [
      { code: 'A', text: '阳光开朗' },
      { code: 'B', text: '沉稳内敛' },
      { code: 'C', text: '敏感多疑' },
      { code: 'D', text: '冷漠疏离' }
    ],
    dimensions: ['E', 'I', 'N', 'S']
  }
]

// 16 种人格类型定义
const personalityTypes = [
  {
    code: 'SI',
    name: '死者',
    desc: '你已经死了，只是自己不知道。在这个荒诞的世界里，你像行尸走肉一样活着，没有灵魂，没有目标，只是活着而已。',
    dimensions: { E: 1, I: 10, N: 2, S: 9, T: 3, F: 2, J: 4, P: 7 }
  },
  {
    code: 'CZ',
    name: '草者',
    desc: '你是一棵草，任人践踏，但依然顽强地活着。你习惯了被忽视，被伤害，但你从不放弃，因为你知道活着就是胜利。',
    dimensions: { E: 2, I: 9, N: 3, S: 8, T: 2, F: 8, J: 3, P: 8 }
  },
  {
    code: 'ML',
    name: '吗喽',
    desc: '你就是吗喽，你的人生就是一场连续的"？？？"。你总是很疑惑，很困惑，不知道发生了什么，但你能笑嘻嘻地继续生活。',
    dimensions: { E: 3, I: 8, N: 9, S: 2, T: 2, F: 9, J: 2, P: 9 }
  },
  {
    code: 'YD',
    name: '屌丝',
    desc: '你是一个屌丝，你知道自己很屌，但你从不自卑。你用幽默和自嘲来对抗这个操蛋的世界，你活得真实，活得快乐。',
    dimensions: { E: 4, I: 7, N: 4, S: 7, T: 9, F: 2, J: 4, P: 7 }
  },
  {
    code: 'HHH',
    name: '傻逼',
    desc: '你是个傻逼，你自己知道，别人也知道。但你不在乎，因为傻逼也有傻逼的快乐。你的快乐很简单，很纯粹，很令人羡慕。',
    dimensions: { E: 8, I: 3, N: 8, S: 3, T: 5, F: 6, J: 5, P: 6 }
  },
  {
    code: 'WCG',
    name: '网课',
    desc: '你就是网课，你的人生就是一连串的"哦哦哦"。你总是在学习，在进步，但你也在失去，失去生活的乐趣，失去真实的人际关系。',
    dimensions: { E: 2, I: 9, N: 3, S: 8, T: 8, F: 3, J: 9, P: 2 }
  },
  {
    code: 'ZZR',
    name: '社畜',
    desc: '你是社畜，你的人生就是工作，工作，再工作。你没有自己的生活，没有自己的时间，你是公司的一台机器，但机器也会累，会坏。',
    dimensions: { E: 3, I: 8, N: 2, S: 9, T: 9, F: 2, J: 9, P: 2 }
  },
  {
    code: 'BZJ',
    name: '暴躁姐',
    desc: '你是暴躁姐，你随时准备爆炸。你受不了任何不公，受不了任何委屈，你会当场翻脸，你会拉黑删除，你活得真实，活得硬气。',
    dimensions: { E: 10, I: 1, N: 7, S: 4, T: 7, F: 4, J: 8, P: 3 }
  },
  {
    code: 'XYS',
    name: '小透明',
    desc: '你是小透明，你总是很安静，很低调。你不喜欢被注意，不喜欢被关注，你愿意做那个在角落里默默做事的人。',
    dimensions: { E: 1, I: 10, N: 2, S: 9, T: 6, F: 5, J: 6, P: 5 }
  },
  {
    code: 'MDY',
    name: '木头人',
    desc: '你是木头人，你没有感情，没有表情。你对什么都漠不关心，对什么都无动于衷，你是一个冷漠的观察者，一个看热闹的人。',
    dimensions: { E: 2, I: 9, N: 1, S: 10, T: 10, F: 1, J: 7, P: 4 }
  },
  {
    code: 'SJZ',
    name: '神经质',
    desc: '你是神经质，你总是很紧张，很焦虑。你想太多，你怕太多，你总是在担心这个，担心那个，你活得小心翼翼，如履薄冰。',
    dimensions: { E: 3, I: 8, N: 9, S: 2, T: 4, F: 7, J: 5, P: 6 }
  },
  {
    code: 'CTJ',
    name: '天才',
    desc: '你是天才，你知道。但你的天才也是一种诅咒，因为没人理解你，没人能跟上你，你总是孤独的，总是在高处不胜寒。',
    dimensions: { E: 5, I: 6, N: 10, S: 1, T: 10, F: 1.5, J: 7, P: 4 }
  },
  {
    code: 'LHQ',
    name: '老好人',
    desc: '你是老好人，你总是很善良，很热心。你不愿意看到任何人受伤，不愿意看到任何人难过，你总是牺牲自己，成全别人。',
    dimensions: { E: 6, I: 5, N: 3, S: 8, T: 1, F: 10, J: 3, P: 8 }
  },
  {
    code: 'HML',
    name: '黑魔女',
    desc: '你是黑魔女，你总是很神秘，很诡异。别人看不懂你，跟不上你，你总是独行，总是在黑暗中守护着什么。',
    dimensions: { E: 2, I: 9, N: 8, S: 3, T: 6, F: 5, J: 4, P: 7 }
  },
  {
    code: 'CTRL',
    name: '拿捏者',
    desc: '你是拿捏者，你能拿捏一切。你掌控着局面，掌控着人心，你总是那个在幕后操作一切的人，运筹帷幄，决胜千里。',
    dimensions: { E: 7, I: 4, N: 6, S: 5, T: 8, F: 3, J: 9, P: 2 }
  },
  {
    code: 'DRNK',
    name: '酒蒙子',
    desc: '你是酒蒙子，你需要酒精才能正常运转。没有酒精，你就是一个废人；有了酒精，你就是世界的主宰。',
    dimensions: { E: 9, I: 2, N: 7, S: 4, T: 4, F: 7, J: 2, P: 9 },
    special: true // 特殊人格，需要触发条件
  }
]

export default function Home() {
  const [screen, setScreen] = useState<'intro' | 'test' | 'result'>('intro')
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [result, setResult] = useState<any>(null)

  const handleAnswer = (questionId: number, optionCode: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionCode
    }))
  }

  const handleSubmit = () => {
    // 计算结果
    const scores = {
      E: 0, I: 0, N: 0, S: 0, T: 0, F: 0, J: 0, P: 0
    }

    questions.forEach((q, index) => {
      const answer = answers[q.id]
      if (!answer) return

      const optionIndex = q.options.findIndex(o => o.code === answer)
      if (optionIndex === -1) return

      q.dimensions.forEach((dim, i) => {
        // 根据选项给维度加分
        const weight = [1, 2, 3, 4][optionIndex % 4]
        scores[dim as keyof typeof scores] += weight
      })
    })

    // 找到最匹配的人格类型
    let bestMatch = personalityTypes[0]
    let bestSimilarity = 0

    personalityTypes.forEach(type => {
      let totalDiff = 0
      Object.keys(type.dimensions).forEach(dim => {
        const dimKey = dim as keyof typeof type.dimensions
        const userScore = scores[dimKey as keyof typeof scores] / questions.length
        const typeScore = type.dimensions[dimKey] / 10
        totalDiff += Math.abs(userScore - typeScore)
      })

      const similarity = Math.max(0, 100 - totalDiff * 20)
      if (similarity > bestSimilarity) {
        bestSimilarity = similarity
        bestMatch = type
      }
    })

    setResult({
      type: bestMatch,
      similarity: bestSimilarity,
      scores
    })

    setScreen('result')
  }

  const canSubmit = questions.every(q => answers[q.id])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      {/* 首页 */}
      {screen === 'intro' && (
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-3xl shadow-lg p-8 text-center min-h-[50vh] flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
              MBTI已经过时，SBTI来了。
            </h1>
            <div className="mt-8">
              <button
                onClick={() => setScreen('test')}
                className="bg-green-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                开始测试
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 测试页面 */}
      {screen === 'test' && (
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
            {/* 进度条 */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex-1 h-2.5 bg-green-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-300 to-green-600 rounded-full transition-all duration-300"
                  style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
                />
              </div>
              <div className="text-sm text-gray-500">
                {Object.keys(answers).length} / {questions.length}
              </div>
            </div>

            {/* 问题列表 */}
            <div className="space-y-4">
              {questions.map(question => (
                <div key={question.id} className="border border-green-100 rounded-2xl p-5 bg-gradient-to-b from-white to-green-50">
                  <div className="mb-4">
                    <h3 className="text-lg leading-relaxed whitespace-pre-wrap">{question.title}</h3>
                  </div>

                  <div className="space-y-2.5">
                    {question.options.map(option => (
                      <label
                        key={option.code}
                        className={`flex items-start gap-3 p-3.5 rounded-xl border border-green-100 bg-white cursor-pointer transition-all hover:border-green-200 hover:bg-green-50 hover:-translate-y-0.5 ${
                          answers[question.id] === option.code ? 'border-green-400 bg-green-50 ring-2 ring-green-200' : ''
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={option.code}
                          checked={answers[question.id] === option.code}
                          onChange={() => handleAnswer(question.id, option.code)}
                          className="mt-1 accent-green-700 w-4 h-4"
                        />
                        <div>
                          <span className="font-bold text-green-700">{option.code}</span>
                          <span className="ml-2">{option.text}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 底部按钮 */}
            <div className="flex items-center justify-between gap-3 mt-6 flex-wrap">
              <p className="text-sm text-gray-500">
                全选完才会放行。世界已经够乱了，起码把题做完整。
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setScreen('intro')}
                  className="bg-white text-green-700 px-5 py-3 rounded-xl font-bold border border-green-200 hover:bg-gray-50 transition-all"
                >
                  返回首页
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className="bg-green-700 text-white px-5 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  提交并查看结果
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 结果页面 */}
      {screen === 'result' && result && (
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8">
            <div className="space-y-4.5">
              {/* 人格类型 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5">
                {/* 图片/海报区域 */}
                <div className="border border-green-100 rounded-2xl p-4.5 bg-gradient-to-b from-white to-green-50 min-h-[280px] flex flex-col items-center justify-center relative">
                  <div className="text-6xl md:text-7xl font-bold text-green-700 mb-3">
                    {result.type.code}
                  </div>
                  <p className="text-gray-600 text-center leading-relaxed">
                    怎么样，被我拿捏了吧？
                  </p>
                </div>

                {/* 类型信息 */}
                <div className="border border-green-100 rounded-2xl p-4.5 bg-gradient-to-b from-white to-green-50">
                  <div className="text-xs text-green-700 font-bold tracking-wider mb-2">
                    你的主类型
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight mb-2">
                    {result.type.code}（{result.type.name}）
                  </div>
                  <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-3.5 py-2.5 text-green-700 font-bold text-sm mb-2">
                    匹配度 {result.similarity.toFixed(0)}%
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mt-2">
                    维度命中度较高，当前结果可视为你的第一人格画像。
                  </p>
                </div>
              </div>

              {/* 解读 */}
              <div className="border border-green-100 rounded-2xl p-4.5 bg-gradient-to-b from-white to-green-50">
                <h3 className="text-base font-bold mb-3">该人格的简单解读</h3>
                <p className="text-gray-700 text-sm leading-[1.9] whitespace-pre-wrap">
                  {result.type.desc}
                </p>
              </div>

              {/* 维度评分 */}
              <div className="border border-green-100 rounded-2xl p-4.5 bg-gradient-to-b from-white to-green-50">
                <h3 className="text-base font-bold mb-3">十五维度评分</h3>
                <div className="space-y-3">
                  {Object.entries(result.scores).map(([dim, score]) => (
                    <div key={dim} className="border border-green-100 rounded-xl p-3.5 bg-white">
                      <div className="flex items-center justify-between gap-2.5 mb-2 flex-wrap">
                        <div className="text-sm font-bold text-gray-800">
                          {dim} - {
                            dim === 'E' ? '外向' :
                            dim === 'I' ? '内向' :
                            dim === 'N' ? '直觉' :
                            dim === 'S' ? '感觉' :
                            dim === 'T' ? '思考' :
                            dim === 'F' ? '情感' :
                            dim === 'J' ? '判断' : '感知'
                          }
                        </div>
                        <div className="text-sm font-bold text-green-700">
                          {score} 分
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 友情提示 */}
              <div className="border border-green-100 rounded-2xl p-4.5 bg-gradient-to-b from-white to-green-50">
                <h3 className="text-base font-bold mb-3">友情提示</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  本测试仅供娱乐，别拿它当诊断、面试、相亲、分手、招魂、算命或人生判决书。
                </p>
              </div>

              {/* 作者的话 */}
              <details className="border border-green-100 rounded-2xl bg-gradient-to-b from-white to-green-50 overflow-hidden">
                <summary className="cursor-pointer px-4.5 py-4.5 text-base font-bold text-gray-800 flex items-center justify-between gap-3">
                  作者的话
                  <span className="text-xs font-bold text-green-700 border border-green-200 bg-green-50 px-2.5 py-1.5 rounded-full">
                    展开
                  </span>
                </summary>
                <div className="border-t border-green-100 px-4.5 pb-4.5">
                  <div className="space-y-3.5 pt-3.5">
                    <p className="text-sm leading-[1.9]">
                      本测试首发于b站up主蛆肉儿串儿（UID417038183），初衷是劝诫一位爱喝酒的朋友戒酒。
                    </p>
                    <p className="text-sm leading-[1.9]">
                      由于作者的人格是SHIT愤世者，所以平等的攻击了各位，在此抱歉！！不过我是一个绝世大美女，你们一定会原谅我，有B站的朋友们也可以关注我。
                    </p>
                    <p className="text-sm leading-[1.9]">
                      关于这个测试，我没法很好的平衡娱乐和专业性，因此对于一些人格的阐释较为模糊或完全不准（如屌丝可能并非真的屌丝），如有冒犯非常抱歉！！
                    </p>
                    <p className="text-sm leading-[1.9]">
                      再鉴于时间精力有限，就随便搞了一个先这样玩玩，后续会慢慢完善修改的，总之好玩为主，还请不要用于盈利呀。
                    </p>
                  </div>
                </div>
              </details>
            </div>

            {/* 底部按钮 */}
            <div className="flex items-center justify-between gap-3 mt-5.5 flex-wrap">
              <div></div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setAnswers({})
                    setScreen('test')
                  }}
                  className="bg-white text-green-700 px-5 py-3 rounded-xl font-bold border border-green-200 hover:bg-gray-50 transition-all"
                >
                  重新测试
                </button>
                <button
                  onClick={() => {
                    setAnswers({})
                    setScreen('intro')
                  }}
                  className="bg-green-700 text-white px-5 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  回到首页
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
