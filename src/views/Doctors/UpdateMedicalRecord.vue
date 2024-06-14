<template>
    <div class="container mt-5">
      <div class="card shadow mx-auto custom-card">
        <div class="card-header bg-primary text-white">
          <h4 class="mb-0">Update Medical Record</h4>
        </div>
        <div class="card-body">
          <form @submit.prevent="updatePatientData">
            <div class="mb-3">
              <label for="past_conditions" class="form-label custom-label">Past Conditions</label>
              <input type="text" class="form-control custom-input" id="past_conditions" v-model="form.past_conditions" required>
            </div>
            <div class="mb-3">
              <label for="surgical_history" class="form-label custom-label">Surgical History</label>
              <input type="text" class="form-control custom-input" id="surgical_history" v-model="form.surgical_history" required>
            </div>
            <div class="mb-3">
              <label for="allergies" class="form-label custom-label">Allergies</label>
              <input type="text" class="form-control custom-input" id="allergies" v-model="form.allergies">
            </div>
            <div class="mb-3">
              <label for="family_history" class="form-label custom-label">Confirm Password</label>
              <input type="text" class="form-control custom-input" id="family_history" v-model="form.family_history">
            </div>
            <div class="mb-3">
              <label for="current_medications" class="form-label custom-label">Current Medications</label>
              <input type="text" class="form-control custom-input" id="current_medications" v-model="form.current_medications" required>
            </div>
            
            <button type="submit" class="btn btn-primary">Update</button>
            <router-link to="/medical/list" class="btn btn-secondary ms-2">Back</router-link>
          </form>
          <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
          <div v-if="updateStatus === 'error'" class="alert alert-danger mt-3">An error occurred while updating the medical record.</div>
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
        past_conditions: '',
        surgical_history: '',
        allergies: '',
        family_history: '',
        current_medications: '',
      }
    };
  },
  computed: {
    ...mapState(['selectedPatient', 'error', 'updateStatus']),
  },
  methods: {
    ...mapActions(['fetchSinglePatient', 'updatePatient']),
    async loadPatientMedicalRecord() {
      const patientId  = this.$route.params.id;
      await this.fetchSinglePatient(patientId );
      console.log('Selected Medical Record:', this.selectedPatient);
      if (this.selectedPatient) {
        this.form.id = this.selectedPatient.id;
        this.form.past_conditions = this.selectedPatient.past_conditions || '';  
        this.form.surgical_history = this.selectedPatient.surgical_history || ''; 
        this.form.allergies = this.selectedPatient.allergies || '';  
        this.form.family_history = this.selectedPatient.family_history || '';  
        this.form.current_medications = this.selectedPatient.current_medications || '';  
      }
    },
    async updatePatientData() {
      await this.updatePatient(this.form);
      if (this.updateStatus === 'success') {
        alert('Medical Record updated successfully');
        this.$router.push('/medical/list');
      }
    }
  },
  created() {
    this.loadPatientMedicalRecord();
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