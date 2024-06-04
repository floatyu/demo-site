//系统登录模块
//登录
import {users} from '../data'
export function login(){
    return {
        url:'login',
        method:'post',
        response:(opts)=>{
            const name=opts.data.account
            if(
                users.find((v)=>v.name===name && v.password===opts.data.password)
            ){
                 return{
                code:200,
                msg:"登录成功",
                data:{
                    token:name + '@132326565898956232',
                    name,
                }
            }
            }
           return {
            code:-1,
            msg:'用户名或密码错误'
           }
        }
    }
}
//退出接口
export function logout(){
    return{
        url:'logout',
        method:'get',
        response:{
            code:200,
            msg:null,
            data:{}
        }
    }
}