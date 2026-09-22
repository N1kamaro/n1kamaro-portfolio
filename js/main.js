//=========================================
//RANDOM TRACK ENGINE
//=========================================

const tracks = [
    {
        title: "Nevada - Slowed + Reverb",
        artist: "Vicetone, Cozi Zuehlsdorff",
        album: "Nevada",
        cover: "Assets/images/music/nevada.png",
        duration: 271
    },
    {
        title: 'Time Go Fishing - from "Project Hail Mary"',
        artist: "Daniel Pemberton",
        album: "Project Hail Mary",
        cover: "Assets/images/music/hail-mary.png",
        duration: 430
    },
    {
        title: "L'Étoile D'afrique - #18",
        artist: "VDYCD",
        album: "L'Étoile D'afrique - #18",
        cover: "Assets/images/music/LDA.png",
        duration: 105
    },
    { 
        title: "LEGACY (slowed down)",
        artist: "backfromparadise, PIXY",
        album: "LEGACY (slowed down)",
        cover: "Assets/images/music/legacy.png",
        duration: 162
    },
    {
        title: "worry - ultra slowed",
        artist: "LONOWN, riserayss",
        album: "worry (ultra slowed)",
        cover: "Assets/images/music/worry.png",
        duration: 256
    },
    { 
        title: "Les - Instrumental",
        artist: "Fironn",
        album: "Les (Instrumental)",
        cover: "Assets/images/music/les.png",
        duration: 75
    },
    {
        title: "Cool For The Summer",
        artist: "Enmity, LXMINAL",
        album: "Cool For The Summer",
        cover: "Assets/images/music/cool-fts.png",
        duration: 197
    },
    {
        title: "Everybody Wants To Rule The World",
        artist: "Tears For Fears",
        album: "Songs From The Big Chair",
        cover: "Assets/images/music/EWTRTW.png",
        duration: 251
    }
];

function getRandomTrack() {
    const randomIndex = Math.floor(Math.random() * tracks.length);
    return tracks[randomIndex];
}

let selectedTrack = getRandomTrack();

const trackTitle = document.getElementById("track-title");
const trackArtist = document.getElementById("track-artist");
const trackAlbum = document.getElementById("track-album");
const trackCover = document.getElementById("track-cover");

trackTitle.textContent = selectedTrack.title;
trackArtist.textContent = selectedTrack.artist;

trackCover.src = selectedTrack.cover;
trackCover.alt = `${selectedTrack.title} cover`;

console.log("=== N1kamaro Radio ===");
console.log("TRACK SELECTED: ", selectedTrack.title);
console.log("ARTIST: ", selectedTrack.artist);
console.log("DURATION:", selectedTrack.duration, "seconds");
console.log("COVER:", selectedTrack.cover);

const playbackBar = document.getElementById("playback-bar");
const playbackTime = document.getElementById("playback-time");

const BAR_LENGTH = 22;

let elapsed = 0;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function nextTrack() {
    let next;

    // Não deixa tocar a mesma música duas vezes seguidas
    do {
        next = getRandomTrack();
    } while (
        tracks.length > 1 &&
        next === selectedTrack
    );

    selectedTrack = next;
    elapsed = 0;

    trackTitle.textContent = selectedTrack.title;
    trackArtist.textContent = selectedTrack.artist;
    trackAlbum.textContent = selectedTrack.album;

    trackCover.src = selectedTrack.cover;
    trackCover.alt = `${selectedTrack.title} cover`;

    console.log("NEXT TRACK:", selectedTrack.title);
}

function updatePlayback() {
    const progress = Math.min(elapsed / selectedTrack.duration, 1);

    const filled = Math.floor(progress * BAR_LENGTH);
    const empty = Math.max(BAR_LENGTH - filled, 0);

    playbackBar.textContent =
        "[" +
        "|".repeat(filled) +
        ".".repeat(empty) +
        "]";

    playbackTime.textContent =
        `${formatTime(elapsed)} / ${formatTime(selectedTrack.duration)}`;

    if (elapsed >= selectedTrack.duration) {
    nextTrack();
    updatePlayback();
    return;
}

  elapsed++;
}

updatePlayback();

setInterval(updatePlayback, 1000);

// =========================================
// COOL GAMES TERMINAL :DDD
// =========================================

const terminalInput = document.getElementById("terminal-input");
const terminalContent = document.querySelector(".terminal-content");
let terminalMode = "normal";

