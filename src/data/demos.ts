// Demo project data with pre-scripted chat, tasks, and code

export interface TaskStep {
  id: string;
  type: 'read_todo' | 'write_todo' | 'create_file' | 'thinking' | 'deploy';
  label: string;
  fileName?: string;
  delay: number; // ms delay before showing this step
}

export interface CodeChunk {
  fileName: string;
  filePath: string;
  lines: string[];
  delay: number; // ms delay before showing this chunk
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  delay: number;
}

export interface DemoProject {
  id: string;
  name: string;
  query: string;
  description: string;
  chatMessages: ChatMessage[];
  taskSteps: TaskStep[];
  codeChunks: CodeChunk[];
  finalHtml: string; // The complete working app HTML
  totalDuration: number; // Total simulation time in ms
}

// Pacman Game Demo
export const pacmanDemo: DemoProject = {
  id: 'pacman',
  name: 'Pacman Game',
  query: 'Create pacman game',
  description: 'A fully playable Pacman game using HTML5 Canvas and JavaScript',
  totalDuration: 60000, // 1 minute for demo
  chatMessages: [
    {
      id: 'msg2',
      type: 'assistant',
      content: "I'll create a Pacman game for you using HTML5 Canvas and JavaScript. This will be a fully playable version with all the classic elements you'd expect. Let me start by checking my current tasks and then begin the development process.",
      delay: 500
    }
  ],
  taskSteps: [
    { id: 't1', type: 'read_todo', label: 'Read Todo', delay: 2000 },
    { id: 't2', type: 'write_todo', label: 'Write Todo', delay: 4000 },
    { id: 't3', type: 'create_file', label: 'Create', fileName: 'game.js', delay: 6000 },
    { id: 't4', type: 'create_file', label: 'Create', fileName: 'styles.css', delay: 15000 },
    { id: 't5', type: 'create_file', label: 'Create', fileName: 'index.html', delay: 25000 },
    { id: 't6', type: 'thinking', label: 'Analyzing game logic', delay: 35000 },
    { id: 't7', type: 'write_todo', label: 'Update Todo', delay: 45000 },
    { id: 't8', type: 'deploy', label: 'Deploy completed Pacman game', delay: 55000 }
  ],
  codeChunks: [
    {
      fileName: 'game.js',
      filePath: '/mnt/okcomputer/output/game.js',
      delay: 6000,
      lines: [
        '// Pacman Game Engine',
        'class PacmanGame {',
        '  constructor() {',
        "    this.canvas = document.getElementById('gameCanvas');",
        "    this.ctx = this.canvas.getContext('2d');",
        "    this.scoreElement = document.getElementById('score');",
        "    this.livesElement = document.getElementById('lives');",
        '    this.score = 0;',
        '    this.lives = 3;',
        '    this.level = 1;',
        '    this.pacman = null;',
        '    this.ghosts = [];',
        '    this.dots = [];',
        '    this.walls = [];',
        '    this.gameState = "start";',
        '    this.init();',
        '  }',
        '',
        '  init() {',
        '    this.createMaze();',
        '    this.createPacman();',
        '    this.createGhosts();',
        '    this.setupControls();',
        '    this.gameLoop();',
        '  }',
        '',
        '  createPacman() {',
        '    this.pacman = {',
        '      x: 14 * 20,',
        '      y: 23 * 20,',
        '      radius: 8,',
        '      speed: 2,',
        '      direction: 0,',
        '      mouthOpen: 0.2',
        '    };',
        '  }',
        '',
        '  gameLoop() {',
        '    this.update();',
        '    this.draw();',
        '    requestAnimationFrame(() => this.gameLoop());',
        '  }',
        '}'
      ]
    }
  ],
  finalHtml: `<!DOCTYPE html>
<html>
<head>
  <title>Pacman Game</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background: #000; display: flex; justify-content: center; align-items: center; min-height: 100vh; font-family: 'Press Start 2P', monospace; }
    .game-container { text-align: center; }
    .header { color: #ffff00; margin-bottom: 10px; display: flex; justify-content: space-between; padding: 0 20px; font-size: 14px; }
    canvas { border: 3px solid #2121de; background: #000; }
    .controls { color: #fff; margin-top: 15px; font-size: 10px; }
  </style>
</head>
<body>
  <div class="game-container">
    <div class="header">
      <span>SCORE: <span id="score">0</span></span>
      <span>LIVES: <span id="lives">❤❤❤</span></span>
    </div>
    <canvas id="gameCanvas" width="560" height="620"></canvas>
    <div class="controls">Use Arrow Keys to Move | Press SPACE to Start</div>
  </div>
  <script>
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const CELL = 20;
    const COLS = 28;
    const ROWS = 31;
    
    const maze = [
      "############################",
      "#............##............#",
      "#.####.#####.##.#####.####.#",
      "#o####.#####.##.#####.####o#",
      "#.####.#####.##.#####.####.#",
      "#..........................#",
      "#.####.##.########.##.####.#",
      "#.####.##.########.##.####.#",
      "#......##....##....##......#",
      "######.##### ## #####.######",
      "     #.##### ## #####.#     ",
      "     #.##          ##.#     ",
      "     #.## ###--### ##.#     ",
      "######.## #      # ##.######",
      "      .   #      #   .      ",
      "######.## #      # ##.######",
      "     #.## ######## ##.#     ",
      "     #.##          ##.#     ",
      "     #.## ######## ##.#     ",
      "######.## ######## ##.######",
      "#............##............#",
      "#.####.#####.##.#####.####.#",
      "#.####.#####.##.#####.####.#",
      "#o..##.......  .......##..o#",
      "###.##.##.########.##.##.###",
      "###.##.##.########.##.##.###",
      "#......##....##....##......#",
      "#.##########.##.##########.#",
      "#.##########.##.##########.#",
      "#..........................#",
      "############################"
    ];
    
    let pacman = { x: 14, y: 23, dir: 0, nextDir: 0, mouthAngle: 0.2 };
    let ghosts = [
      { x: 1, y: 1, color: '#ff0000', dir: 0 },
      { x: 26, y: 1, color: '#00ffff', dir: 0 },
      { x: 1, y: 29, color: '#ffb8ff', dir: 0 },
      { x: 26, y: 29, color: '#ffb852', dir: 0 }
    ];
    let score = 0;
    let lives = 3;
    let dots = [];
    let gameRunning = false;
    
    function initDots() {
      dots = [];
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          if (maze[y][x] === '.' || maze[y][x] === 'o') {
            dots.push({ x, y, power: maze[y][x] === 'o' });
          }
        }
      }
    }
    
    function drawMaze() {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          if (maze[y][x] === '#') {
            ctx.fillStyle = '#2121de';
            ctx.fillRect(x * CELL, y * CELL, CELL, CELL);
          }
        }
      }
    }
    
    function drawDots() {
      dots.forEach(dot => {
        ctx.fillStyle = '#ffb8ae';
        ctx.beginPath();
        const size = dot.power ? 6 : 2;
        ctx.arc(dot.x * CELL + CELL/2, dot.y * CELL + CELL/2, size, 0, Math.PI * 2);
        ctx.fill();
      });
    }
    
    function drawPacman() {
      ctx.fillStyle = '#ffff00';
      ctx.beginPath();
      const px = pacman.x * CELL + CELL/2;
      const py = pacman.y * CELL + CELL/2;
      const angle = pacman.dir * Math.PI / 2;
      ctx.arc(px, py, 8, angle + pacman.mouthAngle, angle + Math.PI * 2 - pacman.mouthAngle);
      ctx.lineTo(px, py);
      ctx.fill();
      pacman.mouthAngle = 0.2 + Math.sin(Date.now() / 50) * 0.15;
    }
    
    function drawGhosts() {
      ghosts.forEach(ghost => {
        ctx.fillStyle = ghost.color;
        ctx.beginPath();
        const gx = ghost.x * CELL + CELL/2;
        const gy = ghost.y * CELL + CELL/2;
        ctx.arc(gx, gy - 2, 8, Math.PI, 0);
        ctx.lineTo(gx + 8, gy + 6);
        for (let i = 0; i < 4; i++) {
          ctx.lineTo(gx + 8 - i * 4 - 2, gy + 3);
          ctx.lineTo(gx + 8 - i * 4 - 4, gy + 6);
        }
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(gx - 3, gy - 2, 3, 0, Math.PI * 2);
        ctx.arc(gx + 3, gy - 2, 3, 0, Math.PI * 2);
        ctx.fill();
      });
    }
    
    function canMove(x, y) {
      if (x < 0 || x >= COLS || y < 0 || y >= ROWS) return x < 0 || x >= COLS;
      return maze[y][x] !== '#';
    }
    
    function update() {
      if (!gameRunning) return;
      
      const dirs = [[1, 0], [0, 1], [-1, 0], [0, -1]];
      const [dx, dy] = dirs[pacman.nextDir];
      const nx = pacman.x + dx;
      const ny = pacman.y + dy;
      
      if (canMove(nx, ny)) {
        pacman.dir = pacman.nextDir;
        pacman.x = (nx + COLS) % COLS;
        pacman.y = ny;
      } else {
        const [cdx, cdy] = dirs[pacman.dir];
        const cnx = pacman.x + cdx;
        const cny = pacman.y + cdy;
        if (canMove(cnx, cny)) {
          pacman.x = (cnx + COLS) % COLS;
          pacman.y = cny;
        }
      }
      
      const dotIndex = dots.findIndex(d => d.x === pacman.x && d.y === pacman.y);
      if (dotIndex !== -1) {
        score += dots[dotIndex].power ? 50 : 10;
        dots.splice(dotIndex, 1);
        document.getElementById('score').textContent = score;
      }
      
      ghosts.forEach(ghost => {
        if (Math.random() < 0.02) ghost.dir = Math.floor(Math.random() * 4);
        const [gdx, gdy] = dirs[ghost.dir];
        const gnx = ghost.x + gdx;
        const gny = ghost.y + gdy;
        if (canMove(gnx, gny) && maze[gny] && maze[gny][gnx] !== '-') {
          ghost.x = (gnx + COLS) % COLS;
          ghost.y = gny;
        } else {
          ghost.dir = Math.floor(Math.random() * 4);
        }
      });
    }
    
    function draw() {
      drawMaze();
      drawDots();
      drawPacman();
      drawGhosts();
      
      if (!gameRunning) {
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ffff00';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('PRESS SPACE TO START', canvas.width/2, canvas.height/2);
      }
    }
    
    function gameLoop() {
      update();
      draw();
      requestAnimationFrame(gameLoop);
    }
    
    document.addEventListener('keydown', e => {
      if (e.code === 'Space') { gameRunning = true; }
      if (e.code === 'ArrowRight') pacman.nextDir = 0;
      if (e.code === 'ArrowDown') pacman.nextDir = 1;
      if (e.code === 'ArrowLeft') pacman.nextDir = 2;
      if (e.code === 'ArrowUp') pacman.nextDir = 3;
    });
    
    initDots();
    gameLoop();
  </script>
</body>
</html>`
};

