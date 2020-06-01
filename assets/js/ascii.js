(function() {
  let interval, animation;
  let counter;
  let speed = 250;
  let animationInput = document.querySelector("#animation")
  let startInput = document.querySelector('#start')
  let stopInput = document.querySelector('#stop')
  let sizeInput = document.querySelector("#size")
  let turboInput = document.querySelector('#turbo')
  let textarea = document.querySelector('#textarea')
  let sizes = ['tiny', 'small', 'medium', 'large', 'extra-large', 'xxl'];

  function removeOldSize() {
    textarea.classList.remove(...sizes)
  }

  animationInput.addEventListener('change', function() {
    animation = textarea.value = ANIMATIONS[this.value];
  });

  sizeInput.addEventListener('change', function() {
    removeOldSize();
    textarea.classList.add(this.value);
  });

  stopInput.addEventListener('click', function() {
    startInput.disabled = false;
    animationInput.disabled = false;
    stopInput.disabled = true;
    clearInterval(interval);
    textarea.value = animation;
  })

  turboInput.addEventListener('change', function() {
    clearInterval(interval);
    speed = this.checked ? 50 : 250;
    animate();
  })

  let animate = function() {
    startInput.disabled = true;
    animationInput.disabled = true;
    stopInput.disabled = false;

    let parts = animation.split("=====");
    interval = setInterval(function() {
      textarea.value = parts[counter];
      counter++;
      if(counter >= parts.length) {
        counter = 0;
      }
    }, speed);
  }

  startInput.addEventListener('click', function() {
    counter = 0;
    animate();
  })

})();
