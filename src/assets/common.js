window.onload = () => {
  document.addEventListener('touchend', event => {
    event = event || window.event
    if (event.changedTouches[0].target.nodeName !== 'INPUT') {
      document.querySelector('input').blur()
    }
  })
}
