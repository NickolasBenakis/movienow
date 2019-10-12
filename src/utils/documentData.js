export function getScrollTop() {
    return window.pageYOffset !== undefined
        ? window.pageYOffset
        : (
              document.documentElement ||
              document.body.parentNode ||
              document.body
          ).scrollTop;
}

export function isMobileDevice() {
    return window.innerWidth < 640;
}
