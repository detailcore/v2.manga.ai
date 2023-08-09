<template>
  <div class="team-item cursor-pointer mb-3" @click="gotoByPath(`/manga/${id}`)">
    <el-image
      class="team-item-image"
      :src="coverUrl"
      :fit="'cover'"
      :alt="name"
      :error="'qwe'"
      lazy
    >
      <template #error>
        <div class="image-error">
          <el-icon>
            <ElIconPicture />
          </el-icon>
        </div>
      </template>
    </el-image>

    <div class="team-item-info pl-2">
      <div class="name line-clamp-1">{{ name }}</div>
      <div class="subtext mt-1 line-clamp-2">Команда</div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { useGoto } from "@/composables/useGoto"

interface Props {
  id: number
  name?: string
  cover?: string
}

const props = withDefaults(defineProps<Props>(), {
  id: 0,
  name: '',
  cover: '',
})

const { gotoByPath } = useGoto()
const { public: { urlCoverTeam } } = useRuntimeConfig()

const coverUrl = computed(() => (props.cover != null) ? urlCoverTeam + props.id + '/' + props.cover : '')

</script>


<style lang="scss">
.team-item {
  cursor: pointer;
  display: flex;
  position: relative;
  &:hover {
    opacity: 0.9;
    filter: saturate(150%);
  }

  @media (max-width: 768px) {
    // width: calc(50% - 0.25rem);
  }
  @media (max-width: 450px) {
    width: 100%;
  }
}

.team-item-image {
  height: 60px;
  width: 60px;
  .image-error {
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: var(--el-fill-color-light);
    color: var(--el-text-color-secondary);
    font-size: 30px;
  }
}

.team-item-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: calc(100% - 60px);
  .name {
    font-size: 1.15rem;
    font-weight: bold;
  }
  .subtext {
    color: var(--el-text-color-regular);
    font-size: 0.8rem;
    font-weight: 100;
  }
}
</style>