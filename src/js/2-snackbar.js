document.querySelector('.form').addEventListener('submit', (event) => {
    event.preventDefault();
  
    const form = event.currentTarget;
    const delayInput = form.elements.delay.value;
    const state = form.elements.state.value;
  
    const delay = parseInt(delayInput, 10);
  
    if (isNaN(delay) || delay <= 0) {
      iziToast.error({
        title: 'Error',
        message: 'Please enter a valid positive delay in milliseconds.',
      });
      return;
    }
  
    createPromise(delay, state)
      .then((message) => {
        iziToast.success({
          title: 'Success',
          message,
        });
      })
      .catch((message) => {
        iziToast.error({
          title: 'Error',
          message,
        });
      });
  });

  function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const message = `Promise ${state} in ${delay}ms`;
        if (state === 'fulfilled') {
          resolve(`✅ ${message}`);
        } else {
          reject(`❌ ${message}`);
        }
      }, delay);
    });
  }
  