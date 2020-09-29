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
          <el-form-item label="部门名称">
            <el-input
              v-model="query_params.deptName"
              placeholder="请输入部门名称"
              clearable
              :size="size"
              @keyup.enter.native="submit"
            />
          </el-form-item>
          <el-form-item label="状态">
            <el-select
              v-model="query_params.status"
              placeholder="部门状态"
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
        </template>
      </searchbar>

      <!-- 工具栏  -->
      <toolbar
        :add-row="fn_click__add_dialog"
        :refresh-callback="fn_click__refresh"
      ></toolbar>

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
        <el-table-column prop="deptName" label="部门名称"></el-table-column>
        <el-table-column prop="orderNum" label="排序"></el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          :formatter="fn_format__status"
        ></el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
        ></el-table-column>

        <!-- 默认操作栏 -->
        <el-table-column label="操作" fixed="right" align="center">
          <template #default="{ row }">
            <el-button
              type="text"
              size="mini"
              v-permission="c__permission.edit_btn"
              @click="fn_click__edit_dialog(row)"
              >修改</el-button
            >
            <el-button
              type="text"
              size="mini"
              v-permission="c__permission.add_btn"
              @click="fn_click__add_dialog(row)"
              >新增</el-button
            >
            <el-button
              type="text"
              size="mini"
              v-permission="c__permission.del_btn"
              @click="fn_click__del(row.deptId)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <dialogbar
      v-model="dialog_visible"
      :center="true"
      @close="fn_handle__close"
      width="500px"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-form-item label="部门名称" prop="deptName">
            <el-input v-model="form.deptName" placeholder="请输入部门名称" />
          </el-form-item>
          <el-form-item
            label="上级部门"
            v-if="form.parentId !== 0"
            prop="parentId"
          >
            <input-tree
              v-model="form.parentId"
              :options="tableData"
              node-key="deptId"
              :ancestors="form.ancestors"
              placeholder="选择上级部门"
              :props="{ children: 'children', label: 'deptName' }"
              @change="parentIdChange"
            ></input-tree>
          </el-form-item>
          <el-form-item label="显示排序" prop="orderNum">
            <el-input-number
              v-model="form.orderNum"
              controls-position="right"
              :min="0"
            />
          </el-form-item>
          <el-form-item label="负责人" prop="leader">
            <el-input
              v-model="form.leader"
              placeholder="请输入负责人"
              maxlength="20"
            />
          </el-form-item>
          <el-form-item label="联系电话" prop="phone">
            <el-input
              v-model="form.phone"
              placeholder="请输入联系电话"
              maxlength="11"
            />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="form.email"
              placeholder="请输入邮箱"
              maxlength="50"
            />
          </el-form-item>
          <el-form-item label="部门状态">
            <el-radio-group v-model="form.status">
              <el-radio
                v-for="dict in status_dict"
                :key="dict.value"
                :label="dict.value"
                >{{ dict.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="fn_click__submit_form"
          :loading="submit_loading"
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
