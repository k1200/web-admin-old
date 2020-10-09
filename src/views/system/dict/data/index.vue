<template>
  <div class="app-container">
    <el-row class="app_tabel" style="padding: 12px 0">
      <!-- 搜索栏 -->
      <searchbar
        :query-form="query_params"
        :fn-get-list="fn_handle__query_list"
        :fn-reset-form="fn_click__reset_search"
      >
        <template #default="{submit}">
          <el-form-item label="字典名称" prop="dictType">
            <el-select v-model="query_params.dictType" size="small">
              <el-option
                v-for="item in type_dict"
                :key="item.dictId"
                :label="item.dictName"
                :value="item.dictType"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="字典标签" prop="dictLabel">
            <el-input
              v-model="query_params.dictLabel"
              placeholder="请输入字典标签"
              clearable
              size="small"
              @keyup.enter.native="submit"
            />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select
              v-model="query_params.status"
              placeholder="字典状态"
              clearable
              size="small"
              style="width: 240px"
            >
              <el-option
                v-for="dict in status_dict"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              />
            </el-select>
          </el-form-item>
        </template>
      </searchbar>

      <!-- 工具栏 -->
      <toolbar
        :add-row="fn_click__add_dialog"
        :refresh-callback="fn_click__refresh"
      ></toolbar>

      <!-- 多选表格操作栏 -->
      <checkboxbar
        :selected="c__selection"
        :fn-clear-selection="fn_click__clear_selection"
      >
        <el-button type="text" size="mini" @click="fn_click__del(c__selection)"
          >批量删除</el-button
        >
      </checkboxbar>

      <!-- 表格主体  -->
      <el-table
        ref="table"
        :data="tableData"
        style="width: 100%"
        border
        align="center"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.5)"
      >
        <!-- 默认多选框 -->
        <el-table-column type="selection" width="55" fixed align="center">
        </el-table-column>

        <el-table-column label="字典编码" align="center" prop="dictCode" />
        <el-table-column label="字典标签" align="center" prop="dictLabel" />
        <el-table-column label="字典键值" align="center" prop="dictValue" />
        <el-table-column label="字典排序" align="center" prop="dictSort" />
        <el-table-column
          label="状态"
          align="center"
          prop="status"
          :formatter="fn_formatter__status"
        />
        <el-table-column
          label="备注"
          align="center"
          prop="remark"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          width="165"
        />

        <!-- 默认操作栏 -->
        <el-table-column label="操作" fixed="right" align="center" width="100">
          <template #default="{ row, $index }">
            <el-button
              type="text"
              size="mini"
              v-permission="c__permission.edit_btn"
              @click="fn_click__edit_dialog(row, $index)"
              >修改</el-button
            >
            <el-button
              type="text"
              size="mini"
              v-permission="c__permission.del_btn"
              @click="fn_click__del(row.dictCode)"
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
    <!-- 新增/修改弹窗 -->
    <dialogbar
      v-model="dialog_visible"
      :center="true"
      @close="fn_handle__close"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="字典类型">
          <el-input v-model="form.dictType" disabled />
        </el-form-item>
        <el-form-item label="数据标签" prop="dictLabel">
          <el-input v-model="form.dictLabel" placeholder="请输入数据标签" />
        </el-form-item>
        <el-form-item label="数据键值" prop="dictValue">
          <el-input v-model="form.dictValue" placeholder="请输入数据键值" />
        </el-form-item>
        <el-form-item label="显示排序" prop="dictSort">
          <el-input-number
            v-model="form.dictSort"
            controls-position="right"
            :min="0"
          />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in status_dict"
              :key="dict.value"
              :label="dict.value"
              >{{ dict.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="fn_click__submit_form"
          >确 定</el-button
        >
        <el-button @click="fn_click__cancel_form">取 消</el-button>
      </div>
    </dialogbar>
  </div>
</template>

<script>
import conf from './conf';
export default conf;
</script>
