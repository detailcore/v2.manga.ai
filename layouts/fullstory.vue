<template>
  <Header />

  <el-container>
    <el-main>
      <slot />
    </el-main>
  </el-container>
  
  <el-footer>
    <Footer />
  </el-footer>
</template>