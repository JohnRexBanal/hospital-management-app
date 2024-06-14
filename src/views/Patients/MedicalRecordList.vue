<template>
    <div>
        <SideBar></SideBar>
        <div class="row">
            <div class="col-12 mb-2 text-end"></div>
            <div class="col-12">
                <div class="card m-5 shadow">
                    <div class="card-header">
                        <div class="d-grid gap-2 d-md-flex justify-content-between">
                            <h4>Medical Records List</h4>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered">
                                <thead>
                                    <tr class="table-dark">
                                        <th>#</th>
                                        <th>Patient's Name</th>
                                        <th>Gender</th>
                                        <th>Date of Birth</th>
                                        <th>Contact Number</th>
                                        <th width="20%">Actions</th>
                                    </tr>
                                </thead>
                                <tbody v-if="patients.length > 0">
                                    <tr v-for="(patient, index) in patients" :key="patient.id">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ patient.name }}</td>
                                        <td>{{ patient.patient.gender }}</td>
                                        <td>{{ patient.patient.dob }}</td>
                                        <td>{{ patient.patient.contact_number }}</td>
                                        <td>
                                            <div class="d-grid gap-2 d-md-flex justify-content-center">
                                                <button @click="viewPatient(patient)"  class="btn btn-info btn-sm">View</button>
                                                <router-link :to="'/medical/records/update/' + patient.id" class="btn btn-primary btn-sm">Update</router-link>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td colspan="6" class="text-center">No Medical Records available</td>
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
                        <h5 class="modal-title" id="viewPatientModalLabel">Patient Medical Profile</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <h5 class="fw-bold mb-3">Section I: Patient's Basic Information</h5>
                            <div class="row mb-2">
                                <div class="col-4 text-end"><strong>Name:</strong></div>
                                <div class="col-8">{{ selectedPatient.name }}</div>
                            </div>
                            <div class="row mb-2">
                                <div class="col-4 text-end"><strong>Gender:</strong></div>
                                <div class="col-8">{{ selectedPatient.patient?.gender }}</div>
                            </div>
                            <div class="row mb-2">
                                <div class="col-4 text-end"><strong>Date of Birth:</strong></div>
                                <div class="col-8">{{ selectedPatient.patient?.dob }}</div>
                            </div>
                            <div class="row mb-2">
                                <div class="col-4 text-end"><strong>Contact Number:</strong></div>
                                <div class="col-8">{{ selectedPatient.patient?.contact_number }}</div>
                            </div>
                            <div class="row mb-2">
                                <div class="col-4 text-end"><strong>Email:</strong></div>
                                <div class="col-8">{{ selectedPatient.email }}</div>
                            </div>

                            <h5 class="fw-bold mb-3 mt-4">Section II: Medical History</h5>
                            <div class="row mb-2">
                                <div class="col-4 text-end"><strong>Past Conditions:</strong></div>
                                <div class="col-8">{{ selectedPatient.patient?.past_conditions }}</div>
                            </div>
                            <div class="row mb-2">
                                <div class="col-4 text-end"><strong>Surgical History:</strong></div>
                                <div class="col-8">{{ selectedPatient.patient?.surgical_history }}</div>
                            </div>
                            <div class="row mb-2">
                                <div class="col-4 text-end"><strong>Allergies:</strong></div>
                                <div class="col-8">{{ selectedPatient.patient?.allergies }}</div>
                            </div>
                            <div class="row mb-2">
                                <div class="col-4 text-end"><strong>Family History:</strong></div>
                                <div class="col-8">{{ selectedPatient.patient?.family_history }}</div>
                            </div>

                            <h5 class="fw-bold mb-3 mt-4">Section III: Current Medications</h5>
                            <div class="row mb-2">
                                <div class="col-4 text-end"><strong>Medication and Dosage:</strong></div>
                                <div class="col-8">{{ selectedPatient.patient?.current_medications }}</div>
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
        ...mapState(['patients']),
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

.fw-bold {
    font-weight: bold;
}
</style>
