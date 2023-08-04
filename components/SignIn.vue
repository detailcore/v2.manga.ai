<template>
  <el-dialog
    v-model="isShow"
    :width="getWidth"
    :title="getTitle + ' аккаунт'"
  >
  <div class="text-center">
    <el-button 
      :icon="Vk" 
      :loading="isLoaded"
      @click="socialLogin('vkontakte')"
      class="m0 width-80">
      VK
    </el-button>
    <el-button 
      :icon="Google" 
      :loading="isLoaded"
      @click="socialLogin('google')"
      class="mt6 mb6 width-80">
      Google
    </el-button>
    <el-button 
      :icon="Yandex" 
      :loading="isLoaded"
      @click="socialLogin('yandex')"
      class="width-80">
      Yandex
    </el-button>
  </div>

    <div class="text-center mt-6">
      <span v-if="isLogin">Нет аккаунта? <el-link type="primary" @click="changeTitle">Зарегистрироваться</el-link></span>
      <span v-if="!isLogin">Уже есть аккаунт? <el-link type="primary" @click="changeTitle">Войти</el-link></span>
    </div>
  </el-dialog>
</template>


<script lang="ts" setup>
import Vk from '@/components/Icons/Vk.vue'
import Google from '@/components/Icons/Google.vue'
import Yandex from '@/components/Icons/Yandex.vue'

import { useModalStore } from '@/stores/modal'
import { useUserSettings } from '@/composables/useUserSettings'

const isShow = ref<boolean>(true)
const isLogin = ref<boolean>(true)
const isLoaded = ref<boolean>(false)
const { public: { apiDomain, apiPrefix } } = useRuntimeConfig()


const getTitle = computed(() => {
  if(isLogin.value) return 'Войти в'
  return 'Создать'
})
const getWidth = computed(() => {
  return (userWidth.value <= 501) ? '94%' : '440px'
})


watch(isShow, () => {
  toggleModal({ name: 'login', value: isShow.value })
})


const { toggleModal } = useModalStore()
const { userWidth } = useUserSettings()
const changeTitle = () => {
  isLogin.value = !isLogin.value
}

const socialLogin = async (service: string) => {
  isLoaded.value = true
  // window.location.href = `${apiDomain + apiPrefix}/auth/login/${service}`
  // isLoaded.value = false
}
</script>


<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.width-80 {
  width: 80%;
}
.el-button + .el-button {
  margin-left: auto;
}
</style>
