/**
 * 幂码-编程 网站交互脚本
 * Sheldon帝国极客研发组出品
 */

(function() {
    'use strict';

    // DOM Elements
    const navbar = document.getElementById('navbar');
    
    // Initialize
    document.addEventListener('DOMContentLoaded', function() {
        initNavbar();
        initScrollAnimations();
        initParticles();
        initSmoothScroll();
        initServiceCards();
        initSupportCards();
        initContactForm();
        initCounters();
        initSkillBars();
    });

    /**
     * 导航栏滚动效果
     */
    function initNavbar() {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            // 添加/移除滚动样式
            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    /**
     * 滚动动画
     */
    function initScrollAnimations() {
        const fadeElements = document.querySelectorAll('.service-card, .skill-item, .support-card, .contact-card, .stat-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        fadeElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }

    /**
     * 粒子效果
     */
    function initParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
            particlesContainer.appendChild(particle);
        }
        
        hero.appendChild(particlesContainer);
    }

    /**
     * 平滑滚动
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /**
     * 服务卡片交互
     */
    function initServiceCards() {
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('click', function() {
                const title = this.querySelector('h3').textContent;
                showToast('已选择服务', `${title} - 请填写联系表单`);
                
                // 滚动到联系表单
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    /**
     * 支持卡片交互
     */
    function initSupportCards() {
        document.querySelectorAll('.support-card').forEach(card => {
            card.addEventListener('click', function() {
                const amount = this.querySelector('.support-amount').textContent;
                const title = this.querySelector('h3').textContent;
                showModal('感谢您的支持！', 
                    `<div class="qr-section">
                        <div class="qr-code">📱</div>
                        <p>请使用微信或支付宝扫描上方二维码</p>
                        <p><strong>${title}</strong> - ${amount}</p>
                    </div>`
                );
            });
        });
    }

    /**
     * 联系表单
     */
    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // 显示加载状态
            submitBtn.innerHTML = '<span class="loading"></span> 发送中...';
            submitBtn.disabled = true;
            
            // 模拟提交
            setTimeout(() => {
                showToast('消息已发送', '我会尽快回复您！');
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    /**
     * 数字计数器动画
     */
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-count'));
                    animateCounter(counter, target);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 30);
    }

    /**
     * 技能进度条动画
     */
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress-bar');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                    observer.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => observer.observe(bar));
    }

    /**
     * Toast 提示
     */
    function showToast(title, message) {
        const toast = document.createElement('div');
        toast.className = 'toast show';
        toast.innerHTML = `
            <div class="toast-icon">✓</div>
            <div class="toast-content">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    /**
     * Modal 弹窗
     */
    function showModal(title, content) {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // 触发重绘以启动动画
        setTimeout(() => overlay.classList.add('active'), 10);
        
        // 关闭事件
        const closeBtn = overlay.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 300);
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
                setTimeout(() => overlay.remove(), 300);
            }
        });
    }

})();
