<template>
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
      <el-date-picker v-model="form.date" type="datee" value-format="yyyyMMdd">
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
        @click="fn_click_submit_form"
        :loading="submit_loading"
        >立即创建</el-button
      >
      <el-button @click="fn_click_reset_form">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import conf from './conf';
export default conf;
</script>
<style lang="scss" scoped>
.el-form {
  padding: 15px 0;
}
</style>
