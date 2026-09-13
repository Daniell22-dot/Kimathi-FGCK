// Check if user is logged in
function checkAuth() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn && !window.location.href.includes('login.html')) {
        window.location.href = 'login.html';
    }
}

// Login handling
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Simple authentication (replace with secure server-side auth)
        if (username === 'admin' && password === 'yourpassword') {
            localStorage.setItem('adminLoggedIn', 'true');
            window.location.href = 'dashboard.html';
        } else {
            alert('Invalid credentials');
        }
    });
}

// Image upload handling
if (document.getElementById('uploadForm')) {
    document.getElementById('uploadForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const files = document.getElementById('imageFile').files;
        const category = document.getElementById('category').value;
        const caption = document.getElementById('caption').value;

        // Here you would typically send this to your server
        // For now, we'll just simulate storage in localStorage
        for (let file of files) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const images = JSON.parse(localStorage.getItem('galleryImages') || '[]');
                images.push({
                    id: Date.now(),
                    src: e.target.result,
                    category,
                    caption
                });
                localStorage.setItem('galleryImages', JSON.stringify(images));
                loadImages();
            };
            reader.readAsDataURL(file);
        }
    });
}

// Load and display existing images
function loadImages() {
    const imageGrid = document.getElementById('imageGrid');
    if (!imageGrid) return;

    const images = JSON.parse(localStorage.getItem('galleryImages') || '[]');
    imageGrid.innerHTML = images.map(img => `
        <div class="image-card">
            <img src="${img.src}" alt="${img.caption}">
            <button class="delete-btn" onclick="deleteImage(${img.id})">×</button>
            <p>${img.caption}</p>
        </div>
    `).join('');
}

// Delete image
function deleteImage(id) {
    if (confirm('Are you sure you want to delete this image?')) {
        let images = JSON.parse(localStorage.getItem('galleryImages') || '[]');
        images = images.filter(img => img.id !== id);
        localStorage.setItem('galleryImages', JSON.stringify(images));
        loadImages();
    }
}

// Initialize
checkAuth();
if (document.getElementById('imageGrid')) {
    loadImages();
}