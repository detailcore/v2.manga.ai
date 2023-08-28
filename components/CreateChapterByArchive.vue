<template>
  <div class="item my-4">
    <div class="table-names subtitle">
      <span class="vol mr-1">Том</span>
      <span class="ch mr-1">Глава</span>
      <span class="name mr-1">Название</span>
      <span class="teams">Переводчики</span>
      <span class="file ml-1" :class="{ 'two': num > 0 }">Файл</span>
    </div>
    <div class="line">
      <el-input class="vol mr-1" v-model="chapters[num].volume" placeholder="Том" />
      <el-input class="ch mr-1" v-model="chapters[num].chapter" placeholder="Глава" />
      <el-input class="name mr-1" v-model="chapters[num].name" placeholder="не указано" />
      <client-only>
        <el-select class="teams" v-model="chapters[num].teams" value-key="id" placeholder="не выбраны" multiple>
          <el-option
            v-for="i in lastTeams"
            :key="i.id"
            :label="i.name"
            :value="i"
          />
        </el-select>
      </client-only>

      <div class="file ml-1 flex" v-if="chapters[num].isLoaded == false">
        <label :for="`file-${num}`" class="label">
          <el-icon>
            <ElIconDocument/>
          </el-icon>
        </label>
        <input :id="`file-${num}`" type="file" name="zipfile" accept=".zip" class="hidden" @change="onFile" />
        <el-button 
          v-show="num > 0" 
          type="danger"
          class="ml-1"
          :icon="ElIconDelete" 
          circle
          @click="chapters.splice(num, 1)"
        />
      </div>
      <div class="file ml-1 flex" v-if="chapters[num].isLoaded == true">
        <el-icon class="label">
          <ElIconCheck/>
        </el-icon>
      </div>
    </div>

    <div class="subline">
      <span v-if="!isLoading">{{ chapters[num].filename }}</span>
      <el-progress 
        v-else
        :indeterminate="true"
        :percentage="100"
        :duration="3"
        status="warning"
      />
    </div>

  </div>
</template>


<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useAddChapterStore } from '~/stores/addChapter'
import { typeName, NewChapter } from '@/services/interfaces'

// Props
const { num } = defineProps<{
  num: number
}>()

// Stores
const { setNewChapter, fetchCreateInfoChapter } = useAddChapterStore()
const { chapters, lastTeams, } = storeToRefs(useAddChapterStore())

// State

// Getters
const isLoading = computed(() => chapters.value[num].isLoaded == undefined )

// Setters
const onFile = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.length ? target.files[0] : null

  if(file) {
    chapters.value[num].file = file
    chapters.value[num].filename = file.name as string
  }
}
</script>