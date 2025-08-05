<template>
    <h1>page1</h1>
    <el-input v-model="content" style="width: 300px"/>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column
                prop="name"
                label="name"
                width="180">
        </el-table-column>
        <el-table-column
                prop="desc"
                label="desc">
        </el-table-column>
    </el-table>
    <div>{{ content }}</div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import $curl from '$common/curl'

const content = ref('')
const tableData = ref()

onMounted(async () => {
    const res = await $curl({
        url: '/api/project/list',
        method: 'get',
        query: {
            proj_key: 'aaa'
        }
    })
    tableData.value = res.data
})


console.log('page1 init')
</script>

<style lang="less" scoped>
h1 {
  color: red;
}

</style>