// 游戏 - 构造函数
function Game() {
  this.snake = new Snake(); // 蛇对象
  this.food = new Food(); // 食物对象
  this.food.randomLocation(); // 食物随机位置
  this.snake.showSnake(); // 展示一条蛇
};
let timer;
Game.prototype.start = function () {
  window.clearInterval(timer);
  const that = this; // 把this暂存到that
  timer = window.setInterval(function () { // 开始一个定时器,让蛇不断的动起来
    that.snake.move();
    let dead = that.snake.isDead(); // 检测是否死亡
    if (dead) {
      clearInterval(timer);
      $('.dead').show(500); // 显示提示信息
    };

    let eat = that.snake.isEat(that.food);
    if (eat) {
      that.food.randomLocation();
      that.snake.insertNewHead();
    };
  }, 200);

  // 键盘可以控制蛇移动的方向
  $(document).keydown(function (e) {
    let code = e.keyCode; // 键码值    37  38  39 40
    if (code === 37) { // 判断按键
      that.snake.direction = 'left';
    } else if (code === 38) {
      that.snake.direction = 'top'
    } else if (code === 39) {
      that.snake.direction = 'right'
    } else if (code === 40) {
      that.snake.direction = 'bottom'
    };
  });
};

Game.prototype.stop = function () {
  window.clearInterval(timer);
};

Game.prototype.reStart = function () {
  location.reload();
};