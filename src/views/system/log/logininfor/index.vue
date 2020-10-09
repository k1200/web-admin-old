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
          <el-form-item label="登录地址" prop="ipaddr">
            <el-input
              v-model="query_params.ipaddr"
              placeholder="请输入登录地址"
              clearable
              size="small"
              @keyup.enter.native="submit"
            />
          </el-form-item>
          <el-form-item label="用户名称" prop="userName">
            <el-input
              v-model="query_params.userName"
              placeholder="请输入用户名称"
              clearable
              size="small"
              @keyup.enter.native="submit"
            />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select
              v-model="query_params.status"
              placeholder="登录状态"
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
          <el-form-item label="登录时间">
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
        <el-table-column label="访问编号" align="center" prop="infoId" />
        <el-table-column label="用户名称" align="center" prop="userName" />
        <el-table-column
          label="地址"
          align="center"
          prop="ipaddr"
          width="130"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="状态"
          align="center"
          prop="status"
          :formatter="fn_format__status"
        />
        <el-table-column label="描述" align="center" prop="msg" />
        <el-table-column
          label="访问时间"
          align="center"
          prop="accessTime"
          width="165"
        >
        </el-table-column>

        <!-- 默认操作栏 -->
        <el-table-column label="操作" fixed="right" align="center">
          <template #default="{ row }">
            <el-button
              type="text"
              size="mini"
              v-permission="c__permission.del_btn"
              @click="fn_click__del(row.infoId)"
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
  </div>
</template>

<script>
import conf from './conf';
export default conf;
</script>
