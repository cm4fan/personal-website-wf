// Theme switcher logic
const switcherRadios = document.querySelectorAll('.switcher__radio');

function setupSwitcher() {
    const savedScheme = getSavedScheme();
    if (savedScheme !== null) {
        const currentRadio = document.querySelector(`.switcher__radio[value=${savedScheme}]`);
        if (currentRadio) currentRadio.checked = true;
    }
    [...switcherRadios].forEach((radio) => {
        radio.addEventListener('change', (event) => {
            setScheme(event.target.value);
        });
    });
}

function setScheme(scheme) {
    if (scheme === 'auto') {
        document.documentElement.removeAttribute('data-theme');
        clearScheme();
    } else {
        document.documentElement.setAttribute('data-theme', scheme);
        saveScheme(scheme);
    }
}

function getSavedScheme() {
    return localStorage.getItem('color-scheme');
}

function saveScheme(scheme) {
    localStorage.setItem('color-scheme', scheme);
    document.cookie = "color-scheme=" + scheme + "; path=/; max-age=31536000";
}

function clearScheme() {
    localStorage.removeItem('color-scheme');
}

// Only run if switcher is present
if (switcherRadios.length > 0) {
    setupSwitcher();
} 