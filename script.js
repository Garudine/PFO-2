const palettes = [
  ["#fce4ec", "#fff9c4", "#c8e6c9", "#bbdefb", "#fce4ec"],
  ["#fff9c4", "#c8e6c9", "#bbdefb", "#fce4ec", "#fff9c4"],
  ["#c8e6c9", "#bbdefb", "#fce4ec", "#fff9c4", "#c8e6c9"],
  ["#bbdefb", "#fce4ec", "#fff9c4", "#c8e6c9", "#bbdefb"],
  ["#f3e5f5", "#fce4ec", "#fff9c4", "#e0f2f1", "#f3e5f5"],
  ["#e0f2f1", "#f3e5f5", "#fce4ec", "#fff9c4", "#e0f2f1"],
];
let i = 0;
const frame = document.querySelector(".frame");

setInterval(() => {
  i = (i + 1) % palettes.length;
  frame.style.transition = "background 2s ease";
  frame.style.background = `linear-gradient(145deg, ${palettes[i].join(", ")})`;
  frame.style.backgroundSize = "300% 300%";
  frame.style.animation = "gradientShift 14s ease infinite";
}, 6000);
