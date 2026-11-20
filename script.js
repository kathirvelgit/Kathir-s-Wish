const gift = document.querySelector("#gift");
const petals = document.querySelector(".petals");

function moveGift() {
  const areaWidth = window.innerWidth;
  const areaHeight = window.innerHeight;
  const giftWidth = gift.offsetWidth;
  const giftHeight = gift.offsetHeight;
  const sidePadding = 16;
  const topPadding = 24;
  const bottomPadding = 72;
  const minX = Math.min(sidePadding + giftWidth / 2, areaWidth / 2);
  const maxX = Math.max(areaWidth - sidePadding - giftWidth / 2, areaWidth / 2);
  const minY = Math.min(topPadding + giftHeight / 2, areaHeight / 2);
  const maxY = Math.max(areaHeight - bottomPadding - giftHeight / 2, areaHeight / 2);

  const x = Math.random() * (maxX - minX) + minX;
  const y = Math.random() * (maxY - minY) + minY;

  gift.style.setProperty("--gift-x", `${x}px`);
  gift.style.setProperty("--gift-y", `${y}px`);
}

gift.addEventListener("pointerenter", (event) => {
  if (event.pointerType === "mouse") moveGift();
});

gift.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  moveGift();
});

gift.addEventListener("click", (event) => {
  if (event.detail === 0) moveGift();
});

for (let i = 0; i < 18; i += 1) {
  const petal = document.createElement("i");
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.top = `${-20 - Math.random() * 100}px`;
  petal.style.animationDuration = `${7 + Math.random() * 8}s`;
  petal.style.animationDelay = `${Math.random() * -12}s`;
  petal.style.opacity = `${0.25 + Math.random() * 0.45}`;
  petals.appendChild(petal);
}
