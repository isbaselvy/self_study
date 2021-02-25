function f(val) {
  return new Promise((resolve, reject) => {
    if (val) {
      resolve({ name: '小明' }, ); // 只能传递一个参数，多个后面的是拿不到的
    } else {
      reject('404');
    }
  }); 
}

// then(resolve, reject)
// then方法中的第二个回调 失败时候做的事

// f(false)
//   .then((data) => {
//     console.log(data)
//   }, e => {
//     console.log(e); // 404
//   })

//----------------------------------------
// catch
// 使用实例的catch方法 可以捕获错误

// f(true)
//   .then(data => {
//     console.log('success:', data);
//     return f(false);
//   }) // 上一个return的是false，则下面then的第一个成功回调不会执行
//   .then(() => {
//     console.log('我永远不会被输出');
//   })
//   .then(() => {

//   }, (e) => {
//     console.log('我是reject的错误eee:', e)
//   }) // 如果对错误进行了处理，则不会走catch
//   .catch(e => {
//     console.log('我是catch中的e', e);
//     return f(false) ;
//   }); // es中没有很好解决无限catch的问题，参考第三方库

//----------------------------------------
// finally
// 不论成功还是失败 finally中的内容一定会执行

f(true)
  .then(data => {
    console.log(data);
    return f(false);
  })
  .catch(e => {
    console.log(e);
    return f(false);
  })
  .finally(() => {
    console.log(100);
  });

  // 状态 pending fullfilled  rejected  只能从pending到fullfilled或rejected，状态不可逆，一旦决议就不能再修改