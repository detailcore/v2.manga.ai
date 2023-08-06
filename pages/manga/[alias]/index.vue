<template>
  <div class="manga">
    <el-image class="parallax" :src="coverUrl" :alt="manga.title_rus" />

    <div class="main flex justify-between px-3">
      <div class="cover">
        <el-image class="" :src="coverUrl" :alt="manga.title_rus" />
      </div>

      <div class="description flex flex-col w-100%">
        <div class="names flex flex-col">
          <h1 class="line-clamp-2">{{ manga.title_rus }}</h1>
          <span class="subname mt-4 line-clamp-2" v-if="manga.title_orig">{{ manga.title_orig }}</span>
          <!-- <span class="subtitle mt-2" v-if="manga.title_alt">{{ manga.title_alt }}</span> -->
        </div>

        <div class="desc" itemscope itemtype="http://schema.org/CreativeWork">
          <div v-if="manga.description" class="text mt-5">{{ manga.description }}</div>
          <div v-else class="text mt-5">Описание отсутствует</div>

          <div class="stat">
            Статистика:
            рейтинг
            кто куда проголосовал
            Общее кол-во голосов
            кол-во коментов
            кол-во глав
            просмотров
            год выпуска
          </div>
        </div>
      </div>

    </div>

  </div>
</template>


<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMangaStore } from '~/stores/manga'
// import { useUserSettings } from '~/composables/useUserSettings'

const { params: { alias } } = useRoute()
const { public: { urlCoverTitle } } = useRuntimeConfig()

const coverUrl = computed(() => urlCoverTitle + manga.value.id + '/' + manga.value.cover)

const { fetchManga } = useMangaStore()
const { manga } = storeToRefs(useMangaStore())

await fetchManga(alias)
</script>


<style lang="scss">
// Создаём доп. переменные стили
// :root {
//   --main-bg-color: rgb(141, 199, 66);
//   &.dark {
//     --main-bg-color: brown;
//   }
// }
.manga {
  min-height: calc(100vh - 60px);

  .parallax {
    height: 240px;
    overflow: hidden;
    position: relative;
    z-index: -1;
    @media (max-width: 650px) {
      height: 300px;
    }
    &::after {
      content: '';
      position: fixed;
      background-color: var(--el-mask-color-extra-light);
      z-index: 1;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      @media (max-width: 650px) {
        content: none;
      }
    }
    img {
      top: -60px;
      left: 0;
      right: 0;
      width: 100%;
      height: auto;
      position: fixed;
      filter: blur(4px);
      @media (max-width: 650px) {
        filter: none;
      }
    }
  }

  .main {
    background-color: var(--el-bg-color-overlay);
    background: linear-gradient(0deg, var(--el-bg-color-overlay), 99%, transparent 105%);
    min-height: 530px;
    @media (max-width: 650px) {
      padding: 0 0.5rem;
      flex-direction: column-reverse;
    }

    .cover {
      width: 100%;
      margin-right: 20px;
      margin-top: -200px;
      max-width: 300px;
      position: relative;
      img {
        border-top-left-radius: 2px;
        border-top-right-radius: 2px;
      }
      @media (max-width: 1920px) {
        max-width: 280px;
      }
      @media (max-width: 1200px) {
        max-width: 260px;
      }
      @media (max-width: 992px) {
        max-width: 240px;
      }
      @media (max-width: 768px) {
        max-width: 220px;
      }
      @media (max-width: 650px) {
        margin: 0;
        max-width: none;
        img {
          display: none;
        }
      }
    }
    .description {
      .names {
        text-indent: 20px;
        line-height: normal;
        margin-top: -2rem;
        h1 {
          margin-top: -7px;
          font-weight: 900;
          font-size: 1.6rem;
          text-shadow: 2px 0 2px var(--el-bg-color);
        }
        .subname {
          color: var(--el-text-color-regular);
          font-size: 1.4rem;
        }
        .subtitle {
          font-size: 0.85rem;
        }
      }
      .desc {
        .text {
          // font-size: 1.1rem;
          text-indent: 20px;
          line-height: 1.5;
          text-align: justify;
          white-space: pre-wrap;
          word-wrap: break-word;
          word-break: break-word;
        }
      }
    }
  }
}
</style>