<template>
  <el-row class="mb-2" @click="gotoByPath(`/manga/${props.alias}`)">

    <el-col :span="4" class="flex items-center justify-center">
      <el-image
        :src="coverUrl"
        lazy
      />
    </el-col>

    <el-col :span="20" class="flex flex-col justify-evenly text-left">
      <el-text :size="'large'">{{ title }}</el-text>
      <el-text :size="'small'" v-if="title_eng">{{ title_eng }}</el-text>
    </el-col>

  </el-row>
</template>


<script lang="ts" setup>
import { useGoto } from "@/composables/useGoto"

const props = defineProps<{
  id: number
  alias: string
  cover: string
  title_eng: string
  title_rus: string
  type: string
  year: string
}>()

const { gotoByPath } = useGoto()
const { public: { urlCoverTitle } } = useRuntimeConfig()

const coverUrl = computed(() => urlCoverTitle + props.id + '/' + props.cover)
const title = computed(() => {
  return props.title_rus ? props.title_rus : (props.title_eng) ? props.title_eng : 'Названия на русском и английском отсутствуют!'
})
</script>


<style lang="scss" scoped>
.el-image {
  border-radius: 50%;
  max-width: 60px;
  max-height: 60px;
}
.el-text {
  width: 100%;
  overflow: hidden;
  align-self: flex-start;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>