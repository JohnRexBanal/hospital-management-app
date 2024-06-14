<template>
    <div class="container d-flex justify-content-center align-items-center min-vh-100">
      <div class="card shadow-sm p-4 col-12 col-md-8 col-lg-4">
        <div class="card-body">
          <h6 class="text-center text-primary mb-4">Hospital Management System</h6>
          <h5 class="text-center mb-3">Login</h5>
          <form @submit.prevent="loginUser" class="col-12">
            <div class="form-group mt-3">
              <label for="email" class="form-label">Email address</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="email"
                placeholder="Enter email"
                required
                @input="clearError"
              />
              <small class="text-danger" v-if="error">{{ error }}</small>
            </div>
            <div class="form-group mt-3">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="password"
                placeholder="Password"
                required
                @input="clearError"
              />
            </div>
            <button type="submit" class="btn btn-primary mt-4 w-100">Login</button>
          </form>
        </div>
      </div>
    </div>
  </template>
    
    <script>
    import { mapActions, mapGetters } from 'vuex';
    
    export default {
      data() {
        return {
          email: '',
          password: ''
        };
      },
      computed: {
      ...mapGetters(['error'])
    },
    methods: {
      ...mapActions(['login']),
      async loginUser() {
        this.clearError();
        await this.login({ email: this.email, password: this.password });
        if (!this.authError) {
          this.$router.push('/home');
        }
      },
      clearError() {
        this.error = null;
      }
    }
  };
    </script>
  
  
  <style scoped>
  .card {
    border: none;
    border-radius: 0.5rem;
    background-color: #d8e3f8;
  }
  
  .form-label {
    font-weight: 500;
  }
  
  .text-primary {
    color: #007bff !important;
  }
  </style>
    