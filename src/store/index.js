import { createStore } from 'vuex';
const store = createStore({
    state: {
        user: localStorage.getItem('user') || null,
        token: localStorage.getItem('jwt-token') || '',
        isLoggedIn: localStorage.getItem('jwt-token') !== null && localStorage.getItem('user') !== null,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            localStorage.setItem('user', state.user);
        },
        setToken(state, token) {
            state.token = token;
            localStorage.setItem('jwt-token', token);
        },
        setIsLoggedIn(state, isLoggedIn) {
            state.isLoggedIn = isLoggedIn;
        },
        setCardSetting(state, CardSetting) {
            state.CardSetting = CardSetting;
        },
        logOut(state) {
            state.user = null;
            state.token = '';
            state.isLoggedIn = false;
            localStorage.removeItem('user');
            localStorage.removeItem('jwt-token');
        }
    }
});


export default store;