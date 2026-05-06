import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 示例问题数据
export const SAMPLE_QUESTIONS = [
  {
    id: 1,
    text: "当你在社交媒体上看到别人发旅游照时，你的第一反应是？",
    options: [
      "默默退出app，不想看",
      "点个赞然后刷下一个",
      "在心里吐槽这些照片很假",
      "立刻发自己的更有趣的内容"
    ]
  },
  {
    id: 2,
    text: "朋友邀请你周末去爬山，你的回答是？",
    options: [
      "好的，准时到",
      "视天气情况再定",
      "能不能在家打游戏代替爬山",
      "算了，我还是去睡觉吧"
    ]
  },
  {
    id: 3,
    text: "你在工作中遇到困难时，通常怎么解决？",
    options: [
      "主动寻求帮助",
      "自己想办法解决",
      "假装不存在",
      "直接躺平"
    ]
  }
  // ... 可以扩展到 31 个问题
]

// 示例结果数据
export const SAMPLE_RESULTS = {
  DEAD: {
    typeName: "死者",
    code: "DEAD",
    matchRate: 87,
    description: "你已经失去了对生活的大部分热情，像个行尸走肉一样活着。但至少你很平和。",
    dimensions: [
      { label: "生命力", score: 20, maxScore: 100 },
      { label: "社交欲", score: 30, maxScore: 100 },
      { label: "行动力", score: 25, maxScore: 100 },
      { label: "幽默感", score: 45, maxScore: 100 }
    ]
  },
  GRASS: {
    typeName: "草者",
    code: "GRASS",
    matchRate: 92,
    description: "你像草一样顽强，任何环境都能生存。但有时候你也会想躺平当一片草地。",
    dimensions: [
      { label: "生命力", score: 85, maxScore: 100 },
      { label: "社交欲", score: 40, maxScore: 100 },
      { label: "行动力", score: 70, maxScore: 100 },
      { label: "幽默感", score: 60, maxScore: 100 }
    ]
  },
  MONKEY: {
    typeName: "吗喽",
    code: "MONKEY",
    matchRate: 95,
    description: "你上蹿下跳，活力四射，但也容易三分钟热度。是团队中的开心果。",
    dimensions: [
      { label: "生命力", score: 90, maxScore: 100 },
      { label: "社交欲", score: 95, maxScore: 100 },
      { label: "行动力", score: 85, maxScore: 100 },
      { label: "幽默感", score: 90, maxScore: 100 }
    ]
  },
  LOSER: {
    typeName: "屌丝",
    code: "LOSER",
    matchRate: 78,
    description: "你可能觉得自己很普通，但在平凡中也有着独特的魅力。别看不起自己。",
    dimensions: [
      { label: "生命力", score: 55, maxScore: 100 },
      { label: "社交欲", score: 65, maxScore: 100 },
      { label: "行动力", score: 50, maxScore: 100 },
      { label: "幽默感", score: 80, maxScore: 100 }
    ]
  },
  GOD: {
    typeName: "神人",
    code: "GOD",
    matchRate: 100,
    description: "你简直是完美的存在，让人望尘莫及。但请记住，不要神化任何人。",
    dimensions: [
      { label: "生命力", score: 95, maxScore: 100 },
      { label: "社交欲", score: 90, maxScore: 100 },
      { label: "行动力", score: 95, maxScore: 100 },
      { label: "幽默感", score: 88, maxScore: 100 }
    ]
  },
  TROLL: {
    typeName: "杠精",
    code: "TROLL",
    matchRate: 88,
    description: "你总能找到反驳别人的角度，但这有时候会让人觉得你很烦。",
    dimensions: [
      { label: "生命力", score: 75, maxScore: 100 },
      { label: "社交欲", score: 80, maxScore: 100 },
      { label: "行动力", score: 70, maxScore: 100 },
      { label: "幽默感", score: 85, maxScore: 100 }
    ]
  },
  SHIT: {
    typeName: "屎者",
    code: "SHIT",
    matchRate: 82,
    description: "你可能觉得自己一团糟，但屎也有它的价值——它是生命循环的一部分。",
    dimensions: [
      { label: "生命力", score: 60, maxScore: 100 },
      { label: "社交欲", score: 45, maxScore: 100 },
      { label: "行动力", score: 40, maxScore: 100 },
      { label: "幽默感", score: 75, maxScore: 100 }
    ]
  },
  PEACE: {
    typeName: "佛系",
    code: "PEACE",
    matchRate: 94,
    description: "你已经看透了一切，心如止水。这种状态在现代社会很珍贵。",
    dimensions: [
      { label: "生命力", score: 70, maxScore: 100 },
      { label: "社交欲", score: 50, maxScore: 100 },
      { label: "行动力", score: 55, maxScore: 100 },
      { label: "幽默感", score: 65, maxScore: 100 }
    ]
  }
}

// 模拟计算结果（实际项目中应该有真实的计分逻辑）
export function calculateResult(answers: any[]): any {
  const types = Object.keys(SAMPLE_RESULTS)
  const randomType = types[Math.floor(Math.random() * types.length)]
  return SAMPLE_RESULTS[randomType as keyof typeof SAMPLE_RESULTS]
}