terminalInput.addEventListener("keydown", function (event) {

    if (event.key !== "Enter") return;

    const command = terminalInput.value.trim().toLowerCase();

    if (command === "") return;

    if (terminalMode === "normal") {
        runTerminalCommand(command);
    }

    else if (terminalMode === "arcade") {
        runArcadeCommand(command);
    }

    else if (terminalMode === "starRunnerReady") {
        runStarRunnerReadyCommand(command);
    }

    else if (terminalMode === "defuse") {
        runDefuseCommand(command);
    }

    terminalInput.value = "";
});

document.addEventListener("keydown", function (event) {

    // STAR.RUNNER

    if (
        terminalMode === "starRunner" ||
        terminalMode === "starRunnerReady" ||
        terminalMode === "starRunnerGameOver"
    ) {

        // pulo
        if (
            event.code === "Space" &&
            terminalMode === "starRunner"
        ) {
            event.preventDefault();
            starJump();
        }

        // retry
        if (
            event.key.toLowerCase() === "r" &&
            terminalMode === "starRunnerGameOver"
        ) {
            launchStarRunner();
        }

        // sair
        if (event.key === "Escape") {
            stopStarRunner();
        }

        return;
    }


    // DEFUSE.EXE

    if (
        terminalMode === "defuse" ||
        terminalMode === "defuseGameOver"
    ) {

        // retry
        if (
            event.key.toLowerCase() === "r" &&
            terminalMode === "defuseGameOver"
        ) {
            startDefuse();
        }

        // sair
        if (event.key === "Escape") {
            stopDefuse();
        }
    }
});

function runTerminalCommand(command) {

    clearTerminalOutput();

    // Mostra o comando que o visitante digitou
    addTerminalLine(`nik@lab:~$ ${command}`, "terminal-command");

    // HELP
    if (command === "help") {

        addTerminalLine("> AVAILABLE COMMANDS:");
        addTerminalLine("> help  — show commands");
        addTerminalLine("> games — open arcade");
        addTerminalLine("> clear — clear terminal");

        return;
    }


    // CLEAR
    if (command === "clear") {

    clearTerminalOutput();

    addTerminalLine("> System ready.");
    addTerminalLine("> write here to play :D");

    return;
    }


    // GAMES
    if (command === "games") {

    clearTerminalOutput();

    terminalMode = "arcade";

    addTerminalLine("> N1KAMARO ARCADE");
    addTerminalLine("> ==================");
    addTerminalLine("> [1] STAR.RUNNER ★");
    addTerminalLine("> [2] DEFUSE.EXE");
    addTerminalLine("> [0] EXIT");

    return;
    }

    // Comando desconhecido
    addTerminalLine(`> command not found: ${command}`);
    addTerminalLine("> try 'help' :D");
}

function runArcadeCommand(command) {

    clearTerminalOutput();

    if (command === "0") {

        terminalMode = "normal";

        addTerminalLine("> ARCADE CLOSED.");
        addTerminalLine("> type 'games' to play again :D");

        return;
    }

    if (command === "1") {

        startStarRunner();
        return;
    }

    if (command === "2") {

        startDefuse();
        return;
    }

    addTerminalLine("> INVALID SELECTION.");
    addTerminalLine("> [1] STAR.RUNNER ★");
    addTerminalLine("> [2] DEFUSE.EXE");
    addTerminalLine("> [0] EXIT");
}

function addTerminalLine(text, className = "") {

    const line = document.createElement("p");

    line.textContent = text;

    if (className) {
        line.classList.add(className);
    }

    // Coloca a resposta ANTES do prompt
    const prompt = document.querySelector(".terminal-prompt");

    terminalContent.insertBefore(line, prompt);
}

function clearTerminalOutput() {

    const lines = terminalContent.querySelectorAll("p");

    lines.forEach(line => line.remove());
}

// =========================================
// joguinho star runner
// =========================================

let starY = 0;
let starVelocity = 0;
let starRunnerInterval = null;
let obstacleX = 22;
let score = 0;
let gameSpeed = 50;

const STAR_X = 3;
const GAME_WIDTH = 24;
const STAR_GRAVITY = 0.75;
const STAR_JUMP_FORCE = 3;
const MIN_GAME_SPEED = 28;
const MAX_GAME_SPEED = 70;

