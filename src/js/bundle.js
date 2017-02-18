(function() {
    function Field(size) {
        this._fieldSize = size;
        this._field = null;
    }

    Field.prototype.create = function(container) {
        this._field = document.createElement('div');
        this._field.className = 'field';
        var cell = null;
        for (var i = 0; i < this._fieldSize; i++) {
            var row = document.createElement('row');
            row.className = 'row';
            this._field.appendChild(row);
            for (var j = 0; j < this._fieldSize; j++) {
                cell = document.createElement('div');
                cell.className = 'cell';
                row.appendChild(cell);
            }
        }
        for (var i = 0; i < this._fieldSize; i++) {
            for (var j = 0; j < this._fieldSize; j++) {
                cell = this._field.children[i].children[j];
                if (i === 0) {
                    cell.up = null;
                } else {
                    cell.up = this._field.children[i - 1].children[j];
                }
                if (j === 0) {
                    cell.left = null;
                } else {
                    cell.left = this._field.children[i].children[j - 1];
                }
                if (j === this._fieldSize - 1) {
                    cell.right = null;
                } else {
                    cell.right = this._field.children[i].children[j + 1];
                }
                if (i === this._fieldSize - 1) {
                    cell.down = null;
                } else {
                    cell.down = this._field.children[i + 1].children[j];
                }
            }
        }
        container.appendChild(this._field);
    };

    Field.prototype.getField = function() {
        return this._field;
    };

    Field.prototype.createFood = function() {
        var food;
        do {
            food = this._field.children[Math.floor(Math.random() * this._fieldSize)].children[Math.floor(Math.random() * this._fieldSize)];
        } while (food.className === "snake-cell");
        food.eat = true;
        food.className = 'food';
    };

    function Snake(body) {
        this._body = body;
        this.speed = 100;
        this.obj = null;
        this.interval = null;
    }

    Snake.prototype.create = function(field) {
        for (var i = 1; i <= this._body.length; i++) {
            field.children[0].children[i].className = 'snake-cell';
        }
        this.obj = field.children[0].children[this._body.length];
        this.obj.tail = field.children[0].children[this._body.length - 1];
        this.obj.tail.tail = field.children[0].children[this._body.length - 2];
        this.obj.direction = 'right';
    };

    function Game(container) {
        this._container = container;
        this.snakeBody = [3, 2, 1];
        this.snake = null;
        this.interval = null;
        this.field = null;
        this.points = 0;
        this.menu = null;
    }

    Game.prototype.start = function() {
        this.menu = new Menu(this._container);
        this.menu.create();
        this.menu.show();
        this.field = new Field(13);
        this.field.create(this._container);
        this.field.createFood();
        this.snake = new Snake(this.snakeBody);
        this.snake.create(this.field.getField());
        var self = this;
        this.menu.startButton.onclick = function() {
            self.menu.hide();
            window.onkeydown = function(event) {
                self.changeDirection(event);
            };
            self.interval = setInterval(function() {
                self.motion();
            }, self.snake.speed);
        };
    };

    Game.prototype.motion = function() {
        var nextCell = this.snake.obj[this.snake.obj.direction];
        console.log(nextCell);
        if (nextCell && (!nextCell.classList.contains('snake-cell'))) {
            nextCell.direction = this.snake.obj.direction;
            nextCell.tail = this.snake.obj;
            if (nextCell.eat) {
                this.field.createFood();
                //this.score++;
            }
            var currentCell = this.snake.obj.tail;
            var previousCell;
            while (currentCell.tail) {
                previousCell = currentCell;
                currentCell = currentCell.tail;
            }
            if (!currentCell.eat) {
                delete previousCell.tail;
            } else {
                currentCell.eat = false;
            }
            currentCell.className = "cell";
            currentCell.style.background = "";
            this.snake.obj = nextCell;
            this.snake.obj.className = "snake-cell";
        } else {
            var self = this;
            clearInterval(this.interval);
            this.menu.show();
            this.menu.startButton.innerText = 'Game Over';
            this.menu.startButton.onclick = function() {
                self._container.innerHTML = '';
                self.menu.hide();
                self.start();
            };
        }

    };

    Game.prototype.changeDirection = function(event) {
        if (event.keyCode == 38) {
            if (this.snake.obj.direction == 'left' || this.snake.obj.direction == 'right') {
                this.snake.obj.direction = 'up';
            }
        }
        if (event.keyCode == 40) {
            if (this.snake.obj.direction == 'left' || this.snake.obj.direction == 'right') {
                this.snake.obj.direction = 'down';
            }
        }
        if (event.keyCode == 37) {
            if (this.snake.obj.direction == 'up' || this.snake.obj.direction == 'down') {
                this.snake.obj.direction = 'left';
            }
        }
        if (event.keyCode == 39) {
            if (this.snake.obj.direction == 'up' || this.snake.obj.direction == 'down') {
                this.snake.obj.direction = 'right';
            }
        }
    };

    function Menu(container) {
        this.container = container;
        this.startButton = null;
        this.menu = null;
    }

    Menu.prototype.create = function() {
        this.menu = document.createElement('div');
        this.menu.className = 'menu';
        this.startButton = document.createElement('a');
        this.startButton.className = 'menu__button';
        this.startButton.href = '#';
        this.startButton.innerText = 'Start';
        this.menu.appendChild(this.startButton);
        this.container.appendChild(this.menu);
    };

    Menu.prototype.hide = function() {
        this.menu.style.display = 'none';
    };

    Menu.prototype.show = function() {
        this.menu.style.display = 'flex';
    };

    var app = document.getElementById('app');
    var game = new Game(app);
    game.start();
}());