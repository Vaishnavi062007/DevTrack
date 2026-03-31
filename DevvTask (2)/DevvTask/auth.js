const authForm = document.getElementById('auth-form');
const toggleOptBtn = document.getElementById('toggle-opt');
const toggleText = document.getElementById('toggle-text');
const nameGroup = document.getElementById('name-group');
const nameInput = document.getElementById('name');
const submitBtn = document.getElementById('submit-btn');
const formSubtitle = document.getElementById('form-subtitle');
const errorMessage = document.getElementById('error-message');

let isLogin = true;

// Check if user is already logged in
if (localStorage.getItem('token')) {
    const role = localStorage.getItem('role');
    if (role === 'admin') {
        window.location.href = '/admin.html';
    } else {
        window.location.href = '/index.html';
    }
}

toggleOptBtn.addEventListener('click', () => {
    isLogin = !isLogin;
    errorMessage.classList.add('hidden');

    if (isLogin) {
        nameGroup.classList.add('hidden');
        nameInput.required = false;
        submitBtn.textContent = 'Sign In';
        toggleText.textContent = "Don't have an account?";
        toggleOptBtn.textContent = 'Sign up';
        formSubtitle.textContent = 'Sign in to track your progress';
    } else {
        nameGroup.classList.remove('hidden');
        nameInput.required = true;
        submitBtn.textContent = 'Create Account';
        toggleText.textContent = "Already have an account?";
        toggleOptBtn.textContent = 'Sign in';
        formSubtitle.textContent = 'Join the DevTrack community';
    }
});

authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="animate-pulse">Loading...</span>';
    errorMessage.classList.add('hidden');

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const name = isLogin ? null : document.getElementById('name').value;

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || 'Authentication failed');
        }

        // Store user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data._id);
        localStorage.setItem('role', data.role);
        localStorage.setItem('userName', data.name);

        // Redirect based on role
        if (data.role === 'admin') {
            window.location.href = '/admin.html';
        } else {
            window.location.href = '/index.html';
        }

    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.classList.remove('hidden');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = isLogin ? 'Sign In' : 'Create Account';
    }
});

window.quickLogin = function (email, password) {
    if (!isLogin) toggleOptBtn.click(); // Switch to login mode if accidentally on signup mode
    document.getElementById('email').value = email;
    document.getElementById('password').value = password;
    submitBtn.click();
};
