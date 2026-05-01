# SBTI 人格测试网站复刻项目报告

## 项目概述
- **类型**: SBTI（戏仿版 MBTI）人格测试
- **完成时间**: 2026-04-10
- **负责人**: 幂码-编程 (mi-ma-code)
- **技术栈**: Next.js 16 + TypeScript + Tailwind CSS

## 访问链接
🌐 **生产环境**: https://sbti-test-ivory.vercel.app

## 完成内容

### 1. 项目结构
```
sbti-test/
├── app/
│   ├── page.tsx          # 主页面（测试流程：介绍→答题→结果）
│   ├── types.ts          # TypeScript 类型定义
│   ├── data.ts           # 31道题目 + 16种人格类型数据
│   └── scoring.ts        # 评分计算与人格匹配算法
├── tailwind.config.ts
└── vercel.json
```

### 2. 核心功能

#### 测试流程
- **介绍页**: 说明测试规则，显示题量和人格类型数量
- **答题页**: 31道题目，逐题显示，实时进度条
- **结果页**: 展示人格类型、描述、核心特质、维度分析

#### 评分系统
- **15个维度**: 共情、冷酷、叛逆、顺从、诚实、贪心等
- **评分算法**: 每题两个选项，分别影响不同维度的分数
- **人格匹配**: 基于维度分数与16种人格类型的相似度计算

#### 16种人格类型
1. **死者** - 冷静超脱，等待结局
2. **草者** - 随风摇摆，毫无主见
3. **吗喽** - 忙忙碌碌，不知为何
4. **疯批** - 天马行空，匪夷所思
5. **躺平** - 看透一切，随波逐流
6. **社牛** - 社交王者，从不冷场
7. **社恐** - 极度内向，网络生存
8. **卷王** - 永不停歇，竞争机器
9. **恋爱脑** - 脑中只有爱情
10. **杠精** - 专业抬杠，无所不反
11. **佛系** - 看淡一切，随缘就好
12. **颜狗** - 颜值即正义
13. **舔狗** - 愿意付出一切
14. **凡尔赛** - 低调炫耀大师
15. **戏精** - 人生如戏，天天演戏
16. **正常人** - 恭喜你，你是正常的

### 3. 设计特点

#### 视觉设计
- **主题色**: 绿色系（green-50, green-600, emerald-100）
- **渐变背景**: from-green-50 to-emerald-100
- **卡片风格**: 圆角、阴影、白色背景
- **交互反馈**: 悬停缩放、过渡动画

#### 响应式设计
- **移动端优先**: 适配各种屏幕尺寸
- **字体大小**: 使用响应式文本（text-xl md:text-3xl）
- **布局适配**: Grid/Flex 布局自动调整

#### 用户体验
- **进度可视化**: 实时进度条显示（百分比）
- **直观选项**: 维度名称作为选项标签
- **结果展示**: 分层信息展示（类型→描述→特质→维度）
- **重新测试**: 一键重置重新开始

## 技术实现细节

### TypeScript 类型定义
```typescript
interface Question {
  id: number;
  text: string;
  dimensions: {
    dimension: string;
    score: number;
  }[];
}

interface PersonalityResult {
  type: string;
  title: string;
  description: string;
  traits: string[];
  dimensions: { [key: string]: number };
}
```

### 评分算法
```typescript
function calculateScoresWithQuestions(answers: number[], questions: any[]): Scores {
  // 初始化所有维度为0
  // 遍历答案，根据选项计算维度分数
  // 选项0: multiplier = -1, 选项1: multiplier = 1
  // 最终返回各维度分数
}

function findPersonalityResult(scores: Scores): PersonalityResult {
  // 遍历16种人格类型
  // 计算用户分数与每种人格的相似度
  // 返回最匹配的人格类型
}
```

### 状态管理
```typescript
const [state, setState] = useState<TestState>('intro');
const [currentQuestion, setCurrentQuestion] = useState(0);
const [answers, setAnswers] = useState<number[]>([]);
const [result, setResult] = useState<PersonalityResult | null>(null);
```

## 部署信息

### Vercel 部署
- **框架**: Next.js 16.2.3 (Turbopack)
- **构建命令**: `npm run build`
- **输出目录**: `.next`
- **部署状态**: ✅ 成功
- **生产 URL**: https://sbti-test-ivory.vercel.app

### 构建结果
- ✅ TypeScript 编译通过
- ✅ Tailwind CSS 优化成功
- ✅ 静态页面生成完成
- ✅ 路由配置正确

## 参考资源
- **GitHub 原始项目**: https://github.com/UnluckyNinja/SBTI-test
- **原作者**: B站UP主「蛆肉儿串儿」
- **原始网站**: https://sbti.fancc.de5.net/

## 项目特点

### 优势
1. **技术栈现代化**: Next.js 16 + TypeScript
2. **设计精良**: 简约极简，用户体验好
3. **响应式设计**: 全平台兼容
4. **评分科学**: 15维度精细评分
5. **人格有趣**: 16种荒诞幽默的人格类型
6. **快速部署**: Vercel 一键部署

### 可扩展性
- 可轻松添加新题目
- 可修改人格类型描述
- 可调整评分算法
- 可更换主题色
- 可添加分享功能

## 总结

本次成功复刻了 SBTI 人格测试网站，完整实现了：

1. ✅ Next.js 14+ 项目结构
2. ✅ 31 道测试题目 + 评分系统
3. ✅ 16 种人格类型结果展示
4. ✅ Tailwind CSS 绿色主题设计
5. ✅ 部署到 Vercel

项目已上线并可正常访问，用户体验流畅，视觉效果精美。

---

**创建者**: 幂码-编程 (mi-ma-code)  
**创建时间**: 2026-04-10 02:19 GMT+8  
**项目状态**: ✅ 已完成并上线
