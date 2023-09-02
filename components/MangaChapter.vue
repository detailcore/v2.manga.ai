<template>
  <div class="chapter mb-2">
    <div class="chapter-title">Том {{ volume }} Глава {{ chapter }}</div>
    <div class="chapter-item" 
      v-for="{
        id,
        volume,
        chapter,
        name,
        updated_at,
        teams,
      } in chapters" 
      :key="id"
    >
      <div class="item-name-team">
        <el-link :href="urlChapter + id" class="chapter-link" :underline="false">
          <el-icon size="26px">
            <ArrowRightBottom />
          </el-icon>
          <span class="name" v-if="name">
            {{ name }}
          </span>
          <span v-else> Гл. {{ chapter }} </span>
        </el-link>

        <div class="teams subtitle" v-if="teams?.length > 0">
          <el-icon size="21px">
            <GroupOutline />
          </el-icon>
          <div class="list">
            <span v-for="team in teams" :key="team.id" class="team">{{ team.name }}</span>
          </div>
        </div>
      </div>

      <div class="item-like-data">
        <div class="time">
          <el-icon>
            <ElIconClock />
          </el-icon>
          <el-text>{{ updateTime(updated_at) }}</el-text>
        </div>
        <div class="admin-action">
          <el-button :icon="ElIconEditPen" size="small" type="warning" plain circle />
          <el-button :icon="ElIconDeleteFilled" size="small" type="danger" plain circle />
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ChapterInPost } from 'services/interfaces'
import GroupOutline from '@/components/Icons/GroupOutline.vue'
import ArrowRightBottom from '@/components/Icons/ArrowRightBottom.vue'
import { useUtils } from '~/composables/useUtils'

interface Chapters {
  chapters: ChapterInPost[]
}
const props = defineProps<Chapters>()

const { path } = useRoute()
const { updateTime } = useUtils()


const urlChapter = computed(() => path + '/')
const volume = computed(() => props.chapters[0].volume)
const chapter = computed(() => props.chapters[0].chapter)
</script>


<style lang="scss">
.chapter {
  width: 100%;
  background-color: var(--el-bg-color);
  border-radius: 2px;
  border: 1px solid var(--el-border-color-light);
  .chapter-title {
    align-items: center;
    background: linear-gradient(90deg,transparent,60%,var(--el-mask-color) 90%);
    border-radius: 2px 2px 0 0;
    display: flex;
    font-weight: 600;
    height: 26px;
    padding: 0 0 0 4px;
  }
  .chapter-item {
    border-left: 4px solid var(--el-border-color-light);
    // border-left: 4px solid rgba(0,255,34,.25);
    border-top: 1px solid var(--el-border-color-light);
    display: flex;
    justify-content: space-between;
    min-height: 26px;
    padding: 0 4px;
    overflow: hidden;

    .item-name-team {
      display: flex;
      flex-grow: 1;
      @media (max-width: 768px) {
        flex-direction: column;
      }
      .chapter-link {
        width: 65%;
        flex-grow: 1;
        display: flex;
        justify-content: left;
        align-items: center;
        @media (max-width: 768px) {
          width: auto;
        }
        .el-icon {
          margin: -10px 0px 0px -4px;
        }
      }
      .name {
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .teams {
        display: flex;
        align-items: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .list {
          display: flex;
          align-items: flex-start;
          flex-direction: column;
          justify-content: center;
        }
        .team {
          padding: 0 4px;
        }
        .el-icon {
          margin: -3px 0 0 0;
        }
      }
    }

    .item-like-data {
      display: flex;
      max-width: 210px;
      white-space: nowrap;
      .time {
        display: flex;
        align-items: center;
        .el-text {
          padding: 0 4px;
        }
      }
      .admin-action {
        display: flex;
      }
    }
  }
}
</style>