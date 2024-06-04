<template>
    <div class="main-body">
        <!---工具栏-->
        <div class="toolbar">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.title" :placeholder="t('thead.title')"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                    icon="search"
                    type="primary"
                    @click="findPage"
                    >{{ t('action.add') }}</el-button>
                </el-form-item>
            </el-form>
        </div>
    <!--表格栏内容-->
    <cm-table
    ref="tableRef"
    :getPage="listPage"
    :filters="filters"
    :columns="columns"
    @handleEdit="handleEdit"
    :operations="operations"
    @handleDelete="handleDelete"
    ></cm-table>
    </div>
</template>

<script setup>
import { listPage } from '../../apis/logs-visit';
import CmTable from '../../layout/components/CmTable.vue';
import { useI18n } from 'vue-i18n';
import{ref,reactive,computed} from 'vue'
const {t} =useI18n()
const tableRef =ref()
const filters=reactive({
    title:''
})
const columns=computed(()=>[
    { type: 'selection' },
    {prop:'id', label: t("thead.ID"),minWidth:50},
    { prop: "title", label: t('thead.title'), minWidth: 120, showOverflowTooltip: true },
    {prop: "content", label: t('thead.content'), minWidth: 120 ,showOverflowTooltip:true},
    { prop: "publishTime", label: t('thead.publishTime'), minWidth: 120 },
    { prop: "createdTime", label: t('thead.createdTime'), minWidth: 120 },
    { prop: "createdBy", label: t('thead.createdBy'), minWidth: 120 },
])
const operation=[
    {type:'edit',
    disabled: (row) =>!!row.publishTime
    },
    {type:'delete'}
    
]
//获取分页数据
function findPage(){
    tableRef.value.reload()
}
function handleEdit(row){
    console.log('edit',row)
}
function handleDelete(ids,callback){
    console.log('delete',ids,callback)
}
</script>

<style lang="scss">
.btn_search {
    text-align: left;
    background-color: beige;
    border: 1px solid;
    margin-left: -800px;
    margin-top: -30px;

}

.el-input__wrapper {
    text-align: left;
}

.span {
    color: black !important;

}
</style>