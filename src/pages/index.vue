<route>
{
  name:"Login",
  meta :{
    layout:"login",
    requiresAuth : false
  }
}</route>

<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";
import Cookie from "js-cookie";
import { FormInst, FormRules, useMessage } from "naive-ui";
const message = useMessage();
const formRef = ref<FormInst | null>(null);
const router = useRouter();

const formData = ref({
  email: "",
  password: "",
});

// const state = reactive({
//   isLoading: false,
// })

const handleSubmit = async () => {
  try {
    const response = await axios.post(`https://reqres.in/api/login`, {
      email: formData.value.email,
      password: formData.value.password,
    });
    return response;
    // console.log("😊😊SUCCESS😊😊", response.data);
  } catch {
    console.error("😡😡ERROR😡😡");
  }

  // finally {
  //   setTimeout(() => {
  //     state.isLoading = false;
  //   }, 2000);
  //   }
};
const { mutate, isLoading, isError } = useMutation({
  mutationFn: handleSubmit,
  onMutate: () => {
    // state.isLoading = true;
  },
  onSuccess: (data) => {
    console.log(data);
    message.success("Berhasil");
    Cookie.set("token", data?.data.token);
    router.push("/users");
  },
});

const onSubmit = () => {
  formRef.value?.validate((errors: any) => {
    if (errors?.length > 0) 
      return message.error("Failed");;
      mutate();
    
  });
};

const rules: FormRules = {
  email: [
    {
      type: "email",
      trigger: ["input", "blur"],
      message: () => {
        return "Please input email address @gmail.com";
      },
    },
    {
      required: true,
      message: () => {
        return "Please input email address";
      },
    },
  ],
  password: [
    {
      type: "string",
      trigger: ["input", "blur"],
      message: () => {
        return "Please input Password";
      },
    },
    {
      required: true,
      message: () => {
        return "Please input Password 8 characters";
      },
    },
  ],
};
</script>
<template>
  <div :class="$style.container">
    <n-space justify="center" align="center" vertical>
      <n-card :class="$style.logincard">
        <n-space justify="center">
          <h2>Dashboard Tele Sales eMET</h2>
        </n-space>
        <n-h4
          >Silahkan masukkan email & kata sandi untuk masuk ke akun Anda
        </n-h4>
        <n-form :model="formData" ref="formRef" :rules="rules">
          <n-form-item path="email" label="Email">
            <n-input
              v-model:value="formData.email"
              round
              placeholder="Input Email"
            />
          </n-form-item>
          <n-form-item path="password" label="Password">
            <n-input
              round
              type="password"
              show-password-on="click"
              placeholder="Input Password"
              v-model:value="formData.password"
            />
          </n-form-item>
          <template v-if="isLoading"></template>
          <n-row :gutter="[0, 30]">
            <n-col :span="24">
              <div style="display: flex; justify-content: center">
                <n-button
                  round
                  strong
                  secondary
                  type="success"
                  @click="onSubmit"
                  style="font-weight: bold"
                  :loading="isLoading"
                  >LOGIN</n-button
                >
              </div>
            </n-col>
          </n-row>
          <template v-if="isError">Error</template>
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
