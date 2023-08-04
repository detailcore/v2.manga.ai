<template>
  <div class="latest-item mb-3">
    <div class="latest-image">
      <el-image
        :src="coverUrl"
        :alt="title"
        lazy
      />
      <div class="rank" v-if="adult_rank != 'Нет'">{{ adult_rank }}</div>
    </div>

    <div class="latest-info px-2 w-100%">
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
      
      <!-- <div class="divider my-1"></div> -->

      <div class="flex justify-between">
        <el-link 
          class="link-title my-1"
          :underline="false"
          :href="`/manga/${alias}`"
        >
          {{ title }}
        </el-link>
        <el-text :size="'small'" class="mx-1 line-clamp-1">{{ dateTime }}</el-text>
      </div>

      <el-link
        class="link-chapter my-1 line-clamp-1"
        :underline="false"
        :href="`/manga/${alias}/ch${new_chapter.id}`"
      >
        {{ chapterText }}
      </el-link>

    </div>
  </div>
</template>


<script setup lang="ts">

const props = defineProps<{
  id: number
  alias: string
  cover: string | null
  title: string | null
  type: string | null
  rating: string | null
  adult_rank: string | null
  amount_chapters: number | 0
  new_chapter: any | null
}>()

const { public: { urlCoverTitle } } = useRuntimeConfig()

const dateTime = computed(() => 'Сегодня')
const coverUrl = computed(() => urlCoverTitle + props.id + '/' + props.cover)
const chapterText = computed(() => {
  return 'Том ' + props.new_chapter.volume
      + ' Глава ' + props.new_chapter.chapter
      + ((props.new_chapter.name) ? ' - ' + props.new_chapter.name : '')
      + ((props.amount_chapters > 0) ? ' + ешё ' + props.amount_chapters : '')
})

</script>