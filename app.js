// Navigation System
function navigateTo(sectionId) {
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        window.location.hash = sectionId;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        if (sectionId === 'apology') {
            startApologyAnimation();
        } else if (sectionId === 'flashcards') {
            startMemoryGame();
        } else if (sectionId === 'thankyou') {
            initThankYouPage();
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-btn');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            navigateTo(sectionId);
        });
    });
    
    if (window.location.hash) {
        const sectionId = window.location.hash.substring(1);
        navigateTo(sectionId);
    } else {
        navigateTo('home');
    }
    
    initPandaMovement();
});

// Home Page Functions
function showIntro() {
    const card = document.getElementById('intro-card');
    card.innerHTML = `
        <h2>Welcome! 🌸</h2>
        <p>This website is a journey through different ways to say sorry and make things right.</p>
        <p>Each page has something special - from heartfelt messages to fun interactive activities.</p>
        <p>The pandas 🐼 and Christmas lights ✨ are here to bring some joy and cuteness to the experience!</p>
        <div style="text-align: center; margin-top: 2rem;">
            <button class="btn-primary" onclick="location.reload()">Back to Home</button>
            <button class="btn-primary" onclick="navigateTo('apology')">Start Now!</button>
        </div>
    `;
}

function initPandaMovement() {
    const pandas = document.querySelectorAll('.panda');
    pandas.forEach((panda, index) => {
        setInterval(() => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            panda.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, (10 + Math.random() * 5) * 1000);
    });
}

// Apology Page Functions
function startApologyAnimation() {
    setTimeout(() => {
        const hearts = ['💖', '💕', '💗', '💝'];
        for(let i = 0; i < 6; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.position = 'fixed';
                heart.style.fontSize = '2em';
                heart.style.left = Math.random() * window.innerWidth + 'px';
                heart.style.top = window.innerHeight + 'px';
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '1000';
                heart.style.animation = 'floatUp 4s ease-out forwards';
                document.body.appendChild(heart);
                
                setTimeout(() => heart.remove(), 4000);
            }, i * 500);
        }
    }, 1000);
}

const floatUpStyle = document.createElement('style');
floatUpStyle.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-${window.innerHeight}px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(floatUpStyle);

// Game (Tic-Tac-Toe) Functions
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = '🐼';
let gameActive = true;
let playerScore = 0;
let computerScore = 0;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (gameBoard[index] !== '' || !gameActive || currentPlayer !== '🐼') {
        return;
    }

    makeMove(index, '🐼');

    if (checkWin('🐼')) {
        endGame('🐼');
        return;
    }

    if (checkTie()) {
        endGame('tie');
        return;
    }

    currentPlayer = '🤖';
    updateCurrentPlayer();
    
    setTimeout(computerMove, 500);
}

function makeMove(index, player) {
    gameBoard[index] = player;
    const cell = document.querySelector(`#game [data-index="${index}"]`);
    cell.textContent = player;
    cell.disabled = true;
}

function computerMove() {
    if (!gameActive) return;

    const availableMoves = gameBoard.map((cell, index) => cell === '' ? index : null).filter(val => val !== null);
    
    if (availableMoves.length === 0) return;

    let move;
    
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] === '🤖' && gameBoard[b] === '🤖' && gameBoard[c] === '') {
            move = c;
            break;
        }
        if (gameBoard[a] === '🤖' && gameBoard[c] === '🤖' && gameBoard[b] === '') {
            move = b;
            break;
        }
        if (gameBoard[b] === '🤖' && gameBoard[c] === '🤖' && gameBoard[a] === '') {
            move = a;
            break;
        }
    }

    if (move === undefined) {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (gameBoard[a] === '🐼' && gameBoard[b] === '🐼' && gameBoard[c] === '') {
                move = c;
                break;
            }
            if (gameBoard[a] === '🐼' && gameBoard[c] === '🐼' && gameBoard[b] === '') {
                move = b;
                break;
            }
            if (gameBoard[b] === '🐼' && gameBoard[c] === '🐼' && gameBoard[a] === '') {
                move = a;
                break;
            }
        }
    }

    if (move === undefined) {
        if (gameBoard[4] === '') {
            move = 4;
        } else {
            move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        }
    }

    makeMove(move, '🤖');

    if (checkWin('🤖')) {
        endGame('🤖');
        return;
    }

    if (checkTie()) {
        endGame('tie');
        return;
    }

    currentPlayer = '🐼';
    updateCurrentPlayer();
}

