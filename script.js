/* ==========================================================
   SHIVANSH TOURS AND TRAVELS - INTERACTIVE JAVASCRIPT
========================================================== */

// --- 1. LIGHT / DARK THEME SWITCHER LOGIC ---
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
const themeIconMobile = document.getElementById('theme-icon-mobile');
const sunIcon = document.getElementById('theme-toggle-sun');
const moonIcon = document.getElementById('theme-toggle-moon');

/**
 * Initializes the website theme based on previous local storage settings
 * or the user's system dark mode preferences.
 */
function initTheme() {
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        if(sunIcon) sunIcon.classList.remove('hidden');
        if(moonIcon) moonIcon.classList.add('hidden');
        if(themeIconMobile) themeIconMobile.textContent = '☀️';
    } else {
        document.documentElement.classList.remove('dark');
        if(sunIcon) sunIcon.classList.add('hidden');
        if(moonIcon) moonIcon.classList.remove('hidden');
        if(themeIconMobile) themeIconMobile.textContent = '🌙';
    }
}

/**
 * Toggles the theme class on the HTML document and saves the state to localStorage.
 */
function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('color-theme', 'light');
        if(themeIconMobile) themeIconMobile.textContent = '🌙';
        if(sunIcon) { sunIcon.classList.add('hidden'); moonIcon.classList.remove('hidden'); }
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('color-theme', 'dark');
        if(themeIconMobile) themeIconMobile.textContent = '☀️';
        if(sunIcon) { sunIcon.classList.remove('hidden'); moonIcon.classList.add('hidden'); }
    }
}

// Attach event click listeners for both desktop and mobile theme switch buttons
if(themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        if(sunIcon && moonIcon) {
            sunIcon.classList.toggle('hidden');
            moonIcon.classList.toggle('hidden');
        }
        toggleTheme();
    });
}

if(themeToggleMobileBtn) {
    themeToggleMobileBtn.addEventListener('click', toggleTheme);
}


// --- 2. MOBILE HAMBURGER MENU LOGIC ---
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (menuBtn && mobileMenu) {
    // Toggle mobile dropdown menu visibility
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Automatically close the mobile menu when clicking any section anchor link inside it
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}


// --- 3. WHATSAPP DIRECT INQUIRY SUBMISSION LOGIC WITH RESET OPTION ---
const inquiryForm = document.getElementById('inquiry-form');

// Global variable to store the original form layout for the reset/re-inquire feature
let originalFormHTML = '';

document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.getElementById('form-container');
    if (formContainer) {
        // Cache the raw form HTML layout right after DOM content loads
        originalFormHTML = formContainer.innerHTML;
    }
});

/**
 * Handles the contact form submission, generates a structured text string,
 * redirects the user to WhatsApp, and renders a dynamic Thank You screen with a reset button.
 */
function handleFormSubmit(e) {
    e.preventDefault(); // Prevents default form action page reloads
    
    // Capture user values from form inputs
    const name = document.getElementById('form-name').value;
    const phone = document.getElementById('form-phone').value;
    const service = document.getElementById('form-service').value;
    const msg = document.getElementById('form-msg').value;

    // Build a structured text string for the WhatsApp text payload
    const whatsappText = `Hello Shivansh Travels, %0A%0A` +
                         `*New Website Inquiry* ⚡%0A` +
                         `---------------------------%0A` +
                         `👤 *Name:* ${encodeURIComponent(name)}%0A` +
                         `📞 *Phone:* ${encodeURIComponent(phone)}%0A` +
                         `🚘 *Service:* ${encodeURIComponent(service)}%0A` +
                         `📝 *Requirement:* ${encodeURIComponent(msg)}`;

    // Target business WhatsApp number
    const myWhatsAppNumber = "918419994142";

    // Redirect user to WhatsApp API in a separate browser tab
    window.open(`https://wa.me/${myWhatsAppNumber}?text=${whatsappText}`, '_blank');
    
    // Swap the form layout with an animated dynamic Thank You wrapper screen
    const formContainer = document.getElementById('form-container');
    if (formContainer) {
        formContainer.innerHTML = `
            <div class="text-center py-10 space-y-5 animate-fade-in">
                <div class="w-20 h-20 bg-green-100 dark:bg-green-950/50 rounded-full flex items-center justify-center mx-auto text-4xl shadow-md border border-green-200 dark:border-green-900 animate-bounce">
                    ✅
                </div>
                <h3 class="text-2xl font-black text-green-600 dark:text-green-400 tracking-wide uppercase">
                    Inquiry Sent!
                </h3>
                <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed max-w-sm mx-auto">
                    Thank you, <strong>${name}</strong>! We have opened WhatsApp to send your requirement for <strong>${service}</strong> directly to Prathamesh.
                </p>
                <p class="text-xs text-gray-400 dark:text-gray-500">
                    Want to inquire about another service? Click the button below.
                </p>
                
                <div class="pt-2">
                    <button id="reset-form-btn" class="bg-gray-900 dark:bg-brand-orange text-white font-bold py-3 px-6 rounded-xl text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-md">
                        🔄 Inquire About Another Feature
                    </button>
                </div>
            </div>
        `;

        // Attach click action to reset form back to normal view
        document.getElementById('reset-form-btn').addEventListener('click', () => {
            formContainer.innerHTML = originalFormHTML;
            // Re-bind listener onto fresh input elements layout
            document.getElementById('inquiry-form').addEventListener('submit', handleFormSubmit);
        });
    }
}

// Bind form submit processing listener execution onto active element container 
if (inquiryForm) {
    inquiryForm.addEventListener('submit', handleFormSubmit);
}

// --- 5. INITIALIZE SCROLL FRAMEWORK ON WINDOW LOAD ---
document.addEventListener('DOMContentLoaded', () => {
    initTheme(); 
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,      
            offset: 120,     
            duration: 1000   
        });
    }
});