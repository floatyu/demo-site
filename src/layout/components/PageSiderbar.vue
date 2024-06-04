<template>
    <div class="page-sidebar">
        <div class="collapse-bar">
            <el-icon class="cursor" @click="isCollapse=!isCollapse">
                <Expand v-if="'isCollapse'"></Expand>
                <fold v-else></fold>
            </el-icon>
        </div>
        <el-menu :default-active="defaultActive" router class="sideMenu" :collapse="isCollapse">
            <el-sub-menu v-for="(item,i) in treeData" :key="i" :index="item.path">
                <template #title>
                    <el-icon v-if='item.icon'>
                        <component :is="item.icon"></component>
                    </el-icon>
                    <span>{{ $t(`menu.${ item.name }`)}}</span>
                </template>
                <template v-for="(child,ci) in item.children" :key="ci">
                    <el-menu-item :index="child.path">
                        <el-icon>
                            <component :is="child.icon"></component>
                        </el-icon>
                        <span class="p-bg">{{ $t(`menu.${child.name}`) }}</span>
                    </el-menu-item>
                </template>
            </el-sub-menu>
        </el-menu>

    </div>

</template>

<script setup>
import { menuTreeData } from '../../mock/data'
import{computed,ref} from 'vue'
import{useRoute}from 'vue-router'
import {useStore}from 'vuex'
import { useI18n } from 'vue-i18n'
import { Expand } from "@element-plus/icons-vue"
import {Fold } from "@element-plus/icons-vue"
const route =useRoute()
const store=useStore()
const t =useI18n()
const treeData=computed(()=>store.state.menuTree)
const defaultActive=computed(()=>route.path || treeData.value[0].path)
const isCollapse=ref(false)
</script>

<style lang="scss">
svg {
    width: 15px;
    height: 15px;
    vertical-align: middle;
    margin-right: 5px;
}
li{
    list-style-type: none;
    line-height: 40px;
   
   
}

.el-menu-item{
    color:#CCC;
    &:hover{
        background-color:#060251;
    }
        margin-left: -30px;
    
}

span{
color: #CCC;

}
.collapse-bar{
    color:#fff;
    font-size:16px;
    line-height: 36px;
    text-align: center;
    .el-icon{
        cursor:pointer;
    }
}
.el-sub-menu__title{
    margin-left:-30px;
}

</style>
