<template>
  <div>Страница главы</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useReaderStore } from '~/stores/reader'
import { useUtils } from '~/composables/useUtils'
import { useUserSettings } from '~/composables/useUserSettings'
import { useDisplayUtils } from '~/composables/useDisplayUtils'

definePageMeta({
  layout: 'reader'
})

const { useAllSettled } = useUtils()
const { sizeDialog } = useUserSettings()
const { params: { id: idChapter, alias } } = useRoute()
const { public: { urlCoverTitle } } = useRuntimeConfig()

const { chapter } = storeToRefs(useReaderStore())
const { fetchChapterById, fetchChapterListByAlias } = useReaderStore()


await Promise.allSettled([
  fetchChapterById(+idChapter),
  fetchChapterListByAlias(alias as string),
])
</script>