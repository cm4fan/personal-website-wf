// Смена темы

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
}

function clearScheme() {
    localStorage.removeItem('color-scheme');
}

setupSwitcher();

// Автозапуск видео

document.addEventListener('DOMContentLoaded', () => {
        const videos = document.querySelectorAll('video');

        const options = {
          root: null,
          rootMargin: '-1% 0px -7% 0px',
          threshold: 1
        };

        const observer = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
              video.play();
            } else {
              video.pause();
            }
          });
        }, options);

        videos.forEach(video => {
          observer.observe(video);
        });
      });