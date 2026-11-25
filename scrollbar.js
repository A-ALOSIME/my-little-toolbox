// A narrow page scrollbar without native arrow buttons. Native scrolling stays enabled.
(() => {
  const root = document.documentElement;
  const track = document.createElement('div');
  const thumb = document.createElement('div');
  track.className = 'page-scrollbar';
  thumb.className = 'page-scrollbar-thumb';
  track.setAttribute('aria-hidden', 'true');
  track.append(thumb);
  document.body.append(track);
  root.classList.add('custom-page-scrollbar');

  let scheduled = false;
  let dragOffset = 0;
  function update() {
    scheduled = false;
    const view = root.clientHeight;
    const total = root.scrollHeight;
    const maxScroll = Math.max(0, total - view);
    track.hidden = maxScroll === 0;
    if (!maxScroll) return;
    const trackHeight = track.clientHeight;
    const thumbHeight = Math.min(trackHeight, Math.max(30, trackHeight * view / total));
    const maxTravel = trackHeight - thumbHeight;
    thumb.style.height = `${thumbHeight}px`;
    thumb.style.transform = `translateY(${Math.max(0, Math.min(1, window.scrollY / maxScroll)) * maxTravel}px)`;
  }
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(update);
  }
  function moveTo(clientY) {
    const rect = track.getBoundingClientRect();
    const maxTravel = track.clientHeight - thumb.offsetHeight;
    const ratio = maxTravel > 0 ? Math.max(0, Math.min(1, (clientY - rect.top - dragOffset) / maxTravel)) : 0;
    window.scrollTo({ top: ratio * Math.max(0, root.scrollHeight - root.clientHeight), behavior: 'instant' });
  }
  track.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    event.preventDefault();
    dragOffset = event.target === thumb ? event.clientY - thumb.getBoundingClientRect().top : thumb.offsetHeight / 2;
    track.setPointerCapture(event.pointerId);
    moveTo(event.clientY);
  });
  track.addEventListener('pointermove', event => {
    if (track.hasPointerCapture(event.pointerId)) moveTo(event.clientY);
  });
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(document.body);
  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
  update();
})();
