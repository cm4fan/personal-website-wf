// Video autoplay logic
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