<template>
  <div class="manga">
    <el-image class="parallax" :src="coverUrl" :alt="manga.title_rus" />

    <div class="main flex justify-between px-3">
      <div class="cover">
        <el-image class="avatar" :src="coverUrl" :alt="manga.title_rus" />

        <el-button class="mt-2" type="success" :icon="Bookopen" style="width: 100%;">Читать</el-button>

        <client-only>
          <el-dropdown
            :trigger="'click'" 
            style="width: 100%;"
          >
            <el-button 
              class="mt-2" 
              :icon="ElIconArrowDown" 
              style="width: 100%;"
              plain 
            >
              В закладки
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :icon="(true) ? ElIconPlus : ElIconMinus">Action 1</el-dropdown-item>
                <el-dropdown-item :icon="(false) ? ElIconPlus : ElIconMinus">Action 2</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </client-only>

        <el-button class="mt-2" :icon="ElIconWarningFilled" plain style="width: 100%;">Пожаловаться</el-button>

        <div class="teams" v-if="manga.teams.length">
          <div class="title my-4">Переводчики</div>
          <TeamItem 
            v-for="{ id, name, cover } in manga.teams" 
            :key="id"
            :id="id"
            :name="name"
            :cover="cover"
          />

        </div>

      </div>

      <div class="description flex flex-col w-100%">
        <div class="names flex flex-col">
          <h1 class="line-clamp-2">{{ manga.title_rus }}</h1>
          <span class="subname mt-4 line-clamp-2" v-if="manga.title_orig">{{ manga.title_orig }}</span>
          <!-- <span class="subtitle mt-2" v-if="manga.title_alt">{{ manga.title_alt }}</span> -->
        </div>

        <el-breadcrumb separator="/" class="breadcrumb flex mt-4">
          <el-breadcrumb-item v-if="adultRank">
            <el-tag effect="dark" class="rank" type="danger">{{ adultRank }}</el-tag>
          </el-breadcrumb-item>
          <el-breadcrumb-item v-if="manga.type?.name">{{ manga.type?.name }}</el-breadcrumb-item>
          <el-breadcrumb-item v-if="manga.year">{{ manga.year }}</el-breadcrumb-item>
          <client-only>
            <el-breadcrumb-item v-if="manga.status_of_releases?.id">
              <el-tag effect="plain" :type="typeOfRelease">
                <el-tooltip content="Статус тайтла" placement="top">
                  {{ manga.status_of_releases.name }}
                </el-tooltip>
              </el-tag>
            </el-breadcrumb-item>
          </client-only>
          <el-breadcrumb-item v-if="manga.rating?.avg" class="rating">
            <el-icon class="mr-1" style="color: var(--el-color-warning);">
              <ElIconStarFilled/>
            </el-icon>
            <el-text size="large" class="avg" @click="ratingShow = true">
              {{ manga.rating?.avg }}
              <el-text size="small" class="amount">{{ number2Human(manga.rating.amount) }}</el-text>
            </el-text>
          </el-breadcrumb-item>
        </el-breadcrumb>

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

    <client-only>
      <el-dialog
        v-model="ratingShow"
        :width="sizeDialog"
        :lock-scroll="false"
        title="Оценки пользователей"
      >
        <MangaRating
          v-if="manga.rating?.avg"
          :avg="manga.rating.avg"
          :amount="manga.rating.amount"
          :stars="manga.rating.stars"
          :your="manga.rating.your"
        />
      </el-dialog>
    </client-only>
  </div>
</template>


<script setup lang="ts">
import Bookopen from '@/components/Icons/Bookopen.vue'
import { storeToRefs } from 'pinia'
import { useMangaStore } from '~/stores/manga'
import { useUserSettings } from '~/composables/useUserSettings'
import { useDisplayUtils } from '~/composables/useDisplayUtils'

const { params: { alias } } = useRoute()
const { public: { urlCoverTitle } } = useRuntimeConfig()
const { sizeDialog } = useUserSettings()
const { number2Human } = useDisplayUtils()

const ratingShow = ref(false)

const coverUrl = computed(() => urlCoverTitle + manga.value.id + '/' + manga.value.cover)
const adultRank = computed(() => {
  switch (manga.value.adult_rank?.max) {
    case 1:
      return false  
    case 2:
      return '16+'  
    case 3:
      return '18+'  
    default:
      return false
  }
})
const typeOfRelease = computed(() => {
  switch (manga.value.status_of_releases?.id) {
    case 1:
      return 'success'
    case 2:
      return 'warning'
    case 3:
      return ''
    case 4:
      return 'danger'
    case 5:
      return 'danger'
  }

})

const { fetchManga } = useMangaStore()
const { manga } = storeToRefs(useMangaStore())

await fetchManga(alias)
</script>


<style lang="scss">
.manga {
  min-height: calc(100vh - 60px);

  .parallax {
    height: 240px;
    overflow: hidden;
    position: relative;
    z-index: -1;
    box-shadow: inset 0 -20px 16px 8px rgba(0,0,0,.2);
    @media (max-width: 650px) {
      height: 300px;
      min-height: 50vh;
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
      top: 0;
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
      flex-direction: column-reverse;
    }

    .cover {
      width: 100%;
      margin-right: 20px;
      margin-top: -200px;
      max-width: 300px;
      position: relative;
      img {
        border-radius: 2px;
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
        .avatar {
          img {
            display: none;
          }
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
          font-size: 1.3rem;
        }
        .subtitle {
          font-size: 0.85rem;
        }
        @media (max-width: 650px) {
          text-indent: 0px;
          margin-top: 0.75rem;
          h1 {
            text-align: end;
            &.line-clamp-2 {
              line-clamp: 3;
              -webkit-line-clamp: 3
            }
          }
        }
      }
      .rank {
        font-weight: 900;
      }
      .breadcrumb {
        .rating {
          .avg {
            cursor: pointer;
            position: relative;
          }
          .amount {
            position: absolute;
            width: max-content;
            top: -12px;
            right: -20px;
          }
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