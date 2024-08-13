<script setup lang="ts" name="DontShowHeader">
import {ref} from "vue";

const tableData = ref<Array<any>>([{
  date: '2016-05-02',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1518 弄',
  editFlag: false
}, {
  date: '2016-05-04',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1517 弄',
  editFlag: false
}, {
  date: '2016-05-01',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1519 弄',
  editFlag: false
}, {
  date: '2016-05-03',
  name: '王小虎',
  address: '上海市普陀区金沙江路 1516 弄',
  editFlag: false
}])

const handleEdit = (index: number) => {
  tableData.value[index].editFlag = !tableData.value[index].editFlag;
}

const handleConfirm = (index: number, row: any) => {
  console.log('第' + index + 1 + '行，修改后的值为：' + JSON.stringify(row));
}

const handleCancel = (index: number) => {
  tableData.value[index].editFlag = !tableData.value[index].editFlag;
  // 刷新列表
}
</script>

<template>
  <el-table
      :data="tableData"
      style="width: 100%">
    <el-table-column
        prop="date"
        label="日期"
        width="180">
      <template v-slot="scope">
        <span v-if="!scope.row.editFlag">{{ scope.row.date }}</span>
        <el-input v-if="scope.row.editFlag" v-model="scope.row.date"/>
      </template>
    </el-table-column>
    <el-table-column
        prop="name"
        label="姓名"
        width="180">
      <template v-slot="scope">
        <span v-if="!scope.row.editFlag">{{ scope.row.name }}</span>
        <el-input v-if="scope.row.editFlag" v-model="scope.row.name"/>
      </template>
    </el-table-column>
    <el-table-column
        prop="address"
        label="地址">
      <template v-slot="scope">
        <span v-if="!scope.row.editFlag">{{ scope.row.address }}</span>
        <el-input v-if="scope.row.editFlag" v-model="scope.row.address"/>
      </template>
    </el-table-column>
    <el-table-column>
      <template v-slot="scope">
        <div style="display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 10px">
          <span v-if="!scope.row.editFlag" @click="handleEdit(scope.$index)">编辑</span>
          <span v-if="scope.row.editFlag" @click="handleConfirm(scope.$index, scope.row)">确认</span>
          <span v-if="scope.row.editFlag" @click="handleCancel(scope.$index)">取消</span>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>