function startStarRunner() {

    terminalMode = "starRunnerReady";

    clearTerminalOutput();

    starY = 0;
    starVelocity = 0;

    addTerminalLine("> STAR.RUNNER");
    addTerminalLine("> ======================");
    addTerminalLine("");
    addTerminalLine("      ★", "star-runner-screen");
    addTerminalLine("________________________");
    addTerminalLine("");
    addTerminalLine('> write "start" to start');
    addTerminalLine("> [ESC] EXIT");
}


function updateStarRunner() {

    // =========================
    // STAR PHYSICS
    // =========================

    starVelocity -= STAR_GRAVITY;
    starY += starVelocity;

    if (starY <= 0) {
        starY = 0;
        starVelocity = 0;
    }


    // =========================
    // MOVE OBSTACLE
    // =========================

    obstacleX--;


    // =========================
    // COLLISION
    // =========================

    if (
        obstacleX === STAR_X &&
        starY < 1
    ) {
        gameOverStarRunner();
        return;
    }


    // =========================
    // OBSTACLE PASSED
    // =========================

    if (obstacleX < 0) {

        score++;


        // Distância aleatória
        const randomGap =
            Math.floor(Math.random() * 10) + 5;

        obstacleX =
            GAME_WIDTH + randomGap;


        // 65% de chance da velocidade
        // mudar depois de cada ponto
        if (Math.random() < 0.65) {
            updateStarRunnerSpeed();
        }
    }


    renderStarRunner();
}

function updateStarRunnerSpeed() {

    // Conforme o score aumenta,
    // aumenta a quantidade possível
    // de mudança na velocidade.

    const difficulty =
        Math.min(score / 20, 1);


    // No começo varia pouco.
    // Depois começa a ficar maluco.
    const maxVariation =
        4 + (difficulty * 18);


    // Pode dar positivo OU negativo.
    const speedChange =
        (Math.random() * maxVariation * 2)
        - maxVariation;


    gameSpeed += speedChange;


    // Não deixa rápido ou lento
    // demais.
    gameSpeed = Math.max(
        MIN_GAME_SPEED,
        Math.min(
            gameSpeed,
            MAX_GAME_SPEED
        )
    );
}

function starJump() {

    // Só pode pular quando estiver no chão
    if (starY === 0) {
        starVelocity = STAR_JUMP_FORCE;
    }
}


function renderStarRunner() {

    const screen =
        document.querySelector(".star-runner-screen");

    if (!screen) return;

    const GAME_HEIGHT = 4;

    const starRow =
        GAME_HEIGHT - 1 -
        Math.min(
            Math.round(starY),
            GAME_HEIGHT - 1
        );

    const rows = [];

    for (
        let row = 0;
        row < GAME_HEIGHT;
        row++
    ) {

        let line =
            Array(GAME_WIDTH).fill(" ");


        // STAR
        if (row === starRow) {
            line[STAR_X] = "★";
        }


        // OBSTACLE
        // Só desenha quando estiver dentro da tela
        if (
            row === GAME_HEIGHT - 1 &&
            obstacleX >= 0 &&
            obstacleX < GAME_WIDTH
        ) {
            line[obstacleX] = "█";
        }


        rows.push(line.join(""));
    }


    screen.textContent =
        rows.join("\n");


    // Atualiza o score
    const scoreDisplay =
        document.querySelector(".star-runner-score");

    if (scoreDisplay) {
        scoreDisplay.textContent =
            `SCORE: ${String(score).padStart(4, "0")}`;
    }
}


function stopStarRunner() {

    clearTimeout(starRunnerInterval);
    starRunnerInterval = null;

    terminalMode = "arcade";

    clearTerminalOutput();

    addTerminalLine("> N1KAMARO ARCADE");
    addTerminalLine("> ==================");
    addTerminalLine("> [1] STAR.RUNNER ★");
    addTerminalLine("> [2] DEFUSE.EXE");
    addTerminalLine("> [0] EXIT");
}

function gameOverStarRunner() {

    clearTimeout(starRunnerInterval);
    starRunnerInterval = null;

    terminalMode = "starRunnerGameOver";

    clearTerminalOutput();

    addTerminalLine("> SIGNAL LOST.");
    addTerminalLine("> ======================");
    addTerminalLine("");
    addTerminalLine("      ★  █");
    addTerminalLine("");
    addTerminalLine("> GAME OVER.");
    addTerminalLine("");
    addTerminalLine(`> SCORE: ${String(score).padStart(4, "0")}`);
    addTerminalLine("");
    addTerminalLine('[R] RETRY   [ESC] ARCADE');

}

