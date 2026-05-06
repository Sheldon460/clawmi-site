const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

const questions = [
  { id: 1, question: "遇到问题时，你更倾向于：", options: [{ text: "独自一人死磕，直到解决或崩溃", dimension: "I", value: 5 }, { text: "到处问人，像无头苍蝇一样乱撞", dimension: "E", value: 5 }] },
  { id: 2, question: "在团队项目中，你通常的角色是：", options: [{ text: "摸鱼达人，混到最后一刻", dimension: "P", value: 5 }, { text: "卷王，自己累死还要拉着别人", dimension: "J", value: 5 }] },
  { id: 3, question: "面对突如其来的加班需求，你的反应是：", options: [{ text: "内心疯狂吐槽但表面上唯唯诺诺", dimension: "T", value: 5 }, { text: "当场情绪崩溃，开始阴阳怪气", dimension: "F", value: 5 }] },
  { id: 4, question: "看到同事升职，你的想法是：", options: [{ text: "一定是潜规则/关系户/运气好", dimension: "T", value: 5 }, { text: "虽然嫉妒但嘴上还要恭喜", dimension: "F", value: 5 }] },
  { id: 5, question: "周末的安排通常是：", options: [{ text: "死宅在家，除了外卖谁也不见", dimension: "I", value: 5 }, { text: "被迫社交，然后后悔为什么不来宅着", dimension: "E", value: 5 }] },
  { id: 6, question: "对于躺平这个概念，你的态度是：", options: [{ text: "身体虽然躺着，但精神在疯狂内卷", dimension: "J", value: 5 }, { text: "彻底摆烂，连呼吸都觉得累", dimension: "P", value: 5 }] },
  { id: 7, question: "遇到无理取闹的甲方，你会：", options: [{ text: "理性分析需求，试图讲道理", dimension: "T", value: 5 }, { text: "情绪爆发，在群里阴阳怪气", dimension: "F", value: 5 }] },
  { id: 8, question: "你的工作风格更接近：", options: [{ text: "拖延症晚期，deadline前冲刺", dimension: "P", value: 5 }, { text: "强迫症晚期，提前三天完成", dimension: "J", value: 5 }] },
  { id: 9, question: "听到内卷这个词，你的第一反应是：", options: [{ text: "又来了，别卷了我求求你", dimension: "F", value: 5 }, { text: "分析利弊，考虑是否参与", dimension: "T", value: 5 }] },
  { id: 10, question: "面对老板的画饼，你通常：", options: [{ text: "表面信了，内心疯狂吐槽", dimension: "I", value: 5 }, { text: "当场质疑，让老板下不来台", dimension: "E", value: 5 }] }
];

const sbtiTypes = {
  "ISTJ": { title: "死者 DEAD", desc: "你是个死板的工作机器，像坟墓一样沉寂。996是你的日常，KPI是你的生命，你已经忘记怎么笑了。", emoji: "🪦" },
  "ISFJ": { title: "草者", desc: "你是职场里的小草，任人踩踏但顽强生长。每天都在帮别人背锅，还被当成理所当然。", emoji: "🌿" },
  "INFJ": { title: "忍者", desc: "你已经修成了职场忍术，老板的PUA你来者不拒。表面云淡风轻，内心早已千疮百孔。", emoji: "🥷" },
  "INTJ": { title: "精者", desc: "你是个职场精致利己主义者，每一步都计算好了。虽然看起来很成功，但内心早已空虚。", emoji: "🧐" },
  "ISTP": { title: "躺者", desc: "你是职场躺平大师，能摸鱼绝不动手。老板都放弃管你了，因为你已经无可救药。", emoji: "🛌" },
  "ISFP": { title: "摆者", desc: "你是终极摆烂者，连呼吸都觉得累。给多少钱干多少事，一毛钱多干都不行。", emoji: "📉" },
  "INFP": { title: "悲者", desc: "你是职场悲情艺术家，每天都在创作悲惨故事。所有的不幸都是世界的错，你只是受害者。", emoji: "😢" },
  "INTP": { title: "痴者", desc: "你是个技术痴汉，沉迷代码无法自拔。虽然技术很牛，但情商约等于零。", emoji: "🤓" },
  "ESTP": { title: "冲者", desc: "你是个职场冲锋号，什么活都敢接。虽然经常把事情搞砸，但永远充满了自信。", emoji: "🏃" },
  "ESFP": { title: "演者", desc: "你是奥斯卡影帝级别的演员工人。表面工作努力，内心早已飞到火星了。", emoji: "🎭" },
  "ENFP": { title: "煽者", desc: "你是职场煽情大师，嘴皮子比脑子好用。虽然经常画饼，但每次都有人信。", emoji: "📢" },
  "ENTP": { title: "骗者", desc: "你是个职场骗子，把老板忽悠瘸了。虽然表面很风光，但随时可能穿帮。", emoji: "🎪" },
  "ESTJ": { title: "卷者", desc: "你是终极卷王，不把自己卷死不罢休。你自己卷就算了，还要拉着所有人一起卷。", emoji: "🌀" },
  "ESFJ": { title: "舔者", desc: "你是个职业舔狗，老板说啥就是啥。虽然看起来很受欢迎，但早已失去了尊严。", emoji: "👅" },
  "ENFJ": { title: "魅者", desc: "你是职场魅惑者，能把所有人玩弄于股掌之间。看起来很厉害，但其实只是情绪价值高。", emoji: "✨" },
  "ENTJ": { title: "霸者", desc: "你是职场霸主，说什么就是什么。所有的人都怕你，但你内心也很孤独。", emoji: "👑" }
};

function calculateResult(answers) {
  let scores = { I: 0, E: 0, N: 0, S: 0, T: 0, F: 0, J: 0, P: 0 };
  
  answers.forEach(function(answer, index) {
    const question = questions[index];
    const option = question.options[answer];
    scores[option.dimension] += option.value;
  });
  
  const sbti = (
    (scores.I >= scores.E ? 'I' : 'E') +
    (scores.N >= scores.S ? 'N' : 'S') +
    (scores.T >= scores.F ? 'T' : 'F') +
    (scores.J >= scores.P ? 'J' : 'P')
  );
  
  return { sbti: sbti, details: sbtiTypes[sbti], scores: scores };
}

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/questions', function(req, res) {
  res.json({ questions: questions });
});

app.post('/result', function(req, res) {
  const answers = req.body.answers;
  if (!answers || answers.length !== questions.length) {
    return res.status(400).json({ error: 'Invalid answers' });
  }
  const result = calculateResult(answers);
  res.json(result);
});

app.listen(PORT, function() {
  console.log('SBTI 测试服务器运行在 http://localhost:' + PORT);
});
