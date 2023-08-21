<template>
  <el-dropdown :trigger="'click'">
    <el-button :icon="ElIconUser" round>{{ user?.name }}</el-button>
    <template #dropdown>
      <el-dropdown-menu class="min-w-140px">
        <el-dropdown-item>
          <div class="flex flex-row items-center">
            <div class="mr-2">
              <el-avatar :src="user?.cover">{{ user?.name }}</el-avatar>
            </div>
            <div class="text-truncate">{{ user?.name }}</div>
          </div>
        </el-dropdown-item>
        <el-dropdown-item :icon="ElIconPlus">Тайтл</el-dropdown-item>
        <el-dropdown-item :icon="ElIconPlus">Команду</el-dropdown-item>
        <el-dropdown-item :icon="ElIconSetting">Настройки</el-dropdown-item>
        <!-- <el-dropdown-item>Всё моё</el-dropdown-item> -->
        <el-dropdown-item v-if="isAdmin" :icon="ElIconEditPen">Админка</el-dropdown-item>
        <el-dropdown-item v-if="isAdmin" :icon="ElIconEditPen">Модерация</el-dropdown-item>
        <el-dropdown-item 
          :icon="Logout" 
          class="justify-center"
          divided 
          @click="fetchLogout"
        >
          Выход
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>


<script setup lang="ts">
import Logout from '@/components/Icons/Logout.vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

const { user, isAdmin } = storeToRefs(useUserStore())
const { fetchLogout } = useUserStore()
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