<template>
  <el-header class="header">
    <el-row :align="'middle'" class="hi">

      <el-col :span="12" :md="{ span: 9, offset: 3 }">
        <nuxt-link to="/" class="mr-4">
          <el-button :icon="ElIconHomeFilled" circle />
        </nuxt-link>
        <nuxt-link to="/library" class="mr-4">
          <el-button :icon="Bookshelf" circle />
        </nuxt-link>
        <el-button :icon="ElIconSearch" circle @click="toggleModal({ name: 'search', value: true })" />
      </el-col>

      <el-col :span="12" :md="{ span: 9 }" class="text-right">
        <el-button v-if="isDark" :icon="ElIconSunny" circle @click="setColorMode()" class="mr-2" />
        <el-button v-if="!isDark" :icon="ElIconMoon" circle @click="setColorMode()" class="mr-2" />  
        <el-button v-if="0" :icon="ElIconAvatar" circle />
        <el-button v-if="!loggedIn" :icon="Login" round @click="toggleModal({ name: 'login', value: true })">Войти</el-button>

        <client-only v-else>
          <UserDropdown />
        </client-only>
      </el-col>

    </el-row>
  </el-header>
</template>


<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useModalStore } from '@/stores/modal'
import Login from '@/components/Icons/Login.vue'
import Bookshelf from '@/components/Icons/Bookshelf.vue'
import { useUserSettings } from '@/composables/useUserSettings'

const { loggedIn } = storeToRefs(useUserStore())
const { toggleModal } = useModalStore()
const { setColorMode, isDark } = useUserSettings()
</script>


<style lang="scss">
.header {
  background-color: var(--el-bg-color-overlay);
  box-shadow: var(--el-box-shadow);
  border-bottom: 1px solid var(--el-border-color);
}
@media (width <= 460px) {
  .el-header {
    --el-header-padding: 0 10px;
  }
}
</style>