function launchStarRunner() {

    terminalMode = "starRunner";

    clearTerminalOutput();

    // Reseta o jogador
    starY = 0;
    starVelocity = 0;

    // Reseta pontuação
    score = 0;

    // Velocidade inicial
    gameSpeed = 50;

    // Primeiro obstáculo
    obstacleX = GAME_WIDTH - 1;

    addTerminalLine("> STAR.RUNNER");
    addTerminalLine("");

    addTerminalLine(
        "",
        "star-runner-screen"
    );

    addTerminalLine(
        "________________________"
    );

    addTerminalLine(
        "SCORE: 0000",
        "star-runner-score"
    );

    addTerminalLine(
        "[SPACE] JUMP   [ESC] EXIT"
    );

    renderStarRunner();

    // Inicia o loop dinâmico
    scheduleNextStarRunnerFrame();
}

function scheduleNextStarRunnerFrame() {

    starRunnerInterval = setTimeout(function () {

        updateStarRunner();

        // Só agenda outro frame
        // se o jogo ainda estiver rodando
        if (terminalMode === "starRunner") {
            scheduleNextStarRunnerFrame();
        }

    }, gameSpeed);
}

function runStarRunnerReadyCommand(command) {

    if (command === "start") {
        launchStarRunner();
        return;
    }

    clearTerminalOutput();

    addTerminalLine("> STAR.RUNNER");
    addTerminalLine("> ======================");
    addTerminalLine("");
    addTerminalLine("      ★", "star-runner-screen");
    addTerminalLine("________________________");
    addTerminalLine("");
    addTerminalLine('> unknown command.');
    addTerminalLine('> write "start" to start');
}

// =========================================
// joguinho defuse
// =========================================

let defuseCode = "";
let defuseScore = 0;
let defuseRound = 1;
let defuseTime = 5;
let defuseTimer = null;


// abre o jogo
function startDefuse() {

    terminalMode = "defuse";

    defuseScore = 0;
    defuseRound = 1;

    startDefuseRound();
}


// começa uma rodada
function startDefuseRound() {

    clearInterval(defuseTimer);

    clearTerminalOutput();

    const codeLength =
        Math.min(
            4 + Math.floor((defuseRound - 1) / 2),
            6
        );

    defuseCode = generateDefuseCode(codeLength);

    // vai ficando mais rápido
    defuseTime =
        Math.max(
            5 - ((defuseRound - 1) * 0.4),
            2.5
        );


    addTerminalLine("> DEFUSE.EXE");
    addTerminalLine("> ==================");
    addTerminalLine("");
    addTerminalLine("> SYSTEM FAILURE DETECTED.");
    addTerminalLine("");

    addTerminalLine(
        `CODE: ${defuseCode}`
    );

    addTerminalLine(
        `TIME: ${defuseTime.toFixed(1)}s`,
        "defuse-time"
    );

    addTerminalLine("");

    addTerminalLine(
        `SCORE: ${String(defuseScore).padStart(4, "0")}`
    );

    addTerminalLine("");

    addTerminalLine("> TYPE THE CODE:");


    defuseTimer = setInterval(function () {

        defuseTime -= 0.1;

        const timeDisplay =
            document.querySelector(".defuse-time");

        if (timeDisplay) {

            timeDisplay.textContent =
                `TIME: ${Math.max(defuseTime, 0).toFixed(1)}s`;
        }


        if (defuseTime <= 0) {
            gameOverDefuse();
        }

    }, 100);
}


// cria um código aleatório
function generateDefuseCode(length) {

    // tirei caracteres parecidos tipo I, O, 0 e 1
    const characters =
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let code = "";

    for (let i = 0; i < length; i++) {

        const randomIndex =
            Math.floor(
                Math.random() * characters.length
            );

        code += characters[randomIndex];
    }

    return code;
}


