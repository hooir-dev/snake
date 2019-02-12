// 蛇 - 构造函数
function Snake() {
  this.direction = 'right'; // 约定方向值：left、top、right、bottom
  this.elements = []; // 蛇组（蛇头和蛇身），存放的是多个div元素 约定，把蛇头永远存放在设蛇组的最前面，第0个位置,蛇组中将来会存放多个jquery对象
};

// 计算新蛇头的位置，返回值是一个对象{left，top}
Snake.prototype.getNewHeadLocation = function () {
  let oldHead = this.elements[0]; // 获取的旧的蛇头
  if (oldHead == undefined) { // 若没有蛇头，新蛇头的位置是  0,0
    return {
      left: 0,
      top: 0
    };
  } else {
    // 获取旧的蛇头的位置
    let x = oldHead.position().left;
    let y = oldHead.position().top;
    if (this.direction == 'right') { //  若有蛇头，根据方向来计算
      x += 20; //  新蛇头的right位置 = 旧的蛇头的right位置 + 20；
    } else if (this.direction == 'left') {
      x -= 20; //  新蛇头的Left位置 = 旧的蛇头的Left位置 - 20；
    } else if (this.direction == 'top') {
      y -= 20; //  新蛇头的top位置 = 旧的蛇头的top位置 - 20；
    } else if (this.direction == 'bottom') {
      y += 20; //  新蛇头的bottom位置 = 旧的蛇头的bottom位置 - 20；
    };
    return {
      left: x,
      top: y
    };
  };
};

// 添加新蛇头
Snake.prototype.insertNewHead = function () {
  let obj = this.getNewHeadLocation(); //  获取并计算新蛇头的位置
  let $oldHead = this.elements[0];
  if ($oldHead != undefined) { //  检测是否有旧的的蛇头，若有，把旧的蛇头变为身体
    $oldHead.removeClass('snake-head').addClass('snake-body');
  };
  let $newHead = $('<div class="snake-head"></div>'); //  创建一个新的蛇头（创建一个div）
  this.elements.unshift($newHead); //  把蛇头存入的蛇组的最前面
  $newHead.appendTo('#map'); //  把蛇头放入地图中
  $newHead.css({ //  把新的位置给新的蛇头-更改新蛇头的样式
    left: obj.left,
    top: obj.top
  });
};

// 显示蛇
Snake.prototype.showSnake = function () {
  for (let i = 1; i <= 3; i++) {
    this.insertNewHead();
  };
};

// 蛇移动
Snake.prototype.move = function () {
  // 从蛇组中 和 地图中移除蛇尾
  let lastHead = this.elements.pop(); // 仅仅从数组中删除了
  lastHead.remove(); // 从地图中移除
  this.insertNewHead(); // 增加新蛇头 
};

// 蛇死亡
Snake.prototype.isDead = function () {
  let obj = this.getNewHeadLocation();
  let x = obj.left;
  let y = obj.top;
  if (x < -1 || x > $('#map').width() || y < -1 || y > $('#map').height()) {
    return true;
  };
  return false;
};

// 蛇吃食物
Snake.prototype.isEat = function (food) {
  let head = this.elements[0];
  let left = head.position().left;
  let top = head.position().top;
  if (left == food.x && top == food.y) {
    return true;
  };
  return false;
};