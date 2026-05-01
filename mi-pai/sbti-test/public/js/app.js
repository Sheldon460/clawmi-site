let currentQuestion = 0;
let answers = [];
let questions = [];

// 加载问题
async function loadQuestions() {
  try {
    const response = await fetch('/questions');
    const data = await response.json();
    questions = data.questions;
    document.getElementById('total-questions').textContent = questions.length;
    showQuestion(0);
  } catch (error) {
    console.error('Failed to load questions:', error);
  }
}

// 显示问题
function showQuestion(index) {
  currentQuestion = index;
  const question = questions[index];
  
  // 更新进度
  const progress = ((index + 1) / questions.length) * 100;
  document.getElementById('progress').style.width = `${progress}%`;
  document.getElementById('current-question').textContent = index + 1;
  
  // 更新问题文本
  document.getElementById('question-text').textContent = question.question;
  
  // 生成选项按钮
  const optionsContainer = document.getElementById('options-container');
  optionsContainer.innerHTML = '';
  
  question.options.forEach((option, optionIndex) => {
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.textContent = option.text;
    button.onclick = () => selectOption(optionIndex);
    optionsContainer.appendChild(button);
  });
}

// 选择选项
function selectOption(optionIndex) {
  answers[currentQuestion] = optionIndex;
  
  // 添加动画效果
  const buttons = document.querySelectorAll('.option-btn');
  buttons[optionIndex].style.background = '#667eea';
  buttons[optionIndex].style.color = 'white';
  
  setTimeout(() => {
    if (currentQuestion < questions.length - 1) {
      showQuestion(currentQuestion + 1);
    } else {
      submitAnswers();
    }
  }, 300);
}

// 提交答案
async function submitAnswers() {
  try {
    const response = await fetch('/result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ answers })
    });
    
    const result = await response.json();
    showResult(result);
  } catch (error) {
    console.error('Failed to submit answers:', error);
  }
}

// 显示结果
function showResult(result) {
  // 隐藏问题区域，显示结果区域
  document.getElementById('question-container').style.display = 'none';
  const resultContainer = document.getElementById('result-container');
  resultContainer.style.display = 'block';
  
  // 填充结果
  document.getElementById('result-emoji').textContent = result.details.emoji;
  document.getElementById('result-title').textContent = result.details.title;
  document.getElementById('result-sbti').textContent = `你的 SBTI 类型: ${result.sbti}`;
  document.getElementById('result-desc').textContent = result.details.desc;
  
  // 更新进度条为 100%
  document.getElementById('progress').style.width = '100%';
}

// 重置测试
function restartTest() {
  answers = [];
  currentQuestion = 0;
  
  document.getElementById('result-container').style.display = 'none';
  document.getElementById('question-container').style.display = 'block';
  
  showQuestion(0);
}

// 分享结果
function shareResult() {
  const sbti = document.getElementById('result-sbti').textContent;
  const title = document.getElementById('result-title').textContent;
  const shareText = `测了一下 SBTI，结果是：${title}！${sbti}\n\n快来测测你的隐藏人格类型：${window.location.href}`;
  
  if (navigator.share) {
    navigator.share({
      title: '我的 SBTI 测试结果',
      text: shareText
    });
  } else {
    navigator.clipboard.writeText(shareText).then(() => {
      alert('结果已复制到剪贴板！');
    }).catch(() => {
      alert('复制失败，请手动截图分享');
    });
  }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  loadQuestions();
  
  document.getElementById('restart-btn').addEventListener('click', restartTest);
  document.getElementById('share-btn').addEventListener('click', shareResult);
});
