export const lazyLoad = target => {
    const obs = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                const src = item.getAttribute('data-lazy');

                item.setAttribute('src', src);

                observer.disconnect();
            }
        });
    });
    obs.observe(target);
};
