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

const showNotifyCookie = () => {
  const cookieAuth = useCookie('auth')
  const cookiePrompt = useCookie('cookiePrompt')
  if(!cookiePrompt.value && cookieAuth.value == '1') {
    ElNotification({
      title: 'Мы используем cookie.',
      message: 'Вы можете запретить их в настройках браузера, но тогда сайт будет работать не корректно!',
      position: 'bottom-right',
      duration: 0,
      onClose() {
        const cookiePrompt = useCookie('cookiePrompt', { maxAge: 60 * 60 * 24 * 180 })
        cookiePrompt.value = '1'
      },
    })
  }
}

onMounted(() => {
  showNotifyCookie()
})
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