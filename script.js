document.addEventListener('DOMContentLoaded', () => {
    const toggleDarkModeButton = document.getElementById('toggle-dark-mode');
    const body = document.body;

    toggleDarkModeButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        document.querySelector('header').classList.toggle('dark-mode');
        document.querySelector('nav ul').classList.toggle('dark-mode');
        document.querySelector('footer').classList.toggle('dark-mode');
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // Fullscreen modal logic
    const photos = document.querySelectorAll('#gallery-of-projects .photo-container img');
    const fullscreenModal = document.createElement('div');
    fullscreenModal.classList.add('fullscreen-modal');
    const fullscreenImg = document.createElement('img');
    fullscreenImg.classList.add('fullscreen-img');
    const closeButton = document.createElement('button');
    closeButton.classList.add('close-button');
    closeButton.textContent = 'X';

    fullscreenModal.appendChild(fullscreenImg);
    fullscreenModal.appendChild(closeButton);
    document.body.appendChild(fullscreenModal);

    // Open fullscreen on image click
    photos.forEach(photo => {
        photo.addEventListener('click', () => {
            fullscreenImg.src = photo.src;  // Set the clicked image to fullscreen
            fullscreenModal.style.display = 'flex';  // Display the modal
        });
    });

    // Close fullscreen modal
    closeButton.addEventListener('click', () => {
        fullscreenModal.style.display = 'none';  // Hide the modal
    });

    // Close fullscreen modal if clicked outside the image
    fullscreenModal.addEventListener('click', (e) => {
        if (e.target === fullscreenModal) {
            fullscreenModal.style.display = 'none';  // Hide the modal
        }
    });

    // Gallery navigation (existing functionality)
    const currentPhotoIndex = 0;
    const currentPhoto = document.getElementById('current-photo');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    function updatePhoto(index) {
        currentPhoto.style.transform = 'scale(0.9)';
        setTimeout(() => {
            currentPhoto.src = photos[index];
            currentPhoto.style.transform = 'scale(1)';
        }, 200);
    }

    prevButton.addEventListener('click', () => {
        currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
        updatePhoto(currentPhotoIndex);
    });

    nextButton.addEventListener('click', () => {
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        updatePhoto(currentPhotoIndex);
    });
});