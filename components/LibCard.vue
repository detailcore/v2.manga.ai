<template>
  <div class="media-card-wrap mx-2 mb-4" :style="sizeContent[0]" @click="gotoByPath(`/manga/${props.alias}`)">
    <el-image
      class="card"
      :src="coverUrl"
      :fit="'cover'"
      :alt="title"
      :style="sizeContent[1]"
      lazy
    />

    <div class="lib-card-info">
      <div class="flex justify-between">
        <el-text :size="'small'" class="w-54px" truncated>
          {{ type }}
        </el-text>

        <el-text :size="'small'" class="flex flex-items-center">
          {{ rating }}
          <el-icon>
            <ElIconStarFilled/>
          </el-icon>
        </el-text>
      </div>
      <div class="subtitle-card my-2 line-clamp-2">{{ title }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useGoto } from "@/composables/useGoto"

const { gotoByPath } = useGoto()
const route = useRoute()
const { public: { urlCoverTitle } } = useRuntimeConfig()

const props = defineProps<{
  id: number
  num: number | null
  alias: string
  cover: string | null
  title: string | null
  type: string | null
  rating: string | null
}>()

const coverUrl = computed(() => urlCoverTitle + props.id + '/' + props.cover)
const sizeContent = computed(() => {
  if(route.name == 'index' || route.name == 'home') {
    return [
      { 
        width: 'calc(100% - 1rem)',
      },
      { 
        width: 'max-content',
        maxHeight: '260px',
      },
    ]
  }
  return []
})
</script>

<style lang="scss">
.media-card-wrap {
  cursor: pointer;
  width: calc(20% - 1rem);
  @media (max-width: 991px) {
    width: calc(25% - 1rem);
  }
  @media (max-width: 650px) {
    width: calc(33.3333% - 1rem);
  }
  @media (max-width: 400px) {
    width: calc(50% - 1rem);
  }
}
.subtitle-card {
    font-size: 0.85rem;
  }
.card {
  box-shadow: var(--el-box-shadow-lighter);
  img {
    width: 100%;
    height: auto;
    max-height: inherit;
    aspect-ratio: 7 / 10;
    border-radius: 2px;
    &:hover {
      opacity: 0.9;
      filter: saturate(150%);
    }
  }
}

</style>
