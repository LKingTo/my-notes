class Routers {
  constructor() {
    // 以键值对的形式储存路由
    this.routes = {}
    // 当前路由的URL
    this.currentUrl = ''
    // 记录出现过的hash
    this.history = [];
    this.currentIndex = this.history.length - 1;
    this.refresh = this.refresh.bind(this);
    this.backOff = this.backOff.bind(this);
    // 默认不是后退操作
    this.isBack = false;
    window.addEventListener('load', this.refresh, false);
    window.addEventListener('hashchange', this.refresh, false);
  }

  // 将path路径与对应的callback函数储存
  route(path, callback) {
    this.routes[path] = callback || function () {console.log(`${path}: callback`)}
  }

  refresh() {
    this.currentUrl = location.hash.slice(1) || '/'  // /xxx

    if (!this.isBack) {
      // 如果不是后退操作,且当前指针小于数组总长度,直接截取指针之前的部分储存下来
      // 此操作来避免当点击后退按钮之后,再进行正常跳转,指针会停留在原地,而数组添加新hash路由
      // 避免再次造成指针的不匹配,我们直接截取指针之前的数组
      // 此操作同时与浏览器自带后退功能的行为保持一致
      if (this.currentIndex < this.history.length - 1)
        this.history = this.history.slice(0, this.currentIndex + 1);
      this.history.push(this.currentUrl);
      this.currentIndex++;
    }

    // 执行当前hash路径的callback函数
    if (!this.routes[this.currentUrl])
      this.route(this.currentUrl)
    else
      this.routes[this.currentUrl]()
    console.log('指针:', this.currentIndex, 'history:', this.history);
    this.isBack = false
  }

  // 后退功能
  backOff() {
    console.log(this.history)
    this.isBack = true;
    // 如果指针小于0的话就不存在对应hash路由了,因此锁定指针为0即可
    this.currentIndex <= 0
      ? (this.currentIndex = 0)
      : (this.currentIndex = this.currentIndex - 1);
    // 随着后退,location.hash也应该随之变化
    location.hash = `#${this.history[this.currentIndex]}`;
    // 执行指针目前指向hash路由对应的callback
    this.routes[this.history[this.currentIndex]]();
  }
}

let routers = new Routers()
console.log(routers)

function onClickBack() {
  routers.backOff()
}
