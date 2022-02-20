export function onScroll() {
  let intervalID = null;

  window.addEventListener('scroll', () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = Math.ceil(window.scrollY);
    console.log(scrolled);

    intervalID = setInterval(() => {
      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }, 4000);
    if (Math.ceil(scrolled) === scrollable) {
      clearInterval(intervalID);
      console.log('stop');
    }
  });
}
