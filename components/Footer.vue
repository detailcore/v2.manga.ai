<template>
  <el-footer class="footer" :height="'160px'">

    <el-row :align="'middle'" class="hi">
      <el-col
        class="mb-6"
        :sm="{ span: 20, offset: 2 }" 
        :md="{ span: 18, offset: 3 }"
      >
        <div>FOOTER</div>
      </el-col>
    </el-row>

  </el-footer>
</template>

<style lang="scss">
.footer {
  box-shadow: var(--el-box-shadow);
  border-top: 1px solid var(--el-border-color);
}
</style>