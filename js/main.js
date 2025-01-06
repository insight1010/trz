// Инициализация состояния приложения
const sections = {
    insights: {
        element: document.querySelector('.insight-feed'),
        title: 'TRZ',
        filters: true
    },
    search: {
        element: document.createElement('div'),
        title: 'Поиск инсайтов',
        filters: false
    },
    saved: {
        element: document.createElement('div'),
        title: 'Сохранённые',
        filters: true
    },
    profile: {
        element: document.querySelector('#profileModal'),
        title: 'Профиль',
        filters: false
    }
};

let currentSection = 'insights';
const container = document.querySelector('.container');
const navbar = document.querySelector('.navbar-brand');
const filterChips = document.querySelector('.filter-chips');

// Функция для показа раздела инсайтов
function showInsights() {
    // Анимируем переход
    container.style.opacity = '0';
    setTimeout(() => {
        // Скрываем все разделы
        Object.values(sections).forEach(section => {
            if (section.element) {
                section.element.style.display = 'none';
            }
        });

        // Показываем раздел инсайтов
        sections.insights.element.style.display = 'block';
        filterChips.style.display = 'flex';
        navbar.textContent = sections.insights.title;

        // Добавляем анимацию появления карточек
        const cards = document.querySelectorAll('.insight-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });

        container.style.opacity = '1';
    }, 300);

    // Обновляем активную кнопку навигации
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelector('[data-nav="insights"]').classList.add('active');

    // Скрываем кнопку Telegram если она показана
    if (window.Telegram?.WebApp?.MainButton) {
        window.Telegram.WebApp.MainButton.hide();
    }
}

// Обработчики навигации
document.querySelectorAll('[data-nav]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const section = this.getAttribute('data-nav');
        
        if (section === 'insights') {
            showInsights();
        }
        // Обработка других разделов...
    });
});

// Инициализация Telegram Mini App
let tg = window.Telegram.WebApp;
tg.expand();

// Все модальные окна
const modals = {
    newCase: new bootstrap.Modal(document.getElementById('newCaseModal')),
    insightDetails: new bootstrap.Modal(document.getElementById('insightDetailsModal')),
    profile: new bootstrap.Modal(document.getElementById('profileModal'))
};

// Обработка кликов по карточкам
document.querySelectorAll('.insight-card').forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('.card-title').textContent;
        const category = this.querySelector('.category-badge').textContent;
        const xElement = this.querySelector('[data-element="x-element"]')?.textContent;
        const insight = this.querySelector('[data-element="insight"]')?.textContent;
        
        showInsightDetails(title, category, xElement, insight);
    });
});

// Инициализация при загрузке
window.addEventListener('load', () => {
    showInsights();
    
    // Сплэш-экран
    setTimeout(function() {
        const splashScreen = document.getElementById('splashScreen');
        splashScreen.style.opacity = '0';
        setTimeout(() => {
            splashScreen.style.display = 'none';
        }, 500);
    }, 2000);
}); 