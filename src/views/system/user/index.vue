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
          <el-form-item label="部门" prop="deptId">
            <input-tree
              v-model="query_params.deptId"
              :options="dept_dict"
              node-key="id"
              :size="size"
              placeholder="请选择部门"
            >
            </input-tree>
          </el-form-item>
          <el-form-item label="用户名称" prop="userName">
            <el-input
              v-model="query_params.userName"
              placeholder="请输入用户名称"
              clearable
              :size="size"
              @keyup.enter.native="submit"
            />
          </el-form-item>
          <el-form-item label="手机号码" prop="phonenumber">
            <el-input
              v-model="query_params.phonenumber"
              placeholder="请输入手机号码"
              clearable
              :size="size"
              @keyup.enter.native="submit"
            />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select
              v-model="query_params.status"
              placeholder="用户状态"
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
          <el-form-item label="创建时间">
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

        <el-table-column label="用户编号" align="center" prop="userId" />
        <el-table-column
          label="用户名称"
          align="center"
          prop="userName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="用户昵称"
          align="center"
          prop="nickName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="部门"
          align="center"
          prop="dept.deptName"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          label="手机号码"
          align="center"
          prop="phonenumber"
          width="120"
        />
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-value="0"
              inactive-value="1"
              @change="fn_change__status(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
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
              @click="fn_click__del(row.userId)"
              >删除</el-button
            >
            <el-button
              type="text"
              size="mini"
              v-permission="c__permission.password_btn"
              @click="fn_click__reset_password(row, $index)"
              >密码重置</el-button
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
      <el-form ref="user_form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户昵称" prop="nickName">
          <el-input v-model="form.nickName" placeholder="请输入用户昵称" />
        </el-form-item>
        <el-form-item label="归属部门" prop="deptId">
          <!-- <treeselect
                v-model="form.deptId"
                :options="deptOptions"
                :disable-branch-nodes="true"
                :show-count="true"
                placeholder="请选择归属部门"
              /> -->
          <input-tree
            v-model="form.deptId"
            :options="dept_dict"
            node-key="id"
            placeholder="请选择归属部门"
          >
          </input-tree>
        </el-form-item>
        <el-form-item label="手机号码" prop="phonenumber">
          <el-input
            v-model="form.phonenumber"
            placeholder="请输入手机号码"
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
        <el-form-item
          v-if="form.userId == undefined"
          label="用户名称"
          prop="userName"
        >
          <el-input v-model="form.userName" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item
          v-if="form.userId == undefined"
          label="用户密码"
          prop="password"
        >
          <el-input
            v-model="form.password"
            placeholder="请输入用户密码"
            type="password"
          />
        </el-form-item>
        <el-form-item label="用户性别">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option
              v-for="dict in sex_dict"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in status_dict"
              :key="dict.value"
              :label="dict.value"
              >{{ dict.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="岗位">
          <el-select v-model="form.postIds" multiple placeholder="请选择">
            <el-option
              v-for="item in post_dict"
              :key="item.postId"
              :label="item.postName"
              :value="item.postId"
              :disabled="item.status == 1"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.roleIds" multiple placeholder="请选择">
            <el-option
              v-for="item in role_dict"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
              :disabled="item.status == 1"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
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
