<template>
  <el-col
    :sm="{ span: 12, offset: 2 }"
    :md="{ span: 13, offset: 3 }"
    class="mx-2"
  >
    <div class="title mb-4">Новые главы</div>

    <div class="latest mb-6">

      <LatestItem v-for="{
          id,
          alias,
          cover,
          title,
          type,
          adult_rank,
          amount_chapters,
          new_chapter,
          rating,
        } in getLatest" :key="id"
        :id="id"
        :alias="alias"
        :cover="cover"
        :title="title"
        :type="type"
        :rating="rating"
        :adult_rank="adult_rank"
        :amount_chapters="amount_chapters"
        :new_chapter="new_chapter"
      />

    </div>
  </el-col>
</template>


<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useHomeStore } from '@/stores/home'

const { getLatest } = storeToRefs(useHomeStore())
</script>


<style lang="scss">
.latest {
  width: 100%;
  display: flex;
  flex-direction: column;

  // @media (max-width: 768px) {
  // }
  // @media (max-width: 450px) {
  // }
  .divider {
    border: 1px solid var(--el-border-color);
  }

  .latest-image {
    position: relative;
    .rank {
      padding: 2px;
      font-size: 0.75rem;
      top: 0;
      left: 0;
      position: absolute;
      color: #fff;
      background-color: rgba(164,0,0,.7);
      border-top-left-radius: 2px;
      border-bottom-right-radius: 2px;
    }
    img {
      border-radius: 2px;
    }
  }

  .latest-item {
    display: flex;
    // justify-content: space-between;
  }
  .latest-info {
    // width: 100%;
    .el-link {
      span {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-clamp: 2;
      }
    }
    .link-title {
      font-size: 1.1rem;
    }
    .link-chapter {
      font-size: 0.9rem;
      span {
        display: inline-block;
      }
    }
  }
}
</style>