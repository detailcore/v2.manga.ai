<template>
  <el-dialog
    v-model="isShow"
    :width="getWidth"
    :lock-scroll="false"
    title="Поиск по сайту"
  >
    <div class="text-center">
      <el-input 
        v-model="inputText" 
        :prefix-icon="ElIconSearch" 
        placeholder="Ведите название тайтла"
      />
    </div>

    <div class="text-center mt-6" v-if="result.length > 0 && inputText.length >= 3">
      <SearchItem
        class="item-search b-rd p1"
        v-for="i in result"
        :key="i.id"
        :id="i.id"
        :alias="i.alias"
        :cover="i.cover.low"
        :title_eng="i.title_eng"
        :title_rus="i.title_rus"
        :type="i.type.name"
        :year="i.year"
      />
    </div>
    <div class="text-center mt-6" v-if="result.length === 0 && inputText.length >= 3">
      <el-text :size="'large'">Поиск не дал результатов, попробуйте ввести другое название или на другом языке</el-text>
    </div>
  </el-dialog>
</template>


<script lang="ts" setup>
import debounce from 'lodash/debounce'
import { useModalStore } from '@/stores/modal'
import { searchItem } from '@/services/interfaces'
import { useUserSettings } from '@/composables/useUserSettings'

interface inResult extends Array<searchItem>{}

const result = ref<inResult>([])
const inputText = ref<string>('')
const isShow = ref<boolean>(true)
const isLoading = ref<boolean>(false)
const { toggleModal } = useModalStore()
const { userWidth } = useUserSettings()
const { public: { apiDomain, apiPrefix } } = useRuntimeConfig()


const getWidth = computed(() => {
  return (userWidth.value <= 501) ? '94%' : '500px'
})


watch(isShow, () => {
  toggleModal({ name: 'search', value: isShow.value })
})
watch(inputText, debounce((newVal: string) => {
  if(newVal.length >= 3) {
    getResult(newVal)
  }
}, 600))


const getResult = async (title: string) => {
  isLoading.value = true
  result.value = await $fetch<inResult>(`${apiDomain + apiPrefix}/posts/search/?lang=en&q=${title}`).catch((error) => error.data)
  isLoading.value = false
}

</script>


<style lang="scss" scoped>
.width-80 {
  width: 80%;
}
.item-search {
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
}
</style>
