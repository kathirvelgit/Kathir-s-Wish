const gift = document.querySelector("#gift");
const giftArea = document.querySelector("#giftArea");
const giftHint = document.querySelector("#giftHint");
const modal = document.querySelector("#modal");
const closeModal = document.querySelector("#closeModal");
const petals = document.querySelector(".petals");

let moves = 0;
let caught = false;

function moveGift() {
  if (caught) return;

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
  moves += 1;

  if (moves >= 3) {
    giftHint.textContent = "Almost there—catch the gift!";
  }
}

gift.addEventListener("pointerenter", (event) => {
  if (event.pointerType === "mouse") moveGift();
});

gift.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  moveGift();
});

gift.addEventListener("click", () => {
  if (moves < 2) {
    moveGift();
    return;
  }

  caught = true;
  gift.classList.add("caught");
  giftHint.style.opacity = "0";

  window.setTimeout(() => {
    modal.classList.add("open");
    giftHint.textContent = "You caught the gift!";
  }, 360);
});

function closeGiftModal() {
  modal.classList.remove("open");
  caught = false;
  moves = 0;
  gift.classList.remove("caught");
  giftHint.style.opacity = "1";
  giftHint.textContent = "Catch the gift to open it!";
  gift.style.setProperty("--gift-x", "50%");
  gift.style.setProperty("--gift-y", "72%");
  closeModal.blur();
}

closeModal.addEventListener("click", closeGiftModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) closeGiftModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) {
    closeGiftModal();
  }
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
