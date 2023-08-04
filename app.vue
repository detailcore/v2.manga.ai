<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <client-only>
    <SignIn v-if="isOpen.login" />
    <Search v-if="isOpen.search" />
  </client-only>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useModalStore } from '@/stores/modal'

const { isOpen } = storeToRefs(useModalStore())
</script>


<style lang="scss">
.title {
  font-weight: bold;
  font-size: var(--el-font-size-extra-large);
}
.subtitle {
  font-weight: lighter;
  color: var(--el-text-color-secondary);
  font-size: var(--el-font-size-base);
}
</style>