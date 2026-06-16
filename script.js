const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");
const namesInput = document.getElementById("namesInput");
const spinButton = document.getElementById("spinButton");
const clearButton = document.getElementById("clearButton");
const resultText = document.getElementById("resultText");
const nameCount = document.getElementById("nameCount");
const winnerModal = document.getElementById("winnerModal");
const winnerName = document.getElementById("winnerName");
const removeWinnerButton = document.getElementById("removeWinnerButton");
const skipWinnerButton = document.getElementById("skipWinnerButton");

const colors = [
  "#f26d5b",
  "#ffcf4a",
  "#61d394",
  "#56cfe1",
  "#7b8cff",
  "#c77dff",
  "#ff8fab",
  "#4ecdc4",
  "#f7a072",
  "#9bc53d"
];

let currentRotation = 0;
let isSpinning = false;
let activeWinner = null;

function getNames() {
  return namesInput.value
    .split("\n")
    .map((name) => name.trim())
    .filter(Boolean);
}

function setNames(names) {
  namesInput.value = names.join("\n");
  updateWheel();
}

function pickWinner(names) {
  if (names.length === 0) return null;
  if (names.length === 1) return names[0];
  if (names.length === 2) return names[1];

  const eligibleNames = names.slice(1, -1);
  return eligibleNames[Math.floor(Math.random() * eligibleNames.length)];
}

function getWinnerIndex(names, winner) {
  if (names.length <= 1) return 0;
  if (names.length === 2) return 1;

  for (let index = 1; index < names.length - 1; index += 1) {
    if (names[index] === winner) return index;
  }

  return 0;
}

function openWinnerModal(winner) {
  activeWinner = winner;
  winnerName.textContent = winner.name;
  winnerModal.classList.add("is-open");
  winnerModal.setAttribute("aria-hidden", "false");
}

function closeWinnerModal() {
  activeWinner = null;
  winnerModal.classList.remove("is-open");
  winnerModal.setAttribute("aria-hidden", "true");
}

function drawWheel(names) {
  const size = canvas.width;
  const center = size / 2;
  const radius = center - 18;

  ctx.clearRect(0, 0, size, size);

  if (names.length === 0) {
    drawEmptyWheel(center, radius);
    return;
  }

  const sliceAngle = (Math.PI * 2) / names.length;

  names.forEach((name, index) => {
    const startAngle = currentRotation + index * sliceAngle;
    const endAngle = startAngle + sliceAngle;

    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.arc(center, center, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = colors[index % colors.length];
    ctx.fill();

    ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
    ctx.lineWidth = 2;
    ctx.stroke();

    drawSliceText(name, center, radius, startAngle + sliceAngle / 2, sliceAngle);
  });

  ctx.beginPath();
  ctx.arc(center, center, radius, 0, Math.PI * 2);
  ctx.lineWidth = 10;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(center, center, 66, 0, Math.PI * 2);
  ctx.fillStyle = "#151923";
  ctx.fill();
  ctx.lineWidth = 6;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
  ctx.stroke();
}

function drawEmptyWheel(center, radius) {
  ctx.beginPath();
  ctx.arc(center, center, radius, 0, Math.PI * 2);
  ctx.fillStyle = "#242938";
  ctx.fill();
  ctx.lineWidth = 10;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
  ctx.stroke();

  ctx.fillStyle = "#a9b3c5";
  ctx.font = "700 28px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Nhập tên để bắt đầu", center, center);
}

function drawSliceText(name, center, radius, angle, sliceAngle) {
  ctx.save();
  ctx.translate(center, center);
  ctx.rotate(angle);
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#111318";
  ctx.font = `${getFontSize(name, sliceAngle)}px Arial`;
  ctx.fillText(name, radius - 28, 0, radius * 0.58);
  ctx.restore();
}

function getFontSize(name, sliceAngle) {
  if (name.length > 20 || sliceAngle < 0.35) return 15;
  if (name.length > 14 || sliceAngle < 0.5) return 18;
  return 22;
}

function updateWheel() {
  const names = getNames();
  nameCount.textContent = `${names.length} tên`;
  drawWheel(names);
}

function normalizeAngle(angle) {
  const fullTurn = Math.PI * 2;
  return ((angle % fullTurn) + fullTurn) % fullTurn;
}

function easeOutCubic(progress) {
  return 1 - Math.pow(1 - progress, 3);
}

function spinWheel() {
  if (isSpinning) return;

  const names = getNames();
  const winner = pickWinner(names);

  if (!winner) {
    resultText.textContent = "Vui lòng nhập ít nhất 1 tên.";
    drawWheel(names);
    return;
  }

  const winnerIndex = getWinnerIndex(names, winner);
  const sliceAngle = (Math.PI * 2) / names.length;
  const desiredRotation = normalizeAngle(-winnerIndex * sliceAngle - sliceAngle / 2);
  const currentNormalized = normalizeAngle(currentRotation);
  const angleToTarget = normalizeAngle(desiredRotation - currentNormalized);
  const fullSpins = 6 + Math.floor(Math.random() * 3);
  const startRotation = currentRotation;
  const endRotation = currentRotation + fullSpins * Math.PI * 2 + angleToTarget;
  const duration = 3800;
  const startTime = performance.now();

  isSpinning = true;
  spinButton.disabled = true;
  resultText.textContent = "Đang quay...";

  function animate(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    currentRotation = startRotation + (endRotation - startRotation) * easeOutCubic(progress);
    drawWheel(names);

    if (progress < 1) {
      requestAnimationFrame(animate);
      return;
    }

    currentRotation = endRotation;
    isSpinning = false;
    spinButton.disabled = false;
    resultText.textContent = `${winner} thắng!`;
    openWinnerModal({ name: winner, index: winnerIndex });
  }

  requestAnimationFrame(animate);
}

function removeActiveWinner() {
  if (!activeWinner) return;

  const names = getNames();
  if (activeWinner.index < 0 || activeWinner.index >= names.length) {
    closeWinnerModal();
    return;
  }

  names.splice(activeWinner.index, 1);
  closeWinnerModal();
  resultText.textContent = "Đã xóa người thắng khỏi vòng quay.";
  setNames(names);
}

namesInput.addEventListener("input", () => {
  if (!isSpinning) {
    resultText.textContent = "Chưa quay";
    updateWheel();
  }
});

spinButton.addEventListener("click", spinWheel);

clearButton.addEventListener("click", () => {
  if (isSpinning) return;
  namesInput.value = "";
  resultText.textContent = "Chưa quay";
  closeWinnerModal();
  updateWheel();
});

removeWinnerButton.addEventListener("click", removeActiveWinner);

skipWinnerButton.addEventListener("click", () => {
  closeWinnerModal();
});

winnerModal.addEventListener("click", (event) => {
  if (event.target === winnerModal) {
    closeWinnerModal();
  }
});

updateWheel();
