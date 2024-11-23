<template>
    <div class="login-container">
        <div class="register-box">
            <input type="text" placeholder="用户名" v-model="reg_username" />
            <input type="password" placeholder="密码" v-model="reg_password" />
            <button @click="register">注册</button>
        </div>
        <div class="login-box">
            <input type="text" placeholder="用户名" v-model="username" />
            <input type="password" placeholder="密码" v-model="password" />
            <button @click="login">登录</button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
    name: 'LoginPage',
    setup() {
        const router = useRouter();
        const store = useStore();
        const reg_username = ref('');
        const reg_password = ref('');
        const username = ref('');
        const password = ref('');

        const login = async () => {
            const res = await axios.get('http://localhost:8080/user/login', {
                params: {
                    username: username.value,
                    password: password.value
                }

            })
            if (res.data.code === 0) {
                store.commit('setToken', res.data.data);
                router.push('/postlist');
                return;
            }
            alert(res.data.data);
        }
        const register = async () => {
            const res = await axios.post('http://localhost:8080/user/register', {
                username: reg_username.value,
                password: reg_password.value
            })
            if (res.data.code === 0) {
                alert('注册成功');
                return;
            }
            alert(res.data.data);
        }
        return {
            login,
            register,
            reg_username,
            reg_password,
            username,
            password
        }
    }
}

</script>
<style scoped></style>