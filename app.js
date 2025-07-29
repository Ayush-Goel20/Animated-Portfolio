// const video1 = document.getElementById('projectVideo1');
// const video2 = document.getElementById('projectVideo2');
// const video3 = document.getElementById('projectVideo3');

// // Sidebar elements //
// const sideBar = document.querySelector('.sidebar');
// const menu = document.querySelector('.menu-icon');
// const closeIcon = document.querySelector('.close-icon')


// const hoverSign = document.querySelector('.hover-sign');

// const videoList =[video1, video2, video3];

// videoList.forEach (function(video){
//     video.addEventListener("mouseover", function(){
//         video.play()
//         hoverSign.classList.add("active")
//     })
//     video.addEventListener("mouseout", function(){
//     video.pause();
//     hoverSign.classList.remove("active")
// })
// })

// // Sidebar elements //
// menu.addEventListener("click", function(){
//     sideBar.classList.remove("close-sidebar")
//     sideBar.classList.add("open-sidebar")
// });

// closeIcon.addEventListener("click", function(){
//     sideBar.classList.remove("open-sidebar");
//     sideBar.classList.add("close-sidebar");
    
// })

// Video Hover Play/Pause
const video1 = document.getElementById('projectVideo1');
const video2 = document.getElementById('projectVideo2');
const video3 = document.getElementById('projectVideo3');

const videoList = [video1, video2, video3];

videoList.forEach(function(video) {
    if (video) {
        video.addEventListener("mouseover", function() {
            video.play();
        });
        
        video.addEventListener("mouseout", function() {
            video.pause();
        });
    }
});

// Sidebar Functionality
const sideBar = document.querySelector('.sidebar');
const menu = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');

menu.addEventListener("click", function() {
    sideBar.classList.remove("close-sidebar");
    sideBar.classList.add("open-sidebar");
    document.body.style.overflow = 'hidden';
});

closeIcon.addEventListener("click", function() {
    sideBar.classList.remove("open-sidebar");
    sideBar.classList.add("close-sidebar");
    document.body.style.overflow = 'auto';
});

// Close sidebar when clicking on a link
const navLinks = document.querySelectorAll('.mobile-nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        sideBar.classList.remove("open-sidebar");
        sideBar.classList.add("close-sidebar");
        document.body.style.overflow = 'auto';
    });
});

// Smooth scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
const contactForm = document.querySelector('.contact-box form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        
        // Simple validation
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Submit form (you would replace this with actual form submission logic)
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Message sent successfully!');
                this.reset();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            alert('There was a problem sending your message. Please try again later.');
            console.error('Error:', error);
        });
    });
}

// Mobile detection and adjustments
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

if (isMobileDevice()) {
    // Disable hover effects on mobile
    document.documentElement.classList.add('mobile-device');
    
    // Adjust animations for mobile
    const autoBlurs = document.querySelectorAll('.autoBlur');
    autoBlurs.forEach(el => {
        el.style.animation = 'none';
    });
}

// Lazy loading for images and videos
document.addEventListener("DOMContentLoaded", function() {
    const lazyMedia = document.querySelectorAll("[loading='lazy']");
    
    if ('IntersectionObserver' in window) {
        const lazyObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const media = entry.target;
                    
                    if (media.tagName === 'IMG') {
                        media.src = media.dataset.src;
                    } else if (media.tagName === 'VIDEO') {
                        media.src = media.dataset.src;
                        media.load();
                    }
                    
                    lazyObserver.unobserve(media);
                }
            });
        });
        
        lazyMedia.forEach(function(media) {
            lazyObserver.observe(media);
        });
    }
});