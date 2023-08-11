<template>
  <div class="auth-page">

    <div class="title">Почти закончили, нажмите "Продолжить" для завершения.</div>

    <el-button
      type="success"
      class="my-4"
      @click="logIn"
    >
      Продолжить
    </el-button>

    <div class="my-4 flex flex-col items-center">
      <el-checkbox v-model="remember" label="Запомнить это устройство" />
      <el-text size="small">Для автоматического входа, оставьте галочку отмеченной</el-text>
    </div>

  </div>
</template>


<script lang="ts" setup>
import { useUserStore } from '~/stores/user'

definePageMeta({
  layout: 'auth'
})

const { query: { email, password } } = useRoute()
const { public: { jsDomain } } = useRuntimeConfig()
const { fetchAuth } = useUserStore()

const remember = ref<boolean>(true)

const logIn = async () => {
  await fetchAuth({
    email: email as string, 
    password: password as string,
    remember: remember.value,
  })
  
  const reffInCookie = useCookie('reff')
  if(process.client) {
    window.location.href = jsDomain + (reffInCookie.value ? reffInCookie.value : '')
  }
}
</script>


<style scoped>
.auth-page {
  height: calc(100vh - 60px);
  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
</style>