// Calculator Demo
export const calculatorDemo: DemoProject = {
  id: 'calculator',
  name: 'Calculator',
  query: 'Create calculator',
  description: 'A modern calculator with basic arithmetic operations',
  totalDuration: 45000,
  chatMessages: [
    {
      id: 'msg2',
      type: 'assistant',
      content: "I'll build a sleek, modern calculator for you with all basic arithmetic operations. It will have a clean UI with number pad, operators, and a display. Let me get started!",
      delay: 500
    }
  ],
  taskSteps: [
    { id: 't1', type: 'read_todo', label: 'Read Todo', delay: 2000 },
    { id: 't2', type: 'write_todo', label: 'Write Todo', delay: 3500 },
    { id: 't3', type: 'create_file', label: 'Create', fileName: 'calculator.js', delay: 5000 },
    { id: 't4', type: 'create_file', label: 'Create', fileName: 'styles.css', delay: 15000 },
    { id: 't5', type: 'create_file', label: 'Create', fileName: 'index.html', delay: 25000 },
    { id: 't6', type: 'deploy', label: 'Deploy completed Calculator', delay: 40000 }
  ],
  codeChunks: [
    {
      fileName: 'calculator.js',
      filePath: '/mnt/okcomputer/output/calculator.js',
      delay: 5000,
      lines: [
        '// Calculator Logic',
        'class Calculator {',
        '  constructor() {',
        '    this.displayValue = "0";',
        '    this.firstOperand = null;',
        '    this.operator = null;',
        '    this.waitingForSecond = false;',
        '  }',
        '',
        '  inputDigit(digit) {',
        '    if (this.waitingForSecond) {',
        '      this.displayValue = digit;',
        '      this.waitingForSecond = false;',
        '    } else {',
        '      this.displayValue = this.displayValue === "0"',
        '        ? digit : this.displayValue + digit;',
        '    }',
        '  }',
        '',
        '  handleOperator(nextOp) {',
        '    const value = parseFloat(this.displayValue);',
        '    if (this.operator && this.waitingForSecond) {',
        '      this.operator = nextOp;',
        '      return;',
        '    }',
        '    if (this.firstOperand === null) {',
        '      this.firstOperand = value;',
        '    } else if (this.operator) {',
        '      const result = this.calculate();',
        '      this.displayValue = String(result);',
        '      this.firstOperand = result;',
        '    }',
        '    this.waitingForSecond = true;',
        '    this.operator = nextOp;',
        '  }',
        '',
        '  calculate() {',
        '    const second = parseFloat(this.displayValue);',
        '    switch(this.operator) {',
        '      case "+": return this.firstOperand + second;',
        '      case "-": return this.firstOperand - second;',
        '      case "*": return this.firstOperand * second;',
        '      case "/": return this.firstOperand / second;',
        '      default: return second;',
        '    }',
        '  }',
        '}'
      ]
    }
  ],
  finalHtml: `<!DOCTYPE html>
<html>
<head>
  <title>Calculator</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Segoe UI', sans-serif;
    }
    .calculator {
      background: #22223b;
      border-radius: 20px;
      padding: 25px;
      box-shadow: 0 25px 50px rgba(0,0,0,0.4);
    }
    .display {
      background: #1a1a2e;
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 20px;
      text-align: right;
      min-height: 100px;
    }
    .expression {
      color: #888;
      font-size: 18px;
      min-height: 24px;
      margin-bottom: 5px;
      word-break: break-all;
    }
    .display-value {
      color: #fff;
      font-size: 42px;
      font-weight: 300;
      word-break: break-all;
    }
    .buttons {
      display: grid;
      grid-template-columns: repeat(4, 70px);
      gap: 12px;
    }
    button {
      width: 70px;
      height: 70px;
      border: none;
      border-radius: 15px;
      font-size: 24px;
      cursor: pointer;
      transition: all 0.2s;
    }
    button:hover { transform: scale(1.05); }
    button:active { transform: scale(0.95); }
    .number { background: #3a3a5c; color: #fff; }
    .operator { background: #f39c12; color: #fff; }
    .function { background: #4a4a6a; color: #fff; }
    .equals { background: #27ae60; color: #fff; }
    .zero { grid-column: span 2; width: 100%; }
  </style>
</head>
<body>
  <div class="calculator">
    <div class="display">
      <div class="expression" id="expression"></div>
      <div class="display-value" id="display">0</div>
    </div>
    <div class="buttons">
      <button class="function" onclick="clearAll()">AC</button>
      <button class="function" onclick="backspace()">⌫</button>
      <button class="function" onclick="percentage()">%</button>
      <button class="operator" onclick="handleOp('÷')">÷</button>
      <button class="number" onclick="inputDigit('7')">7</button>
      <button class="number" onclick="inputDigit('8')">8</button>
      <button class="number" onclick="inputDigit('9')">9</button>
      <button class="operator" onclick="handleOp('×')">×</button>
      <button class="number" onclick="inputDigit('4')">4</button>
      <button class="number" onclick="inputDigit('5')">5</button>
      <button class="number" onclick="inputDigit('6')">6</button>
      <button class="operator" onclick="handleOp('-')">−</button>
      <button class="number" onclick="inputDigit('1')">1</button>
      <button class="number" onclick="inputDigit('2')">2</button>
      <button class="number" onclick="inputDigit('3')">3</button>
      <button class="operator" onclick="handleOp('+')">+</button>
      <button class="number zero" onclick="inputDigit('0')">0</button>
      <button class="number" onclick="inputDecimal()">.</button>
      <button class="equals" onclick="calculate()">=</button>
    </div>
  </div>
  <script>
    let expression = '';
    let currentNumber = '0';
    let justCalculated = false;
    
    function updateDisplay() {
      document.getElementById('display').textContent = currentNumber;
      document.getElementById('expression').textContent = expression;
    }
    
    function inputDigit(digit) {
      if (justCalculated) {
        expression = '';
        currentNumber = digit;
        justCalculated = false;
      } else if (currentNumber === '0' && digit !== '0') {
        currentNumber = digit;
      } else if (currentNumber === '0' && digit === '0') {
        // Do nothing
      } else {
        currentNumber += digit;
      }
      updateDisplay();
    }
    
    function inputDecimal() {
      if (justCalculated) {
        expression = '';
        currentNumber = '0.';
        justCalculated = false;
      } else if (!currentNumber.includes('.')) {
        currentNumber += '.';
      }
      updateDisplay();
    }
    
    function clearAll() {
      expression = '';
      currentNumber = '0';
      justCalculated = false;
      updateDisplay();
    }
    
    function backspace() {
      if (justCalculated) {
        clearAll();
        return;
      }
      if (currentNumber.length > 1) {
        currentNumber = currentNumber.slice(0, -1);
      } else {
        currentNumber = '0';
      }
      updateDisplay();
    }
    
    function percentage() {
      currentNumber = String(parseFloat(currentNumber) / 100);
      updateDisplay();
    }
    
    function handleOp(op) {
      if (justCalculated) {
        expression = currentNumber + ' ' + op + ' ';
        currentNumber = '0';
        justCalculated = false;
      } else {
        expression += currentNumber + ' ' + op + ' ';
        currentNumber = '0';
      }
      updateDisplay();
    }
    
    function calculate() {
      if (!expression && currentNumber === '0') return;
      
      let fullExpr = expression + currentNumber;
      
      // Replace display operators with JS operators
      let evalExpr = fullExpr
        .replace(/÷/g, '/')
        .replace(/×/g, '*')
        .replace(/−/g, '-');
      
      try {
        let result = eval(evalExpr);
        // Handle floating point precision
        if (!Number.isInteger(result)) {
          result = parseFloat(result.toFixed(10));
        }
        document.getElementById('expression').textContent = fullExpr + ' =';
        currentNumber = String(result);
        expression = '';
        justCalculated = true;
        document.getElementById('display').textContent = currentNumber;
      } catch (e) {
        currentNumber = 'Error';
        updateDisplay();
      }
    }
    
    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (e.key >= '0' && e.key <= '9') inputDigit(e.key);
      else if (e.key === '.') inputDecimal();
      else if (e.key === '+') handleOp('+');
      else if (e.key === '-') handleOp('-');
      else if (e.key === '*') handleOp('×');
      else if (e.key === '/') handleOp('÷');
      else if (e.key === 'Enter' || e.key === '=') calculate();
      else if (e.key === 'Escape') clearAll();
      else if (e.key === 'Backspace') backspace();
    });
    
    updateDisplay();
  </script>
</body>
</html>`
};

