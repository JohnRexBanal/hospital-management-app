<template>
    <div class="container mt-5">
      <div class="card shadow mx-auto custom-card">
        <div class="card-header bg-primary text-white">
          <h4 class="mb-0">Update Patient</h4>
        </div>
        <div class="card-body">
          <form @submit.prevent="updatePatientData">
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
            <button type="submit" class="btn btn-primary">Update</button>
            <router-link to="/patient/list" class="btn btn-secondary ms-2">Back</router-link>
          </form>
          <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
          <div v-if="updateStatus === 'error'" class="alert alert-danger mt-3">An error occurred while updating the patient.</div>
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
          password_confirmation: ''
        }
      };
    },
    computed: {
      ...mapState(['selectedPatient', 'error', 'updateStatus']),
    },
    watch: {
      selectedPatient(newVal) {
        if (newVal) {
          this.form.id = newVal.id;
          this.form.name = newVal.user?.name || '';
          this.form.email = newVal.user?.email || '';
        }
      }
    },
    methods: {
      ...mapActions(['fetchSinglePatient', 'updatePatient']),
      async loadPatient() {
        const patientId = this.$route.params.id;
        await this.fetchSinglePatient(patientId);
      },
      async updatePatientData() {
        console.log('Form data:', this.form);
        await this.updatePatient(this.form);
        if (this.updateStatus === 'success') {
          alert('Patient updated successfully');
          this.$router.push('/patient/list');
        }
      }
    },
    created() {
      this.loadPatient();
    }
  };
  </script>
  
  <style scoped>
  .card-header h4 {
    margin: 0;
  }
  
  .custom-card {
    max-width: 600px;
  }
  
  .custom-label {
    font-weight: bold;
  }
  
  .custom-input {
    max-width: 100%;
  }
  
  .alert {
    margin-top: 20px;
  }
  
  .btn-primary {
    background-color: #2c3e50;
    border-color: #2c3e50;
  }
  
  .btn-secondary {
    background-color: #6c757d;
    border-color: #6c757d;
  }
  
  @media (max-width: 768px) {
    .custom-card {
      margin: 0 10px;
    }
  }
  </style>
  