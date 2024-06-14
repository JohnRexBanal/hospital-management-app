<template>
  <div>
    <SideBar></SideBar>
    <!-- Alerts for registration and update statuses -->
    <div v-if="registrationStatus === 'success'" class="alert alert-success mt-3 position-fixed top-0 end-0 alert-sm">
      <i class="bi bi-check-circle-fill"></i> Registration successful!
    </div>
    <!-- <div v-if="updateStatus === 'success'" class="alert alert-success mt-3 position-fixed top-0 end-0 alert-sm">
      <i class="bi bi-check-circle-fill"></i> Patient updated successfully!
    </div> -->

    <!-- Main dashboard content -->
    <div class="container mt-4">
      <!-- Greeting message -->
      <div class="greeting-message bg-light p-3 mb-4 rounded text-center">
        <h2>Welcome, {{ user ? user.name : '' }}</h2>
        <p class="lead" v-if="isAdmin || isDoctor">Here's an overview of the latest activities.</p>
        <p class="lead" v-if="isPatient">Here's an overview of your Profile.</p>
      </div>

      <!-- Cards for Patients count, Doctors count, Medical Records count, and Appointment count -->
      <div class="row row-cols-1 row-cols-md-4 g-4" v-if="isAdmin || isDoctor">
        <!-- Patients count card -->
        <div class="col">
          <div class="card h-100 bg-primary text-white">
            <div class="card-body">
              <h5 class="card-title"><i class="bi bi-person-fill"></i> Total Patients</h5>
              <p class="card-text">{{ countPatients }}</p>
            </div>
          </div>
        </div>
        <!-- Doctors count card -->
        <div class="col">
          <div class="card h-100 bg-success text-white">
            <div class="card-body">
              <h5 class="card-title"><i class="bi bi-person-badge-fill"></i> Total Doctors</h5>
              <p class="card-text">{{ countDoctors }}</p>
            </div>
          </div>
        </div>
        <!-- Medical Records count card -->
        <div class="col">
          <div class="card h-100 bg-info text-white">
            <div class="card-body">
              <h5 class="card-title text-nowrap"><i class="bi bi-journal-text"></i> Total Medical Records</h5>
              <p class="card-text">{{ countPatients }}</p>
            </div>
          </div>
        </div>
        <!-- Appointment count card -->
        <div class="col">
          <div class="card h-100 bg-warning text-dark">
            <div class="card-body">
              <h5 class="card-title"><i class="bi bi-calendar3"></i> Total Appointments</h5>
              <p class="card-text">{{ appointmentCount }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent doctors and patients -->
      <div class="row mt-4">
        <!-- Recent Doctors (visible to admin) -->
        <div class="col-md-6" v-if="isAdmin">
          <div class="card">
            <div class="card-header bg-secondary text-white">
              <h5 class="card-title"><i class="bi bi-people-fill"></i> Recent Doctors Added</h5>
            </div>
            <div class="card-body">
              <!-- Table of recent doctors -->
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(doctor, index) in recentDoctors" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ doctor.name }}</td>
                    <td>{{ doctor.email }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- Recent Patients (visible to doctor) -->
        <div class="col-md-6" v-if="isDoctor || isAdmin">
          <div class="card">
            <div class="card-header bg-secondary text-white">
              <h5 class="card-title"><i class="bi bi-person-plus-fill"></i> Recent Patients Added</h5>
            </div>
            <div class="card-body">
              <!-- Table of recent patients -->
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(patient, index) in recentPatients" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ patient.name }}</td>
                    <td>{{ patient.email }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>



      <!-- Profile section -->
      <div v-if="isPatient && user" class="card mb-4">
        <div class="card-header bg-primary text-white">
          <h5 class="card-title">Your Profile</h5>
        </div>
        <div class="card-body">
          <div class="table-responsive" v-if="patientProfile.name">
            <table class="table table-bordered">
              <thead>
                <tr class="table-dark">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>Date of Birth</th>
                  <th>Contact Number</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ patientProfile.name }}</td>
                  <td>{{ patientProfile.gender || 'Loading...' }}</td>
                  <td>{{ patientProfile.email || 'Loading...' }}</td>
                  <td>{{ patientProfile.dob || 'Loading...' }}</td>
                  <td>{{ patientProfile.contact_number || 'Loading...' }}</td>
                  <td>
                    <button @click="viewPatient(patient)" class="btn btn-info btn-sm">Medical Record</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else>
            <p>Loading your profile data...</p>
          </div>
        </div>
      </div>



    </div>
    <!-- Modal -->
    <div class="modal fade" id="viewPatientModal" tabindex="-1" aria-labelledby="viewPatientModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header bg-primary text-white">
            <h5 class="modal-title" id="viewPatientModalLabel">Patient Medical Profile</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="container">
              <h5 class="fw-bold mb-3">Section I: Patient's Basic Information</h5>
              <div class="row mb-2">
                <div class="col-4 text-end"><strong>Name:</strong></div>
                <div class="col-8">{{ patientProfile.name }}</div>
              </div>
              <div class="row mb-2">
                <div class="col-4 text-end"><strong>Gender:</strong></div>
                <div class="col-8">{{ patientProfile.gender }}</div>
              </div>
              <div class="row mb-2">
                <div class="col-4 text-end"><strong>Date of Birth:</strong></div>
                <div class="col-8">{{ patientProfile.dob }}</div>
              </div>
              <div class="row mb-2">
                <div class="col-4 text-end"><strong>Contact Number:</strong></div>
                <div class="col-8">{{ patientProfile.contact_number }}</div>
              </div>
              <div class="row mb-2">
                <div class="col-4 text-end"><strong>Email:</strong></div>
                <div class="col-8">{{ patientProfile.email }}</div>
              </div>

              <h5 class="fw-bold mb-3 mt-4">Section II: Medical History</h5>
              <div class="row mb-2">
                <div class="col-4 text-end"><strong>Past Conditions:</strong></div>
                <div class="col-8">{{ patientProfile.past_conditions }}</div>
              </div>
              <div class="row mb-2">
                <div class="col-4 text-end"><strong>Surgical History:</strong></div>
                <div class="col-8">{{ patientProfile.surgical_history }}</div>
              </div>
              <div class="row mb-2">
                <div class="col-4 text-end"><strong>Allergies:</strong></div>
                <div class="col-8">{{ patientProfile.allergies }}</div>
              </div>
              <div class="row mb-2">
                <div class="col-4 text-end"><strong>Family History:</strong></div>
                <div class="col-8">{{ patientProfile.family_history }}</div>
              </div>

              <h5 class="fw-bold mb-3 mt-4">Section III: Current Medications</h5>
              <div class="row mb-2">
                <div class="col-4 text-end"><strong>Medication and Dosage:</strong></div>
                <div class="col-8">{{ patientProfile.current_medications }}</div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue';
import { mapState, mapActions } from 'vuex';
import axios from 'axios';
import { Modal } from 'bootstrap';

export default {
  name: 'DashBoard',
  components: {
    SideBar
  },
  data() {
    return {
      patientProfile: {},
      isLoadingUser: true,
      userFetchError: null
    }
  },
  computed: {
    ...mapState(['registrationStatus', 'updateStatus', 'countDoctors', 'countPatients', 'appointmentCount', 'recentDoctors', 'recentPatients', 'user']),
    isAuthenticated() {
      return !!this.user;
    },
    isPatient() {
      return this.user && this.user.role === 'patient';
    },
    isAdmin() {
      return this.user && this.user.role === 'admin';
    },
    isDoctor() {
      return this.user && this.user.role === 'doctor';
    }
  },
  methods: {
    ...mapActions(['fetchPatientData', 'fetchDoctorData', 'fetchCurrentUser', 'fetchPatientCount', 'fetchDoctorCount', 'fetchRecentDoctors', 'fetchRecentPatients']),
    async fetchPatientProfile() {
      try {
        const response = await axios.get(`${this.$root.$data.apiUrl}/patient/profile/${this.user.id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data && response.data.name) {
          this.patientProfile = response.data;
        } else {
          console.error('Unexpected response structure:', response);
        }
      } catch (error) {
        console.error('API error:', error);
        this.userFetchError = 'Failed to fetch user data.';
      } finally {
        this.isLoadingUser = false;
      }
    },

    async fetchDoctorProfile() {
      try {
        const response = await axios.get(`${this.$root.$data.apiUrl}/doctor/profile/${this.user.id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data && response.data.name) {
          this.doctorProfile = response.data;
        } else {
          console.error('Unexpected response structure:', response);
        }
      } catch (error) {
        console.error('API error:', error);
        this.userFetchError = 'Failed to fetch user data.';
      } finally {
        this.isLoadingUser = false;
      }
    },
    viewPatient(patient) {
      this.selectedPatient = patient;
      const modalElement = document.getElementById('viewPatientModal');
      const modal = new Modal(modalElement);
      modal.show();
    }
  },
  mounted() {
    this.fetchPatientCount();
    this.fetchDoctorCount();
    this.fetchRecentDoctors();
    this.fetchRecentPatients();
  },
  created() {
    if (this.isAuthenticated) {
      this.fetchCurrentUser();
      if (this.isPatient) {
        this.fetchPatientProfile();
      } else if (this.isDoctor) {
        this.fetchDoctorProfile();
      }
    }
  }
};
</script>

<style>
.table-striped tbody tr:nth-of-type(odd) {
  background-color: rgba(0, 0, 0, 0.05);
}

.greeting-message {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 0.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
}
</style>