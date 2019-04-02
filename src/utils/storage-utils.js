const USER_KEY = 'user';



//保存用户信息
export function setItem(value) {
  if(!value || typeof value === 'function') {
    console.log('保存用户数据失败',value);
    return;
  }
  //LocalStorage是浏览器本地持久化存储技术，也叫永久存储, 
// Storage.getItem('key');
// 该方法接受一个键名作为参数，返回键名对应的值。
// Storage.setItem('key', 'value');
// 该方法接受一个键名和值作为参数，将会把键值对添加到存储中，如果键名存在，则更新其对应的值。
// Storage.removeItem('key');
// 该方法接受一个键名作为参数，并把该键名从存储中删除。
// Storage.clear()
// 调用该方法会清空存储中的所有键名

//这里讲‘key’提取出来定义,保存信息
  localStorage.setItem(USER_KEY, JSON.stringify(value));
}

// 获取信息
export function getItem() {
  const user = localStorage.getItem(USER_KEY);
  if(!user) return '';
  return JSON.parse(user);
}

// 删除信息
export function removeItem() {
  localStorage.removeItem(USER_KEY);
}

