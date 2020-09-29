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
          <el-form-item label="菜单名称" prop="menuName">
            <el-input
              v-model="query_params.menuName"
              placeholder="请输入菜单名称"
              clearable
              :size="size"
              @keyup.enter.native="submit"
            />
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select
              v-model="query_params.status"
              placeholder="菜单状态"
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
        row-key="menuId"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.5)"
      >
        <el-table-column
          prop="menuName"
          label="菜单名称"
          :show-overflow-tooltip="true"
          width="160"
        ></el-table-column>
        <el-table-column prop="icon" label="图标" align="center" width="100">
          <template slot-scope="scope">
            <span class="web_icon" :class="scope.row.icon" />
          </template>
        </el-table-column>
        <el-table-column
          prop="orderNum"
          label="排序"
          align="center"
          width="60"
        ></el-table-column>
        <el-table-column
          prop="perms"
          label="权限标识"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="component"
          label="组件路径"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          align="center"
          width="80"
          :formatter="fn_format__status"
        ></el-table-column>
        <el-table-column label="创建时间" align="center" prop="createTime">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>

        <!-- 默认操作栏 -->
        <el-table-column label="操作" fixed="right" align="center">
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
              v-permission="c__permission.add_btn"
              @click="fn_click__add_dialog(row, $index)"
              >新增</el-button
            >
            <el-button
              type="text"
              size="mini"
              v-permission="c__permission.del_btn"
              @click="fn_click__del(row, $index)"
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
          <el-form-item label="菜单名称" prop="menuName">
            <el-input v-model="form.menuName" placeholder="请输入菜单名称" />
          </el-form-item>

          <el-form-item label="菜单类型" prop="menuType">
            <el-radio-group v-model="form.menuType">
              <el-radio label="M">目录</el-radio>
              <el-radio label="C">菜单</el-radio>
              <el-radio label="F">按钮</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="上级菜单">
            <input-tree
              v-model="form.parentId"
              :options="tableData"
              node-key="menuId"
              size="small"
              :props="{ children: 'children', label: 'menuName' }"
              @change="parentIdChange"
            ></input-tree>
          </el-form-item>

          <el-form-item label="权限标识">
            <el-input
              v-model="form.perms"
              placeholder="请权限标识"
              maxlength="50"
            />
          </el-form-item>

          <el-form-item v-if="form.menuType != 'F'" label="菜单图标">
            <input-icon
              v-model="form.icon"
              placeholder="点击选择图标"
            ></input-icon>
          </el-form-item>

          <el-form-item label="显示排序" prop="orderNum">
            <el-input-number
              v-model="form.orderNum"
              controls-position="right"
              :min="0"
              style="width: 100%"
            />
          </el-form-item>

          <el-form-item
            v-if="form.menuType != 'F'"
            label="路由地址"
            prop="path"
          >
            <el-input v-model="form.path" placeholder="请输入路由地址" />
          </el-form-item>

          <el-form-item
            v-if="form.menuType == 'C'"
            label="组件路径"
            prop="component"
          >
            <el-input v-model="form.component" placeholder="请输入组件路径" />
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
<style lang="scss" scoped>
.web_icon {
  font-size: 24px;
}
</style>
