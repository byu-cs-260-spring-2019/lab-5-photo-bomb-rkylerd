<template>
<div>
  <div v-if="user" class="header">
    <div>
      <h2>{{user.email}}</h2>
    </div>
    <div class="button">
      <p><button @click="logout" class="pure-button pure-button-primary">Logout</button></p>
    </div>
    <section id="footer">
        <a style="margin: auto" href="https://github.com/byu-cs-260-spring-2019/lab-5-photo-bomb-rkylerd" target="_blank">
          <img style="width: 15%; min-width: 100px;" src="http://icons.iconarchive.com/icons/artcore-illustrations/artcore-4/512/github-icon.png" alt="Github Spider Web Photo">
        </a>
      </section>
  </div>
  <div v-else>
    <router-link to="/register" class="pure-button">Register</router-link> or
    <router-link to="/login" class="pure-button">Login</router-link>
  </div>
</div>
</template>

<script>
export default {
  name: 'mypage',
  sassyPhrase: '',
  created() {
    this.$store.dispatch("getUser");
  },
  methods: {
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
      
    }
  }
}
</script>

<style scoped>
.pure-button {
  margin: 0px 20px;
}

.header {
  display: flex;
}

.header .button {
  margin-left: 50px;
  order: 2;
}

#footer {
    padding-top: 2rem;
    width: 10%;
    margin: auto;
}
</style>