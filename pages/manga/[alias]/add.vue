<template>
  <el-row>
    <el-col 
      :xs="{ span: 24 }"
      :lg="{ span: 18, offset: 3 }" 
      class="manga-create py-4 px-2"
    >

    <div class="title flex items-center my-2">
      Добавление глав в
      <el-icon>
        <ElIconCaretRight/>
      </el-icon>
      <el-link 
        class="title line-clamp-1" 
        :href="'/manga/' + alias" 
        :underline="false"
      >
        {{ title }}
      </el-link>
    </div>
    <div class="subtitle mb-4">Загрузка новых глав архивами *.zip</div>

    <div class="item my-4">
      <div class="subtitle mb-1">Последний Том {{ lastChapter.volume }} Глава {{ lastChapter.chapter }}</div>
    </div>

    <!-- <div class="item line my-4"></div> -->
    <CreateChapterByArchive 
      v-if="chapters.length"
      v-for="num in chapters.length" 
      :key="num"
      :num="(num-1)"
    />

    <div class="item my-4 add-chapter-action">
      <el-button class="mb-2" type="success" @click="startUpload">Начать загрузку</el-button>
      <el-button class="mb-2" type="warning" @click="setNewChapter(chapters[chapters.length-1])">Добавить еще +</el-button>
    </div>

    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ElNotification } from 'element-plus'
import { useAddChapterStore } from '~/stores/addChapter'
import { useUserSettings } from '~/composables/useUserSettings'

definePageMeta({
  middleware: 'auth'
})

const { sizeDialog } = useUserSettings()
const { params: { alias } } = useRoute()
const { public: { urlCoverTitle } } = useRuntimeConfig()

// Stores
const { setNewChapter, fetchUploadNewChapter, fetchCreateInfoChapter } = useAddChapterStore()
const { chapters, mangaInfo, lastChapter } = storeToRefs(useAddChapterStore())

// State

// Getters
const title = computed(() => mangaInfo.value?.title_rus ? mangaInfo.value.title_rus : mangaInfo.value?.title_eng)

// Setters

// Actions
const startUpload = async () => {

  for (const item of chapters.value) {
    if(item.file && item.isLoaded == false) {
      item.isLoaded = undefined
      const data = new FormData()
      data.append('vol', item.volume + '')
      data.append('ch', item.chapter)
      data.append('id_post', mangaInfo.value?.id + '')
      const res = await fetchUploadNewChapter(data)

      if(res.status == 'ok') {
        item.isLoaded = true
      } else {
        ElNotification({
          title: `Ошибка в главе № ${item.chapter}`,
          message: res.msg,
          type: 'error',
        })
        item.isLoaded = false
      }
      console.log(2, res)
    }
    if(!item.file) {
      ElNotification({
        title: 'Файл не выбран',
        message: `В главе № ${item.chapter} не выбран файл для загрузки`,
        type: 'error',
      })
    }

    await new Promise(r => setTimeout(r, 600))
  }
}


await fetchCreateInfoChapter(alias as string)
</script>


<style lang="scss">
  @import url("~/assets/scss/create.scss");
  .add-chapter-action {
    display: flex;
    justify-content: space-evenly;
    @media (max-width: 350px) {
      flex-direction: column-reverse;
      .el-button { margin-left: 0; }
    }
  }

  .subline {
    text-align: right;
    color: var(--el-text-color-secondary);
    font-size: var(--el-font-size-small);
    .el-progress__text {
      min-width: auto;
    }
  }
  .table-names {
    span {
      width: 100%;
    }
    .file {
      max-width: 32px;
      text-align: right;
      &.two {
        max-width: 66px;
      }
    }
  }

  .line,
  .table-names {
    display: flex;
    .vol {
      max-width: 48px;
    }
    .ch {
      max-width: 66px;
    }
    .name {
      position: relative;
    }
    .teams {
      max-width: 170px;
      @media (max-width: 450px) {
        max-width: none;
      }
    }
    .file {
      align-items: center;
      label {
        cursor: pointer;
      }
      .label {
        color: var(--el-color-success);
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: 1px solid;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
</style>