function checkWin(player) {
    return winningConditions.some(condition => {
        return condition.every(index => gameBoard[index] === player);
    });
}

function checkTie() {
    return gameBoard.every(cell => cell !== '');
}

function endGame(winner) {
    gameActive = false;
    const winnerMessage = document.getElementById('winnerMessage');
    
    if (winner === '🐼') {
        winnerMessage.textContent = '🎉 You won! Great job! 🎉';
        playerScore++;
        document.getElementById('playerScore').textContent = playerScore;
        celebrateWin();
    } else if (winner === '🤖') {
        winnerMessage.textContent = '😅 Computer wins! Try again! 😅';
        computerScore++;
        document.getElementById('computerScore').textContent = computerScore;
    } else {
        winnerMessage.textContent = '🤝 It\'s a tie! Good game! 🤝';
    }
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = '🐼';
    gameActive = true;
    
    document.getElementById('winnerMessage').textContent = '';
    document.querySelectorAll('#game .cell').forEach(cell => {
        cell.textContent = '';
        cell.disabled = false;
    });
    
    updateCurrentPlayer();
}

function resetScores() {
    playerScore = 0;
    computerScore = 0;
    document.getElementById('playerScore').textContent = playerScore;
    document.getElementById('computerScore').textContent = computerScore;
    resetGame();
}

function updateCurrentPlayer() {
    document.getElementById('currentPlayer').textContent = currentPlayer;
}

function celebrateWin() {
    const emojis = ['🎉', '🎊', '🌟', '✨', '🎈', '🎁'];
    for(let i = 0; i < 10; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.position = 'fixed';
            emoji.style.fontSize = '3em';
            emoji.style.left = Math.random() * (window.innerWidth - 100) + 'px';
            emoji.style.top = '-50px';
            emoji.style.pointerEvents = 'none';
            emoji.style.zIndex = '1000';
            emoji.style.animation = 'celebration 3s ease-out forwards';
            document.body.appendChild(emoji);
            
            setTimeout(() => emoji.remove(), 3000);
        }, i * 200);
    }
}

