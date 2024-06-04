<template>
    <div class="cm-table" v-loading="loading">
        <el-table :data="data.content" v-bind="$attrs" @selectionChange="selectionChange" class="cm-table-tb">
            <el-table-column v-if="showPagination" fixed="right" :label="t('action.operation')"
                v-for="column in columns" :key="column.prop" v-bind="column">
                <template #default="{row}">
                    <template v-for="(opr,i) in operations" :key="i">
                        <template v-if="isShallow(opr.show,row)">
                            <el-button v-if="opr.type==='edit'" type="text" :disabled="isDisabled(opr.disabled,row)"
                                @click="handleEdit(row)">
                                {{ t('action.edit') }}</el-button>
                            <el-button v-else-if="opr.type==='delete'" type="text" class="danger"
                                :disabled="isDisabled(opr.disabled, row) " @click="handleDelete(row)">{{
                                t('action.delete') }}</el-button>
                            <el-button v-else type="text" :disabled="isDisabled(opr.disabled,row)"
                                @click="opr.onClick(row)">{{opr.label }}</el-button>
                        </template>
                    </template>
                </template>
            </el-table-column>
        </el-table>
        <div class="cm-table-toolbar">
            <el-button type="danger" v-if="showBatchDelete" :disabled="selections.length===0"
                @click="handleBatchDelete">
                <div class="span"> {{ t('action.batchDelete') }}</div>
            </el-button>
            <el-pagination v-if="showPagination" :v-model:currentPage="pageRequest.pageNum"
                :v-model:page-size="pageRequest.pageSize" :page-size="[10,20,50,100,200]"
                layout="total,sizes,prev,pager,next,jumper" @size-change="handleSizeChange"
                @current-change="handlePageChange" :total="data.totalSize ||0"
                class="cm-table-pagination "></el-pagination>
        </div>

    </div>
</template>

<script setup>
    import { ElMessage, ElMessageBox } from 'element-plus';
import { isShallow } from 'vue';
import{reactive, ref} from 'vue'
    import{useI18n} from "vue-i18n"

    const props=defineProps({
        // 获取表格分页数据的方法
        getPage:Function, 
        filters:Object,
        showPagination:{
            type:Boolean,
            default:true
        },
        showOperation:{
            type:Boolean,
            default:true,
        },
        columns:Array,   //表格配置项
        operations:{
            type:Array,
            default:()=>{
                return[
                    {
                        type:'edit'
                    },
                    {
                        type:'delete'
                    }
                ]
            }
        },
        oprWidth:{
            type:Number,
            default:185
        },
        showBatchDelete:{
            type:Boolean,
            default:true,
        },
    })
    const emit=defineEmits(['handleEdit','handleDelete'])
    const{t}=useI18n()
    const loading=ref(false)
    const pageRequest= reactive({
        pageNum:1,
        pageSize:10,
    })
    const data=ref({})
    //分页查询
    function findPage(){
        if(!props.getPage){
            return
        }
        loading.value=true;
        const req = props.getPage({ ...pageRequest, ...(props.filters || {}),sortby:props.sortby})
        if(Object(req).constructor===Promise){
            req.then(res=>{
                if(res.data instanceof Array){
                    data.value = {
                        content: res.data,
                    totalSize: res.data.length
                    }
                
                }else{
                    data.value=res.data
                }
            }).catch(()=>{
                data.value={}
            }).finally(()=>{
                loading.value=false
            })
        }

    }
    function reload(){
        handlePageChange(1)
    }
    function handleSizeChange(pageSize){
        pageRequest.pageSize=pageSize
        pageRequest.pageNum=1
        findPage()
    }
    //换页刷新
    function handlePageChange(pageNum){
        pageRequest.pageNum=pageNum
        findPage()
    }
    reload()
    defineExpose({
        refresh:findPage,
        reload
    })
    function isShow(showFn,row){
        if(showFn && typeof showFn=== 'function'){
            return showFn(row)
        }
        return true
    }
    function isDisabled(disabledFn,row){
        if(disabledFn && typeof disabledFn==='function'){
            return disabledFn(row)
        }
        return false
    }
    //编辑
    function handleEdit(row){
        emit('handleEdit',row)
        console.log(row)
    }
    //删除
    function handleDelete(row){
        onDelete(row.id)
        console.log(row)
    }
    const selections=ref([])
function selectionChange(selections){
    selections.value = selections
    }
 //批量删除
 function handleBatchDelete(){
    let ids=selections.value.map((item)=>item.id).toString()
    onDelete(ids)
 }
 //删除操作
 function onDelete(ids){
    ElMessageBox.confirm($t('tips.deleteConfirm'),$t('tips.deleteTitle'),{
        confirmButtonText:t('action.confirm'),
        cancelButtonText:t('action.cancel'),
        type:"warning",
        draggable:true}).then(()=>{
            const callback=()=>{
                ElMessage({message:$t('tips.success'),type:"success"})
                reload()
            }
            emit('handleDelete',ids,callback)
        }).catch(()=>{})
 }
</script>

<style  lang="scss">
.cm-table-tb{
border:1px solid #eee;
border-bottom:none;
width:100%;
background-color:red;
}
.cm-table-toolbar{
    background-color:aqua;
    text-align: left;
   
    
}
.cm-table-pagination{
    background-color:green;
    display: flex;
    margin-left:500px;
    margin-top:-50px;
}
.el-pagination__total{
    margin-right: 20px;
}
.btn-prev{
    height: 40px;
    margin-right: 5px;
    margin-left: 5px;

}
.btn-next{
    height: 40px;
    margin-right: 5px;
}
.el-select__input{
    height: 40px;
    width:40px;
    margin-right: 5px;
}
.el-pager{
    display: flex;
    margin-right: 5px;
    vertical-align: top;
    margin-top:-5px;
}
.el-select__selected-item{
    width:40px;
}
.el-pagination__goto{
    margin-left: 20px;
}
.el-input__inner{
    margin-left: 80px;
    margin-top:-30px;
}
.danger{
    color:var(--el-color-danger) !important;
    background-color:blue;
}
.span{
    color:black;
}
.el-pagination__jump{
    width:70px;
}

</style>