<template>
  <el-header class="header header-reader">
    <el-row :align="'middle'" class="hi">

      <el-col :span="20" :md="{ span: 9, offset: 3 }" :xs="{ span: 18 }">
        <nuxt-link to="/" class="mr-4">
          <el-button :icon="ElIconHomeFilled" circle />
        </nuxt-link>
        <nuxt-link :to="`/manga/${alias}`" class="mr-4">
          <el-button :icon="ElIconBack" circle />
        </nuxt-link>

        <el-button class="ml-2 arrow" :icon="ElIconArrowLeft" text />

        <!-- <client-only>
          <el-select-v2 
            class="chapter-list" 
            v-model="chapterSelected"
            :options="list"
            @change="onChangeChapter"
            value-key="id"
            :height="260"
            :placeholder="`Глава ${currentChapter.chapter}`"
          >
            <template #default="{ item }">
              <span style="margin-right: 8px">Глава qwe {{ item.chapter }}</span>
              <span style="color: var(--el-text-color-secondary); font-size: 13px">
                {{ item.name }}
              </span>
            </template>
          </el-select-v2>
        </client-only> -->

        <client-only>
          <el-select-v2 
            class="chapter-list" 
            v-model="chapterSelected"
            :options="list"
            @change="onChangeChapter"
          />
        </client-only>

        <el-button class="mr-4 arrow" :icon="ElIconArrowRight" text />
      </el-col>

      <el-col :span="4" :md="{ span: 9 }" :xs="{ span: 6 }" class="text-right">
        <el-button v-if="isDark" :icon="ElIconSunny" circle @click="setColorMode()" class="mr-4" />
        <el-button v-if="!isDark" :icon="ElIconMoon" circle @click="setColorMode()" class="mr-4" />  
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
import { useReaderStore } from '@/stores/reader'
import Login from '@/components/Icons/Login.vue'
import Bookshelf from '@/components/Icons/Bookshelf.vue'
import { useUserSettings } from '@/composables/useUserSettings'

const { params: { id, alias } } = useRoute()
const { loggedIn } = storeToRefs(useUserStore())
const { list } = storeToRefs(useReaderStore())
const { toggleModal } = useModalStore()
const { setColorMode, isDark } = useUserSettings()

// const currentChapter = computed(() => list.value.filter(i => i.id === +id)[0])
// const chapterOptions = computed(() => {
//   return list.value.map(i => ({
//     value: i.id,
//     label: `${i.chapter}`,
//   }))
// })
const chapterOptions = computed(() => {
  return list.value
})

const chapterSelected = ref()


const onChangeChapter = (idSelected: any) => {
  console.log('onChangeChapter', idSelected)
}
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
.header-reader {
  .chapter-list {
    // width: 100%;
  }
  .arrow {
    position: relative;
  }
}
</style>