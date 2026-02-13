document.addEventListener('DOMContentLoaded', () => {
	const navToggle = document.querySelector('.nav-toggle');
	const navMenu = document.querySelector('.nav-menu');
	const contactForm = document.querySelector('.contact-form');

	// Mobile navigation
	if (navToggle && navMenu) {
		navToggle.addEventListener('click', () => {
			const isActive = navToggle.classList.toggle('active');
			navMenu.classList.toggle('active');
			
			// Improve accessibility
			navToggle.setAttribute('aria-expanded', isActive);
			navMenu.setAttribute('aria-hidden', !isActive);
		});

		// Close menu when clicking nav links
		document.querySelectorAll('.nav-menu a').forEach(link => {
			link.addEventListener('click', () => {
				navToggle.classList.remove('active');
				navMenu.classList.remove('active');
				navToggle.setAttribute('aria-expanded', 'false');
				navMenu.setAttribute('aria-hidden', 'true');
			});
		});

		// Close menu when clicking outside
		document.addEventListener('click', (e) => {
			if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
				navToggle.classList.remove('active');
				navMenu.classList.remove('active');
				navToggle.setAttribute('aria-expanded', 'false');
				navMenu.setAttribute('aria-hidden', 'true');
			}
		});

		// Close menu on escape key
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && navMenu.classList.contains('active')) {
				navToggle.classList.remove('active');
				navMenu.classList.remove('active');
				navToggle.setAttribute('aria-expanded', 'false');
				navMenu.setAttribute('aria-hidden', 'true');
			}
		});
	}

	// Smooth scroll with offset for sticky nav
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			const href = this.getAttribute('href');
			
			// Skip if it's just "#" (logo link)
			if (href === '#') {
				e.preventDefault();
				window.scrollTo({ top: 0, behavior: 'smooth' });
				return;
			}

			const target = document.querySelector(href);
			if (target) {
				e.preventDefault();
				const navHeight = document.querySelector('.nav').offsetHeight;
				const targetPosition = target.offsetTop - navHeight - 20;
				
				window.scrollTo({
					top: targetPosition,
					behavior: 'smooth'
				});
			}
		});
	});
});
