document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const canvas = document.getElementById('mazeCanvas');
    const ctx = canvas.getContext('2d');
    const winMessage = document.getElementById('win-message');

    let gameStarted = false;
    let gameWon = false;

noBtn.addEventListener('click', (e) => {
    e.preventDefault(); 
    moveNoButton();
});

noBtn.addEventListener('mouseenter', () => {
    moveNoButton();
});

function moveNoButton() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    const randomX = Math.floor(Math.random() * (screenWidth - btnWidth));
    const randomY = Math.floor(Math.random() * (screenHeight - btnHeight));

    noBtn.style.position = 'absolute';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
}


    const infoScreen = document.getElementById('info-screen');
const startGameBtn = document.getElementById('start-game-btn');

yesBtn.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    infoScreen.classList.remove('hidden');
});

startGameBtn.addEventListener('click', () => {
    if (gameStarted) return;
    gameStarted = true;
    infoScreen.classList.add('hidden');
    document.addEventListener('keydown', movePlayer);
    gameLoop();
});


    const maze = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    const cellSize = 40;
    canvas.width = maze[0].length * cellSize;
    canvas.height = maze.length * cellSize;

    let player = { x: 1, y: 1 };

let particles = [];

function createParticle(x, y) {
    particles.push({
        x: x * cellSize + cellSize / 2,
        y: y * cellSize + cellSize / 2,
        size: Math.random() * 6 + 6,
        opacity: 1,
        life: 60 
    });
}

function drawParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = "pink";

        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x - p.size / 2, p.y - p.size / 3, p.size / 3, 0, Math.PI, true);
        ctx.arc(p.x + p.size / 2, p.y - p.size / 3, p.size / 3, 0, Math.PI, true);
        ctx.lineTo(p.x, p.y + p.size / 2);
        ctx.closePath();
        ctx.fill();

        ctx.restore();

        p.y += 0.3;           
        p.opacity -= 0.015;   
        p.life--;

        if (p.life <= 0 || p.opacity <= 0) {
            particles.splice(i, 1);
        }
    }
}


const playerImg = new Image();
playerImg.src = "her.png"; 

const exitImg = new Image();
exitImg.src = "him.png"; 

function drawMaze() {
  for (let row = 0; row < maze.length; row++) {
    for (let col = 0; col < maze[row].length; col++) {
      if (maze[row][col] === 1) {
        const gradient = ctx.createLinearGradient(0, 0, cellSize, cellSize);
gradient.addColorStop(0, "#4a0030");  
gradient.addColorStop(0.5, "#650037"); 
gradient.addColorStop(1, "#8a0e56");   
ctx.fillStyle = gradient;
ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);

      } else {
        ctx.fillStyle = "#f8d6e0"; 
        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  }

    ctx.imageSmoothingEnabled = false;
ctx.drawImage(
  exitImg,
  14 * cellSize - cellSize * 0.15,  
  13 * cellSize - cellSize * 0.55,  
  cellSize * 1.5,  
  cellSize * 1.8   
);
}

function drawPlayer() {
  ctx.imageSmoothingEnabled = false;

  const scale = 1.3; 
  const offset = (cellSize * (scale - 1)) / 2;
  const lift = 5; 

  ctx.drawImage(
    playerImg,
    player.x * cellSize - offset,
    player.y * cellSize - offset - lift, 
    cellSize * scale,
    cellSize * scale
  );
}





    function checkWin() {
    if (!gameWon && player.x === 14 && player.y === 13) {
        gameWon = true;
        winMessage.classList.remove('hidden');
        winMessage.classList.add('visible');
    }
}


    function movePlayer(e) {
        if (gameWon) return;

        let newX = player.x;
        let newY = player.y;

        createParticle(player.x, player.y);


        switch (e.key) {
            case 'ArrowUp': newY--; break;
            case 'ArrowDown': newY++; break;
            case 'ArrowLeft': newX--; break;
            case 'ArrowRight': newX++; break;
        }

        if (maze[newY] && maze[newY][newX] === 0) {
            player.x = newX;
            player.y = newY;
        }

        checkWin();
    }

document.querySelectorAll("#controls button").forEach(btn => {
    btn.addEventListener("click", () => {
        let dir = btn.getAttribute("data-dir");
        let event = { key: "" };
        if (dir === "up") event.key = "ArrowUp";
        if (dir === "down") event.key = "ArrowDown";
        if (dir === "left") event.key = "ArrowLeft";
        if (dir === "right") event.key = "ArrowRight";
        movePlayer(event);
    });
});

let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

canvas.addEventListener("touchend", (e) => {
    let dx = e.changedTouches[0].clientX - touchStartX;
    let dy = e.changedTouches[0].clientY - touchStartY;

    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 30) movePlayer({ key: "ArrowRight" });
        else if (dx < -30) movePlayer({ key: "ArrowLeft" });
    } else {
        if (dy > 30) movePlayer({ key: "ArrowDown" });
        else if (dy < -30) movePlayer({ key: "ArrowUp" });
    }
});


    function gameLoop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawMaze();
        drawPlayer();
        drawParticles();
        if (!gameWon) requestAnimationFrame(gameLoop);
    }

    
const dialogues = [
    { text: "YAYYY, you did so good baby 💕”", img: "shoulderLevel.png" },
    { text: "“Like i said, here is your kiss ”", img: "him2.png" },
    { text: "“Mwuaaahhh! I love youuuu sooooooooo muchhhhhhh!!!!!! 💖”", img: "kissing.png" }
];

let dialogueIndex = 0;
const dialogueElement = document.getElementById("dialogue");
const chatImg = document.getElementById("chat-img"); 
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn"); 

restartBtn.addEventListener("click", () => {
  window.location.reload(); 
});

const moonPage = document.getElementById("moon-page");


nextBtn.addEventListener("click", () => {
  dialogueIndex++;
  if (dialogueIndex < dialogues.length) {
    dialogueElement.textContent = dialogues[dialogueIndex].text;
    chatImg.src = dialogues[dialogueIndex].img;

    if (dialogues[dialogueIndex].img === "kissing.png") {
      chatImg.classList.add("zoomed");
    } else {
      chatImg.classList.remove("zoomed");
    }
  } else {
    winMessage.classList.add("hidden");
    moonPage.classList.add("visible");

    const moonMusic = document.getElementById("moon-music");
    moonMusic.volume = 0.5;
    moonMusic.play().catch(err => {
      console.warn("Autoplay blocked, user interaction required:", err);
    });
  }
});


const moonPageImg = document.querySelector("#moon-page img");
const moonGifs = ["cat1.gif", "cats2.gif"];
let currentGifIndex = 0;
let isTransitioning = false;

moonPage.addEventListener("click", () => {
  if (isTransitioning) return; 
  isTransitioning = true;

  moonPageImg.style.transition = "opacity 1s ease-in-out";
  moonPageImg.style.opacity = "0";

  setTimeout(() => {
    currentGifIndex = (currentGifIndex + 1) % moonGifs.length;
    moonPageImg.src = moonGifs[currentGifIndex];

    moonPageImg.onload = () => {
      moonPageImg.style.opacity = "1";
      setTimeout(() => (isTransitioning = false), 1000);
    };
  }, 1000); 
});




});