// verifica o código digitado
function runDefuseCommand(command) {

    if (
        command.toLowerCase() ===
        defuseCode.toLowerCase()
    ) {

        clearInterval(defuseTimer);
        defuseTimer = null;

        defuseScore++;
        defuseRound++;

        clearTerminalOutput();

        addTerminalLine("> CODE ACCEPTED.");
        addTerminalLine("> SYSTEM STABILIZED.");
        addTerminalLine("");

        addTerminalLine(
            `> SCORE: ${String(defuseScore).padStart(4, "0")}`
        );


        setTimeout(function () {

            if (terminalMode === "defuse") {
                startDefuseRound();
            }

        }, 700);

        return;
    }


    // código errado
    gameOverDefuse();
}


// perdeu
function gameOverDefuse() {

    clearInterval(defuseTimer);
    defuseTimer = null;

    terminalMode = "defuseGameOver";

    clearTerminalOutput();

    addTerminalLine("> ACCESS DENIED.");
    addTerminalLine("> ==================");
    addTerminalLine("");
    addTerminalLine("> CONNECTION LOST.");
    addTerminalLine("");

    addTerminalLine(
        `> SCORE: ${String(defuseScore).padStart(4, "0")}`
    );

    addTerminalLine("");

    addTerminalLine(
        "[R] RETRY   [ESC] ARCADE"
    );
}


// volta pro arcade
function stopDefuse() {

    clearInterval(defuseTimer);
    defuseTimer = null;

    terminalMode = "arcade";

    clearTerminalOutput();

    addTerminalLine("> N1KAMARO ARCADE");
    addTerminalLine("> ==================");
    addTerminalLine("> [1] STAR.RUNNER ★");
    addTerminalLine("> [2] DEFUSE.EXE");
    addTerminalLine("> [0] EXIT");
}

// =========================================
// PROJECT DATABASE
// =========================================

const projects = [

    {
        id: "001",
        name: "POLARIS",
        category: "GROUND STATION",

        image:
            "Assets/images/projects/polaris-open.jpg",

        alt:
            "Polaris portable ground station",

        state:
            "POLARIS // DEPLOYED",

        status:
            "● ACTIVE",

            description:
    "Originally started as the CyberSTARdeck, Polaris evolved into a portable ground station built for long-range communication, telemetry and electronics experiments.",


            github:
    "https://github.com/N1kamaro/The-CyberSTARdeck"
    },


    {
        id: "002",
        name: "MENTE VIVA",
        category: "WEB PLATFORM",

        image:
            "Assets/images/projects/mente-viva.png",

        alt:
            "Mente Viva web platform",

        state:
            "MENTE VIVA // ONLINE",

        status:
            "● ACTIVE",

            description:
    "An interactive web platform originally created from a school project about youth mental health. Instead of making a traditional presentation, we decided to turn the idea into a real website.",


        github:
        "https://github.com/N1kamaro/Mente_Viva_ETP"
    },


    {
        id: "003",
        name: "HELL'S LIBRARY",
        category: "GAME PROJECT",

        image:
            "Assets/images/projects/hells-library.png",

        alt:
            "Hell's Library game project",

        state:
            "HELL'S LIBRARY // ARCHIVED",

        status:
            "● ARCHIVED",

            description:
    "An experimental game project and one of my earlier attempts at building an interactive experience. The project is no longer in development, but remains part of my project archive.",

            github:
    "https://github.com/N1kamaro/Hell-s-Library"
    },


    {
        id: "004",
        name: "STARPAD",
        category: "CUSTOM PCB",

        image:
            "Assets/images/projects/starpad.png",

        alt:
            "Starpad custom PCB",

        state:
            "STARPAD // BUILT",

        status:
            "● BUILT",

            description:
    "A custom macropad project built around a PCB I designed myself, combining electronics, PCB design and a physical interface into one small device.",

            github:
    "https://github.com/N1kamaro/The-Starpad"
    },


    {
        id: "005",
        name: "PROJECT MBCA",
        category: "ROCKET ENGINE",

        image:
            "Assets/images/projects/mbca.png",

        alt:
            "Project MBCA rocket engine",

        state:
            "PROJECT MBCA // PAUSED",

        status:
            "● PAUSED",

            description:
    "My first project designed in CAD and one of my earliest serious engineering experiments. MBCA became a way for me to study rocket science, electronics and engineering through a real physical project.",


            github:
    "https://github.com/N1kamaro/Project-M.B.C.A"
    },


    {
        id: "006",
        name: "WATER GENERATOR",
        category: "ATMOSPHERIC WATER",

        image:
            "Assets/images/projects/water-generator.png",

        alt:
            "Atmospheric water generator",

        state:
            "WATER GENERATOR // BUILT",

        status:
            "● BUILT",

            description:
    "A school project designed to collect water from atmospheric humidity through condensation. I designed its electrical and physical systems using Peltier modules and computer cooling hardware.",


            github:
    "https://github.com/N1kamaro/Project-Water-Generator"
    },


    {
        id: "007",
        name: "SITEFOLIO",
        category: "WEB PORTFOLIO",

        image:
            "Assets/images/projects/sitefolio.png",

        alt:
            "Sitefolio personal portfolio",

        state:
            "SITEFOLIO // ARCHIVED",

        status:
            "● ARCHIVED",

            description:
    "My first personal portfolio and the predecessor of the website you're visiting right now. It was my first attempt at building my own place on the internet to show who I am and what I create.",


            github:
    "https://github.com/N1kamaro/My-Sitefolio-"
    }

];


