<template>
  <div class="lib-filter">

    <div class="lib-values">
      <div class="mt-5">
        <el-button @click="genresDrawer = true">Жанры</el-button>
        <el-button @click="tagsDrawer = true">Теги</el-button>
      </div>

      <el-drawer
          v-model="genresDrawer"
          title="Жанры"
          :size="sizeDrawer"
      >
        <div class="list-triple-box">
          <TripleBox
            v-for="{ id, name } in (inputData.genres)" 
            :id="id"
            :name="name"
            :objKey="'genres'"
            :key="id"
          />
        </div>
      </el-drawer>

      <el-drawer
        v-model="tagsDrawer"
        title="Теги"
        :size="sizeDrawer"
      >
        <div class="list-triple-box">
          <TripleBox
            v-for="{ id, name } in (inputData.tags)" 
            :id="id"
            :name="name"
            :objKey="'tags'"
            :key="id"
          />
        </div>
      </el-drawer>

      <div class="mt-5">
        <p class="subtitle">Типы</p>
        <div class="list-triple-box">
          <TripleBox
            v-for="{ id, name } in (inputData.types)" 
            :id="id"
            :name="name"
            :objKey="'types'"
            :key="id"
          />
        </div>
      </div>

      <div class="mt-5">
        <p class="subtitle">Формат выпуска</p>
        <div class="list-triple-box">
          <TripleBox
            v-for="{ id, name } in (inputData.formats)" 
            :id="id"
            :name="name"
            :objKey="'formats'"
            :key="id"
          />
        </div>
      </div>

      <div class="mt-5">
        <p class="subtitle">Возрастной рейтинг</p>
        <div class="flex flex-nowrap">
          <TripleBox 
            v-for="{ id, name } in (inputData.adult_ranks)" 
            :id="id"
            :name="name"
            :objKey="'adult_ranks'"
            :key="id" 
          />
        </div>
      </div>

      <div class="mt-5">
        <p class="subtitle">Перевод</p>
        <div class="list-triple-box">
          <TripleBox
            v-for="{ id, name } in (inputData.status_of_translations)" 
            :id="id"
            :name="name"
            :objKey="'status_of_translations'"
            :key="id"
          />
        </div>
      </div>

      <div class="mt-5">
        <p class="subtitle">Статус</p>
        <div class="list-triple-box">
          <TripleBox
            v-for="{ id, name } in (inputData.status_of_releases)" 
            :id="id"
            :name="name"
            :objKey="'status_of_releases'"
            :key="id"
          />
        </div>
      </div>

      <div class="mt-5">
        <p class="subtitle">Год выпуска</p>
        <div class="flex justify-evenly">
          <span class="subtitle">
            От
            <el-input-number style="width: 130px;" v-model="selected.years[0]" :step="1" :min="1930" :max="(new Date().getFullYear())" />
          </span>
          <span class="subtitle">
            До
            <el-input-number style="width: 130px;" v-model="selected.years[1]" :step="1" :min="1930" :max="(new Date().getFullYear())" />
          </span>
        </div>
      </div>

      <!-- <div class="mt-5">
        <p class="subtitle">Оценка пользователей</p>
        <div class="flex justify-evenly">
          <span class="subtitle">
            От
            <el-input-number style="width: 130px;" v-model="selected.ratings[0]" :step="0.1" :min="0" :max="9.9" />
          </span>
          <span class="subtitle">
            До
            <el-input-number style="width: 130px;" v-model="selected.ratings[1]" :step="0.1" :min="1" :max="10" />
          </span>
        </div>
      </div> -->

      <div class="mt-5">
        <p class="subtitle">Кол-во глав</p>
        <div class="flex justify-evenly">
          <span class="subtitle">
            От
            <el-input-number style="width: 130px;" v-model="selected.chapter_count[0]" :step="1" :min="1" :max="5000" />
          </span>
          <span class="subtitle">
            До
            <el-input-number style="width: 130px;" v-model="selected.chapter_count[1]" :step="1" :min="1" :max="5000" />
          </span>
        </div>
      </div>
    </div>
    
    <div class="lib-actions flex justify-evenly my-5">
      <el-button @click="resetData" plain>Сбросить</el-button>
      <el-button @click="fetchPosts" type="success" plain>Показать</el-button>
    </div>
  </div>
</template>


<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLibraryStore } from '@/stores/library'
import { useUserSettings } from '@/composables/useUserSettings'

const { sizeDrawer } = useUserSettings()
const { inputData, selected } = storeToRefs(useLibraryStore())
const { fetchInputData, resetData, fetchPosts } = useLibraryStore()

const tagsDrawer = ref(false)
const genresDrawer = ref(false)


fetchInputData()
</script>


<style lang="scss">
.lib-filter {
  // position: relative;
  .list-triple-box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .lib-values {}
  .lib-actions {}
}
</style>