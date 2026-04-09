// Проверяем, что фон загрузился
const img = new Image();
img.src = 'fon.jpg';
img.onerror = () => console.log('Добавьте файл fon.jpg в папку с сайтом');


// Таймер обратного отсчета до 25 июня 2026
function updateCountdown() {
    const weddingDate = new Date(2026, 5, 25, 0, 0, 0); // Июнь = 5 (месяцы с 0)
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

// Анкета гостя - показ поля для второго гостя
const companionRadios = document.querySelectorAll('input[name="companion"]');
const secondPersonGroup = document.getElementById('secondPersonGroup');

companionRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        if (this.value === 'couple') {
            secondPersonGroup.style.display = 'block';
        } else {
            secondPersonGroup.style.display = 'none';
        }
    });
});

// Обработка отправки формы
const guestForm = document.getElementById('guestForm');
const formMessage = document.getElementById('formMessage');

guestForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const guestName = document.getElementById('guestName').value;
    const companion = document.querySelector('input[name="companion"]:checked').value;
    const secondName = document.getElementById('secondName').value;
    const attendance = document.querySelector('input[name="attendance"]:checked').value;
    
    if (!guestName.trim()) {
        showMessage('Пожалуйста, укажите ваше имя и фамилию', 'error');
        return;
    }
    
    let message = `Спасибо, ${guestName}! `;
    if (companion === 'couple' && secondName.trim()) {
        message += `${secondName}, `;
    }
    if (attendance === 'yes') {
        message += `ждём вас на свадьбе! ❤️`;
    } else {
        message += `будем скучать! 💕`;
    }
    
    showMessage(message, 'success');
    guestForm.reset();
    secondPersonGroup.style.display = 'none';
    document.querySelector('input[name="companion"][value="alone"]').checked = true;
    document.querySelector('input[name="attendance"][value="yes"]').checked = true;
});

function showMessage(msg, type) {
    formMessage.textContent = msg;
    formMessage.style.display = 'block';
    formMessage.style.background = 'rgba(255, 255, 255, 0.8)';
    
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 4000);
}