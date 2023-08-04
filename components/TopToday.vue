<template>
  <div>
    <div class="title mb-4">Топ дня</div>
    <div class="top-today mb-6  ">
      <TopTodayItem v-for="(item, index) in getTodayTop" :key="item.id"
        :id="item.id"
        :num="index+1"
        :alias="item.alias"
        :cover="item.cover"
        :title="item.title"
        :type="item.type"
        :rating="item.rating"
      />
    </div>
  </div>
</template>


<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useHomeStore } from '@/stores/home'

const { getTodayTop } = storeToRefs(useHomeStore())
</script>


<style lang="scss">
.top-today {
  width: 100%;
  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  // @media (max-width: 450px) {
  // }
}
</style>