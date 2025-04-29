const cat = document.querySelector('.cat');
let mouseX = 0, mouseY = 0;
let catX = 0, catY = 0;
const speed = 0.15; // Smooth follow effect

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function moveCat() {
  catX += (mouseX - catX) * speed;
  catY += (mouseY - catY) * speed;
  cat.style.transform = `translate(${catX}px, ${catY}px)`;
  requestAnimationFrame(moveCat);
}

moveCat();


// 

document.addEventListener('click', () => {
    cat.classList.toggle('jump');
  });
  
  let idleTimeout;
  document.addEventListener('mousemove', () => {
    clearTimeout(idleTimeout);
    cat.classList.remove('sleeping');
  
    idleTimeout = setTimeout(() => {
      cat.classList.add('sleeping');
    }, 5000); // Sleep after 5 seconds of inactivity
  });

  
// 

.jump {
    transform: translateY(-20px);
    transition: transform 0.3s;
  }
  
  .sleeping {
    opacity: 0.5;
  }
  