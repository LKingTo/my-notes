// 利用类似EventBus方式，解耦Service Worker的message事件和sync事件
class SimpleEvent {
  constructor() {
    this.listenrs = {};
  }

  once(tag, cb) {
    this.listenrs[tag] || (this.listenrs[tag] = []);
    this.listenrs[tag].push(cb);
  }

  trigger(tag, data) {
    this.listenrs[tag] = this.listenrs[tag] || [];
    let listenr;
    while (listenr = this.listenrs[tag].shift()) {
      listenr(data)
    }
  }
}

