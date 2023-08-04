<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const route = useRoute()
const user = useUserStore()
const name = route.params.id
watchEffect(() => {
  user.setNewName(route.params.id as string)
})
await user.fetchPostById(+name)


// fetch('https://jsonplaceholder.typicode.com/posts/1')
//   .then((response) => response.json())
//   .then((json) => console.log(json))
// const { data: post } = await useFetch(`https://jsonplaceholder.typicode.com/posts/${name}`, { pick: ['title', 'body'] })

</script>

<template>
  <div m-3>
    <h3>Привет, {{ name }}!!</h3>

    <!-- <div>Title: {{ post.title }}</div>
    <div>Body: {{ post.body }}</div> -->

  <el-row>
    <el-col
      v-for="(item, index) in user.currentPost"
      :key="index"
      :span="4"
    >
      <el-card>
        <img
          :src="`http://astatic.manga.ai/uploads/titles/${item.id}/${item.cover.mid}`"
          class="image"
        />
        <div style="padding: 12px">{{ item.title_rus }}</div>
      </el-card>
    </el-col>
  </el-row>

    <template v-if="user.otherNames.length">
      <span>Also as known as:</span>
      <ul>
        <li v-for="otherName in user.otherNames" :key="otherName">
          <router-link :to="`/hi/${otherName}`" replace>
            {{ otherName }}
          </router-link>
        </li>
      </ul>
    </template>

    <Counter />

    <div>
      <NuxtLink to="/">Back</NuxtLink>
    </div>
  </div>
</template>
