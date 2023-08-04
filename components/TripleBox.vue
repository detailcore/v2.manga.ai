<template>
  <label class="btn-triple-box my-1" @click="setSelectedArray(objKey, id, position)">
    <button 
      class="triple-box" 
      :class="classes"
      @click="togglePosition"
      :style="{
        'height': height + 'px',
        'min-width': width + 'px',
        'font-size': size + 'rem',
      }"
    >
    </button>
    <span class="mx-1 line-clamp-2">{{ name }}</span>
  </label>
</template>


<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLibraryStore } from '@/stores/library'

const { setSelectedArray } = useLibraryStore()
const { resetCount } = storeToRefs(useLibraryStore())

interface Props {
  size?: number
  width?: number
  height?: number
  id?: number
  name?: string
  objKey?: string
}

withDefaults(defineProps<Props>(), {
  size: 1,
  width: 20,
  height: 20,
  id: 0,
  name: '',
  objKey: '',
})

watch(resetCount, () => {
  position.value = 0
})

const position = ref<0|1|-1>(0)

const classes = computed(() => {
  if(position.value == -1) {
    return 'exclude'
  }
  if(position.value == 1) {
    return 'include'
  }
  return ''
})

const togglePosition = () => {
  switch (position.value) {
    case 0:
      position.value = 1
      break;
    case 1:
      position.value = -1
      break;
    case -1:
      position.value = 0
      break;
  }
}
</script>


<style lang="scss">
.btn-triple-box {
  width: 50%;
  display: flex;
  align-items: center;
}

.triple-box {
  padding: 0;
  cursor: pointer;
  position: relative;

  &:after {
    content: '';
    width: 100%;
    height: 100%;
    display: block;
  }
  &:before {
    position: absolute;
    content: '';
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
  }
  &.include::before {
    content: '+';
  }
  &.exclude::before {
    content: '-';
  }
  &.include::after {
    background-color: var(--el-color-success);
  }
  &.exclude::after {
    background-color: var(--el-color-danger);
  }
}
</style>