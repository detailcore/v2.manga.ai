<template>
  <el-col
      :sm="{ span: 8 }"
      :md="{ span: 5 }"
    >
    <!-- SideBar -->
    
    <TopToday class="side-block mx-2" />
  </el-col>
</template>


<style lang="scss">
.side-block {
  position: sticky;
  top: 0;
}
</style>