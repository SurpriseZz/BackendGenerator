<template>
  <el-row v-if="schema && schema.properties" class="schema-form">
    <template v-for="(itemSchema,key) in schema.properties" >
      <component
        ref="formComList"
        v-show="itemSchema.option?.visible !== false"
        :is="FormItemConfig[itemSchema.option?.comType]?.component"
        :schemaKey="key"
        :schema="itemSchema"
        :model="model ? model[key] : undefined"
      ></component>
    </template>
  </el-row>
</template>

<script setup>
import { ref, toRefs, provide } from "vue";
import FormItemConfig from "./form-item-config.js";
const Ajv = require("ajv");
const ajv = new Ajv();
provide("ajv", ajv);

const props = defineProps({
  schema: Object,
  model: Object,
});

const { schema } = toRefs(props);

const formComList = ref([]);

// 表单校验
const validate = () => {
  return formComList.value.every((component) => component.validate());
};

// 获取表单值
const getValue = () => {
  return formComList.value.reduce((dtoObj, component) => {
    return { ...dtoObj, ...component.getValue() };
  }, {});
};

defineExpose({
  validate,
  getValue,
});
</script>

<style lang="less">
.schema-form {
  .form-item {
    margin-bottom: 20px;
    min-width: 500px;
    .item-label {
      margin-right: 15px;
      min-width: 70px;
      text-align: right;
      font-size: 14px;
      color: #fff;
      word-break: break-all;
      .required {
        top: 2px;
        padding-left: 4px;
        color: #f56c6c;
        font-size: 20px;
      }
    }
    .item-value {
      .component {
        width: 320px;
      }
      .valid-border {
        .el-input__wrapper {
          border: 1px solid #f93f3f;
          box-shadow: 0 0 0 0;
        }
        .el-select_wrapper {
          border: 1px solid #f93f3f;
          box-shadow: 0 0 0 0;
        }
      }
    }
    .valid-tips {
        margin-left: 10px;
        height: 36px;
        line-height: 36px;
        overflow: hidden;
        font-size: 12px;
        color: #f93f3f;
    }
  }
}
</style>
