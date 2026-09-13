document.addEventListener('DOMContentLoaded', () => {
    console.log('Website loaded and ready.');

    // You can add JavaScript for the interactive dashboard here.
    // For example, to dynamically update announcements or events.
    const dashboardSection = document.getElementById('dashboard');
    const announcements = ['Welcome to our new website!', 'Youth Bible study this Friday.'];

    let announcementIndex = 0;
    const updateAnnouncement = () => {
        const p = dashboardSection.querySelector('p');
        if (p) {
            p.textContent = `Announcements: ${announcements[announcementIndex]}`;
            announcementIndex = (announcementIndex + 1) % announcements.length;
        }
    };

    setInterval(updateAnnouncement, 5000); // Change announcement every 5 seconds
});
document.addEventListener('DOMContentLoaded', function() {
    // Initialize gallery filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Handle filter button clicks
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // Filter gallery items
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    item.classList.add('show');
                } else {
                    item.style.display = 'none';
                    item.classList.remove('show');
                }
            });
        });
    });

    // Initialize Lightbox
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'albumLabel': 'Image %1 of %2'
    });

    // Load gallery images from localStorage if available
    const loadGalleryImages = () => {
        const images = JSON.parse(localStorage.getItem('galleryImages') || '[]');
        const galleryGrid = document.querySelector('.gallery-grid');
        if (galleryGrid && images.length > 0) {
            galleryGrid.innerHTML = images.map(img => `
                <div class="gallery-item" data-category="${img.category}">
                    <a href="${img.src}" data-lightbox="church-gallery" data-title="${img.caption}">
                        <img src="${img.src}" alt="${img.caption}">
                        <div class="gallery-caption">${img.caption}</div>
                    </a>
                </div>
            `).join('');
        }
    };

    loadGalleryImages();
});