<template>
  <div class="schema-table">
    <el-table
      v-if="schema && schema.properties"
      v-loading="loading"
      :data="tableData"
      class="table"
    >
      <template v-for="(schemaItem, key) in schema.properties">
        <el-table-column
          v-if="schemaItem.option.visible !== false"
          :key="key"
          :prop="key"
          :label="schemaItem.label"
          v-bind="schemaItem.option"
        ></el-table-column>
      </template>
      <el-table-column
        v-if="buttons?.length > 0"
        label="操作"
        fixed="right"
        :width="operationWidth"
      >
        <template #default="scope">
          <el-button
            v-for="item in buttons"
            link
            v-bind="item"
            @click="
              operationHandler({
                btnConfig: item,
                rowData: scope.row,
              })
            "
          >
            {{ item.label }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row justify="end" class="pagination">
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[10, 20, 50, 100, 200]"
        :total="total"
        layout="total,sizes,prev,pager,next,jumper"
        @size-change="onPageSizeChange"
        @current-change="onCurrentPageChange"
      />
    </el-row>
  </div>
</template>

<script setup>
import { toRefs, ref, computed, watch, nextTick, onMounted } from "vue";
import $curl from "$elpisCommon/curl.js";
const props = defineProps({
  /**
   * schema 配置
   */
  schema: Object,
  /**
   * 表格数据源 api
   */
  api: String,

  /**
   * api请求参数，请求api时携带
   */
  apiParmas: Object,
  /**
   * buttons 操作相关按钮配置
   */
  buttons: Array,
});

const emit = defineEmits(["operate"]);

const operationWidth = computed(() => {
  return buttons?.value?.length > 0
    ? buttons.value.reduce((pre, cur) => {
        return pre + cur.label.length * 18;
      }, 50)
    : 50;
});

const { schema, api, apiParmas, buttons } = toRefs(props);
const loading = ref(false);
const tableData = ref([]);
const currentPage = ref(1);
const pageSize = ref(50);
const total = ref(0);

onMounted(() => {
  initData();
});

watch(
  [schema, api, apiParmas],
  () => {
    initData();
  },
  { deep: true }
);

const initData = () => {
  currentPage.value = 1;
  pageSize.value = 50;
  nextTick(async () => {
    await loadTableData();
  });
};

let timerId = null;
const loadTableData = async () => {
  clearTimeout(timerId);
  timerId = setTimeout(async () => {
    await fetchTableData();
    timerId = null; // 加载完成后，将 timerId 设为 null 垃圾回收
  }, 100);
};

const fetchTableData = async () => {
  if (!api.value) {
    return;
  }
  showLoading();
  const res = await $curl({
    url: `${api.value}/list`,
    method: "GET",
    query: {
      ...apiParmas.value,
      page: currentPage.value,
      pageSize: pageSize.value,
    },
  });

  hideLoading();

  if (!res || !res.success || !Array.isArray(res.data)) {
    tableData.value = [];
    total.value = 0;
    return;
  }

  tableData.value = buildTableData(res.data);
  total.value = res.metadata.total;
};
/**
 * 对后端返回数据进行渲染前的预处理
 * @param ListData
 */
const buildTableData = (ListData) => {
  if (!schema.value?.properties) {
    return ListData;
  }

  return ListData.map((rowData) => {
    for (const dKey in rowData) {
      const schemaItem = schema.value.properties[dKey];
      if (schemaItem?.option?.toFixed) {
        rowData[dKey] = rowData[dKey].toFixed(schemaItem.option.toFixed);
      }
    }
    return rowData;
  });
};

const showLoading = () => {
  loading.value = true;
};

const hideLoading = () => {
  loading.value = false;
};

const operationHandler = ({ btnConfig, rowData }) => {
  emit("operate", { btnConfig, rowData });
};

const onPageSizeChange = async (val) => {
  pageSize.value = val;
  await loadTableData();
};

const onCurrentPageChange = async (val) => {
  currentPage.value = val;
  await loadTableData();
};

defineExpose({
  initData,
  loadTableData,
  showLoading,
  hideLoading,
});
</script>

<style lang="less" scoped>
.schema-table {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;

  .table {
    flex: 1;
  }

  .pagination {
    margin: 10px 0;
    text-align: right;
  }
}
</style>
