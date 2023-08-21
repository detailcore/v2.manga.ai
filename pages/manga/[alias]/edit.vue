<template>
  <el-row>
    <el-col 
      :xs="{ span: 24 }"
      :lg="{ span: 18, offset: 3 }" 
      class="manga-edit py-4 px-2"
    >

    <div class="title flex items-center my-2">
      Редактирование
      <el-icon>
        <ElIconCaretRight/>
      </el-icon>
      <el-link 
        class="title line-clamp-1" 
        :href="'/manga/' + alias" 
        :underline="false"
      >
        {{ manga.title_rus ? manga.title_rus : manga.title_eng }}
      </el-link>
    </div>
    <div class="subtitle mb-4">Изменяйте только необходимые поля</div>

    <div class="item mb-4">
      <div class="subtitle mb-1">Изменить обложку</div>
      <input class="hidden" id="cover" type='file' accept="image/*" @change="onChangeCover" />
      <div class="flex flex-row items-center">
        <label for="cover" class="cover-image" ref="cover">
          <el-image v-if="manga.cover && coverUrl" :src="coverUrl" />
          <span class="text py-4 px-2">Нажмите сюда для выбора изображения</span>
        </label>
        <el-button v-if="!coverUrl" class="ml-4" type="danger" @click="onChangeCover">Сбросить</el-button>
      </div>
    </div>

    <div class="item my-4">
      <div class="subtitle mb-1">Название на русском</div>
      <el-input v-model="selected.title_rus" placeholder="Русское название" />
    </div>

    <div class="item my-4">
      <div class="subtitle mb-1">Название на английском</div>
      <el-input v-model="selected.title_eng" placeholder="Английское название" />
    </div>

    <div class="item my-4">
      <div class="subtitle mb-1">Оригинальное название (без иероглифов)</div>
      <el-input v-model="selected.title_orig" placeholder="Оригинальное название (без иероглифов)" />
    </div>

    <div class="item my-4">
      <div class="subtitle mb-1">Другие названия разделенные двумя чертами || (допускаются иероглифы)</div>
      <el-input 
        v-model="selected.title_alt" 
        :autosize="{ minRows: 2 }"
        type="textarea" 
        placeholder="Альтернативные названия (возможно с иероглифами)"
      />
    </div>

    <div class="item">
      <div class="half mb-4">
        <div class="part my-1">
          <div class="subtitle mb-1">Тип</div>
          <client-only>
            <el-select v-model="selected.type" value-key="id" class="m-2" placeholder="Тип">
              <el-option
                v-for="item in editMangaCreateData.types"
                :key="item.id"
                :label="item.name"
                :value="item"
              />
            </el-select>
          </client-only>
        </div>
        <div class="part my-1">
          <div class="subtitle mb-1">Год</div>
          <el-input v-model="selected.year" placeholder="Год публикации" />
        </div>
      </div>
    </div>

    <div class="item">
      <div class="half mb-4">
        <div class="part my-1">
          <div class="subtitle mb-1">Автор</div>
          <client-only>
            <el-select
              v-model="selected.authors"
              value-key="id"
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="Введите текст и выберите из списка"
              :remote-method="fetchAuthors"
              :loading="loading"
            >
              <el-option
                v-for="item in findData.authors"
                :key="item.id"
                :label="item.name"
                :value="item"
              />
            </el-select>
          </client-only>
        </div>
        <div class="part my-1">
          <div class="subtitle mb-1">Художник</div>
          <client-only>
            <el-select
              v-model="selected.artists"
              value-key="id"
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="Введите текст и выберите из списка"
              :remote-method="fetchArtists"
              :loading="loading"
            >
              <el-option
                v-for="item in findData.artists"
                :key="item.id"
                :label="item.name"
                :value="item"
              />
            </el-select>
          </client-only>
        </div>
      </div>
    </div>

    <div class="item">
      <div class="half mb-4">
        <div class="part my-1">
          <div class="subtitle mb-1">Команды переводчиков</div>
          <client-only>
            <el-select
              v-model="selected.teams"
              value-key="id"
              multiple
              :filterable="true"
              :remote="true"
              reserve-keyword
              placeholder="Введите текст и выберите из списка"
              :remote-method="fetchTeams"
              :loading="loading"
            >
              <el-option
                v-for="item in findData.teams"
                :key="item.id"
                :label="item.name"
                :value="item"
              />
            </el-select>
          </client-only>
        </div>
        <div class="part my-1">
          <div class="subtitle mb-1">Издатель</div>
          <client-only>
            <el-select
              v-model="selected.publishers"
              value-key="id"
              multiple
              filterable
              remote
              reserve-keyword
              placeholder="Введите текст и выберите из списка"
              :remote-method="fetchPublishers"
              :loading="loading"
            >
              <el-option
                v-for="item in findData.publishers"
                :key="item.id"
                :label="item.name"
                :value="item"
              />
            </el-select>
          </client-only>
        </div>
      </div>
    </div>

    <div class="item">
      <div class="half mb-4">
        <div class="part my-1">
          <div class="subtitle mb-1">Формат</div>
          <client-only>
            <el-select v-model="selected.formats" value-key="id" class="m-2" placeholder="Формат выпуска" multiple>
              <el-option
                v-for="item in editMangaCreateData.formats"
                :key="item.id"
                :label="item.name"
                :value="item"
              />
            </el-select>
          </client-only>
        </div>
        <div class="part my-1">
          <div class="subtitle mb-1">Контент для взрослых</div>
          <client-only>
            <el-select v-model="selected.adult_rank" value-key="id" class="m-2" placeholder="Возрастной рейтинг">
              <el-option
                v-for="item in editMangaCreateData.adult_ranks"
                :key="item.id"
                :label="item.name"
                :value="item"
              />
            </el-select>
          </client-only>
        </div>
      </div>
    </div>

    <div class="item my-4">
      <div class="subtitle mb-1">Жанры</div>
      <client-only>
        <el-select v-model="selected.genres" filterable value-key="id" class="m-2" placeholder="Жанры" multiple>
          <el-option
          v-for="item in editMangaCreateData.genres"
            :key="item.id"
            :label="item.name"
            :value="item"
          />
        </el-select>
      </client-only>
    </div>

    <div class="item my-4">
      <div class="subtitle mb-1">Теги</div>
      <client-only>
        <el-select v-model="selected.tags" filterable value-key="id"  class="m-2" placeholder="Теги" multiple>
          <el-option
            v-for="item in editMangaCreateData.tags"
            :key="item.id"
            :label="item.name"
            :value="item"
          />
        </el-select>
      </client-only>
    </div>

    <div class="item">
      <div class="half mb-4">
        <div class="part my-1">
          <div class="subtitle mb-1">Статус произведения</div>
          <client-only>
            <el-select v-model="selected.status_of_releases" value-key="id" class="m-2" placeholder="Статус произведения">
              <el-option
                v-for="item in editMangaCreateData.status_of_releases"
                :key="item.id"
                :label="item.name"
                :value="item"
              />
            </el-select>
          </client-only>
        </div>
        <div class="part my-1">
          <div class="subtitle mb-1">Статус перевода</div>
          <client-only>
            <el-select v-model="selected.status_of_translation" value-key="id" class="m-2" placeholder="Статус перевода">
              <el-option
                v-for="item in editMangaCreateData.status_of_translations"
                :key="item.id"
                :label="item.name"
                :value="item"
              />
            </el-select>
          </client-only>
        </div>
      </div>
    </div>

    <div class="item my-4">
      <div class="subtitle mb-1">Описание</div>
      <el-input 
        v-model="selected.description" 
        :autosize="{ minRows: 4 }"
        type="textarea" 
        placeholder="Описание произведения"
      />
    </div>

    <div class="item my-4">
      <div class="subtitle mb-1">Ссылки для модерации</div>
      <div class="flex flex-row flex-nowrap">
        <div class="flex flex-col wfull">
          <el-input 
            v-if="selected.mod_link?.length"
            v-for="num in selected.mod_link?.length" 
            :key="num" 
            v-model="selected.mod_link[num-1]" 
            :placeholder="`Ссылки на источник ${num}`"
            class="mb-2"
          >
            <template #append v-if="num > 1">
              <el-button :icon="ElIconMinus" @click="selected.mod_link?.splice(num-1, 1)" />
            </template>
          </el-input>

        </div>
        <el-button 
          v-if="selected.mod_link?.length && selected.mod_link?.length < 4" 
          class="ml-2" 
          :icon="ElIconPlus" 
          @click="selected.mod_link?.push('')" 
        />
      </div>
    </div>

    <div class="item my-4" v-if="isAdmin">
      <div class="subtitle mb-1">Изменить URL тайтла (<u>изменять НЕ рекомендуется!</u>)</div>
      <el-input v-model="selected.alias" class="mb-4" />

      <div class="flex flex-row justify-center mb-2">
        <el-radio-group v-model="idStatus">
          <el-radio label="1">Опубликовано</el-radio>
          <el-radio label="2">Проверяется</el-radio>
          <el-radio label="3">Черновик</el-radio>
          <el-radio label="4">Снято</el-radio>
          <el-radio label="5">Отклонено</el-radio>
        </el-radio-group>
      </div>
    </div>

    <div class="item my-4 action">
      <el-button class="mb-2" type="danger" @click="initData">Отменить</el-button>
      <el-button class="mb-2" type="warning" @click="fetchUpdate(3)">Сохранить в черновик</el-button>
      <el-button class="mb-2" type="success" @click="fetchUpdate">Сохранить</el-button>
    </div>

    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '~/stores/user'
