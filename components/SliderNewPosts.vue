<template>
  <el-col>
    
    <el-col
      :sm="{ span: 12, offset: 2 }"
      :md="{ span: 13, offset: 3 }"
    >
      <div class="title mb-6 mx-2">Новый тайтлы</div>
    </el-col>

    <el-scrollbar>
      <div class="flex">
        <span v-for="(item, index) in getNewPosts" :key="item.id">
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

const { getNewPosts } = storeToRefs(useHomeStore())
</script>