// projeto atualmente selecionado

let currentProjectIndex = 0;


// intervalo automático

let projectRotationInterval = null;


// tempo entre projetos

const PROJECT_ROTATION_TIME = 6000;


// elementos do hero

const projectHeroImage =
    document.getElementById(
        "project-hero-image"
    );

const projectHeroNumber =
    document.getElementById(
        "project-hero-number"
    );

const projectHeroName =
    document.getElementById(
        "project-hero-name"
    );

const projectHeroCategory =
    document.getElementById(
        "project-hero-category"
    );

const projectHeroState =
    document.getElementById(
        "project-hero-state"
    );

const projectDatabase =
    document.getElementById(
        "project-database"
    );


// =========================================
// CRIA O CATÁLOGO
// =========================================

function buildProjectDatabase() {

    if (!projectDatabase) return;

    projectDatabase.innerHTML = "";


    projects.forEach(
        function (project, index) {

            const entry =
                document.createElement("div");


            entry.className =
                "project-entry";


            entry.dataset.projectIndex =
                index;


            entry.innerHTML = `
                <span class="project-entry-number">
                    ${project.id}
                </span>

                <strong class="project-entry-name">
                    ${project.name}
                </strong>

                <span class="project-entry-category">
                    ${project.category}
                </span>

                <span class="project-entry-status">
                    ${project.status}
                </span>
            `;


            entry.addEventListener(
    "click",
    function () {

        // se já estiver selecionado,
        // abre a ficha do projeto

        if (index === currentProjectIndex) {

            openProjectFile(index);

            return;
        }

        // se não estiver selecionado,
        // apenas seleciona

        selectProject(
            index,
            true
        );
    }
);


            projectDatabase.appendChild(
                entry
            );
        }
    );


    updateActiveProject();
}


// =========================================
// SELECIONA UM PROJETO
// =========================================

function selectProject(
    index,
    restartTimer = false
) {

    if (
        index < 0 ||
        index >= projects.length
    ) {
        return;
    }


    currentProjectIndex = index;


    updateProjectHero();

    updateActiveProject();


    // se o visitante clicou,
    // começa novamente os 6 segundos

    if (restartTimer) {

        restartProjectRotation();
    }
}


// =========================================
// ATUALIZA O HERO
// =========================================

function updateProjectHero() {

    const project =
        projects[currentProjectIndex];


    if (
        !projectHeroImage ||
        !projectHeroNumber ||
        !projectHeroName ||
        !projectHeroCategory ||
        !projectHeroState
    ) {
        return;
    }


    // some rapidamente

    projectHeroImage.classList.add(
        "project-changing"
    );


    setTimeout(function () {

        projectHeroImage.src =
            project.image;

        projectHeroImage.alt =
            project.alt;


        projectHeroNumber.textContent =
            `PROJECT ${project.id}`;

        projectHeroName.textContent =
            project.name;

        projectHeroCategory.textContent =
            project.category;

        projectHeroState.textContent =
            project.state;


        // reaparece

        projectHeroImage.classList.remove(
            "project-changing"
        );

    }, 220);
}


// =========================================
// MARCA O PROJETO ATIVO
// =========================================

function updateActiveProject() {

    const entries =
        document.querySelectorAll(
            ".project-entry"
        );


    entries.forEach(
        function (entry, index) {

            const isActive =
                index === currentProjectIndex;


            entry.classList.toggle(
                "active",
                isActive
            );


            // mantém o projeto atual visível
            if (isActive) {

                entry.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "nearest"
                });
            }
        }
    );
}


