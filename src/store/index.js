// store/index.js
import { createStore } from 'vuex';
import user from './modules/user'
const store = createStore({
  state: {
    token: 123456789,
    routerLoaded:false,//菜单和路由是否已经加载
    firstRoute:null,//第一个路由，用于进入主页时redirect
    menuTree:null//菜单树
  },
  mutations: {
    setRouteLoaded(state,loaded){
        //改变菜单和路由的加载状态
        state.routerLoaded=loaded;
    },
    setFirstRoute(state,route){
        state.firstRoute=route;
    },
    setMenuTree(state,data){
        state.menuTree=data
       
    }
    },
    modules:{
        user
    }


  // 其他配置...
});

export default store;