// Tic Tac Toe (XOXO) Demo
export const xoxoDemo: DemoProject = {
  id: 'xoxo',
  name: 'Tic Tac Toe',
  query: 'Create xoxo game',
  description: 'Classic Tic Tac Toe game for two players',
  totalDuration: 40000,
  chatMessages: [
    {
      id: 'msg2',
      type: 'assistant',
      content: "I'll create a beautiful Tic Tac Toe (XOXO) game for two players! It will feature a clean design, win detection, and the ability to restart. Let's build it!",
      delay: 500
    }
  ],
  taskSteps: [
    { id: 't1', type: 'read_todo', label: 'Read Todo', delay: 2000 },
    { id: 't2', type: 'write_todo', label: 'Write Todo', delay: 3500 },
    { id: 't3', type: 'create_file', label: 'Create', fileName: 'game.js', delay: 5000 },
    { id: 't4', type: 'create_file', label: 'Create', fileName: 'index.html', delay: 18000 },
    { id: 't5', type: 'deploy', label: 'Deploy completed Tic Tac Toe', delay: 35000 }
  ],
  codeChunks: [
    {
      fileName: 'game.js',
      filePath: '/mnt/okcomputer/output/game.js',
      delay: 5000,
      lines: [
        '// Tic Tac Toe Game',
        'class TicTacToe {',
        '  constructor() {',
        '    this.board = Array(9).fill(null);',
        '    this.currentPlayer = "X";',
        '    this.gameOver = false;',
        '    this.winner = null;',
        '  }',
        '',
        '  makeMove(index) {',
        '    if (this.board[index] || this.gameOver) return;',
        '    this.board[index] = this.currentPlayer;',
        '    this.checkWinner();',
        '    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";',
        '  }',
        '',
        '  checkWinner() {',
        '    const lines = [',
        '      [0, 1, 2], [3, 4, 5], [6, 7, 8],',
        '      [0, 3, 6], [1, 4, 7], [2, 5, 8],',
        '      [0, 4, 8], [2, 4, 6]',
        '    ];',
        '    for (const [a, b, c] of lines) {',
        '      if (this.board[a] && ',
        '          this.board[a] === this.board[b] &&',
        '          this.board[a] === this.board[c]) {',
        '        this.winner = this.board[a];',
        '        this.gameOver = true;',
        '        return;',
        '      }',
        '    }',
        '    if (!this.board.includes(null)) {',
        '      this.gameOver = true;',
        '    }',
        '  }',
        '',
        '  reset() {',
        '    this.board = Array(9).fill(null);',
        '    this.currentPlayer = "X";',
        '    this.gameOver = false;',
        '    this.winner = null;',
        '  }',
        '}'
      ]
    }
  ],
  finalHtml: `<!DOCTYPE html>
<html>
<head>
  <title>Tic Tac Toe</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 100%);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'Segoe UI', sans-serif;
      flex-direction: column;
    }
    h1 { color: #fff; margin-bottom: 20px; font-size: 32px; }
    .status {
      color: #888;
      margin-bottom: 20px;
      font-size: 18px;
      height: 30px;
    }
    .status.winner { color: #4ecdc4; font-weight: bold; }
    .board {
      display: grid;
      grid-template-columns: repeat(3, 100px);
      gap: 10px;
    }
    .cell {
      width: 100px;
      height: 100px;
      background: #22223b;
      border: none;
      border-radius: 15px;
      font-size: 48px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
    }
    .cell:hover { background: #2a2a4a; transform: scale(1.02); }
    .cell.x { color: #ff6b6b; }
    .cell.o { color: #4ecdc4; }
    .reset {
      margin-top: 30px;
      padding: 15px 40px;
      background: #4ecdc4;
      border: none;
      border-radius: 10px;
      color: #0c0c0c;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.2s;
    }
    .reset:hover { background: #45b7aa; transform: scale(1.05); }
  </style>
</head>
<body>
  <h1>Tic Tac Toe</h1>
  <div class="status" id="status">Player X's turn</div>
  <div class="board" id="board"></div>
  <button class="reset" onclick="resetGame()">New Game</button>
  <script>
    let board = Array(9).fill(null);
    let currentPlayer = 'X';
    let gameOver = false;
    
    const winLines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    
    function createBoard() {
      const boardEl = document.getElementById('board');
      boardEl.innerHTML = '';
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('button');
        cell.className = 'cell';
        cell.onclick = () => makeMove(i);
        boardEl.appendChild(cell);
      }
      updateBoard();
    }
    
    function updateBoard() {
      const cells = document.querySelectorAll('.cell');
      cells.forEach((cell, i) => {
        cell.textContent = board[i] || '';
        cell.className = 'cell' + (board[i] ? ' ' + board[i].toLowerCase() : '');
      });
    }
    
    function makeMove(index) {
      if (board[index] || gameOver) return;
      board[index] = currentPlayer;
      
      const winner = checkWinner();
      if (winner) {
        gameOver = true;
        document.getElementById('status').textContent = 'Player ' + winner + ' wins!';
        document.getElementById('status').className = 'status winner';
      } else if (!board.includes(null)) {
        gameOver = true;
        document.getElementById('status').textContent = "It's a draw!";
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('status').textContent = "Player " + currentPlayer + "'s turn";
      }
      updateBoard();
    }
    
    function checkWinner() {
      for (const [a, b, c] of winLines) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return board[a];
        }
      }
      return null;
    }
    
    function resetGame() {
      board = Array(9).fill(null);
      currentPlayer = 'X';
      gameOver = false;
      document.getElementById('status').textContent = "Player X's turn";
      document.getElementById('status').className = 'status';
      updateBoard();
    }
    
    createBoard();
  </script>
</body>
</html>`
};

