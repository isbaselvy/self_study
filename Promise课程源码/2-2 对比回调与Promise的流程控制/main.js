// 动画

// function moveTo(el, x, y, cb) {
// 	el.style.transform = `translate(${x}px, ${y}px)`;
// 	setTimeout(function() {
// 		cb && cb();
// 	}, 1000);
// }

// let el = document.querySelector('div');

// document.querySelector('button').addEventListener('click', e => {
// 	moveTo(el, 100, 100, function() {
// 		moveTo(el, 200, 200, function() {
// 			moveTo(el, 30, 20, function() {
// 				moveTo(el, 100, 300, function() {
// 					moveTo(el, 130,20, function() {
// 						moveTo(el, 0, 0, function() {
// 							console.log('移动结束!');
// 						});
// 					});
// 				});
// 			});
// 		});
// 	});
// });

// promise

function moveTo(el, x, y) {
	return new Promise(resolve => {
		el.style.transform = `translate(${x}px, ${y}px)`;
		setTimeout(function() {
			resolve(); // resolve可以理解为then里面的函数的占位符
		}, 1000);
	});
}


let el = document.querySelector('div');
// 要链式调用则不一定需要return一个promise，但是加不加有区别
document.querySelector('button').addEventListener('click', e => {
	moveTo(el, 100, 100)
		.then(function() {
			console.log('第一次移动');
			return moveTo(el, 200, 200); // 返回了这个则下一个then会执行移动
		})
		.then(function() {
			console.log('第二次移动');
		})
		// 可以继续调用 .then方法，将一段长的业务代码分成两段
		.then(function() {
			console.log('第二次移动');
		});
});