<template>
  <el-form
    v-if="schema && schema.properties"
    :inline="true"
    class="schema-search-bar"
  >
    <el-form-item
      v-for="(schemaItem, key) in schema.properties"
      :key="key"
      :label="schemaItem.label"
    >
      <!-- 动态组件 -->
      <component
        :ref="searchComList"
        :is="SearchItemConfig[schemaItem.option?.comType].component"
        :schemaKey="key"
        :schema="schemaItem"
        @loaded="handleChildLoaded"
      ></component>
    </el-form-item>
    <el-form-item>
      <!-- 操作区域 -->
      <el-button type="primary" plain class="search-btn" @click="search"
        >搜索</el-button
      >
      <el-button plain class="reset-btn" @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, toRefs } from "vue";
import SearchItemConfig from "./search-item-config.js";
const props = defineProps({
  schema: Object,
});

const { schema } = toRefs(props);

const emit = defineEmits(["load", "search", "reset"]);

const searchComList = ref([]);

const getValue = () => {
  let dtoObj = {};
  searchComList.value.forEach((component) => {
    dtoObj = {
      ...dtoObj,
      ...component?.getValue(),
    };
  });
  return dtoObj;
};

let childComLoadedCount = 0;
const handleChildLoaded = () => {
  childComLoadedCount++;
  if (childComLoadedCount >= Object.keys(schema?.value?.properties).length) {
    emit("load", getValue());
  }
};

const search = () => {
  
  emit("search", getValue());
};

const reset = () => {
  searchComList.value.forEach((component) => {
    component?.reset();
  });
  emit("reset");
};

defineExpose({
  reset,
  getValue,
});
</script>

<style lang="less">
.schema-search-bar {
  min-width: 500px;

  .select{
    width: 180px;
  }
  .dynamic-select{
    width: 180px;
  }
  .input{
    width: 280px;
  }

  .search-btn {
    width: 100px;
  }

  .reset-btn {
    width: 100px;
  }
}
</style>
