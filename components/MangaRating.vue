<template>
  <div class="stars-progress">
    <div class="flex justify-evenly text-4 -mt-4">
      <span>Рейтинг: <b>{{ avg }}</b></span>
      <span>Голосов: <b>{{ number2Human(amount) }}</b></span>
    </div>

    <div class="stars w100% flex flex-nowrap justify-evenly my-2">
      <div class="star flex flex-col" v-for="item in 10">
        <el-icon 
          :color="(your == item) ? 'var(--el-color-danger)' : ''"
          @click="setRate(item)"
        >
          <ElIconStarFilled />
        </el-icon>
        {{ (your == item) ? 'Я' : item }}
      </div>
    </div>

    <div class="flex flex-col-reverse">
      <div class="line my-1" v-for="(item, index) in stars">
        <div class="num">{{ index+1 }}</div>
        <div class="icon">
          <el-icon>
            <ElIconStarFilled/>
          </el-icon>
        </div>
        <div class="progress-line">
          <el-progress :percentage="+(item / amount * 100).toFixed(1)" />
        </div>
        <div class="count">{{ number2Human(item) }}</div>
      </div>
    </div>

    <el-button 
      class="mt-4 w100%" 
      type="danger" 
      size="small"
      plain
      v-if="your > 0"
      @click="setRate(0)"
    >
      Удалить оценку
    </el-button>
  </div>
</template>


<script setup lang="ts">
import { useMangaStore } from '~/stores/manga'
import { useDisplayUtils } from '~/composables/useDisplayUtils'

const { number2Human } = useDisplayUtils()
const { setRate } = useMangaStore()

interface Props {
  avg: string
  amount: number
  stars: number[]
  your: number
}

withDefaults(defineProps<Props>(), {
  avg: '',
  amount: 0,
  your: 0,
})
</script>


<style lang="scss">
  .stars-progress {
    position: relative;
    .line {
      width: 100%;
      height: auto;
      display: flex;
      flex-direction: row;
    }
    .num,
    .icon {
      min-width: 20px;
      text-align: center;
    }
    .icon {}
    .progress-line {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
    .count {
      width: 46px;
    }
    .stat {}
    .stars {
      position: relative;
      .star {
        max-width: 9.9%;
        text-align: center;
        i {
          font-size: 2.2rem;
          &:hover {
            color: var(--el-color-danger);
            cursor: pointer;
          }
        }
      }
    }
  }
</style>