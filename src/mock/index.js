import Mock from 'mockjs'
import config from '../request/config'
import * as login from './modules/login'
import * as personal from './modules/personal'
import * as logsVisit from './modules/logs-visit'

const modules={
    login,personal,logsVisit
}


const {baseURL,timeout}=config
Mock.setup({timeout})
//1.开启/关闭所有模块拦截，通过openMock开关设置
//2.开启/关闭单个模块拦截，通过调用mock方法isOpen参数设置
//3.开启/关闭模块中某个请求拦截，通过函数返回对象中的isOpen属性设置
const openMock=true
//模拟所有模块
mockAll(modules,openMock)
function mockAll(modules,isOpen=true){
    for(const k in modules){
        mock(modules[k],isOpen)
    }
}
//模拟单个模块
//mock(login,openMock)
/**
 * 创建mock模拟数据
 * @param{*}mod 模块
 * @param{*}isOpen是否开启？
 */
function mock (mod, isOpen=true){
    if(isOpen){
        for(var key in mod){
            ((res)=>{
                if(res.isOpen !== false){
                    let url=baseURL
                    if(typeof URL === 'string' && !url.endsWith("/")){
                        url=url + "/"
                    }
                   
                url=url + res.url
                Mock.mock(new RegExp(url),res.method,(opts)=>{
                    opts.data=opts.body ? JSON.parse(opts.body):null
                    const resData = Mock.mock(typeof res.response==='function'? res.response(opts):res.response)
                    console.log('%cmock拦截,请求:','color:blue',opts)
                    console.log("%cmock拦截,响应",'color:blue',resData)
                    return resData
                  
                })
            }
            })(mod[key]()||{})
        }
    }
}