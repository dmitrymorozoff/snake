!function(){function t(t){this._fieldSize=t,this._field=null}function e(t){this._body=t,this.speed=100,this.obj=null,this.interval=null}function i(t){this._container=t,this.snakeBody=[3,2,1],this.snake=null,this.interval=null,this.field=null,this.points=0,this.menu=null}function n(t){this.container=t,this.startButton=null,this.menu=null}t.prototype.create=function(t){this._field=document.createElement("div"),this._field.className="field";for(var e=null,i=0;i<this._fieldSize;i++){var n=document.createElement("row");n.className="row",this._field.appendChild(n);for(var s=0;s<this._fieldSize;s++)e=document.createElement("div"),e.className="cell",n.appendChild(e)}for(var i=0;i<this._fieldSize;i++)for(var s=0;s<this._fieldSize;s++)e=this._field.children[i].children[s],0===i?e.up=null:e.up=this._field.children[i-1].children[s],0===s?e.left=null:e.left=this._field.children[i].children[s-1],s===this._fieldSize-1?e.right=null:e.right=this._field.children[i].children[s+1],i===this._fieldSize-1?e.down=null:e.down=this._field.children[i+1].children[s];t.appendChild(this._field)},t.prototype.getField=function(){return this._field},t.prototype.createFood=function(){var t;do t=this._field.children[Math.floor(Math.random()*this._fieldSize)].children[Math.floor(Math.random()*this._fieldSize)];while("snake-cell"===t.className);t.eat=!0,t.className="food"},e.prototype.create=function(t){for(var e=1;e<=this._body.length;e++)t.children[0].children[e].className="snake-cell";this.obj=t.children[0].children[this._body.length],this.obj.tail=t.children[0].children[this._body.length-1],this.obj.tail.tail=t.children[0].children[this._body.length-2],this.obj.direction="right"},i.prototype.start=function(){this.menu=new n(this._container),this.menu.create(),this.menu.show(),this.field=new t(13),this.field.create(this._container),this.field.createFood(),this.snake=new e(this.snakeBody),this.snake.create(this.field.getField());var i=this;this.menu.startButton.onclick=function(){i.menu.hide(),window.onkeydown=function(t){i.changeDirection(t)},i.interval=setInterval(function(){i.motion()},i.snake.speed)}},i.prototype.motion=function(){var t=this.snake.obj[this.snake.obj.direction];if(console.log(t),t&&!t.classList.contains("snake-cell")){t.direction=this.snake.obj.direction,t.tail=this.snake.obj,t.eat&&this.field.createFood();for(var e,i=this.snake.obj.tail;i.tail;)e=i,i=i.tail;i.eat?i.eat=!1:delete e.tail,i.className="cell",i.style.background="",this.snake.obj=t,this.snake.obj.className="snake-cell"}else{var n=this;clearInterval(this.interval),this.menu.show(),this.menu.startButton.innerText="Game Over",this.menu.startButton.onclick=function(){n._container.innerHTML="",n.menu.hide(),n.start()}}},i.prototype.changeDirection=function(t){38==t.keyCode&&("left"!=this.snake.obj.direction&&"right"!=this.snake.obj.direction||(this.snake.obj.direction="up")),40==t.keyCode&&("left"!=this.snake.obj.direction&&"right"!=this.snake.obj.direction||(this.snake.obj.direction="down")),37==t.keyCode&&("up"!=this.snake.obj.direction&&"down"!=this.snake.obj.direction||(this.snake.obj.direction="left")),39==t.keyCode&&("up"!=this.snake.obj.direction&&"down"!=this.snake.obj.direction||(this.snake.obj.direction="right"))},n.prototype.create=function(){this.menu=document.createElement("div"),this.menu.className="menu",this.startButton=document.createElement("a"),this.startButton.className="menu__button",this.startButton.href="#",this.startButton.innerText="Start",this.menu.appendChild(this.startButton),this.container.appendChild(this.menu)},n.prototype.hide=function(){this.menu.style.display="none"},n.prototype.show=function(){this.menu.style.display="flex"};var s=document.getElementById("app"),o=new i(s);o.start()}();