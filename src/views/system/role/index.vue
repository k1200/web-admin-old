<template>
  <div class="app-container">
    <el-row class="app_tabel" style="padding: 12px 0">
      <searchbar
        :query-form="query_params"
        :fn-get-list="fn_handle__query_list"
        :fn-reset-form="fn_click__reset_search"
      >
        <template #default="{submit}">
          <el-form-item label="角色名称">
            <el-input
              v-model="query_params.roleName"
              placeholder="请输入角色名称"
              clearable
              size="small"
              @keyup.enter.native="submit"
            />
          </el-form-item>
          <el-form-item label="权限字符">
            <el-input
              v-model="query_params.roleKey"
              placeholder="请输入权限字符"
              clearable
              size="small"
              @keyup.enter.native="submit"
            />
          </el-form-item>
          <el-form-item label="状态">
            <el-select
              v-model="query_params.status"
              placeholder="角色状态"
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
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="query_params.dateRange"
              size="small"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </template>
      </searchbar>

      <toolbar
        :add-row="fn_click__add_dialog"
        :refresh-callback="fn_click__refresh"
      ></toolbar>

      <checkboxbar
        :selected="c__selection"
        :fn-clear-selection="fn_click__clear_selection"
      >
        <el-button type="text" size="mini" @click="fn_click__del(c__selection)"
          >批量删除</el-button
        >
      </checkboxbar>

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

        <el-table-column label="角色编号" prop="roleId" width="120" />
        <el-table-column
          label="角色名称"
          prop="roleName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="权限字符"
          prop="roleKey"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="显示顺序" prop="roleSort" width="100" />
        <el-table-column
          label="状态"
          align="center"
          prop="status"
          :formatter="fn_formatter__status"
        />
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          width="165"
        >
        </el-table-column>

        <!-- 默认操作栏 -->
        <el-table-column label="操作" fixed="right" align="center" width="145">
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
              v-permission="c__permission.edit_btn"
              @click="fn_click__data_dialog(row, $index)"
              >数据权限</el-button
            >
            <el-button
              type="text"
              size="mini"
              v-permission="c__permission.del_btn"
              @click="fn_click__del(row.roleId)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

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
    >
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <template v-if="active_form === 'role'">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="form.roleName" placeholder="请输入角色名称" />
          </el-form-item>
          <el-form-item label="权限字符" prop="roleKey">
            <el-input v-model="form.roleKey" placeholder="请输入权限字符" />
          </el-form-item>
          <el-form-item label="角色顺序" prop="roleSort">
            <el-input-number
              v-model="form.roleSort"
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
          <el-form-item label="菜单权限">
            <el-tree
              :data="menu_tree"
              show-checkbox
              ref="menu"
              node-key="id"
              empty-text="加载中，请稍后"
            ></el-tree>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input
              v-model="form.remark"
              type="textarea"
              placeholder="请输入内容"
            />
          </el-form-item>
        </template>

        <template v-else-if="active_form === 'role_data_scope'">
          <el-form-item label="角色名称">
            <el-input v-model="form.roleName" :disabled="true" />
          </el-form-item>
          <el-form-item label="权限字符">
            <el-input v-model="form.roleKey" :disabled="true" />
          </el-form-item>
          <el-form-item label="权限范围">
            <el-select v-model="form.dataScope">
              <el-option
                v-for="item in data_scope_dict"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据权限" v-show="form.dataScope === '2'">
            <el-tree
              :data="dept_tree"
              show-checkbox
              default-expand-all
              ref="dept"
              node-key="id"
              empty-text="加载中，请稍后"
            ></el-tree>
          </el-form-item>
        </template>
        <el-form-item>
          <el-button
            type="primary"
            @click="fn_click__submit_form"
            :loading="submit_loading"
            >确定</el-button
          >
          <el-button @click="fn_click__cancel_form">取消</el-button>
        </el-form-item>
      </el-form>
    </dialogbar>
  </div>
</template>

<script>
import conf from './conf';
export default conf;
</script>
