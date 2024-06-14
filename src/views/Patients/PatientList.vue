<template>
    <div>
        <SideBar></SideBar>
        <div class="row">
            <div class="col-12 mb-2 text-end"></div>
            <div class="col-12">
                <div class="card m-5 shadow">
                    <div class="card-header">
                        <div class="d-grid gap-2 d-md-flex justify-content-between">
                            <h4>Patients List</h4>
                            <router-link to="/register" class="btn btn-primary" v-if="isAdmin">Create</router-link>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered">
                                <thead>
                                    <tr class="table-dark">
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Date of birth</th>
                                        <th>Contact number</th>
                                        <th>Email</th>
                                        <th width="20%">Actions</th>
                                    </tr>
                                </thead>
                                <tbody v-if="patients.length > 0">
                                    <tr v-for="(patient, index) in patients" :key="patient.id">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ patient.name }}</td>
                                        <td>{{ patient.patient.dob }}</td>
                                        <td>{{ patient.patient.contact_number }}</td>
                                        <td>{{ patient.email }}</td>
                                        <td>
                                            <div class="d-grid gap-2 d-md-flex justify-content-center">
                                                <button @click="viewPatient(patient)"  class="btn btn-info btn-sm">View</button>
                                                <router-link :to="'/patient/update/' + patient.id" class="btn btn-primary btn-sm">Update</router-link>
                                                <button @click="deletePatient(patient.id)" class="btn btn-danger btn-sm" v-if="isAdmin">Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td colspan="6" class="text-center">No Patients available</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     <!-- Modal -->
     <div class="modal fade" id="viewPatientModal" tabindex="-1" aria-labelledby="viewPatientModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-lg">
            <div class="modal-content">
              <div class="modal-header bg-primary text-white">
                <h5 class="modal-title" id="viewPatientModalLabel">Patient Profile</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="container">
                  <div class="row mb-3">
                    <div class="col-4 text-end">
                      <strong>Name:</strong>
                    </div>
                    <div class="col-8">
                      {{ selectedPatient.name }}
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-4 text-end">
                      <strong>Date of Birth:</strong>
                    </div>
                    <div class="col-8">
                      {{ selectedPatient.patient?.dob }}
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-4 text-end">
                      <strong>Contact Number:</strong>
                    </div>
                    <div class="col-8">
                      {{ selectedPatient.patient?.contact_number }}
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-4 text-end">
                      <strong>Email:</strong>
                    </div>
                    <div class="col-8">
                      {{ selectedPatient.email }}
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-4 text-end">
                      <strong>Gender:</strong>
                    </div>
                    <div class="col-8">
                      {{ selectedPatient.patient?.gender }}
                    </div>
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
    import { mapState, mapActions } from 'vuex';
    import SideBar from '@/components/SideBar.vue';
    import { Modal } from 'bootstrap';
    
    export default {
        components: {
            SideBar
        },
        name: "PatientList",
        data() {
        return {
          selectedPatient: {}
        };
        },
        computed: {
            ...mapState(['patients', 'isAuthenticated', 'userRole', 'user', 'error']),
            isAdmin() {
                return this.user && this.user.role === 'admin';
            },
            isDoctor() {
                return this.user && this.user.role === 'doctor';
            },
            isPatient() {
                return this.user && this.user.role === 'patient';
            },
        },
        methods: {
            ...mapActions(['fetchPatients', 'deletePatient']),
            viewPatient(patient) {
                this.selectedPatient = patient;
                const modalElement = document.getElementById('viewPatientModal');
                const modal = new Modal(modalElement);
                modal.show();
        }
    
        },
        mounted() {
            this.fetchPatients();
        },
    };
    </script>
    
    <style scoped>
    .table-responsive {
        overflow-x: auto;
    }
    
    .card-body {
        overflow-x: hidden;
    }
    
    .card-header h4 {
        margin: 0;
    }
    
    .table thead th {
        vertical-align: middle;
    }
    
    .table tbody td {
        vertical-align: middle;
    }
    
    .btn {
        border-radius: 5px;
    }
    
    .btn-info {
        background-color: #3498db;
        border-color: #3498db;
    }
    
    .btn-primary {
        background-color: #2c3e50;
        border-color: #2c3e50;
    }
    
    .btn-danger {
        background-color: #e74c3c;
        border-color: #e74c3c;
    }
    </style>