// Snake Game Demo
export const snakeDemo: DemoProject = {
  id: 'snake',
  name: 'Snake Game',
  query: 'Create snake game',
  description: 'Classic Snake game with growing snake and food',
  totalDuration: 50000,
  chatMessages: [
    {
      id: 'msg2',
      type: 'assistant',
      content: "I'll build the classic Snake game for you! The snake will grow as it eats food, and the game ends if you hit the walls or yourself. Let me start coding this nostalgic game.",
      delay: 500
    }
  ],
  taskSteps: [
    { id: 't1', type: 'read_todo', label: 'Read Todo', delay: 2000 },
    { id: 't2', type: 'write_todo', label: 'Write Todo', delay: 3500 },
    { id: 't3', type: 'create_file', label: 'Create', fileName: 'snake.js', delay: 5000 },
    { id: 't4', type: 'create_file', label: 'Create', fileName: 'styles.css', delay: 20000 },
    { id: 't5', type: 'create_file', label: 'Create', fileName: 'index.html', delay: 30000 },
    { id: 't6', type: 'deploy', label: 'Deploy completed Snake game', delay: 45000 }
  ],
  codeChunks: [
    {
      fileName: 'snake.js',
      filePath: '/mnt/okcomputer/output/snake.js',
      delay: 5000,
      lines: [
        '// Snake Game Engine',
        'class SnakeGame {',
        '  constructor(canvas) {',
        '    this.canvas = canvas;',
        '    this.ctx = canvas.getContext("2d");',
        '    this.gridSize = 20;',
        '    this.snake = [{x: 10, y: 10}];',
        '    this.direction = {x: 1, y: 0};',
        '    this.food = this.spawnFood();',
        '    this.score = 0;',
        '    this.gameOver = false;',
        '  }',
        '',
        '  spawnFood() {',
        '    return {',
        '      x: Math.floor(Math.random() * 20),',
        '      y: Math.floor(Math.random() * 20)',
        '    };',
        '  }',
        '',
        '  update() {',
        '    if (this.gameOver) return;',
        '    const head = {',
        '      x: this.snake[0].x + this.direction.x,',
        '      y: this.snake[0].y + this.direction.y',
        '    };',
        '',
        '    // Check collision with walls',
        '    if (head.x < 0 || head.x >= 20 ||',
        '        head.y < 0 || head.y >= 20) {',
        '      this.gameOver = true;',
        '      return;',
        '    }',
        '',
        '    // Check collision with self',
        '    if (this.snake.some(s => s.x === head.x && s.y === head.y)) {',
        '      this.gameOver = true;',
        '      return;',
        '    }',
        '',
        '    this.snake.unshift(head);',
        '',
        '    // Check food collision',
        '    if (head.x === this.food.x && head.y === this.food.y) {',
        '      this.score += 10;',
        '      this.food = this.spawnFood();',
        '    } else {',
        '      this.snake.pop();',
        '    }',
        '  }',
        '}'
      ]
    }
  ],
  finalHtml: `<!DOCTYPE html>
<html>
<head>
  <title>Snake Game</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: #0a0a0a;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-family: 'Segoe UI', sans-serif;
    }
    .header {
      color: #4ade80;
      margin-bottom: 15px;
      font-size: 20px;
    }
    canvas {
      border: 3px solid #4ade80;
      border-radius: 5px;
    }
    .controls {
      color: #666;
      margin-top: 15px;
      font-size: 14px;
    }
    .game-over {
      color: #ef4444;
      margin-top: 15px;
      font-size: 24px;
      font-weight: bold;
      display: none;
    }
    .restart {
      margin-top: 15px;
      padding: 10px 30px;
      background: #4ade80;
      border: none;
      border-radius: 8px;
      color: #0a0a0a;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
      display: none;
    }
    .restart:hover { background: #22c55e; }
  </style>
</head>
<body>
  <div class="header">Score: <span id="score">0</span></div>
  <canvas id="game" width="400" height="400"></canvas>
  <div class="controls">Use Arrow Keys to Move</div>
  <div class="game-over" id="gameOver">GAME OVER</div>
  <button class="restart" id="restart" onclick="startGame()">Play Again</button>
  <script>
    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');
    const GRID = 20;
    const SIZE = canvas.width / GRID;
    
    let snake, direction, food, score, gameOver, gameLoop;
    
    function startGame() {
      snake = [{x: 10, y: 10}];
      direction = {x: 1, y: 0};
      food = spawnFood();
      score = 0;
      gameOver = false;
      document.getElementById('score').textContent = '0';
      document.getElementById('gameOver').style.display = 'none';
      document.getElementById('restart').style.display = 'none';
      
      if (gameLoop) clearInterval(gameLoop);
      gameLoop = setInterval(update, 100);
    }
    
    function spawnFood() {
      let pos;
      do {
        pos = {
          x: Math.floor(Math.random() * GRID),
          y: Math.floor(Math.random() * GRID)
        };
      } while (snake.some(s => s.x === pos.x && s.y === pos.y));
      return pos;
    }
    
    function update() {
      if (gameOver) return;
      
      const head = {
        x: snake[0].x + direction.x,
        y: snake[0].y + direction.y
      };
      
      if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID ||
          snake.some(s => s.x === head.x && s.y === head.y)) {
        gameOver = true;
        clearInterval(gameLoop);
        document.getElementById('gameOver').style.display = 'block';
        document.getElementById('restart').style.display = 'block';
        return;
      }
      
      snake.unshift(head);
      
      if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById('score').textContent = score;
        food = spawnFood();
      } else {
        snake.pop();
      }
      
      draw();
    }
    
    function draw() {
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw food
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(food.x * SIZE + SIZE/2, food.y * SIZE + SIZE/2, SIZE/2 - 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw snake
      snake.forEach((segment, i) => {
        ctx.fillStyle = i === 0 ? '#4ade80' : '#22c55e';
        ctx.fillRect(segment.x * SIZE + 1, segment.y * SIZE + 1, SIZE - 2, SIZE - 2);
      });
    }
    
    document.addEventListener('keydown', e => {
      switch(e.key) {
        case 'ArrowUp': if (direction.y !== 1) direction = {x: 0, y: -1}; break;
        case 'ArrowDown': if (direction.y !== -1) direction = {x: 0, y: 1}; break;
        case 'ArrowLeft': if (direction.x !== 1) direction = {x: -1, y: 0}; break;
        case 'ArrowRight': if (direction.x !== -1) direction = {x: 1, y: 0}; break;
      }
    });
    
    startGame();
  </script>
</body>
</html>`
};