import { useEditStore } from '~/stores/edit'
import { useMangaStore } from '~/stores/manga'
import { Manga, typeName } from "services/interfaces"
const { params: { alias } } = useRoute()
const { public: { urlCoverTitle } } = useRuntimeConfig()

definePageMeta({
  middleware: 'auth'
})

const { fetchManga } = useMangaStore()
const { manga } = storeToRefs(useMangaStore())
const { isAdmin } = storeToRefs(useUserStore())
const { fetchSendData, fetchCreateDate, fetchFindData, setInitData } = useEditStore()
const { editMangaCreateData, findData } = storeToRefs(useEditStore())


const cover = ref() // $ref DOM Element
const coverUrl = ref('')
const loading = ref(false)
const idStatus = ref('')
const selectedCover = ref<string | File>('')
const selected = ref<Manga>({} as Manga)

const imageUrl = computed<string>(() => urlCoverTitle + manga.value.id + '/' + manga.value.cover)

const onChangeCover = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.length ? target.files[0] : null
  let imageView = new FileReader(),
      src = cover.value as HTMLElement

  if(file) {
    imageView.onload = (el) => {
      const img = new Image()
      img.src = el.target?.result as string
      img.onload = () => {
        src.style.aspectRatio = (img.width / img.height).toFixed(2)
        src.style.backgroundImage = `url('${img.src}')`
      }

    }
    imageView.readAsDataURL(file)
    selectedCover.value = file
    coverUrl.value = ''
  } else {
    selectedCover.value = ''
    src.style.aspectRatio = 'auto'
    src.style.backgroundImage = 'none'
    coverUrl.value = imageUrl.value
  }
}

