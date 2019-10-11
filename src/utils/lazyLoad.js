

export const lazyLoad = ()=> {


    var lazyBackgrounds = [].slice.call(
        document.querySelectorAll('.lazy-load')
    );

    if ('IntersectionObserver' in window) {
        let lazyBackgroundObserver = new IntersectionObserver(function(
            entries,
            observer
        ) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const imageSrc =entry.target.attributes[2].value.substring(0);
                    entry.target.style.backgroundImage = imageSrc;
                    lazyBackgroundObserver.unobserve(entry.target);
                }
            });
        });

        lazyBackgrounds.forEach(function(lazyBackground) {
            lazyBackgroundObserver.observe(lazyBackground);
        });
    }
}