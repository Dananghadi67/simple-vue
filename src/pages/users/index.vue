<route>{
  meta :{
    requiresAuth : true
  }
}</route>

<script setup lang="ts">
//import { Create, LogInOutline as LogInIcon } from '@vicons/ionicons5'
import { useQuery } from "@tanstack/vue-query";
import axios from "axios";
//import Cookies from "js-cookie";
//import { useRouter } from "vue-router";

//const router = useRouter()

async function getUsers() {
  const { data } = await axios.get(`https://reqres.in/api/users`);
  return data;
}

const {
  isLoading: isUserLoading,
  data: users,
  isError: isUserError,
} = useQuery({
  queryFn: getUsers,
  queryKey: ["users"],
});

// const handleLogout = () => {
//   Cookies.remove('token');
//   router.push('/');
// } 
</script>

<template>
  <template v-if="isUserLoading"><p>Loading....</p></template>
  <template v-else-if="isUserError">ERROR</template>
    <div v-else>
      <n-row :gutter="20">
        <n-col
          :span="8"
          style="margin-bottom: 1em"
          v-for="user in users?.data"
          :key="user.id"
        >
          <n-card class="flex justify-center items-center" style="font-family: Century Gothic; font-weight: bold"
            :title="user.first_name"
            @click="$router.push(`/users/${user.id}`)"
          >
            <img :src="user.avatar" />
          </n-card>
        </n-col>
      </n-row>
      <!-- <n-space>
        <n-button type="success" @click="$router.push('/create')"><template #icon>
              <n-icon><Create/></n-icon>
            </template>Create
            </n-button>
          <n-button @click="handleLogout" type="error">
            <template #icon>
              <n-icon><log-in-icon /></n-icon>
            </template>
            Logout
          </n-button>
      </n-space> -->
    </div>
</template>

<style scoped module>
</style>
