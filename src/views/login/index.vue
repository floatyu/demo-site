<template>
    <div class="page flex-center">
        <div class="sign-box">
            <el-form ref="formRef" :model="form" :rules="rules" label-width:86px>
                <h3 class="title">登录</h3>
                <el-form-item prop="account" >用户名：
                    <el-input v-model="form.account"></el-input>
                </el-form-item>
                <el-form-item prop="password" >密码：
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="loading" class="w100p" @click="doLogin">登录</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script setup>
// import { User } from '@element-plus/icons-vue'
import{computed, ref,reactive} from 'vue'
import{useStore} from 'vuex'
import {login} from '../../apis/login' 
import { useRouter } from 'vue-router'

const router=useRouter()
const formRef=ref()
const form=reactive({
    account:'',
    password:''
})
const rules=computed(()=>{
    return {
        account:[
            {
                required: true,
                trigger: ['change', 'blur']
            },
            {
                // pattern:/^[a-zA-Z][a-zA-Z0-9_-]{3,31}$/,
                trigger:["change","blur"]
            }
        ],
        password:[
            {
                required: true,
                trigger: ['change', 'blur'],
                // min:4,

            },
        ]

    }
})
const loading=ref(false)
const store= useStore()
function doLogin() {
    formRef.value.validate((valid) => {
        if (!valid) {
            return;
        }
        loading.value = true;
        login(form).then((res) => {
            const token = res.data.token
            store.commit('user/setToken', token);
            store.dispatch('user/refreshInfo')
            store.commit("setRouteLoaded",false)
            router.push('/app');
        }).finally(() => {
            loading.value = false;
        });
    });
    
    
    
}


</script>

<style lang="scss">
.page{
    height: 100%;
    background:url(../../assets/bg.jfif);
    background-size:cover;
}
.sign-box{
    width:250px;
    height: 250px;
   
    margin:auto;
    background:#fff;
    padding:30px 50px 20px 30px;
    border-radius:4px;
    box-shadow: 0 0 10px #022c44;
}
.title{
    text-align: center;
    font-size:20px;
    line-height: 30px;
    margin-top:0;
    margin-bottom:10px;
    color:#000;
}

</style>