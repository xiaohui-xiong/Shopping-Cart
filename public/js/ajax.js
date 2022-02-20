/**
 * 封装的ajax函数
 * @param {Object} obj 调用函数发起请求需要的参数
 *  { url:'xxxx',method:'get',async:true,data:{},dataType:'string',success:function(){}}
 */
function ajax(obj) {
  // 1. 判断是否传递了请求地址
  if (!obj.url) throw Error('请求地址必须传递');

  // 2. 先准备一个默认的 参数对象
  let info = {
    method: 'get',
    async: true,
    data: {},
    dataType: 'string',
    success: function (res) { }
  }
  // 3. 用传递的obj对象中的参数，替换 默认参数对象中的数据
  // 遍历传入的obj对象
  for (const key in obj) {
    info[key] = obj[key];
  }
  // 4. 将传入请求携带的参数 转为 查询字符串
  let str = '';
  for (const key in info.data) {
    str += `${key}=${info.data[key]}&`
  }
  // 如果str还是空字符串,则不需要截取
  str = str ? str.slice(0, -1) : '';

  // 5. 创建ajax对象
  let xhr = new XMLHttpRequest();

  // 6. 配置请求信息。并发起请求
  if (info.method.toLowerCase() == 'get') {
    xhr.open('get', `${info.url}?${str}`, info.async)
    xhr.send();
  } else if (info.method.toLowerCase() == 'post') {
    xhr.open('post', info.url, info.async);
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    xhr.send(str);
  } else {
    throw Error('请求方式之能是get或post,请期待升级');
  }

  // 7. 获取响应
  xhr.onreadystatechange = function () {
    if (xhr.status === 200 && xhr.readyState === 4) {
      // 8. 判断是否需要将接受数据转个格式
      let res = info.dataType == 'json' ? JSON.parse(xhr.responseText) : xhr.responseText;
      // 9. 接受到了响应的数据，调用后续要执行的函数
      info.success(res);
    }
  }

}

// 通过promise再次封装ajax函数
function pAjax(obj){
  return new Promise((resolve,reject)=>{   
    window.resolve = resolve;    
    ajax({  // ajax函数发起请求      
      url: obj.url,
      method: obj.method|| 'get',
      async: typeof(obj.async) === 'Boolean'?obj.async:true,
      data: obj.data||{},
      dataType:obj.dataType||'string',
      success:obj.success||function(res){
        resolve(res);
      }
    })
  })
}