const fetchTeams = (query: string) => fetchFindData('teams', 'teams', query)
const fetchAuthors = (query: string) => fetchFindData('peoples', 'authors', query)
const fetchArtists = (query: string) => fetchFindData('peoples', 'artists', query)
const fetchPublishers = (query: string) => fetchFindData('publishers', 'publishers', query)

const isOriginalCover = () => !selectedCover.value
const isOriginalStr = (key: keyof Manga) => (manga.value[key] as string).trim() === (selected.value[key] as string).trim()
const isOriginalObj = (key: 'adult_rank' | 'status_of_releases' | 'status_of_translation' | 'type') => manga.value[key]?.id === selected.value[key]?.id
const isOriginalArr = (key: keyof Manga) => JSON.stringify((manga.value[key] as typeName[]).map(i => i.id)) === JSON.stringify((selected.value[key] as typeName[]).map(i => i.id))

const getIdsFromArrays = (arr: typeName[]) => {
  return arr.length ? [... new Set(arr.map(i => i.id))].join() : '-1'
  // const str: string = [... new Set(arr.map(i => i.id))].join() // '1,2,3,4'
  // return str === '' ? '-1' : str
}


const fetchUpdate = async (status = 0) => {
  const data = new FormData()

  // Фильтруем данные перед отправкой
  if(!isOriginalStr('alias') && isAdmin.value) data.append('alias', selected.value.alias)
  if(!isOriginalCover() && selectedCover.value != '') data.append('image', selectedCover.value)
  if(!isOriginalStr('title_rus') && selected.value.title_rus) data.append('title_rus', selected.value.title_rus)
  if(!isOriginalStr('title_eng') && selected.value.title_eng) data.append('title_eng', selected.value.title_eng)
  if(!isOriginalStr('title_orig') && selected.value.title_orig) data.append('title_orig', selected.value.title_orig)
  if(!isOriginalStr('title_alt') && selected.value.title_alt) data.append('title_alt', selected.value.title_alt)
  if(!isOriginalObj('type') && selected.value.type?.id) data.append('id_type', selected.value.type.id + '')
  if(!isOriginalStr('year') && selected.value.year) data.append('year', selected.value.year)
  if(!isOriginalArr('authors') && selected.value.authors) data.append('id_author', getIdsFromArrays(selected.value.authors))
  if(!isOriginalArr('artists') && selected.value.artists) data.append('id_artist', getIdsFromArrays(selected.value.artists))
  if(!isOriginalArr('teams') && selected.value.teams) data.append('id_teams', getIdsFromArrays(selected.value.teams))
  if(!isOriginalArr('publishers') && selected.value.publishers) data.append('id_publishers', getIdsFromArrays(selected.value.publishers))
  if(!isOriginalArr('formats') && selected.value.formats) data.append('id_formats', getIdsFromArrays(selected.value.formats))
  if(!isOriginalObj('adult_rank') && selected.value.adult_rank?.id) data.append('id_adult_rank', selected.value.adult_rank.id + '')
  if(!isOriginalArr('genres') && selected.value.genres) data.append('id_genres', getIdsFromArrays(selected.value.genres))
  if(!isOriginalArr('tags') && selected.value.tags) data.append('id_tags', getIdsFromArrays(selected.value.tags))
  if(!isOriginalObj('status_of_releases') && selected.value.status_of_releases?.id) data.append('id_status_of_releases', selected.value.status_of_releases.id + '')
  if(!isOriginalObj('status_of_translation') && selected.value.status_of_translation?.id) data.append('id_status_of_translation', selected.value.status_of_translation.id + '')
  if(!isOriginalStr('description') && selected.value.description) data.append('description', selected.value.description)
  if(
    selected.value.mod_link?.length
    // && manga.value.mod_link?.toString() !== selected.value.mod_link?.toString()
  ) data.append('mod_link', ((selected.value.mod_link as []).filter(Boolean)).join('||') )

  if(status == 3) { // Отправить в черновик
    data.append('status', status + '')
  } else if (isAdmin.value && idStatus.value != '') { // Куда угодно
    data.append('status', idStatus.value)
  } else { // Отправить на модерацию
    data.append('status', '2')
  }

  await fetchSendData(manga.value.id, data) // Отправляем данные
}


