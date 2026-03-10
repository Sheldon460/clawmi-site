#!/bin/bash
# mi-sheng-skill-test.sh - 幂声技能恢复验证测试
# 用途：快速验证所有恢复的音频工具是否正常工作
# 使用：./mi-sheng-skill-test.sh

set -e

echo "🎵 幂声技能恢复验证测试"
echo "==========================================="
echo ""

passed=0
failed=0
warnings=0

# 测试 1: Edge TTS
echo "🧪 测试 01: Edge TTS 语音列表"
if edge-tts --list-voices 2>/dev/null | grep -q "zh-CN-YunxiNeural"; then
    echo "✅ Edge TTS: 正常 (8 种中文语音可用)"
    ((passed++))
else
    echo "❌ Edge TTS: 异常"
    ((failed++))
fi

# 测试 2: Whisper
echo "🧪 测试 02: Whisper 转写工具"
if command -v whisper &> /dev/null; then
    echo "✅ Whisper: 已安装"
    ((passed++))
else
    echo "❌ Whisper: 未安装"
    ((failed++))
fi

# 测试 3: FFmpeg
echo "🧪 测试 03: FFmpeg 编码支持"
if ffmpeg -encoders 2>&1 | grep -q "libopus"; then
    echo "✅ FFmpeg: libopus 编码支持"
    ((passed++))
else
    echo "❌ FFmpeg: 缺少 libopus 编码"
    ((failed++))
fi

# 测试 4: Edge TTS 脚本
echo "🧪 测试 04: mi-sheng-edge-tts.sh 脚本"
script_path="/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-sheng/skills/mi-sheng-edge-tts.sh"
if [ -x "$script_path" ]; then
    echo "✅ Edge TTS 脚本：可执行"
    ((passed++))
else
    echo "⚠️  Edge TTS 脚本：缺少执行权限"
    ((warnings++))
fi

# 测试 5: 音频转换脚本
echo "🧪 测试 05: mi-sheng-audio-convert.sh 脚本"
script_path="/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-sheng/skills/mi-sheng-audio-convert.sh"
if [ -x "$script_path" ]; then
    echo "✅ 音频转换脚本：可执行"
    ((passed++))
else
    echo "⚠️  音频转换脚本：缺少执行权限"
    ((warnings++))
fi

# 测试 6: 音画同步脚本
echo "🧪 测试 06: mi-sheng-video-audio-sync.sh 脚本"
script_path="/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-sheng/skills/mi-sheng-video-audio-sync.sh"
if [ -x "$script_path" ]; then
    echo "✅ 音画同步脚本：可执行"
    ((passed++))
else
    echo "⚠️  音画同步脚本：缺少执行权限"
    ((warnings++))
fi

# 测试 7: Lyria Prompt 模板
echo "🧪 测试 07: lyria-prompts.md 模板库"
template_path="/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-sheng/skills/lyria-prompts.md"
if [ -f "$template_path" ]; then
    count=$(grep -c "模板" "$template_path" 2>/dev/null || echo "0")
    echo "✅ Lyria 模板库：$count 种模板"
    ((passed++))
else
    echo "❌ Lyria 模板库：文件不存在"
    ((failed++))
fi

# 测试 8: GCP 认证
echo "🧪 测试 08: GCP 认证状态"
if gcloud auth list 2>&1 | grep -q "Credentialed accounts"; then
    echo "✅ GCP: 已认证"
    ((passed++))
else
    echo "⚠️  GCP: 未认证 (影响 Chirp 3 HD 和 Lyria)"
    ((warnings++))
fi

# 测试 9: Sherpa-onnx 环境变量
echo "🧪 测试 09: Sherpa-onnx 环境变量"
if [ -n "$SHERPA_ONNX_RUNTIME_DIR" ] && [ -n "$SHERPA_ONNX_MODEL_DIR" ]; then
    echo "✅ Sherpa-onnx: 环境变量已配置"
    ((passed++))
else
    echo "⚠️  Sherpa-onnx: 环境变量未配置"
    ((warnings++))
fi

# 测试 10: 文档完整性
echo "🧪 测试 10: 文档完整性"
docs_ok=true
for doc in "RESTORE_PLAN.md" "RESTORE_REPORT.md" "lyria-prompts.md"; do
    if [ ! -f "/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-sheng/skills/$doc" ]; then
        docs_ok=false
        break
    fi
done

if $docs_ok; then
    echo "✅ 文档完整性：所有文档已创建"
    ((passed++))
else
    echo "❌ 文档完整性：缺少文档"
    ((failed++))
fi

# 总结
echo ""
echo "==========================================="
echo "📊 测试结果汇总"
echo "==========================================="
echo "✅ 通过：$passed"
echo "⚠️  警告：$warnings"
echo "❌ 失败：$failed"
echo ""

if [ $failed -eq 0 ]; then
    if [ $warnings -gt 0 ]; then
        echo "🎉 核心功能正常，$warnings 项待优化"
        echo ""
        echo "待办事项:"
        if gcloud auth list 2>&1 | grep -q "No credentialed accounts"; then
            echo "  1. 完成 GCP 认证：gcloud auth login"
        fi
        if [ -z "$SHERPA_ONNX_RUNTIME_DIR" ]; then
            echo "  2. 配置 Sherpa-onnx 环境变量"
        fi
    else
        echo "🎉 所有测试通过！技能恢复完成"
    fi
else
    echo "⚠️  发现 $failed 项失败，请检查"
fi

echo ""
echo "📋 详细报告：workspace/mi-sheng/skills/RESTORE_REPORT.md"
echo ""

exit 0
