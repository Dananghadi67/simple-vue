<script setup lang="ts">
import { useRoute } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import axios from "axios";

const route = useRoute();

async function getDetail() {
  const { data } = await axios.get(
    `https://reqres.in/api/users/${route.params.id}`
  );
  return data;
}
const { data: data } = useQuery({
  queryFn: getDetail,
  queryKey: ["data"],
});
</script>

<template>
  <div class="w-full min-h-screen flex justify-center items-center">
    <n-card class="container" style="text-align: center; font-weight: bold">
      <h1>{{ data?.data.first_name }} {{ data?.data.last_name }}</h1>
      <br/>
      <n-image :src="`${data?.data.avatar}`" />
      <h4>{{ data?.data.email }}</h4>
      <br />
    </n-card>
  </div>
</template>
<style>
.container {
  width: 450px;
  background-color: theme("colors.white");
  border-radius: theme("borderRadius.lg");
  padding: theme("spacing.6");
  box-shadow: theme("boxShadow.xl");
  font-family: Century Gothic;
  border-radius: 75px;
  padding: 5px;
}
</style>
