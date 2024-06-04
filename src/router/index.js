import{createRouter,createWebHistory} from 'vue-router'
import store from '../store'
import {menuTree} from "../apis/personal"
const layout=()=>import('../layout/index.vue')
const routes = [
    {
        path:'/',
        name:'home',
        component:layout,
        children:[
             {
        path:'app',
        name:'App',
        requireAuth:true,
        component:()=>import("../views/app/index.vue")
        
    },
            {
                path:'login',
                name:'login',
                component:()=>import('../views/login/index.vue')
            },
            {
                path:'404',
                name:'NotFound',
                component:()=>import("../views/404.vue")
            },
            {
                path:'personal',
                name:'personal',
                requireAuth:true,
                component:()=>import('../views/personal/index.vue'),
                children:[
                    {
                        path:'message',
                        name:'PersonalMessage',
                        requireAuth:true,
                        component:()=>import('../views/personal/Message.vue')
                    }
                ]
            }
        ]
    },
   
    // {
    //     path:'/:pathMatch(.*)*',
    //     name:'404',
    //     component:()=>import("../views/404.vue")
    // }
    
]
const route404={
  path:'/:pathMatch(.*)*',
  name:'404',
  redirect:'/404'
}

const router=createRouter({
    history:createWebHistory(),
    routes
})
//添加一个前置导航守卫。
router.beforeEach(async(to)=>{
    const isLogin= store.getters['user/isLogin']
    if(to.path==='/login'){
        if(isLogin){
            return {name:'home'}
        }  return true
    }
    if(to.meta.requireAuth){
        if(!isLogin){
            return {name:'login'}
        }
    }
    await addDynamic()
    if(!to.name && hasRoute(to)){
        return{...to}
    }
    if(to.path==='/'&& store.state.firstRoute){
        return store.state.firstRoute
    }
    return true
  
})
function hasRoute(to){
    const item=router.getRoutes().find((item)=> item.path===to.path)
    return !!item
}
//动态添加路由
 async function addDynamic(){
    if(store.state.routeLoaded){
        return;
    }
    return menuTree().then((res)=>{
        // console.log(res)
        //添加动态路由
        if(res.data && res.data.length){
            addDynamicRoutes(res.data)
        }
        router.addRoute(route404)
        store.commit('setRouteLoaded',true)
        //保存菜单树
        store.commit("setMenuTree",res.data)
    })
}
//动态引入views下所有.vue文件（组件）
const modules = import.meta.glob('../views/**/*.vue')
function addDynamicRoutes(data,parent){
    data.forEach((item,i)=>{
        console.log(data,parent)
        const route={
            path:item.path,
            name:item.name,
            meta:{
                title:item.title,
                icon:item.icon,
            },
            children:[]
        };
        if(parent){
            if(item.parentId !==0){
                const comParr=item.path.replace('/','').split('/')
                const l=comParr.length -1
                const comPath=comParr
                .map((v,i)=>{
                    return i===1 ? v.replace(/\w/,(L)=>L.toUpperCase())+ ".vue":v
                }).join("/")
                route.path=comParr[l]
                //设置动态组件
                route.component=modules[`../views/${comPath}`]
                parent.children.push(route)
            }
        }else{
            if(item.children && item.children.length){
                route.redirect=item.children[0].path
                addDynamicRoutes(item.children,route)
            }
           
            if(i===0){
                store.commit('setFirstRoute',route)
            }
            router.addRoute('home',route)
        }
    })
}
export default router