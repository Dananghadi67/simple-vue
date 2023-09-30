import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createRouter, createWebHistory } from "vue-router";
import naive from "naive-ui";
// import routes from "~pages";
import Cookies from "js-cookie";
import 'tailwindcss/tailwind.css'
// @ts-ignore
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'


const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

const routes = setupLayouts(generatedRoutes)

const app = createApp(App);
const router = createRouter({
  // ...
  routes,
  history: createWebHistory(),
})

router.beforeEach((to, from, next) => {
    // const publicPage = ['/'];
    // const authRequired = !publicPage.includes(to.path);
    const loggedIn = !!Cookies.get('token');
    if (to.meta.requiresAuth && !loggedIn) return next('/')
    if (to.name == "Login" && loggedIn) return next('/users')

    //console.log(loggedIn, authRequired);
    next();
    // if (authRequired && !loggedIn) {
      //   next('/login');
      // } else if (authRequired && !loggedIn) {
        //   next();
        // } else if (!authRequired && loggedIn) {
          //   next('/users');
  // } else {
    //   next();
    // }
  });
  
  app.use(VueQueryPlugin);
  app.use(naive);
  app.use(router);
  app.mount("#app");
