(function () {
	//定义一个myVue构造函数
	function myVue(options) {
		this._init(options);
	}

	myVue.prototype._init = function (options) {
		this.$options = options;
		this.$el = document.querySelector(options.el);	//#app
		this.$data = options.data;	//{number: 0}
		this.$methods = options.methods; //{increment: function () {}}

		//_binding保存着model与view的映射关系，也就是Watcher的实例。
		// 当model改变时，会触发其中的指令类更新，保证view也能实时更新
		this._binding = {};
		this._obverse(this.$data);
		this._compile(this.$el);
	};

	//实现观察者函数_obverse,重写data的get、set函数
	myVue.prototype._obverse = function (obj) {
		var value;

		for (var key in obj) {	//遍历obj属性
			if (obj.hasOwnProperty(key)) { //确保为实例属性
				this._binding[key] = {	// -> this._binding = {number: {_directives: []}}
					_directives: []		//指令
				};
				value = obj[key];
				if (typeof value === 'Object') { //属性值为对象，递归遍历
					this._obverse(value);
				}

				var binding = this._binding[key];
				Object.defineProperty(obj, key, {
					enumerable: true,	//属性可枚举
					configurable: true, //可修改描述属性
					get: function () {
						console.log('获取${value}');
						return value;
					},
					set: function (new_value) {
						console.log('更新${value}');
						if (value !== new_value) {
							value = new_value;
							// 当number改变时，触发_binding[number]._directives 中的绑定的Watcher类的更新
							binding._directives.forEach(function (item) {
								item.update();
							});
						}
					}
				});
			}
		}
	};

	//实现一个watcher指令类，用来绑定更新函数，实现对DOM的更新
	/***
	 *
	 * @param name    指令名称，例如文本节点，该值设为"text"
	 * @param el    指令对应的DOM元素
	 * @param vm    指令所属的myVue实例
	 * @param exp    指令对应的值，例如'name'
	 * @param attr    绑定的属性值，本例为"innerHTML"
	 * @constructor
	 */
	function Watcher(name, el, vm, exp, attr) {
		this.name = name;
		this.el = el;
		this.vm = vm;
		this.exp = exp;
		this.attr = attr;

		this.update();
	}

	Watcher.prototype.update = function () {
		//单向数据绑定：model -> view
		this.el[this.attr] = this.vm.$data[this.exp];
		console.log(this.el[this.attr]);
	};

	//定义一个_compile函数，实现将view与model绑定
	myVue.prototype._compile = function (root) {
		var _this = this;
		var nodes = root.children;
		for (var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			if (node.children.length) {
				this._compile(node);
			}

			if (node.hasAttribute('v-click')) {
				node.onclick = (function () {
					var attrVal = node.getAttribute('v-click');	// -> increment
					return _this.$methods[attrVal].bind(_this.$data); //bind是使data的作用域与method函数的作用域保持一致
				})();
			}

			// 依赖收集
			if (node.hasAttribute('v-model') && (node.tagName == 'INPUT' || node.tagName == 'TEXTAREA')) {
				//监听input事件
				node.addEventListener('input', (function (key) {
					var attrVal = node.getAttribute('v-model'); // -> name
					//new一个Watcher实例时，以update()进行单向数据绑定：model -> view
					_this._binding[attrVal]._directives.push(new Watcher(
						'input',
						node,
						_this,
						attrVal,
						'value'
					));

					//使model的数据与view保持一致，实现双向数据绑定：view -> model
					//return的fn为实际的事件的回调函数
					return function () {
						_this.$data[attrVal] = nodes[key].value;
					}
				})(i))
			}

			if (node.hasAttribute('v-bind')) {
				var attrVal = node.getAttribute('v-bind');
				_this._binding[attrVal]._directives.push(new Watcher(
					'text',
					node,
					_this,
					attrVal,
					'innerHTML'
				));
			}
		}
	};

	//实例化一个myVue
	var app = new myVue({
		el: '#app',
		data: {
			number: 0
		},
		methods: {
			increment: function () {
				this.number++;
			}
		}
	});

	console.log(app);
	/** app数据结构：
	 * {
	 *   $options: {...}
	 *   $el: div#app,
	 *	 $data: {number: 0},
	 *	 $method: {
	 *	   increment: fn()
	 *	 },
	 *	 _binding: {
	 *	   number: {
	 *	     _directives: [
	 *	       {name, el, vm, exp, attr, update()},	// Watcher实例
	 *	       {name, el, vm, exp, attr, update()},	// Watcher实例
	 *	       ...
	 *	     ]
	 *	   }
	 *	 }
	 * }
	 */
})();
