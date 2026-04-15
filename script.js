// Скрипт для свадебного сайта Александр & Анастасия

// Таймер обратного отсчета до 25 июня 2026
function updateCountdown() {
    const weddingDate = new Date(2026, 5, 25, 0, 0, 0);
    const now = new Date();
    const diff = weddingDate - now;
    
    if (diff <= 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Запускаем таймер
updateCountdown();
setInterval(updateCountdown, 1000);

// ========== БАЗОВЫЕ СТИЛИ АНИМАЦИЙ ==========
const coreStyles = document.createElement('style');
coreStyles.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(coreStyles);

// ========== УНИВЕРСАЛЬНОЕ МОДАЛЬНОЕ ОКНО ==========
function showModal(title, message, isError = false) {
    const existingModal = document.getElementById('customModal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'customModal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;

    const icon = isError ? '✕' : '✓';
    const iconColor = isError ? '#c62828' : '#2e7d32';
    const bgIconColor = isError ? '#ffebee' : '#e8f5e9';
    const borderColor = isError ? '#c62828' : '#2e7d32';

    modal.innerHTML = `
        <div style="
            background: #ffffff;
            border-radius: 16px;
            padding: 32px 40px;
            max-width: 380px;
            width: 90%;
            text-align: center;
            box-shadow: 0 20px 35px rgba(0, 0, 0, 0.15);
            animation: slideUp 0.3s ease;
            border-top: 3px solid ${borderColor};
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        ">
            <div style="
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: ${bgIconColor};
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 20px auto;
            ">
                <div style="
                    font-size: 32px;
                    font-weight: 400;
                    color: ${iconColor};
                    line-height: 1;
                ">${icon}</div>
            </div>
            <h3 style="
                font-size: 24px;
                font-weight: 500;
                color: #1a1a1a;
                margin-bottom: 12px;
                letter-spacing: -0.3px;
            ">${title}</h3>
            <p style="
                font-size: 16px;
                color: #555555;
                margin-bottom: 28px;
                line-height: 1.5;
            ">${message}</p>
            <button onclick="this.closest('#customModal').remove()" style="
                background: #f5f5f5;
                color: #333333;
                border: none;
                padding: 12px 32px;
                border-radius: 40px;
                font-family: inherit;
                font-size: 15px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
            " onmouseover="this.style.background='#e8e8e8'" onmouseout="this.style.background='#f5f5f5'">
                Закрыть
            </button>
        </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.remove();
    });

    if (!isError) {
        setTimeout(() => {
            if (modal.parentElement) modal.remove();
        }, 4000);
    }
}

// ========== МОДАЛЬНОЕ ОКНО ЗАГРУЗКИ ==========
function showLoadingModal() {
    const existingLoading = document.getElementById('loadingModal');
    if (existingLoading) existingLoading.remove();
    
    const loadingModal = document.createElement('div');
    loadingModal.id = 'loadingModal';
    loadingModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(3px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
    `;
    loadingModal.innerHTML = `
        <div style="
            background: white;
            border-radius: 16px;
            padding: 32px 40px;
            text-align: center;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        ">
            <div style="
                width: 50px;
                height: 50px;
                border: 3px solid #e0e0e0;
                border-top-color: #999;
                border-radius: 50%;
                margin: 0 auto 20px;
                animation: spin 1s linear infinite;
            "></div>
            <p style="
                font-size: 15px;
                color: #666;
                margin: 0;
            ">Отправка ответа...</p>
        </div>
    `;
    document.body.appendChild(loadingModal);
    return loadingModal;
}

// ========== GOOGLE SHEETS ==========
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKEpkQlbYf1ryEt9hesFXOtsSnkal09uIzHZFM8uF4W2q6OK2XduWWeJVrzo7C2ER90Q/exec'; // ЗАМЕНИТЕ НА ВАШ URL

// Обработка отправки формы
const guestForm = document.getElementById('guestForm');
const formMessage = document.getElementById('formMessage');

if (guestForm) {
    guestForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        // Получаем данные
        const guestName = document.getElementById('guestName').value.trim();
        const attendanceRadio = document.querySelector('input[name="attendance"]:checked');
        const attendance = attendanceRadio ? attendanceRadio.value : null;
        
        // Получаем выбранные напитки
        const drinkCheckboxes = document.querySelectorAll('input[name="drinks"]:checked');
        const drinksValues = Array.from(drinkCheckboxes).map(cb => cb.value);
        
        // Валидация
        if (!guestName) {
            showModal('Ошибка', 'Пожалуйста, введите ваше имя', true);
            return;
        }
        
        if (!attendance) {
            showModal('Ошибка', 'Пожалуйста, выберите вариант присутствия', true);
            return;
        }
        
        // Показываем загрузку
        submitBtn.disabled = true;
        submitBtn.textContent = 'Отправка...';
        
        const loadingModal = showLoadingModal();
        
        try {
            // Формируем данные для отправки
            const formDataToSend = new URLSearchParams();
            formDataToSend.append('name', guestName);
            formDataToSend.append('attendance', attendance);
            
            for (const drink of drinksValues) {
                formDataToSend.append('drinks', drink);
            }
            
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formDataToSend.toString()
            });
            
            const result = await response.json();
            
            loadingModal.remove();
            
            if (result.result === 'success') {
                if (attendance === 'yes') {
                    showModal(
                        'Спасибо, ' + guestName + '!',
                        'Мы будем ждать вас на нашей свадьбе 25 июня 2026 года! 🎉',
                        false
                    );
                } else {
                    showModal(
                        'Спасибо за ответ!',
                        'Очень жаль, что вы не сможете быть с нами в этот день.',
                        false
                    );
                }
                // Очищаем форму
                guestForm.reset();
                // Сбрасываем чекбоксы (reset не всегда сбрасывает checked)
                document.querySelectorAll('input[name="drinks"]').forEach(cb => cb.checked = false);
                document.querySelector('input[name="attendance"][value="yes"]').checked = true;
            } else {
                throw new Error(result.message || 'Ошибка отправки');
            }
        } catch (error) {
            loadingModal.remove();
            showModal(
                'Ошибка',
                error.message || 'Произошла ошибка при отправке. Пожалуйста, попробуйте ещё раз.',
                true
            );
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// Проверяем, что фон загрузился
const img = new Image();
img.src = 'fon.jpg';
img.onerror = () => console.log('Добавьте файл fon.jpg в папку с сайтом');


const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicToggle');
let musicPlaying = false;

// Функция для обновления текста кнопки (будет вызвана из zero секции)
window.updateMusicButtonState = function(isPlaying) {
    if (musicBtn) {
        musicBtn.textContent = isPlaying ? 'Выключить музыку' : 'Включить музыку';
    }
    musicPlaying = isPlaying;
};

// Обработчик кнопки (на случай, если пользователь захочет выключить музыку вручную)
if (musicBtn) {
    musicBtn.addEventListener('click', () => {
        if (musicPlaying) {
            music.pause();
            musicBtn.textContent = 'Включить музыку';
            musicPlaying = false;
        } else {
            music.play().catch(e => console.log('Ошибка воспроизведения'));
            musicBtn.textContent = 'Выключить музыку';
            musicPlaying = true;
        }
    });
}

// Zero секция - закрытие по клику и запуск музыки
const zeroSection = document.getElementById('zeroSection');
const musicForZero = document.getElementById('bgMusic');
const musicBtnForZero = document.getElementById('musicToggle');

if (zeroSection) {
    zeroSection.addEventListener('click', function() {
        // Добавляем класс для плавного исчезновения
        zeroSection.classList.add('hide');
        
        // Запускаем музыку
        if (musicForZero) {
            musicForZero.play().then(() => {
                if (musicBtnForZero) {
                    musicBtnForZero.textContent = 'Выключить музыку';
                }
                // Обновляем состояние глобальной переменной musicPlaying из основного кода
                if (typeof window.musicPlaying !== 'undefined') {
                    window.musicPlaying = true;
                }
            }).catch(e => {
                console.log('Автовоспроизведение заблокировано, нужно ручное включение');
                if (musicBtnForZero && musicBtnForZero.textContent !== 'Выключить музыку') {
                    musicBtnForZero.textContent = 'Включить музыку';
                }
            });
        }
        
        // Удаляем секцию после анимации
        setTimeout(() => {
            if (zeroSection && zeroSection.parentNode) {
                zeroSection.remove();
            }
        }, 800);
    });
}
