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
      <div v-if="manga.is_licensed" class="chapters">Главы удалены по требованию правообладателя.</div>
      <div class="chapters" v-if="manga.chapter_count">
        <!-- <div class="chapters-teams" v-if="getBranches.length">
          <div class="title mt-2 mb-4">Отобразить перевод от:</div>
          <div class="selected-teams flex justify-around">
            <TeamItem 
              v-for="{ id, name, cover } in getBranches" 
              :key="id"
              :id="id"
              :name="name"
              :cover="cover"
              :isLink="false"
              class="mr-2"
              @click="selectedTeam(id)"
            />
          </div>
        </div> -->
        <el-pagination v-if="multiple2Number" 
          class="w100% justify-center my-4"
          background
          layout="prev, pager, next"
          :pager-count="5"
          :default-page-size="perPage"
          @current-change="handleScrollTo"
          :total="manga.chapter_count"
        />
        <div v-bind="containerProps" class="h-400px overflow-auto">
          <div v-bind="wrapperProps">
            <MangaChapter
              v-for="{ index, data } in list" 
              :chapters="data" 
              :key="index" 
            />
          </div>
        </div>
      </div>
      <div v-else class="chapters">Главы отсутствуют.</div>
    </el-tab-pane>

    <el-tab-pane :label="`Комментарии (${manga.comment_count})`" name="comm">Список коментов</el-tab-pane>
    <el-tab-pane :label="`Рецензии (${0})`" name="reviews">Рецензии</el-tab-pane>
  </el-tabs>
</template>


<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { TabsPaneContext } from 'element-plus'
import { MangaTabs } from "services/types"
import { useMangaStore } from '~/stores/manga'
import { useChaptersStore } from '~/stores/chapters'

const { setTab } = useMangaStore()
const { manga } = storeToRefs(useMangaStore())
const { chapters } = storeToRefs(useChaptersStore())
const { useElementSize, useVirtualList } = useUserSettings()

const order = ref('desc')
const perPage = ref(60)
const activeTabName = ref<string>('desc')

const multiple2Number = computed(() => {
  const n = perPage.value
  const max = manga.value.chapter_count as number
  if(max > n) {
    let arr = []
    for (let i = 0; i < max; i+=n) {
      i == 0 ? arr.push(1) : arr.push(i)
    }
    return arr
  }
  return false
})

const selectedTeam = (id: number) => {
  console.log(id)
}

const { list, containerProps, wrapperProps, scrollTo } = useVirtualList(chapters, { itemHeight: 72 })

const handleScrollTo = (num: number) => {
  console.log(num)
  if(Array.isArray(multiple2Number.value)) {
    console.log(multiple2Number.value[num-1])
    scrollTo(multiple2Number.value[num-1])
  }
}

const tabClick = async (tab: TabsPaneContext, event: Event) => {
  setTab(tab.paneName as MangaTabs)
}

const toggleOrder = () => {
  order.value == 'asc' ? order.value = 'desc' : order.value = 'asc'
  list.value.reverse()
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
    .selected-teams {
      flex-direction: row-reverse;
      flex-wrap: wrap;
      @media (max-width: 450px) {
        flex-direction: column;
      }
    }
  }
}
</style>