// =========================================
// PRÓXIMO PROJETO
// =========================================

function nextProject() {

    const nextIndex =
        (
            currentProjectIndex + 1
        ) % projects.length;


    selectProject(
        nextIndex,
        false
    );
}


// =========================================
// AUTOPLAY
// =========================================

function startProjectRotation() {

    clearInterval(
        projectRotationInterval
    );


    projectRotationInterval =
        setInterval(
            nextProject,
            PROJECT_ROTATION_TIME
        );
}


// reinicia depois de clique manual

function restartProjectRotation() {

    startProjectRotation();
}


// =========================================
// INICIALIZA
// =========================================

buildProjectDatabase();

selectProject(
    0,
    false
);

startProjectRotation();

// =========================================
// PROJECT DATABASE — MOUSE WHEEL
// =========================================

if (projectDatabase) {

    projectDatabase.addEventListener(
        "wheel",
        function (event) {

            // só interfere se existir conteúdo
            // horizontal para rolar

            if (
                projectDatabase.scrollWidth <=
                projectDatabase.clientWidth
            ) {
                return;
            }


            event.preventDefault();


            projectDatabase.scrollBy({
                left: event.deltaY,
                behavior: "smooth"
            });

        },
        {
            passive: false
        }
    );
}

// =========================================
// PROJECT FILE ELEMENTS
// =========================================

const projectFileOverlay =
    document.getElementById(
        "project-file-overlay"
    );

const projectFileClose =
    document.getElementById(
        "project-file-close"
    );

const projectFileLabel =
    document.getElementById(
        "project-file-label"
    );

const projectFileId =
    document.getElementById(
        "project-file-id"
    );

const projectFileName =
    document.getElementById(
        "project-file-name"
    );

const projectFileCategory =
    document.getElementById(
        "project-file-category"
    );

const projectFileStatus =
    document.getElementById(
        "project-file-status"
    );

const projectFileMetaStatus =
    document.getElementById(
        "project-file-meta-status"
    );

const projectFileType =
    document.getElementById(
        "project-file-type"
    );

const projectFileNumber =
    document.getElementById(
        "project-file-number"
    );

const projectFileDescription =
    document.getElementById(
        "project-file-description"
    );

const projectFileGithub =
    document.getElementById(
        "project-file-github"
    );
    // =========================================
// OPEN PROJECT FILE
// =========================================

function openProjectFile(index) {

    const project = projects[index];

    if (!project || !projectFileOverlay) {
        return;
    }

    // pausa a rotação automática
    clearInterval(projectRotationInterval);
    projectRotationInterval = null;


    // preenche as informações
    projectFileLabel.textContent =
        `PROJECT FILE // ${project.id}`;

    projectFileId.textContent =
        `FILE ${project.id}`;

    projectFileName.textContent =
        project.name;

    projectFileCategory.textContent =
        project.category;

    projectFileStatus.textContent =
        project.status;

    projectFileMetaStatus.textContent =
        project.status;

    projectFileType.textContent =
        project.category;

    projectFileNumber.textContent =
        project.id;

    projectFileDescription.textContent =
        project.description;


    // link do GitHub
    if (project.github) {

        projectFileGithub.href =
            project.github;

        projectFileGithub.style.display =
            "inline-flex";

    } else {

        projectFileGithub.style.display =
            "none";
    }


    // abre a janela
    projectFileOverlay.classList.add(
        "open"
    );

    document.body.style.overflow =
        "hidden";
}


// =========================================
// CLOSE PROJECT FILE
// =========================================

function closeProjectFile() {

    if (!projectFileOverlay) {
        return;
    }

    projectFileOverlay.classList.remove(
        "open"
    );

    document.body.style.overflow =
        "";

    // volta a rotação automática
    startProjectRotation();
}


// =========================================
// PROJECT FILE EVENTS
// =========================================

// botão X
if (projectFileClose) {

    projectFileClose.addEventListener(
        "click",
        closeProjectFile
    );
}


// clique fora da janela
if (projectFileOverlay) {

    projectFileOverlay.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                projectFileOverlay
            ) {
                closeProjectFile();
            }
        }
    );
}


// ESC
document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            projectFileOverlay &&
            projectFileOverlay.classList.contains(
                "open"
            )
        ) {
            closeProjectFile();
        }
    }
);