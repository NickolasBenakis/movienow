

console.log("uparxw")
export const lazyLoad = ()=> {


    var lazyBackgrounds = [].slice.call(
        document.querySelectorAll('.loading-image')
    );

    if ('IntersectionObserver' in window) {
        let lazyBackgroundObserver = new IntersectionObserver(function(
            entries,
            observer
        ) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('loading-image');
                    entry.target.classList.add('visible');
                    lazyBackgroundObserver.unobserve(entry.target);
                }
            });
        });

        lazyBackgrounds.forEach(function(lazyBackground) {
            lazyBackgroundObserver.observe(lazyBackground);
        });
    }
}