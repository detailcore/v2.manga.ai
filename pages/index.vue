<template>
  <SliderTopAll />

  <el-row class="my-6">
    <SliderTopWeek />
  </el-row>

  <el-row class="my-6" :class="{ 'flex-col-reverse': isNarrowScreen }">

    <Latest />

    <Sidebar />

  </el-row>

  <el-row class="my-6">
    <SliderNewPosts />
  </el-row>
</template>

<script setup lang="ts">
// import { storeToRefs } from 'pinia'
import { useHomeStore } from '@/stores/home'
import { useUserSettings } from '@/composables/useUserSettings'

definePageMeta({
  layout: 'default'
})

const { userWidth } = useUserSettings()
const { fetchAllData } = useHomeStore()

const isNarrowScreen = computed(() => {
  return (userWidth.value < 768) ? true : false
})

  await fetchAllData()
</script>
