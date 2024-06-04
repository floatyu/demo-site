<template>
    <div class="page-container">
        <div class="header">
            <page-header></page-header>
        </div>
            <div class="main">
                <div v-if="showLeft" class="left">
                    <page-siderbar></page-siderbar>
                </div>
                <div class="right">
                    <router-view></router-view>
                </div>
            </div>
        </div>
</template>

<script setup>
import{useRoute} from 'vue-router'
import{computed}from 'vue'
import PageHeader from './components/PageHeader.vue'
import PageSiderbar from './components/PageSiderbar.vue'
const route=useRoute()
const showLeft=computed(()=>{
    const routeName=route.name;
    return !['login','NotFound'].includes(routeName) && !/^Personal/.test(routeName)
})
</script>

<style lang="scss">
html,body{
    padding:0px;
    margin:0px;
    width:100%;
    height: 100%;
    
}
.page-container{
    display: flex;
    flex-direction: column;
    height: 100vh;
    width:100%;
    overflow: hidden;
    padding:0px;
    margin:0px;
    .header{
        width:100%;
        height: 54px;
        background-color: #000;
        color:#fff;
        vertical-align: top;

    }
    .main{
        display: flex;
        flex:1;
        overflow: auto;
        .left {
                height: 100%;
                background-color: #000;
                color: #fff;
                width:200px;
            }
        
            .right {
                flex: 1;
                overflow: hidden;
                background-color: #f5f7f9;
            }
    }
    
    .main-body{
        padding:16px 16px 30px;
        overflow: auto;
        height: 100%;
        box-sizing: border-box;
    }
}

</style>