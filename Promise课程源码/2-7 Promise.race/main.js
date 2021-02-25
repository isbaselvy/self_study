// 
/**
 * Promise.race([ promise1, promise2 ]) : Promise
 * 数组中的promise只要有一个决议了，就返回，状态与决议的那个promise一致，并返回对应的值
 * 传入空数组，会挂起
 */

function getData1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('第一条数据加载成功');
      reject('err');
    }, 500);
  });
}

function getData2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('第二条数据加载成功');
      resolve('data2');
    }, 1000);
  });
}

function getData3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('第三条数据加载成功');
      resolve('data3');
    }, 1200);
  });
}

// Promise.race([getData2, getData1, getData3]).then(res => {
//   console.log(res) // 输出第一个函数，数组里应是promise对象
// })

Promise.race([getData2(), getData1(), getData3()]).then(res => {
  console.log('suceess:', res)
}, err => {
  console.log('fail:', err) // err
})

Promise.race([getData2(), getData3()]).then(res => {
  console.log('suceess:', res) // suceess: data2
}, err => {
  console.log('fail:', err)
})

let p = Promise.race([]);
// 无输出
p.then(data => {
	console.log('挂不挂');
}, e => {
	console.log('挂不挂的失败');
})

// 不使用pormise.race

let flag = false;
function func(data) {
  if (flag) return;
  flag = true;

  console.log(data);
}

function getData1() {
  setTimeout(() => {
    console.log('第一条数据加载成功');
    func({name: 'xiaoming'});
  }, 500);
}

function getData2() {
  setTimeout(() => {
    console.log('第二条数据加载成功');
    func({name: 'xiaohong'});
  }, 600);
}

getData1();
getData2();
