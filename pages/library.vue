<template>
  <el-row>
    <el-col :span="isExtraSmall ? 24 : 16" :md="{ span: 13, offset: 3 }">
      <div class="m-4">
        <h1 class="title flex items-center justify-between">
          <span>
            Библиотека
            <client-only>
              <el-tooltip content="Сортировать по:"
              >
                <el-select v-model="sort" class="m-2" style="max-width: 154px;" placeholder="Сортировать по:">
                  <el-option
                    v-for="(item, index) in sortBy"
                    :key="index"
                    :label="item"
                    :value="index"
                  />
                </el-select>
              </el-tooltip>

              <el-tooltip :content="getOrderText">
                <el-button @click="toggleOrder" :icon="(order == '') ? ElIconSort : (order == 'asc' ? ElIconSortUp : ElIconSortDown)" circle />
              </el-tooltip>
            </client-only>
          </span>
          <el-button 
            v-if="isExtraSmall"
            :icon="ElIconFilter" 
            @click="show(true)"
            color="#ff6820"
            :size="'small'"
            plain
          >
            Фильтры
          </el-button>
        </h1>
        <div class="subtitle -mt-2">Поиск манги в каталоге по вашим предпочтениям</div>

        <el-skeleton v-if="!postsDataLoaded" class="mt-5" :rows="10" animated />

        <div class="flex flex-wrap my-6">
          <LibCard 
            v-for="({
              alias,
              cover,
              id,
              title,
              type,
              rating,
            }, index) in (postsData.length ? postsData : postsData.data)"
            :id="id"
            :num="index+1"
            :alias="alias"
            :cover="cover"
            :title="title"
            :type="type"
            :rating="rating"
            :key="id"
          />
        </div>
      </div>
    </el-col>


    <client-only>
      <el-col v-if="!isExtraSmall" :span="8" :md="{ span: 5 }">
        <el-skeleton v-if="!inputDataLoaded" class="mt-5" :rows="10" animated />
        <LibFilter />
      </el-col>

      <el-drawer v-model="drawer" :size="sizeDrawer" :with-header="false" v-else>
        <p class="flex items-center justify-between" style="font-weight: bold;">
          Фильтры 
          <el-button 
            :icon="ElIconClose" 
            @click="show(false)"
            circle 
          />
        </p>

        <el-skeleton v-if="!inputDataLoaded" class="mt-5" :rows="10" animated />
        <LibFilter />
      </el-drawer>
    </client-only>
  </el-row>
</template>


<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLibraryStore } from '@/stores/library'
import { useUserSettings } from '@/composables/useUserSettings'
import { sortType, orderType } from '@/services/interfaces'

const { userWidth, sizeDrawer } = useUserSettings()
const { setSelectionOptions, fetchInitPosts } = useLibraryStore()
const { inputDataLoaded, postsDataLoaded, postsData } = storeToRefs(useLibraryStore())

const drawer = ref<boolean>(false)
const sort = ref<sortType>('views')
const order = ref<orderType>('')
const sortBy = ref({
  chapter_count: 'кол-ву глав',
  created_at: 'дате добавления',
  random: 'случано',
  rate: 'кол-ву оценок',
  rating: 'рейтингу',
  updated_at: 'дате обновления',
  views: 'просмотрам',
})


const getOrderText = computed(() => {
  if(order.value == 'desc') return 'От большего к меньшему'
  return 'От меньшего к большему'
})
const isExtraSmall = computed(() => {
  if(userWidth.value <= 768) return true
  return false
})


const show = (value: boolean) => drawer.value = value

const toggleOrder = () => {
  if(order.value == 'desc') {
    order.value = 'asc'
  } else {
    order.value = 'desc'
  }
}

watch(sort, () => {
  setSelectionOptions(sort.value, order.value)
})
watch(order, () => {
  setSelectionOptions(sort.value, order.value)
})

fetchInitPosts()
</script>


<!-- <style lang="scss" scoped>
</style> -->