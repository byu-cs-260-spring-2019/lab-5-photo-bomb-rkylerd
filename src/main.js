import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import firebase from 'firebase';

Vue.config.productionTip = false;

var firebaseConfig = {
  apiKey: "AIzaSyD8hL_x5fued_tGZk4DjW2X8AdHLP3Xz9U",
  authDomain: "exam-965a4.firebaseapp.com",
  databaseURL: "https://exam-965a4.firebaseio.com",
  projectId: "exam-965a4",
  storageBucket: "exam-965a4.appspot.com",
  messagingSenderId: "132505753873",
  appId: "1:132505753873:web:1155bfce817aebe3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user => {
  if(user){
    store.commit('setUser',user);
  }
  else {
    store.commit('setUser',null);
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