/**
 * Инициализация данных
 */
const initData = () => {
  selected.value.alias = manga.value.alias

  selected.value.title_rus = manga.value.title_rus
  selected.value.title_eng = manga.value.title_eng
  selected.value.title_orig = manga.value.title_orig
  selected.value.title_alt = manga.value.title_alt

  selected.value.type = manga.value.type
  selected.value.year = manga.value.year

  setInitData('authors', manga.value.authors)
  selected.value.authors = manga.value.authors
  setInitData('artists', manga.value.artists)
  selected.value.artists = manga.value.artists

  setInitData('publishers', manga.value.publishers)
  selected.value.publishers = manga.value.publishers

  setInitData('teams', manga.value.teams)
  selected.value.teams = manga.value.teams

  selected.value.formats = manga.value.formats
  selected.value.adult_rank = manga.value.adult_rank

  selected.value.genres = manga.value.genres
  selected.value.tags = manga.value.tags

  selected.value.status_of_releases = manga.value.status_of_releases
  selected.value.status_of_translation = manga.value.status_of_translation

  selected.value.description = manga.value.description
  selected.value.mod_link = manga.value.mod_link

  coverUrl.value = manga.value.cover ? imageUrl.value : ''
  idStatus.value = ''
}

if(!manga.value.id) await fetchManga(alias)
await fetchCreateDate()
initData() // выполнить в конце файла
</script>


<style lang="scss">
.manga-edit {
  .item {
    &.action {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      @media (max-width: 450px) {
        flex-direction: column;
        align-items: center;
      }
    }
    .el-select {
      width: 100%;
      margin: 0;
    }
    .cover-image {
      align-items: center;
      background-position: 50%;
      background-repeat: no-repeat;
      background-size: contain;
      border: 2px dashed var(--el-border-color);
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      max-height: 350px;
      min-height: 70px;
      width: 60%;
      @media (max-width: 650px) {
        width: 100%;
        max-height: 450px;
      }
      img,
      .el-image {
        max-height: inherit;
      }
      .text {
        text-align: center;
      }
    }
    .input {
      max-width: 100%;
    }
    .half {
      width: 100%;
      display: flex;
      flex-direction: row;
      @media (max-width: 650px) {
        flex-direction: column;
      }
      .part {
        width: 50%;
        @media (max-width: 650px) {
          width: 100%;
        }
        &:nth-child(even) {
          margin-left: 0.5rem;
          @media (max-width: 650px) {
            margin-left: 0;
          }
        }
      }
    }
  }
}
</style>