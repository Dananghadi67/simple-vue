<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useMessage } from "naive-ui";

const router = useRouter();
const message = useMessage();

const formData = ref({
    username: "",
    job: "",
});

// const state = reactive({
//   isLoading: false,
// })

const handleCreate = async () => {
    try {
        const response = await axios.post(`https://reqres.in/api/users`, {
            username: formData.value.username,
            job: formData.value.job,
        });
        router.push("/users");
        message.success("Success Add User")
        return response;
        // console.log("😊😊SUCCESS😊😊", response.data);
    } catch {
        console.error("Failed Add User");
    }
};
    // finally {
    //   setTimeout(() => {
    //     state.isLoading = false;
    //   }, 2000);
    //   }
const { mutate: onSubmit, isLoading } = useMutation({
    mutationFn: handleCreate,
    onMutate: () => {
        // state.isLoading = true;
    },
    onSuccess: (data) => {
        console.log(data) 
    },
});
</script>
<template>
    <div :class="$style.container">
        <n-space justify="center" align="center" vertical>
            <n-card :class="$style.logincard">
                <n-h4>Silahkan masukkan Username & Jobs </n-h4>
                <n-form :model="formData" ref="formRef">
                    <n-form-item path="username" label="username">
                        <n-input v-model:value="formData.username" round placeholder="Input username" />
                    </n-form-item>
                    <n-form-item path="job" label="job">
                        <n-input round type="job" show-job-on="click" placeholder="Input job"
                            v-model:value="formData.job" />
                    </n-form-item>
                    <template v-if="isLoading"></template>
                    <n-row :gutter="[0, 30]">
                        <n-col :span="24">
                            <div style="display: flex; justify-content: center">
                                <n-button round strong secondary type="success" @click="onSubmit" style="font-weight: bold"
                                    :loading="isLoading">Create</n-button>
                            </div>
                        </n-col>
                    </n-row>
                </n-form>
            </n-card>
        </n-space>
    </div>
</template>
<style scoped module>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-family: Century Gothic;
}

.logincard {
    width: 450px;
    background-color: theme("colors.white");
    border-radius: theme("borderRadius.lg");
    padding: theme("spacing.6");
    box-shadow: theme("boxShadow.xl");
    border-radius: 70px;
    padding: 40px;
}
</style>