const celebrationStyle = document.createElement('style');
celebrationStyle.textContent = `
    @keyframes celebration {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(${window.innerHeight + 100}px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(celebrationStyle);

document.addEventListener('DOMContentLoaded', function() {
    const cells = document.querySelectorAll('#game .cell');
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
});

// Message Page Functions
let loveCount = 0;

function sendLove() {
    loveCount++;
    document.getElementById('loveCount').textContent = loveCount;
    
    const hearts = ['💖', '💕', '💗', '💝'];
    const heart = document.createElement('div');
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.position = 'fixed';
    heart.style.fontSize = '2.5em';
    heart.style.left = (Math.random() * (window.innerWidth - 100)) + 'px';
    heart.style.top = window.innerHeight + 'px';
    heart.style.pointerEvents = 'none';
    heart.style.zIndex = '1000';
    heart.style.animation = 'floatLove 4s ease-out forwards';
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 4000);
    
    if (loveCount % 5 === 0) {
        triggerSpecialEffect();
    }
}

function triggerSpecialEffect() {
    const emojis = ['🌟', '✨', '💫', '🎉'];
    for(let i = 0; i < 8; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.position = 'fixed';
            emoji.style.fontSize = '2em';
            emoji.style.left = (Math.random() * (window.innerWidth - 50)) + 'px';
            emoji.style.top = '-30px';
            emoji.style.pointerEvents = 'none';
            emoji.style.zIndex = '1000';
            emoji.style.animation = 'celebration 3s ease-out forwards';
            document.body.appendChild(emoji);
            
            setTimeout(() => emoji.remove(), 3000);
        }, i * 100);
    }
}

const floatLoveStyle = document.createElement('style');
floatLoveStyle.textContent = `
    @keyframes floatLove {
        0% {
            transform: translateY(0) scale(0.5);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-${window.innerHeight}px) scale(1.2);
            opacity: 0;
        }
    }
    
    @keyframes fadeInOut {
        0%, 100% {
            opacity: 0;
            transform: scale(0.8);
        }
        50% {
            opacity: 0.3;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(floatLoveStyle);

// Flashcards (Memory Game) Functions
let gameState = {
    cards: [],
    flippedCards: [],
    matchedPairs: 0,
    moves: 0,
    timer: 0,
    timerInterval: null,
    gameActive: false,
    difficulty: 'easy'
};

const symbols = {
    easy: ['💖', '😊', '🌸'],
    medium: ['💖', '😊', '🌸', '🦋', '⭐', '🌙'],
    hard: ['💖', '😊', '🌸', '🦋', '⭐', '🌙', '🎵', '💕']
};

function setDifficulty(event, level) {
    gameState.difficulty = level;
    document.querySelectorAll('#flashcards .difficulty-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    startMemoryGame();
}

function startMemoryGame() {
    if (gameState.timerInterval) {
        clearInterval(gameState.timerInterval);
    }

    gameState.flippedCards = [];
    gameState.matchedPairs = 0;
    gameState.moves = 0;
    gameState.timer = 0;
    gameState.gameActive = true;

    updateDisplay();
    document.getElementById('gameStatus').textContent = 'Good luck! Find all the pairs!';

    generateCards();

    gameState.timerInterval = setInterval(() => {
        gameState.timer++;
        document.getElementById('timer').textContent = gameState.timer + 's';
    }, 1000);
}

function generateCards() {
    const grid = document.getElementById('cardsGrid');
    grid.innerHTML = '';
    
    const selectedSymbols = symbols[gameState.difficulty];
    const cardSymbols = [...selectedSymbols, ...selectedSymbols];
    shuffleArray(cardSymbols);

    gameState.cards = cardSymbols.map((symbol, index) => ({
        id: index,
        symbol: symbol,
        isFlipped: false,
        isMatched: false
    }));

    gameState.cards.forEach(card => {
        const cardElement = createCardElement(card);
        grid.appendChild(cardElement);
    });
}

function createCardElement(card) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'flashcard';
    cardDiv.dataset.cardId = card.id;
    cardDiv.onclick = () => flipCard(card.id);

    cardDiv.innerHTML = `
        <div class="card-front">?</div>
        <div class="card-back">${card.symbol}</div>
    `;

    return cardDiv;
}

function flipCard(cardId) {
    if (!gameState.gameActive) return;

    const card = gameState.cards[cardId];
    if (card.isFlipped || card.isMatched) return;

    card.isFlipped = true;
    const cardElement = document.querySelector(`#flashcards [data-card-id="${cardId}"]`);
    cardElement.classList.add('flipped');

    gameState.flippedCards.push(card);

    if (gameState.flippedCards.length === 2) {
        gameState.moves++;
        updateDisplay();

        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [card1, card2] = gameState.flippedCards;

    if (card1.symbol === card2.symbol) {
        card1.isMatched = true;
        card2.isMatched = true;
        gameState.matchedPairs++;
        
        document.querySelector(`#flashcards [data-card-id="${card1.id}"]`).classList.add('matched');
        document.querySelector(`#flashcards [data-card-id="${card2.id}"]`).classList.add('matched');

        const totalPairs = symbols[gameState.difficulty].length;
        if (gameState.matchedPairs === totalPairs) {
            winMemoryGame();
        } else {
            document.getElementById('gameStatus').textContent = 'Great match! Keep going! 💕';
        }
    } else {
        card1.isFlipped = false;
        card2.isFlipped = false;
        
        document.querySelector(`#flashcards [data-card-id="${card1.id}"]`).classList.remove('flipped');
        document.querySelector(`#flashcards [data-card-id="${card2.id}"]`).classList.remove('flipped');
        
        document.getElementById('gameStatus').textContent = 'No match, try again! 😊';
    }

    gameState.flippedCards = [];
}

function winMemoryGame() {
    gameState.gameActive = false;
    clearInterval(gameState.timerInterval);
    
    const statusElement = document.getElementById('gameStatus');
    statusElement.textContent = `🎉 Congratulations! You won in ${gameState.moves} moves and ${gameState.timer} seconds! 🎉`;
    statusElement.classList.add('win');

    celebrateMemoryWin();
}

function celebrateMemoryWin() {
    const emojis = ['🎉', '🎊', '🌟', '💫', '💖', '🐼'];
    for(let i = 0; i < 15; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.position = 'fixed';
            emoji.style.fontSize = '2.5em';
            emoji.style.left = Math.random() * (window.innerWidth - 100) + 'px';
            emoji.style.top = '-50px';
            emoji.style.pointerEvents = 'none';
            emoji.style.zIndex = '1000';
            emoji.style.animation = 'celebration 4s ease-out forwards';
            document.body.appendChild(emoji);
            
            setTimeout(() => emoji.remove(), 4000);
        }, i * 150);
    }
}

function updateDisplay() {
    document.getElementById('movesCount').textContent = gameState.moves;
    document.getElementById('matchesCount').textContent = gameState.matchedPairs;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Song Page Functions
let isPlaying = false;
let currentTime = 0;
let songDuration = 225;
let playInterval;

const lyrics = [
    { time: 0, text: "🎼 *Soft instrumental intro with gentle piano*" },
    { time: 8, text: "Hey there, beautiful soul" },
    { time: 12, text: "I've got something on my mind" },
    { time: 16, text: "All these words that I can't say enough" },
    { time: 20, text: "But I hope you'll be kind" },
    { time: 24, text: "🎵 *Music builds with strings*" },
    { time: 26, text: "I know I messed up, I know I hurt" },
    { time: 30, text: "All the things I should have said" },
    { time: 34, text: "You're the light in my world" },
    { time: 38, text: "The love inside my head" },
    { time: 42, text: "*Harmonies join in*" },
    { time: 44, text: "I'm sorry, I'm sorry" },
    { time: 48, text: "For every word that cut too deep" },
    { time: 52, text: "I'm sorry, I'm sorry" },
    { time: 56, text: "For promises I couldn't keep" },
    { time: 60, text: "🎸 *Guitar solo with emotion*" },
    { time: 68, text: "You mean everything to me" },
    { time: 72, text: "More than words can ever say" },
    { time: 76, text: "I want to be the one" },
    { time: 80, text: "Who makes your every day" },
    { time: 84, text: "*Beautiful bridge*" },
    { time: 86, text: "Give me one more chance" },
    { time: 90, text: "To prove that I can be" },
    { time: 94, text: "The person you deserve" },
    { time: 98, text: "The one who sets you free" },
    { time: 102, text: "🎵 *Final chorus - building to crescendo*" },
    { time: 104, text: "I'm sorry, I'm sorry" },
    { time: 108, text: "For all the pain I've caused your heart" },
    { time: 112, text: "I'm sorry, I'm sorry" },
    { time: 116, text: "Let's make a brand new start" },
    { time: 120, text: "*Gentle outro*" },
    { time: 122, text: "I love you, I love you" },
    { time: 126, text: "More than you'll ever know" },
    { time: 130, text: "Please forgive me, please forgive me" },
    { time: 134, text: "And let our love still grow" },
    { time: 138, text: "🎼 *Instrumental fade*" },
    { time: 145, text: "*Until the end of time*" },
    { time: 150, text: "*I'll be here, waiting*" }
];

function togglePlayPause() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

function playSong() {
    isPlaying = true;
    document.getElementById('playBtn').textContent = '⏸️';
    
    createSparkles();
    
    playInterval = setInterval(() => {
        currentTime++;
        updateProgress();
        highlightCurrentLyric();
        
        if (currentTime >= songDuration) {
            stopSong();
        }
    }, 1000);
    
    updateProgress();
}

function pauseSong() {
    isPlaying = false;
    document.getElementById('playBtn').textContent = '▶️';
    clearInterval(playInterval);
}

function stopSong() {
    isPlaying = false;
    currentTime = 0;
    document.getElementById('playBtn').textContent = '▶️';
    clearInterval(playInterval);
    updateProgress();
    highlightCurrentLyric();
}

function restartSong() {
    stopSong();
    playSong();
}

function updateProgress() {
    const progress = (currentTime / songDuration) * 100;
    document.getElementById('progress').style.width = progress + '%';
    
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    document.getElementById('currentTime').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function highlightCurrentLyric() {
    document.querySelectorAll('#song .lyric-line').forEach(line => {
        line.classList.remove('active');
    });
    
    const currentLyric = lyrics.find(lyric => 
        currentTime >= lyric.time && currentTime < lyric.time + 4
    );
    
    if (currentLyric) {
        const lyricElement = document.querySelector(`#song [data-time="${currentLyric.time}"]`);
        if (lyricElement) {
            lyricElement.classList.add('active');
            
            lyricElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }
}

function createSparkles() {
    const sparkleEmojis = ['✨', '💫', '🌟', '💖'];
    const sparkle = document.createElement('div');
    sparkle.innerHTML = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
    sparkle.style.position = 'fixed';
    sparkle.style.fontSize = '2em';
    sparkle.style.left = Math.random() * window.innerWidth + 'px';
    sparkle.style.top = Math.random() * window.innerHeight + 'px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '1000';
    sparkle.style.animation = 'sparkle 2s ease-out forwards';
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 2000);
}

const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.2) rotate(180deg);
            opacity: 1;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

setInterval(() => {
    if (isPlaying && Math.random() > 0.7) {
        createSparkles();
    }
}, 2000);

// Thank You Page Functions
let savedMessages = [];

function saveMessage() {
    const messageInput = document.getElementById('feedbackMessage');
    const message = messageInput.value.trim();
    
    if (message) {
        savedMessages.push({
            text: message,
            timestamp: new Date().toLocaleString()
        });
        
        displayMessages();
        messageInput.value = '';
        
        triggerCelebration();
    }
}

function displayMessages() {
    const messageBoard = document.getElementById('messageBoard');
    
    if (savedMessages.length === 0) {
        messageBoard.innerHTML = '<p style="color: var(--purple); font-style: italic;">Your messages will appear here 💕</p>';
        return;
    }
    
    messageBoard.innerHTML = savedMessages.map((msg, index) => `
        <div style="background: rgba(233, 30, 99, 0.1); margin: 0.5rem 0; padding: 1rem; border-radius: 10px; border-left: 3px solid var(--dark-pink);">
            <p style="margin: 0; color: var(--text-dark);">${msg.text}</p>
            <small style="color: var(--purple); font-style: italic;">${msg.timestamp}</small>
        </div>
    `).join('');
}

function triggerCelebration() {
    const emojis = ['🎉', '💖', '🌟', '✨', '🐼', '💕'];
    for(let i = 0; i < 12; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.position = 'fixed';
            emoji.style.fontSize = '2.5em';
            emoji.style.left = Math.random() * (window.innerWidth - 100) + 'px';
            emoji.style.top = '-50px';
            emoji.style.pointerEvents = 'none';
            emoji.style.zIndex = '1000';
            emoji.style.animation = 'celebration 3s ease-out forwards';
            document.body.appendChild(emoji);
            
            setTimeout(() => emoji.remove(), 3000);
        }, i * 100);
    }
}

function createFloatingHearts() {
    const heartsContainer = document.getElementById('floatingHearts');
    const heartEmojis = ['💖', '💕', '💗', '💝', '❤️'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 2 + 's';
        heartsContainer.appendChild(heart);
        
        setTimeout(() => heart.remove(), 6000);
    }, 2000);
}

function initThankYouPage() {
    createFloatingHearts();
    
    setTimeout(() => {
        for(let i = 0; i < 5; i++) {
            setTimeout(() => {
                triggerCelebration();
            }, i * 300);
        }
    }, 1000);
}
