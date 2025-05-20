// スムーズスクロール機能
document.addEventListener('DOMContentLoaded', function() {
    // ナビゲーションリンクを取得
    const navLinks = document.querySelectorAll('nav a');
    
    // 各リンクにクリックイベントを追加
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // リンク先のIDを取得
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // ヘッダーの高さを取得
                const headerHeight = document.querySelector('header').offsetHeight;
                
                // スクロール位置を計算
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                // スムーズスクロール
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // スクロール時のアニメーション
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // アニメーション対象要素を監視
    const animationTargets = document.querySelectorAll('.content-box, .step');
    animationTargets.forEach(target => {
        observer.observe(target);
    });
    
    // 現在のセクションをハイライト
    let currentSection = '';
    
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // ナビゲーションリンクのハイライト更新
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    });
    
    // ヘッダー要素を一度だけ取得
    const header = document.querySelector('header');
    const headerContainer = document.querySelector('header .container');
    const nav = document.querySelector('nav');
    
    // モバイルメニューのトグル
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.style.display = 'none';
    
    // モバイル表示時のメニュー動作
    mobileMenuToggle.addEventListener('click', function() {
        nav.classList.toggle('mobile-menu-open');
    });
    
    // 画面サイズに応じてモバイルメニューを表示/非表示
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            mobileMenuToggle.style.display = 'block';
            headerContainer.insertBefore(mobileMenuToggle, nav);
        } else {
            mobileMenuToggle.style.display = 'none';
            nav.classList.remove('mobile-menu-open');
        }
    }
    
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();

    // ヘッダーのスライド制御
    let lastScrollY = window.scrollY;
    const headerHeight = header.offsetHeight;
    let ticking = false;

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const currentScrollY = window.scrollY;
                
                // スクロール方向を判定
                if (currentScrollY > lastScrollY) {
                    // 下スクロール：ヘッダーを隠す
                    header.style.transform = `translateY(-${headerHeight}px)`;
                } else {
                    // 上スクロール：ヘッダーを表示
                    header.style.transform = 'translateY(0)';
                }

                // 最上部では必ずヘッダーを表示
                if (currentScrollY === 0) {
                    header.style.transform = 'translateY(0)';
                }

                lastScrollY = currentScrollY;
                ticking = false;
            });

            ticking = true;
        }
    });

    const scrollToTopButton = document.getElementById('scroll-to-top');
    
    // スクロール位置に応じてボタンの表示/非表示を切り替え
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopButton.classList.add('visible');
        } else {
            scrollToTopButton.classList.remove('visible');
        }
    });
    
    // ボタンクリック時の処理
    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// フェードインアニメーション用のCSS追加
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeIn 0.6s ease-in;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    nav a.active {
        color: #58a6ff !important;
        font-weight: 700;
    }
    
    .mobile-menu-toggle {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        position: absolute;
        right: 20px;
        top: 1rem;
    }
    
    @media (max-width: 768px) {
        nav {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background-color: #24292e;
            padding: 1rem;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        
        nav.mobile-menu-open {
            display: block;
        }
        
        nav ul {
            flex-direction: column;
        }
    }
`;
document.head.appendChild(style);

// コードブロックの初期化
document.addEventListener('DOMContentLoaded', function() {
    const codeBlocks = document.querySelectorAll('.code-example');
    
    codeBlocks.forEach((block, index) => {
        // コードの内容を取得
        const codeContent = block.innerHTML;
        
        // 言語を判定（この例ではコメントの先頭から判定）
        const language = codeContent.includes('git') ? 'Git' : 
                        codeContent.includes('function') ? 'JavaScript' : 
                        'Code';
        
        // 新しい構造を作成
        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <div class="code-header">
                <span class="code-language">${language}</span>
                <button class="copy-button" data-code-id="${index}">
                    <i class="fas fa-copy"></i>
                    <span>Copy</span>
                </button>
            </div>
            <pre><code>${codeContent}</code></pre>
        `;
        
        // 元のコンテンツを置き換え
        block.innerHTML = '';
        block.appendChild(wrapper);
        
        // コピーボタンにイベントリスナーを追加
        const copyButton = wrapper.querySelector('.copy-button');
        copyButton.addEventListener('click', async function() {
            const code = this.closest('.code-example').querySelector('code').textContent;
            
            try {
                await navigator.clipboard.writeText(code);
                
                // コピー成功時のフィードバック
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i><span>Copied!</span>';
                this.style.color = '#3fb950';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.color = '';
                }, 2000);
            } catch (err) {
                // コピー失敗時のフィードバック
                this.innerHTML = '<i class="fas fa-times"></i><span>Failed</span>';
                this.style.color = '#f85149';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.color = '';
                }, 2000);
            }
        });
    });
});