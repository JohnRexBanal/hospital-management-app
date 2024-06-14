<template>
    <div class="container mt-5">
      <div class="card shadow mx-auto custom-card">
        <div class="card-header">
          <h4>Register User</h4>
        </div>
        <div class="card-body">
          <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
          <form @submit.prevent="register">
            <div class="mb-3">
              <label for="name" class="form-label custom-label">Name</label>
              <input type="text" class="form-control custom-input" id="name" v-model="user.name" required>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label custom-label">Email</label>
              <input type="email" class="form-control custom-input" id="email" v-model="user.email" required>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label custom-label">Password</label>
              <input type="password" class="form-control custom-input" id="password" v-model="user.password" required>
            </div>
            <div class="mb-3">
              <label for="password_confirmation" class="form-label custom-label">Confirm Password</label>
              <input type="password" class="form-control custom-input" id="password_confirmation" v-model="user.password_confirmation" required>
            </div>
            <div class="mb-3">
              <label for="role" class="form-label custom-label">Role</label>
              <select class="form-select custom-input" id="role" v-model="user.role" required>
                <option value="" disabled>Select Role</option>
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
              </select>
            </div>
            <div v-if="user.role === 'doctor'">
              <div class="mb-3">
                <label for="specialization" class="form-label custom-label">Specialization</label>
                <input type="text" class="form-control custom-input" id="specialization" v-model="user.specialization" required>
              </div>
              <div class="mb-3">
                <label for="address" class="form-label custom-label">Address</label>
                <input type="text" class="form-control custom-input" id="address" v-model="user.address" required>
              </div>
              <div class="mb-3">
                <label for="phone" class="form-label custom-label">Phone</label>
                <input type="text" class="form-control custom-input" id="phone" v-model="user.phone" required>
              </div>
            </div>
            <div v-if="user.role === 'patient'">
              <div class="mb-3">
                <label for="dob" class="form-label custom-label">Date of Birth</label>
                <input type="date" class="form-control custom-input" id="dob" v-model="user.dob" required>
              </div>
              <div class="mb-3">
                <label for="gender" class="form-label custom-label">Gender</label>
                <select class="form-select custom-input" id="gender" v-model="user.gender" required>
                  <option value="" disabled>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="contact_number" class="form-label custom-label">Contact Number</label>
                <input type="text" class="form-control custom-input" id="contact_number" v-model="user.contact_number" required>
              </div>
              <div class="mb-3">
                <label for="past_conditions" class="form-label custom-label">Past Conditions</label>
                <textarea class="form-control custom-textarea" id="past_conditions" v-model="user.past_conditions"></textarea>
              </div>
              <div class="mb-3">
                <label for="surgical_history" class="form-label custom-label">Surgical History</label>
                <textarea class="form-control custom-textarea" id="surgical_history" v-model="user.surgical_history"></textarea>
              </div>
              <div class="mb-3">
                <label for="allergies" class="form-label custom-label">Allergies</label>
                <textarea class="form-control custom-textarea" id="allergies" v-model="user.allergies"></textarea>
              </div>
              <div class="mb-3">
                <label for="family_history" class="form-label custom-label">Family History</label>
                <textarea class="form-control custom-textarea" id="family_history" v-model="user.family_history"></textarea>
              </div>
              <div class="mb-3">
                <label for="current_medications" class="form-label custom-label">Current Medications</label>
                <textarea class="form-control custom-textarea" id="current_medications" v-model="user.current_medications"></textarea>
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
          </form>
          <div v-if="registrationStatus === 'error'" class="alert alert-danger mt-3">
            Registration failed. Please check the form for errors.
          </div>
        </div>
      </div>
    </div>
  </template>
  
  

<script>
import { mapActions, mapState } from 'vuex';

export default {
    data() {
        return {
            user: {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                role: null,
                specialization: '',
                address: '',
                phone: '',
                dob: '',
                gender: '',
                contact_number: '',
                past_conditions: '',
                surgical_history: '',
                allergies: '',
                family_history: '',
                current_medications: '',
            },
        };
    },
    computed: {
        ...mapState(['error', 'registrationStatus']),
    },
    methods: {
        ...mapActions(['registerUser']),
        async register() {
            try {
                await this.registerUser(this.user);
                if (this.registrationStatus === 'success') {
                    this.resetForm();
                }
            } catch (error) {
                console.error('Registration error:', error);
            }
        },
        resetForm() {
            this.user = {
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
                role: null,
                specialization: '',
                address: '',
                phone: '',
                dob: '',
                gender: '',
                contact_number: '',
                past_conditions: '',
                surgical_history: '',
                allergies: '',
                family_history: '',
                current_medications: '',
            };
        },
        handleRegistrationStatus() {
            if (this.registrationStatus) {
                setTimeout(() => {
                    this.$store.commit('setRegistrationStatus', null);
                }, 5000);
            }
        }
    },
    watch: {
        registrationStatus() {
            this.handleRegistrationStatus();
        }
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

.custom-input,
.custom-textarea {
  max-width: 100%;
}

.custom-textarea {
  resize: vertical;
}

.btn-primary {
  background-color: #2c3e50;
  border-color: #2c3e50;
}

.alert {
  margin-top: 20px;
}

@media (max-width: 768px) {
  .custom-card {
    margin: 0 10px;
  }
}
</style>
