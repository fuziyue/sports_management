/*
  权限判断，如果store中存在token则认为已经登陆，予以放行
  如果用户未登陆则跳转到登陆页面
*/
export default function ({ store, redirect }) {
  if (!store.state.token) {
    return redirect('/login/login');
  }
}
