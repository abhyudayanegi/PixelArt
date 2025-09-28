
const container = document.querySelector(".canvas"),
    sizeInput = document.querySelector(".pixelNumbers"),
    colorPicker = document.querySelector(".colourPicker"),
    resetBtn = document.querySelector(".resetBtn"),
    eraseBtn = document.querySelector(".eraseBtn"),
    randomColorBtn = document.querySelector(".randomColorBtn");



let size = sizeInput.value,
    draw = false,
    erase = false;

// pixel grid of the site
function createPixelGrid(n) {
    container.style.gridTemplate = `repeat(${n},1fr)/repeat(${n},1fr)`;
    container.innerHTML = "";
    for (let i = 0; i < n * n; i++) {
        const pixel = document.createElement("div");
        pixel.className = "pixel";
        pixel.onmousedown = () =>
            (pixel.style.backgroundColor = erase ? "" : colorPicker.value);
        pixel.onmouseenter = () => {
            if (draw) pixel.style.backgroundColor = erase ? "" : colorPicker.value;
        };
        container.appendChild(pixel);
    }
}

// random color API
async function fetchRandomColor() {
    try {
        const res = await fetch("https://www.thecolorapi.com/random");
        colorPicker.value = (await res.json()).hex.value;
    } catch {
        alert("Couldn't fetch a random color. Try again!");
    }
}

// draw, erase, reset, grid size
window.onmousedown = () => (draw = true);
window.onmouseup = () => (draw = false);
sizeInput.onchange = () => {
    size = Math.min(50, Math.max(5, +sizeInput.value || 30));
    sizeInput.value = size;
    createPixelGrid(size);
};
eraseBtn.onclick = () => {
    erase = !erase;
    eraseBtn.textContent = erase ? "Draw" : "Erase";
};
resetBtn.onclick = () => {
    if (confirm("Are you sure you want to reset the board?"))
        createPixelGrid(size);
    randomColorBtn.onclick = fetchRandomColor;
}
createPixelGrid(size);