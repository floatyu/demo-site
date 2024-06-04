<template>
    <div>
        <div class="header-cont">
            <div class="left">
               
                <h1>
                    <router-link to="/app">{{ $t('siteName') }}</router-link>
                </h1>

            </div>
            <div class="right flex-center">
                <div class="lang gap">
                    <span class="item" @click="changeLanguage('zh-cn')"
                        :class="{active: locale.value==='zh-cn'}">简体中文</span>
                    <span class="item" @click="changeLanguage('en')"
                        :class="{ active: locale.value === 'en' }">/EN</span>
                </div>
                <template v-if="isLogin">
                    <div class="gap cursor">
                        <router-link to="/personal/message">

                            <div class="size">
                                <el-badge :is-dot="!!unReadCount" class="custom-badge">
                                    <el-icon>
                                        <Message />
                                    </el-icon>
                                </el-badge>

                            </div>
                        </router-link>
                    </div>

                    <el-dropdown trigger="click" @command="handleCommand">
                        <div class="flex-center cursor">{{userName}}
                            <div class="size">
                                <el-icon>
                                    <ArrowDownBold />
                                </el-icon>
                            </div>
                        </div>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="toPersonal">{{ $t('personalCenter')}}</el-dropdown-item>
                                <el-dropdown-item command="toLogout">{{ $t('logout') }}</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>
                <template v-else-if="$route.name!=='login'">
                    <router-link to="/login">{{ $t('login') }}</router-link>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup >
import { ref, computed} from'vue'
import { useStore} from 'vuex'
import { useRouter } from 'vue-router'
import { CaretBottom } from '@element-plus/icons-vue'
import { Message} from '@element-plus/icons-vue'
import { ArrowDownBold } from '@element-plus/icons-vue'
import{useI18n}from 'vue-i18n'
import{logout} from '../../apis/login'

const {locale,t}=useI18n()
const store=useStore()
const isLogin=computed(()=>store.getters['user/isLogin'])
const userInfo= computed(()=>store.state.user.userInfo)
const userName= computed(()=>userInfo.value.name)
const unReadCount=computed(()=>userInfo.value?.unReadCount)
store.dispatch('user/refreshInfo')
function changeLanguage(lang){
   
    locale.value=lang;
    localStorage.setItem('locale',lang)
    console.log(1)
    console.log(lang)
    
}
const router=useRouter()
const commands={
    toPersonal:()=>{
        router.push('/personal')
    },
    toLogout:()=>{
        logout().then(res=>{
            if(res.code==200){
                store.commit('user/clearToken')
                store.commit('user/clearToken')
                router.push('/login')
            }
        })
    }
}
function handleCommand(command){
    commands[command] && commands[command]()
}
</script>

<style lang="scss">
.header-cont{
    display: flex;
    align-content: center;
    justify-content: space-between;
    padding:0 20px;
    height: 100%;
    background:#000;
    
    a{
        color:inherit;
        text-decoration: none;
    }
    h1{
        margin:0;
        font-size:20px;
    }
    .gap{
        margin-right: 20px;
    }
    .right{
        background:#000;
        .lang{
            font-size:14px;
        }
        .item{
            cursor:pointer;
            &.action{
                font-size:18px;
                font-weight: bold;
            }
        }
    }
   .size{
    width:25px;
   }
   
//    sup{
//     margin-top:6px;
//     margin-left:30px;
//    }
   
   .custom-badge .el-badge__content {
       background-color: #ff0000;
       /* 自定义背景颜色 */
       color: #ffffff;
       /* 自定义文字颜色 */
       border-radius: 50%;
       display: block;
        position: static;
        margin-left: 20px;
        width: 15px;
        height: 7px;
        margin-top:-2.5em;
        padding-top:8px;
      
      
   }
   
}

</style>