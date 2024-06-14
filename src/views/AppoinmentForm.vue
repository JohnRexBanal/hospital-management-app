<template>
    <div class="container mt-5">
        <div class="card shadow mx-auto custom-card">
            <div class="card-header bg-primary text-white">
                <h4 class="mb-0">Book an Appointment</h4>
            </div>
            <div class="card-body">
                <form @submit.prevent="createAppointment">
                    <div class="mb-3">
                        <label for="doctor_id" class="form-label custom-label">Doctor</label>
                        <select id="doctor_id" class="form-control custom-input" v-model="form.doctor_id" required>
                            <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">{{ doctor.name }}</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="date" class="form-label custom-label">Date</label>
                        <input type="date" id="date" class="form-control custom-input" v-model="form.date" required>
                    </div>
                    <div class="mb-3">
                        <label for="time" class="form-label custom-label">Time</label>
                        <input type="time" id="time" class="form-control custom-input" v-model="form.time" required>
                    </div>
                    <div class="mb-3">
                        <label for="reason" class="form-label custom-label">Reason</label>
                        <textarea id="reason" class="form-control custom-input" v-model="form.reason" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Book Appointment</button>
                    <router-link to="/home" class="btn btn-secondary ms-2">Back</router-link>
                </form>
                <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import axios from 'axios';

export default {
    data() {
        return {
            form: {
                doctor_id: '',
                date: '',
                time: '',
                reason: '',
            },
            error: null,
        };
    },
    computed: {
        ...mapState(['doctors', 'isAuthenticated', 'userRole', 'user', 'error', 'token']),
        isPatient() {
            return this.user && this.user.role === 'patient';
        },
        token() {
            return localStorage.getItem('token') || '';
        },
    },
    methods: {
        ...mapActions(['fetchDoctors']),
        async loadDoctors() {
            try {
                this.doctors = await this.fetchDoctors();
            } catch (error) {
                this.error = 'Failed to load doctors';
            }
        },
        async createAppointment() {
    try {
        console.log('Token:', this.token); 
        console.log('User role:', this.userRole);

        const response = await axios.post(
            `${this.$root.$data.apiUrl}/appointments/create`,
            this.form,
            {
                headers: {
                    Authorization: `Bearer ${this.token}`,
                },
            }
        );

        console.log('Response:', response);  // Log the response for debugging
        this.error = null;
        alert('Appointment booked successfully');
    } catch (error) {
        console.error('Failed to book appointment', error);
        console.log('Error response:', error.response);  // Log the error response for debugging
        this.error = error.response?.data?.message || 'Failed to book appointment';
    }
}


    },
    created() {
        this.loadDoctors();
    },
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
