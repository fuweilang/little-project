/*
 * 功能：获取渲染后标签的样式
 * 作者：
 * 时间：2015-03-30
 * @ele 标签的对象
 * @json CSS属性与CSS属性要设置的目标值
 * @changeStep 步数
 * @fn 回调步数
 * 事例：move(box, {"width": "250", "height": "200", "opacity": 50}, 30);
 */
function move(ele, json, changeStep, fn) {
	//清除计时器
	clearInterval(ele.timer);
	//自定义属性
	ele.timer = setInterval(function() {
		//true代表所有属性的属性值都达到终点
		var timejudge = true;

		// 遍历所有CSS属性和CSS属性的目标值
		for(var proAttr in json) {
			if(proAttr == "opacity") {
				var startVal = parseInt(getStyle(ele, proAttr) * 100);
			} else {
				var startVal = parseInt(getStyle(ele, proAttr));
			}
			//Math.abs绝对值
			//Math.ceil向上取整
			// 起点与终点的距离
			var distance = Math.abs(json[proAttr] - startVal);
			var speed = Math.ceil(distance / changeStep);

			//处理透明度步长，不然进入死循环
			if (proAttr == "opacity") {
				speed = (speed < 2)?3:speed;
			};

			// 实现双方向运动
			if (startVal < json[proAttr]) {
				startVal += speed;
			} else {
				startVal -= speed;
			}
			if (distance < 20) {
				startVal = json[proAttr];
			}

			//判断所有设置的CSS属性是否全部到达目标值，如果没有到达则设置timejudge为false
			if (startVal != json[proAttr]) {
				timejudge = false;
			};

			if (proAttr == "opacity") {
				// 兼容非IE
				ele.style[proAttr] = startVal / 100;
				ele.style["filter"] = "alpha(opacity=" + startVal +")";
			} else {
				ele.style[proAttr] = startVal + "px";
			}
		}
		// 属性值全部到达终点，清除计时器
		if (timejudge) {
			clearInterval(ele.timer);

			//如果有回调函数，才能执行
			if (fn) {
				// 调用函数
				fn();
			};
		};
	}, 50)
} 

/*
 * 功能：获取渲染后标签的样式
 * @element是标签的对象
 * @property是标签的样式属性
 */
function getStyle(element, property) {
	var proVal = null;
	//兼容IE
	if (!document.defaultView) {
		proVal = element.currenStyle[property];
	} else {
		//兼容谷歌，火狐等
		proVal = document.defaultView.getComputedStyle(element)[property];
	}
	return proVal;
} 