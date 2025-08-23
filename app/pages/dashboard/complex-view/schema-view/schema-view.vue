<template>
  <el-row class="schema-view">
    <search-panel
      v-if="
        searchSchema?.properties &&
        Object.keys(searchSchema.properties).length > 0
      "
      @search="onSearch"
    ></search-panel>
    <table-panel @operate="onTableOperate"></table-panel>
  </el-row>
</template>

<script setup>
import { provide, ref } from "vue";
import SearchPanel from "./complex-view/search-panel/search-panel.vue";
import TablePanel from "./complex-view/table-panel/table-panel.vue";
import { useSchema } from "./hook/schema.js";

const { api, tableSchema, tableConfig, searchSchema, searchConfig } =
  useSchema();

const apiParmas = ref({});
provide("schemaViewData", {
  api,
  apiParmas,
  tableSchema,
  tableConfig,
  searchSchema,
  searchConfig,
});

const onSearch = (searchValObj) => {
  apiParmas.value = searchValObj;
};

const onTableOperate = (operateObj) => {
  emit("operate", operateObj);
};
</script>
<style lang="less" scoped>
.schema-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
</style>
