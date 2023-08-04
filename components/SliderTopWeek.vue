<template>
  <el-col
    class="mb-6"
    :sm="{ span: 20, offset: 2 }" 
    :md="{ span: 18, offset: 3 }"
  >

    <div class="title mb-6 mx-2">Популярные новинки (топовые за неделю или что-то такое)</div>

    <el-scrollbar>
      <div class="flex">
        <span v-for="(item, index) in getWeekTop" :key="item.id">
          <LibCard class="scrollbar-item"
            :id="item.id"
            :num="index+1"
            :alias="item.alias"
            :cover="item.cover"
            :title="item.title"
            :type="item.type"
            :rating="item.rating"
          />
        </span>
      </div>
    </el-scrollbar>

  </el-col>
</template>


<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useHomeStore } from '@/stores/home'

const { getWeekTop } = storeToRefs(useHomeStore())
</script>
