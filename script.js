const height = 3648;
const width = 5472;
const select = (query) => document.querySelector(query);
const scale = getComputedStyle(select(".glass")).width.slice(0, -2) * 1;
const image = select(".image");

let mouseX = 0;
let mouseY = 0;

function updateGlassPosition() {
  const glass = select(".glass");
  const rect = image.getBoundingClientRect();
  const offsetX = rect.left + window.scrollX;
  const offsetY = rect.top + window.scrollY;

  glass.style.top = `${mouseY - 100}px`;
  glass.style.left = `${mouseX - 100}px`;
  glass.style.backgroundPositionX = `${
    ((mouseX - offsetX) / rect.width) * 100
  }%`;
  glass.style.backgroundPositionY = `${
    ((mouseY - offsetY) / rect.height) * 100
  }%`;
}

function updateMousePosition(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
}

function animate() {
  requestAnimationFrame(animate);
  updateGlassPosition();
}

document.addEventListener("mousemove", updateMousePosition);
animate();
document.addEventListener("keydown", (event) => {
  event.preventDefault();
  let currSize =
    getComputedStyle(select(".glass")).backgroundSize.slice(0, -1) * 1;
  if (event.ctrlKey && event.key === "+") {
    if (currSize === 5000) {
      return 0;
    }
    currSize = currSize + 100;
    select(".glass").style.backgroundSize = `${currSize}%`;
  } else if (event.ctrlKey && event.key === "-") {
    if (currSize === 1000) {
      return 0;
    }
    currSize = currSize - 100;
    select(".glass").style.backgroundSize = `${currSize}%`;
  }
});
