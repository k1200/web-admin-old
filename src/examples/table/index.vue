<template>
  <div class="app-container">
    <el-row class="app_tabel" style="padding: 12px 0">
      <!-- 搜索栏 （表格需要根据条件筛选数据时需要）
      props: {
        // 需要筛选的条件
        queryForm： {required: true, type: Object }
        // 按钮尺寸
        size: { type: String, default: 'small' }, 
        // 行内表单模式
        inline: { type: Boolean, default: true },
        // 默认搜索按钮回调 获取列表数据
        getList: { required: true, type: Function },
        // 默认重置按钮回调
        resetForm: { required: true, type: Function }
      } 
      ——+——+——+——+——+——+——+——+————+——+——+——+——+——+——+——+——+——+——+——+——+——+——
      ——+——+——+——+——+——+——+——+————+——+——+——+——+——+——+——+——+——+——+——+——+——+——
      作用域slot 插槽 参数 submit()
        #default 默认插槽 自定义搜索条件
        #search_btn 搜索按钮插槽 自定义搜索按钮
      methods 方法
        handleQuery 搜索
        resetQuery 重置
    -->
      <searchbar
        :query-form="query_params"
        :fn-get-list="fn_handle__query_list"
        :fn-reset-form="fn_click__reset_search"
      >
        <template #default="{submit}">
          <!-- 普通文本输入 -->
          <el-form-item label="普通文本">
            <el-input
              v-model="query_params.text"
              placeholder="请输入普通文本"
              clearable
              :size="size"
              @keyup.enter.native="submit"
            />
          </el-form-item>
          <!-- 日期范围选择 -->
          <el-form-item label="日期范围">
            <el-date-picker
              v-model="query_params.daterange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyyMMdd"
            >
            </el-date-picker>
          </el-form-item>
          <!-- 日期时间范围选择 -->
          <el-form-item label="日期时间">
            <el-date-picker
              v-model="query_params.datetimerange"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyyMMdd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
          <!-- 日期选择 -->
          <el-form-item label="日期时间">
            <el-date-picker
              v-model="query_params.date"
              type="datee"
              value-format="yyyyMMdd"
            >
            </el-date-picker>
          </el-form-item>
          <!-- 选择框 -->
          <el-form-item label="选择框">
            <el-select v-model="query_params.select" placeholder="请选择">
              <el-option
                v-for="item in select_dict"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </template>
      </searchbar>

      <!-- ——+——+——+——+——+——+——+——+————+——+——+——+——+——+——+——+————+——+——+——+——+——+——+——+————+——+——+——+——+——+——+——+—— -->
      <!-- ——+——+——+——+——+——+——+——+————+——+——+——+——+——+——+——+————+——+——+——+——+——+——+——+————+——+——+——+——+——+——+——+—— -->
      <!-- 工具栏 （表格需要其他操作时需要）
      props: {
        // 按钮尺寸
        size: { type: String, default: 'small' },
        // 默认新增按钮
        addBtn: { type: Boolean, default: true },
        // 默认新增按钮回调
        addRow: { type: Function },
        // 默认刷新按钮
        refreshBtn: { type: Boolean, default: true },
        // 默认刷新按钮回调
        refreshCallback: { type: Function }
      } 
      ——+——+——+——+——+——+——+——+————+——+——+——+——+——+——+——+——+——+——+——+——+——+——
      ——+——+——+——+——+——+——+——+————+——+——+——+——+——+——+——+——+——+——+——+——+——+——
      slot 插槽
        #default 工具栏左侧插槽 自定义左侧工具按钮
        #toolbar_right 工具栏右侧插槽 自定义右侧工具按钮
     -->
      <toolbar
        :add-row="fn_click__add_dialog"
        :refresh-callback="fn_click__refresh"
      ></toolbar>

      <!-- ——+——+——+——+——+——+——+——+————+——+——+——+——+——+——+——+————+——+——+——+——+——+——+——+————+——+——+——+——+——+——+——+—— -->
      <!-- ——+——+——+——+——+——+——+——+————+——+——+——+——+——+——+——+————+——+——+——+——+——+——+——+————+——+——+——+——+——+——+——+—— -->
      <!-- 多选表格操作栏（表格为多选表格时需要）
      props: {
        // 已选择数据
        selected: { type: Array },
        // 清空选择回调
        clearSelection: { type: Function, required: true }
      } 
      ——+——+——+——+——+——+——+——+————+——+——+——+——+——+——+——+——+——+——+——+——+——+——
      ——+——+——+——+——+——+——+——+————+——+——+——+——+——+——+——+——+——+——+——+——+——+——
      slot 插槽
      #default 默认插槽 自定义多选表格操作栏
     -->
      <checkboxbar
        :selected="c__selection"
        :fn-clear-selection="fn_click__clear_selection"
      >
        <el-button type="text" size="mini" @click="fn_click__del(c__selection)"
          >批量删除</el-button
        >
      </checkboxbar>

      <!-- ——+——+——+——+——+——+——+——+————+——+——+——+——+——+——+——+————+——+——+——+——+——+——+——+————+——+——+——+——+——+——+——+—— -->
      <!-- ——+——+——+——+——+——+——+——+————+——+——+——+——+——+——+——+————+——+——+——+——+——+——+——+————+——+——+——+——+——+——+——+—— -->
      <!-- 表格主体
      属性 方法 事件 参考 element-ui https://element.eleme.cn/#/zh-CN/component/table#table-attributes
     -->
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

        <el-table-column align="center" prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column align="center" prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column align="center" prop="address" label="地址">
        </el-table-column>

        <!-- 默认操作栏 -->
        <el-table-column label="操作" fixed="right" align="center">
          <template #default="{ row, $index }">
            <el-button
              type="text"
              size="mini"
              icon="el-icon-view"
              v-permission="c__permission.view_btn"
              @click="fn_click__view(row, $index)"
              >查看</el-button
            >
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
              @click="fn_click__del(row.ids)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- ——+——+——+——+——+——+——+——+————+——+——+——+——+——+——+——+————+——+——+——+——+——+——+——+————+——+——+——+——+——+——+——+—— -->
      <!-- ——+——+——+——+——+——+——+——+————+——+——+——+——+——+——+——+————+——+——+——+——+——+——+——+————+——+——+——+——+——+——+——+—— -->
      <!-- 分页栏（表格需要分页时需要）
      props: {
        // 按钮尺寸
        page: { type: Object, required: true }
        page.currentPage Number 当前页数
        page.pageSizes Number[] 每页显示条数选择器的选项设置
        page.pageSize Number 每页显示条目个数
        page.total Number 总条目数
      } 
      ——+——+——+——+——+——+——+——+————+——+——+——+——+——+——+——+——+——+——+——+——+——+——
      ——+——+——+——+——+——+——+——+————+——+——+——+——+——+——+——+——+——+——+——+——+——+——
      $emit 自定义事件
      sizeChange 每页条数改变. 参数：val -> 每页条数
      currentChange 当前页数改变. 参数：val -> 当前页数
     -->
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
        <!-- 普通文本输入 -->
        <el-form-item label="普通文本" prop="text">
          <el-input
            v-model="form.text"
            placeholder="请输入普通文本"
            clearable
            :size="size"
          />
        </el-form-item>

        <!-- 计数器 -->
        <el-form-item label="计数器" prop="number">
          <el-input-number
            v-model="form.number"
            controls-position="right"
            :min="1"
            :max="10"
          ></el-input-number>
        </el-form-item>

        <!-- 日期范围选择 -->
        <el-form-item label="日期范围" prop="daterange">
          <el-date-picker
            v-model="form.daterange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyyMMdd"
          >
          </el-date-picker>
        </el-form-item>

        <!-- 日期时间范围选择 -->
        <el-form-item label="日期时间范围" prop="datetimerange">
          <el-date-picker
            v-model="form.datetimerange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyyMMdd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>

        <!-- 日期选择 -->
        <el-form-item label="日期" prop="data">
          <el-date-picker
            v-model="form.date"
            type="datee"
            value-format="yyyyMMdd"
          >
          </el-date-picker>
        </el-form-item>
        <!-- 日期时间选择 -->

        <el-form-item label="日期时间" prop="datetime">
          <el-date-picker
            v-model="form.datetime"
            type="datee"
            value-format="yyyyMMdd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>

        <!-- 选择框 -->
        <el-form-item label="选择框" prop="select">
          <el-select v-model="form.select" placeholder="请选择">
            <el-option
              v-for="item in select_dict"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!-- Switch开关 -->
        <el-form-item label="Switch开关" prop="switch">
          <el-switch v-model="form.switch"></el-switch>
        </el-form-item>

        <!-- 多选框 -->
        <el-form-item label="多选框" prop="checkbox">
          <el-checkbox-group v-model="form.checkbox">
            <el-checkbox
              v-for="item of checkbox_dict"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <!-- 单选框 -->
        <el-form-item label="特殊资源" prop="radio">
          <el-radio-group v-model="form.radio">
            <el-radio
              v-for="item of checkbox_dict"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 多行文本 -->
        <el-form-item label="活动形式" prop="textarea">
          <el-input type="textarea" v-model="form.textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="fn_click__submit_form"
            :loading="submit_loading"
            >立即创建</el-button
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
