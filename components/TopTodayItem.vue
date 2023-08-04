<template>
  <div class="top-today-item cursor-pointer mb-3" @click="gotoByPath(`/manga/${props.alias}`)">
    <el-image
      class="top-today-image"
      :src="coverUrl"
      :fit="'cover'"
      :alt="title"
      lazy
    />

    <div class="top-today-info px-2">
      <div class="mb-2 line-clamp-2">{{ title }}</div>

      <div class="flex justify-between">
        <el-text :size="'small'">
          {{ type }}
        </el-text>

        <el-text :size="'small'" class="flex flex-items-center">
          {{ rating }}
          <el-icon>
            <ElIconStarFilled/>
          </el-icon>
        </el-text>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { useGoto } from "@/composables/useGoto"

const props = defineProps<{
  id: number
  num: number | null
  alias: string
  cover: string | null
  title: string | null
  type: string | null
  rating: string | null
}>()

const { gotoByPath } = useGoto()
const { public: { urlCoverTitle } } = useRuntimeConfig()

const coverUrl = computed(() => urlCoverTitle + props.id + '/' + props.cover)

</script>


<style lang="scss">
.top-today-item {
  cursor: pointer;
  display: flex;
  position: relative;
  &:hover {
    opacity: 0.9;
    filter: saturate(150%);
  }

  @media (max-width: 768px) {
    width: calc(50% - 0.25rem);
  }
  @media (max-width: 450px) {
    width: 100%;
  }
}

.top-today-image {
  background-position: 50%;
  background-size: cover;
  border-radius: 2px;
  height: 90px;
  width: 60px;
  img {
    position: relative;
  }
}

.top-today-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: calc(100% - 60px);
}
</style>