// Todo App Demo
export const todoDemo: DemoProject = {
  id: 'todo',
  name: 'Todo App',
  query: 'Create todo app',
  description: 'A simple todo list application with add, complete, and delete features',
  totalDuration: 40000,
  chatMessages: [
    {
      id: 'msg2',
      type: 'assistant',
      content: "I'll create a clean, functional Todo app for you! It will allow you to add tasks, mark them as complete, and delete them. Let me build this productivity tool.",
      delay: 500
    }
  ],
  taskSteps: [
    { id: 't1', type: 'read_todo', label: 'Read Todo', delay: 2000 },
    { id: 't2', type: 'write_todo', label: 'Write Todo', delay: 3500 },
    { id: 't3', type: 'create_file', label: 'Create', fileName: 'app.js', delay: 5000 },
    { id: 't4', type: 'create_file', label: 'Create', fileName: 'index.html', delay: 18000 },
    { id: 't5', type: 'deploy', label: 'Deploy completed Todo App', delay: 35000 }
  ],
  codeChunks: [
    {
      fileName: 'app.js',
      filePath: '/mnt/okcomputer/output/app.js',
      delay: 5000,
      lines: [
        '// Todo App Logic',
        'class TodoApp {',
        '  constructor() {',
        '    this.todos = [];',
        '    this.nextId = 1;',
        '  }',
        '',
        '  addTodo(text) {',
        '    const todo = {',
        '      id: this.nextId++,',
        '      text: text,',
        '      completed: false,',
        '      createdAt: new Date()',
        '    };',
        '    this.todos.push(todo);',
        '    return todo;',
        '  }',
        '',
        '  toggleTodo(id) {',
        '    const todo = this.todos.find(t => t.id === id);',
        '    if (todo) {',
        '      todo.completed = !todo.completed;',
        '    }',
        '  }',
        '',
        '  deleteTodo(id) {',
        '    this.todos = this.todos.filter(t => t.id !== id);',
        '  }',
        '',
        '  getActiveTodos() {',
        '    return this.todos.filter(t => !t.completed);',
        '  }',
        '',
        '  getCompletedTodos() {',
        '    return this.todos.filter(t => t.completed);',
        '  }',
        '}'
      ]
    }
  ],
  finalHtml: `<!DOCTYPE html>
<html>
<head>
  <title>Todo App</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      padding: 40px 20px;
      font-family: 'Segoe UI', sans-serif;
    }
    .container {
      width: 100%;
      max-width: 500px;
    }
    h1 {
      color: #fff;
      text-align: center;
      margin-bottom: 30px;
      font-size: 36px;
      font-weight: 300;
    }
    .input-group {
      display: flex;
      gap: 10px;
      margin-bottom: 30px;
    }
    input {
      flex: 1;
      padding: 15px 20px;
      border: none;
      border-radius: 10px;
      background: #3d3d5c;
      color: #fff;
      font-size: 16px;
    }
    input::placeholder { color: #888; }
    input:focus { outline: 2px solid #6366f1; }
    .add-btn {
      padding: 15px 25px;
      background: #6366f1;
      border: none;
      border-radius: 10px;
      color: #fff;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .add-btn:hover { background: #5254cc; }
    .todo-list { list-style: none; }
    .todo-item {
      display: flex;
      align-items: center;
      padding: 15px 20px;
      background: #2d2d44;
      border-radius: 10px;
      margin-bottom: 10px;
      transition: all 0.2s;
    }
    .todo-item:hover { background: #3d3d5c; }
    .checkbox {
      width: 24px;
      height: 24px;
      border: 2px solid #6366f1;
      border-radius: 50%;
      margin-right: 15px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }
    .checkbox.checked {
      background: #6366f1;
    }
    .checkbox.checked::after {
      content: '✓';
      color: #fff;
      font-size: 14px;
    }
    .todo-text {
      flex: 1;
      color: #fff;
      font-size: 16px;
    }
    .todo-text.completed {
      text-decoration: line-through;
      color: #666;
    }
    .delete-btn {
      background: none;
      border: none;
      color: #ef4444;
      font-size: 20px;
      cursor: pointer;
      opacity: 0;
      transition: all 0.2s;
    }
    .todo-item:hover .delete-btn { opacity: 1; }
    .stats {
      text-align: center;
      color: #666;
      margin-top: 20px;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>✨ Todo List</h1>
    <div class="input-group">
      <input type="text" id="todoInput" placeholder="What needs to be done?" onkeypress="handleKeyPress(event)">
      <button class="add-btn" onclick="addTodo()">Add</button>
    </div>
    <ul class="todo-list" id="todoList"></ul>
    <div class="stats" id="stats"></div>
  </div>
  <script>
    let todos = [];
    let nextId = 1;
    
    function addTodo() {
      const input = document.getElementById('todoInput');
      const text = input.value.trim();
      if (!text) return;
      
      todos.push({
        id: nextId++,
        text: text,
        completed: false
      });
      
      input.value = '';
      render();
    }
    
    function handleKeyPress(e) {
      if (e.key === 'Enter') addTodo();
    }
    
    function toggleTodo(id) {
      const todo = todos.find(t => t.id === id);
      if (todo) todo.completed = !todo.completed;
      render();
    }
    
    function deleteTodo(id) {
      todos = todos.filter(t => t.id !== id);
      render();
    }
    
    function render() {
      const list = document.getElementById('todoList');
      list.innerHTML = todos.map(todo => \`
        <li class="todo-item">
          <div class="checkbox \${todo.completed ? 'checked' : ''}" onclick="toggleTodo(\${todo.id})"></div>
          <span class="todo-text \${todo.completed ? 'completed' : ''}">\${todo.text}</span>
          <button class="delete-btn" onclick="deleteTodo(\${todo.id})">×</button>
        </li>
      \`).join('');
      
      const active = todos.filter(t => !t.completed).length;
      const completed = todos.filter(t => t.completed).length;
      document.getElementById('stats').textContent = 
        \`\${active} active · \${completed} completed\`;
    }
    
    render();
  </script>
</body>
</html>`
};

// Export all demos
export const allDemos: DemoProject[] = [
  pacmanDemo,
  calculatorDemo,
  xoxoDemo,
  snakeDemo,
  todoDemo
];

// Helper to find demo by query
export function findDemoByQuery(query: string): DemoProject | undefined {
  const lowerQuery = query.toLowerCase();
  return allDemos.find(demo => 
    lowerQuery.includes(demo.id) || 
    lowerQuery.includes(demo.name.toLowerCase()) ||
    demo.query.toLowerCase().includes(lowerQuery)
  );
}
