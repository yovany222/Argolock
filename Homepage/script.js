



























const button = document.querySelector('button');

button.addEventListener('click', function() {
     this.style.transform = 'scale(1.1)';
     setTimeout(() => {
          this.style.transform = '';
     }, 300);
});