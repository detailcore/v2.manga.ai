<template>
  <el-tabs v-model="activeTabName" class="tabs my-4" @tab-click="tabClick">
    <el-tab-pane label="Описание" name="desc">
      <div v-if="manga.description">
        <div class="text">{{ manga.description }}</div>
      </div>
      <div v-else class="text">Описание отсутствует.</div>
    </el-tab-pane>

    <el-tab-pane
      :label="`Главы (${manga.chapter_count})`" 
      name="chapters"
    >
      <div class="chapters" v-if="manga.chapter_count">
        <el-pagination v-if="paginate.last_page > 1"
          class="w100% justify-center my-4"
          background
          layout="prev, pager, next"
          :pager-count="5"
          :default-page-size="paginate.per_page"
          v-model:current-page="paginate.current_page"
          @current-change="handleCurrentChange"
          :total="paginate.total"
        />

        <MangaChapter
          v-if="!loadingChapter"
          v-for="(items, index) in getChapters" 
          :chapters="items" 
          :key="index" 
        />
        <el-skeleton v-else :rows="7" />

        <el-pagination v-if="paginate.last_page > 1"
          class="w100% justify-center my-4"
          background
          layout="prev, pager, next"
          :pager-count="5"
          :default-page-size="paginate.per_page"
          v-model:current-page="paginate.current_page"
          @current-change="handleCurrentChange"
          :total="paginate.total"
        />
      </div>
      <div v-else class="chapters">Главы отсутствуют.</div>
      <div v-if="manga.is_licensed" class="chapters">Главы удалены по требованию правообладателя.</div>
    </el-tab-pane>

    <el-tab-pane :label="`Комментарии (${manga.comment_count})`" name="comm">Список коментов</el-tab-pane>
    <el-tab-pane :label="`Рецензии (${0})`" name="reviews">Рецензии</el-tab-pane>
  </el-tabs>
</template>


<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { TabsPaneContext } from 'element-plus'
import { MangaTabs } from "services/interfaces"
import { useMangaStore } from '~/stores/manga'
import { useChaptersStore } from '~/stores/chapters'

const { setTab } = useMangaStore()
const { fetchChapters } = useChaptersStore()
const { manga } = storeToRefs(useMangaStore())
const { getChapters, paginate } = storeToRefs(useChaptersStore())

const activeTabName = ref<string>('desc')
const loadingChapter = ref<boolean>(true)

const tabClick = async (tab: TabsPaneContext, event: Event) => {
  setTab(tab.paneName as MangaTabs)

  if(tab.paneName == 'chapters') {
    loadingChapter.value = true
    await fetchChapters(manga.value.id)
    loadingChapter.value = false
  }
}

const handleCurrentChange = async (num: number) => {
  loadingChapter.value = true
  await fetchChapters(manga.value.id, num)
  loadingChapter.value = false
}

</script>


<style lang="scss">
.tabs {
  .chapters {
    width: 100%;
    min-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>