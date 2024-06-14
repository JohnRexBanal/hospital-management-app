<template>
    <div class="container mt-5">
      <div class="card shadow mx-auto custom-card">
        <div class="card-header bg-primary text-white">
          <h4 class="mb-0">Update Doctor</h4>
        </div>
        <div class="card-body">
          <form @submit.prevent="updateDoctorData">
            <div class="mb-3">
              <label for="name" class="form-label custom-label">Name</label>
              <input type="text" class="form-control custom-input" id="name" v-model="form.name" required>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label custom-label">Email</label>
              <input type="email" class="form-control custom-input" id="email" v-model="form.email" required>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label custom-label">Password</label>
              <input type="password" class="form-control custom-input" id="password" v-model="form.password">
            </div>
            <div class="mb-3">
              <label for="password_confirmation" class="form-label custom-label">Confirm Password</label>
              <input type="password" class="form-control custom-input" id="password_confirmation" v-model="form.password_confirmation">
            </div>
            <div class="mb-3">
              <label for="specialization" class="form-label custom-label">Specialization</label>
              <input type="text" class="form-control custom-input" id="specialization" v-model="form.specialization" required>
            </div>
            <div class="mb-3">
              <label for="address" class="form-label custom-label">Address</label>
              <input type="text" class="form-control custom-input" id="address" v-model="form.address" required>
            </div>
            <div class="mb-3">
              <label for="phone" class="form-label custom-label">Phone</label>
              <input type="text" class="form-control custom-input" id="phone" v-model="form.phone" required>
            </div>
            <button type="submit" class="btn btn-primary">Update</button>
            <router-link to="/doctors/list" class="btn btn-secondary ms-2">Back</router-link>
          </form>
          <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
          <div v-if="updateStatus === 'error'" class="alert alert-danger mt-3">An error occurred while updating the doctor.</div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        form: {
          id: '',
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
          specialization: '',
          address: '',
          phone: ''
        }
      };
    },
    computed: {
      ...mapState(['selectedDoctor', 'error', 'updateStatus']),
    },
    methods: {
      ...mapActions(['fetchSingleDoctor', 'updateDoctor']),
      async loadDoctor() {
        const doctorId = this.$route.params.id;
        await this.fetchSingleDoctor(doctorId);
        console.log('Selected Doctor:', this.selectedDoctor);
        if (this.selectedDoctor) {
          this.form.id = this.selectedDoctor.user_id;
        this.form.name = this.selectedDoctor.user?.name || '';  
        this.form.email = this.selectedDoctor.user?.email || ''; 
        this.form.specialization = this.selectedDoctor.specialization || '';  
        this.form.address = this.selectedDoctor.address || '';  
        this.form.phone = this.selectedDoctor.phone || '';  
        }
      },
      async updateDoctorData() {
        await this.updateDoctor(this.form);
        if (this.updateStatus === 'success') {
          alert('Doctor updated successfully');
          this.$router.push('/doctors/list');
        }
      }
    },
    created() {
      this.loadDoctor();
    }
  };
  