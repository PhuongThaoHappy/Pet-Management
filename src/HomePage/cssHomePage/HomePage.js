let cart = [];

function addToCart(itemName, price, quantity = 1) {
    const existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ name: itemName, price: price, quantity: quantity });
    }
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `<span>${item.name}</span> <span>${(item.price * item.quantity).toLocaleString()}đ</span> <span>Số Lượng: ${item.quantity}</span> <button onclick="removeOneItem('${item.name}')">Xóa</button>`;
        cartItems.appendChild(div);
    });

    cartTotal.textContent = `Tổng Cộng: ${total.toLocaleString()}đ`;
}

function removeOneItem(itemName) {
    const item = cart.find(item => item.name === itemName);
    if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
            cart = cart.filter(item => item.name !== itemName);
        }
        updateCart();
    }
}

function toggleSubServices(id) {
    const subServices = document.getElementById(id);
    subServices.classList.toggle('active');
}

function toggleResidenceForm() {
    const form = document.getElementById('residence-form');
    form.classList.toggle('active');
}

function generatePetForms() {
    const petCount = document.getElementById('pet-count').value;
    const petForms = document.getElementById('pet-forms');
    petForms.innerHTML = '';
    for (let i = 0; i < petCount; i++) {
        const div = document.createElement('div');
        div.className = 'pet-form';
        div.innerHTML = `<h4>Thông tin thú cưng ${i + 1}</h4><input type="text" placeholder="Tên thú cưng"><textarea placeholder="Ghi chú"></textarea>`;
        petForms.appendChild(div);
    }
}

function bookResidence() {
    alert('Đặt lịch cư trú thành công!');
}

function openBookingModal() {
    document.getElementById('booking-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('booking-modal').classList.remove('active');
}

function confirmBooking() {
    const date = document.getElementById('appointment-date').value;
    const time = document.getElementById('appointment-time').value;
    const petCount = document.getElementById('pet-count-modal').value;
    if (date && time && petCount) {
        document.getElementById('notification').textContent = `Đặt lịch thành công vào ${date} lúc ${time} cho ${petCount} thú cưng!`;
        document.getElementById('notification').classList.add('active');
        setTimeout(() => {
            document.getElementById('notification').classList.remove('active');
        }, 3000);
        closeModal();
    } else {
        alert('Vui lòng điền đầy đủ thông tin!');
    }
}

function handleLogin() {
    window.location.href = "DangNhap.html";
}

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.querySelector('.login');
    if (loginButton) {
        loginButton.addEventListener('click', handleLogin);
    }
});
// đăng xuất
function updateLoginButton() {
    const loginButton = document.querySelector('.login');
    if (!loginButton) return;

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
        loginButton.querySelector('span').textContent = 'Đăng xuất';
        loginButton.removeEventListener('click', handleLogin);
        loginButton.addEventListener('click', handleLogout);
    } else {
        loginButton.querySelector('span').textContent = 'Đăng nhập';
        loginButton.removeEventListener('click', handleLogout);
        loginButton.addEventListener('click', handleLogin);
    }
}

function handleLogin() {
    window.location.href = "DangNhap.html"; 
}

function handleLogout() {
    localStorage.setItem('isLoggedIn', 'false'); 
    updateLoginButton(); // Cập nhật nút
    alert('Bạn đã đăng xuất thành công!');
}

document.addEventListener('DOMContentLoaded', () => {
    updateLoginButton(); 
    const loginButton = document.querySelector('.login');
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            if (!isLoggedIn) {
                handleLogin();
            } else {
                handleLogout();
            }
        });
    }
});