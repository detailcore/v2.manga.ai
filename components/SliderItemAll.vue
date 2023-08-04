<template>
  <div class="m-2" @click="gotoByPath(`/manga/${props.alias}`)">
    <el-image
      class="image mr-2"
      :src="coverUrl"
      :alt="title"
      lazy
    />

    <div class="description p-3">
      <h3 class="title mt-2 line-clamp-2">{{ title }}</h3>

        <div class="flex">
          <el-text :size="'small'" class="w-120px" truncated>
            {{ type }}
          </el-text>

          <el-text :size="'small'" class="flex flex-items-center">
            <el-icon>
              <ElIconStarFilled/>
            </el-icon>
            {{ rating }}
          </el-text>
        </div>

      <div class="genres line-clamp-1 my-4">
        <el-tag type="info" v-for="genre in genres" class="mr-1">{{ genre }}</el-tag>
      </div>
      <div class="desc line-clamp-5">{{ description }}</div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { useGoto } from "@/composables/useGoto"

const props = defineProps<{
  id: number
  num: number
  alias: string
  cover: string
  title: string | null
  description: string | null
  genres: []
  type: string | null
  rating: string | null
}>()

const { gotoByPath } = useGoto()
const { public: { urlCoverTitle } } = useRuntimeConfig()
const coverUrl = computed(() => urlCoverTitle + props.id + '/' + props.cover)
</script>
