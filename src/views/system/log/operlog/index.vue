<template>
  <div class="app-container">
    <el-row class="app_tabel" style="padding: 12px 0">
      <!-- 搜索栏  -->
      <searchbar
        :query-form="query_params"
        :fn-get-list="fn_handle__query_list"
        :fn-reset-form="fn_click__reset_search"
      >
        <template #default="{submit}">
          <el-form-item label="系统模块" prop="title">
            <el-input
              v-model="query_params.title"
              placeholder="请输入系统模块"
              clearable
              size="small"
              @keyup.enter.native="submit"
            />
          </el-form-item>
          <el-form-item label="操作人员" prop="operName">
            <el-input
              v-model="query_params.operName"
              placeholder="请输入操作人员"
              clearable
              size="small"
              @keyup.enter.native="submit"
            />
          </el-form-item>
          <el-form-item label="类型" prop="businessType">
            <el-select
              v-model="query_params.businessType"
              placeholder="操作类型"
              clearable
              size="small"
            >
              <el-option
                v-for="dict in type_dict"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select
              v-model="query_params.status"
              placeholder="操作状态"
              clearable
              size="small"
            >
              <el-option
                v-for="dict in status_dict"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="操作时间">
            <el-date-picker
              v-model="query_params.dateRange"
              size="small"
              style="width: 240px"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </template>
      </searchbar>

      <checkboxbar
        :selected="c__selection"
        :fn-clear-selection="fn_click__clear_selection"
      >
        <el-button type="text" size="mini" @click="fn_click__del(c__selection)"
          >批量删除</el-button
        >
        <el-button type="text" size="mini" @click="fn_click__clearn"
          >清空数据</el-button
        >
      </checkboxbar>

      <!-- 表格主体 -->
      <el-table
        ref="table"
        :data="tableData"
        style="width: 100%"
        border
        align="center"
        row-key="deptId"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.5)"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="日志编号" align="center" prop="operId" />
        <el-table-column label="系统模块" align="center" prop="title" />
        <el-table-column
          label="操作类型"
          align="center"
          prop="businessType"
          :formatter="fn_format__type"
        />
        <el-table-column label="请求方式" align="center" prop="requestMethod" />
        <el-table-column label="操作人员" align="center" prop="operName" />
        <el-table-column
          label="主机"
          align="center"
          prop="operIp"
          width="130"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="操作状态"
          align="center"
          prop="status"
          :formatter="fn_format__status"
        />
        <el-table-column
          label="操作日期"
          align="center"
          prop="operTime"
          width="165"
        >
        </el-table-column>

        <!-- 默认操作栏 -->
        <el-table-column label="操作" fixed="right" align="center">
          <template #default="{ row }">
            <el-button
              type="text"
              size="mini"
              v-permission="c__permission.view_btn"
              @click="fn_click__view_dialog(row)"
              >详细</el-button
            >
            <el-button
              type="text"
              size="mini"
              v-permission="c__permission.del_btn"
              @click="fn_click__del(row.operId)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页栏 -->
      <pagesbar
        :page="page"
        @size-change="fn_change__size"
        @current-change="fn_change__current"
      ></pagesbar>
    </el-row>
    <dialogbar
      v-model="dialog_visible"
      :center="true"
      @close="fn_handle__close"
      width="500px"
    >
      <el-form ref="form" class="oper_log" :model="form" label-width="100px">
        <el-row>
          <el-form-item label="操作模块："
            >{{ form.title }} / {{ fn_format__type(form) }}</el-form-item
          >
          <el-form-item label="登录信息："
            >{{ form.operName }} / {{ form.operIp }}</el-form-item
          >
          <el-form-item label="请求地址：">{{ form.operUrl }}</el-form-item>
          <el-form-item label="请求方式：">{{
            form.requestMethod
          }}</el-form-item>
          <el-form-item label="操作方法：">{{ form.method }}</el-form-item>
          <el-form-item label="请求参数：">{{ form.operParam }}</el-form-item>
          <el-form-item label="返回参数：">{{ form.jsonResult }}</el-form-item>
          <el-form-item label="操作状态：">
            <div v-if="form.status === 0">正常</div>
            <div v-else-if="form.status === 1">失败</div>
          </el-form-item>
          <el-form-item label="操作时间：">{{ form.operTime }}</el-form-item>
          <el-form-item label="异常信息：" v-if="form.status === 1">{{
            form.errorMsg
          }}</el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="fn_click__cancel_form">关 闭</el-button>
      </div>
    </dialogbar>
  </div>
</template>

<script>
import conf from './conf';
export default conf;
</script>
<style lang="scss" scoped>
.oper_log .el-form-item:not(:last-child) {
  margin: 0;
}
</style>
