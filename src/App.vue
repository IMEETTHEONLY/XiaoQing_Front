<template>
  <router-view></router-view>
  <!-- <CommentCompotent></CommentCompotent> -->
   <button @click="logout">退出登陆</button>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

// import CommentCompotent from "./components/CommentCompotent.vue";
export default {
  name: "AppComponent",
  setup() {
    const store = useStore();
    const router = useRouter();
    const isLoggedIn = computed(() => store.state.isLoggedIn);

    onMounted(async() => {
      if (!isLoggedIn.value) {
        router.push('/login');
      }
    });
    const logout = () => {
      store.commit('logOut');
      router.push('/login');
    }
    return {
      logout
    }
  },
};
</script>

<style></style>
