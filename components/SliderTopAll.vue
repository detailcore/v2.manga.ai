<template>
  <el-row class="my-6">
    <el-col
      :sm="{ span: 12, offset: 2 }"
      :md="{ span: 13, offset: 3 }"
    >
      <div class="title mb-6 mx-2 flex flex-items-center">
        Топовая манга
        <el-icon class="ml-2">
          <ElIconInfoFilled />
        </el-icon>
      </div>
    </el-col>

    <el-col>

      <el-scrollbar>
        <div class="flex">
          <span v-for="(item, index) in getAllTop" :key="item.id">
            <!-- <SliderItemAll class="slider-item scrollbar-item"
              :id="item.id"
              :num="index+1"
              :alias="item.alias"
              :cover="item.cover"
              :title="item.title"
              :description="item.description"
              :genres="item.genres"
              :type="item.type"
              :rating="item.rating"
              v-if="!(userWidth <= 550)"
            /> -->

            <LibCard class="scrollbar-item"
              :id="item.id"
              :num="index+1"
              :alias="item.alias"
              :cover="item.cover"
              :title="item.title"
              :type="item.type"
              :rating="item.rating"
            />
          </span>
        </div>
      </el-scrollbar>

    </el-col>
  </el-row>
</template>


<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useHomeStore } from '@/stores/home'
import { useUserSettings } from '@/composables/useUserSettings'

const { userWidth } = useUserSettings()
const { getAllTop } = storeToRefs(useHomeStore())
const isNarrow = computed(() => {
  return (userWidth.value <= 550) ? true : false
})
</script>


<style lang="scss">
.slider-item {
  cursor: pointer;
  display: flex;
  width: 65%;
  min-width: 650px;
  max-width: 1000px;
  max-height: 280px;
  border-radius: 2px;
  // box-shadow: var(--el-box-shadow-lighter);

  .image {
    overflow: initial;
    img {
      width: auto;
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
    }
  }
  .description {
    overflow: hidden;
    .title {
      overflow: hidden;
    }
    .desc {
      font-size: 0.9rem;
      text-align: justify;
    }
  }
}
</style>