<template>
    <div>
        <SideBar></SideBar>
        <div class="row">
            <div class="col-12 mb-2 text-end"></div>
            <div class="col-12">
                <div class="card m-5 shadow">
                    <div class="card-header">
                        <div class="d-grid gap-2 d-md-flex justify-content-between">
                            <h4>Doctors List</h4>
                            <router-link to="/register" class="btn btn-primary">Create</router-link>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered">
                                <thead>
                                    <tr class="table-dark">
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Specialization</th>
                                        <th>Address</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th width="20%">Actions</th>
                                    </tr>
                                </thead>
                                <tbody v-if="doctors.length > 0">
                                    <tr v-for="(doctor, index) in doctors" :key="doctor.id">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ doctor.name }}</td>
                                        <td>{{ doctor.doctor.specialization }}</td>
                                        <td>{{ doctor.doctor.address }}</td>
                                        <td>{{ doctor.doctor.phone }}</td>
                                        <td>{{ doctor.email }}</td>
                                        <td>
                                            <div class="d-grid gap-2 d-md-flex justify-content-center">
                                                <button @click="viewDoctor(doctor)"
                                                    class="btn btn-info btn-sm">View</button>
                                                <router-link :to="'/doctor/update/' + doctor.id" class="btn btn-primary btn-sm">Update</router-link>
                                                <button @click="deleteDoctor(doctor.id)" class="btn btn-danger btn-sm">Delete</button>                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td colspan="6" class="text-center">No doctors available</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="viewDoctorModal" tabindex="-1" aria-labelledby="viewDoctorModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title" id="viewDoctorModalLabel">Doctor Profile</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container">
                            <div class="row mb-3">
                                <div class="col-4 text-end">
                                    <strong>Name:</strong>
                                </div>
                                <div class="col-8">
                                    {{ selectedDoctor.name }}
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-4 text-end">
                                    <strong>Specialization:</strong>
                                </div>
                                <div class="col-8">
                                    {{ selectedDoctor.doctor?.specialization }}
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-4 text-end">
                                    <strong>Address</strong>
                                </div>
                                <div class="col-8">
                                    {{ selectedDoctor.doctor?.address }}
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-4 text-end">
                                    <strong>Phone number</strong>
                                </div>
                                <div class="col-8">
                                    {{ selectedDoctor.doctor?.phone }}
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-4 text-end">
                                    <strong>Gender:</strong>
                                </div>
                                <div class="col-8">
                                    {{ selectedDoctor.email }}
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
    data() {
        return {
            selectedDoctor: {}
        }
    },
    components: {
        SideBar
    },
    name: "DoctorList",
    computed: {
        ...mapState(['doctors']),
    },
    methods: {
        ...mapActions(['fetchDoctors', 'deleteDoctor']),
        viewDoctor(doctor) {
            this.selectedDoctor = doctor;
            const modal = new Modal(document.getElementById('viewDoctorModal'));
            modal.show();
        }
    },
    mounted() {
        this.fetchDoctors();
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