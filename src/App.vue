

<template>
    <div id="app">
    <el-config-provider :locale="zhCn">
    <router-view></router-view>
</el-config-provider>
    </div>

</template>
<script setup>

</script>
<style lang="scss">
html,body{
    height: 100%;
    width:100%;
    padding:0px;
    margin:0px;
    
}
#app{
    height: 100%;
    overflow: hidden;
    margin:0px;
    text-align: center;
    padding:0px;
    width:100%;
    max-width:none;
   
}
.flex-center{
    display: flex;
    align-items: flex;
    justify-content: right;
    background-color:#000;
}
.cursor{
    cursor:pointer;
}
.txt-c{
    text-align:center
}
.w100p{
    width:100%
}
</style>
