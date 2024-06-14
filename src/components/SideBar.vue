<template>
    <div>
        <nav class="navbar navbar-dark bg-primary">
            <div class="container-fluid d-flex justify-content-between align-items-center">
                <button class="navbar-toggler" type="button" @click="toggleSidebar">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="d-flex align-items-center">
                    <i class="bi bi-person-circle me-2"></i>
                    <span class="text-white">{{ user ? user.role : ''}}</span>
                </div>
            </div>
        </nav>
        <div :class="['sidebar', { 'sidebar-closed': !sidebarOpen }]">
            <div class="sidebar-header d-flex justify-content-end">
                <button type="button" class="btn-close" aria-label="Close" @click="toggleSidebar"></button>
            </div>
            <div class="d-flex flex-column bg-light position-relative me-auto" style="height: calc(100vh - 40px);">
                <div class="sidebar-brand d-flex justify-content-center align-items-center mb-3">
                    <img src="@/assets/heart_logo.png" alt="Hospital Logo" class="logo me-2">
                    <span class="small">Hospital Management</span>
                </div>
                <hr>
                <ul class="nav flex-column mb-auto">
                    <li class="nav-item" v-if="isDoctor">
                        <router-link to="/doctor/profile/view" class="nav-link link-dark" active-class="active">
                            <i class="bi bi-person-square me-2"></i> Profile
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="isAdmin">
                        <router-link to="/home" class="nav-link link-dark" active-class="active">
                            <i class="bi bi-speedometer2 me-2"></i> Dashboard
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="isDoctor">
                        <router-link to="/home" class="nav-link link-dark" active-class="active">
                            <i class="bi bi-speedometer2 me-2"></i> Dashboard
                        </router-link>
                    </li>
                    
                    <li class="nav-item" v-if="isAdmin || isDoctor">
                        <router-link to="/patient/list" class="nav-link link-dark" active-class="active">
                            <i class="bi bi-people me-2"></i> Patients
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="isAdmin">
                        <router-link to="/doctors/list" class="nav-link link-dark" active-class="active">
                            <i class="bi bi-person-badge me-2"></i> Doctors
                        </router-link>
                    </li>
                   
                    <li class="nav-item" v-if="isAdmin || isDoctor">
                        <router-link to="/medical/list" class="nav-link link-dark" active-class="active">
                            <i class="bi bi-file-earmark-medical me-2"></i> Medical Records
                        </router-link>
                    </li>
                    
                    <li class="nav-item" v-if="isPatient">
                        <router-link to="/appointment" class="nav-link link-dark" active-class="active">
                            <i class="bi bi-clock-history me-2"></i>Appointment
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="position-absolute bottom-0 w-100">
                <hr>
                <button class="btn btn-link link-dark" @click.prevent="logoutUser">
                    <i class="bi bi-box-arrow-left"></i> Log Out
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            sidebarOpen: false,
        };
    },
    computed: {
        ...mapGetters(['user', 'isAuthenticated', 'authStatus', 'userRole', 'error']),
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
        toggleSidebar() {
            this.sidebarOpen = !this.sidebarOpen;
        },
        ...mapActions(['logout']),
        logoutUser() {
            this.logout();
        },
    },

};
</script>

<style scoped>
.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 250px;
    transition: transform 0.3s ease;
    z-index: 1000;
    overflow: hidden;
    background-color: #f8f9fa;
    border-right: 1px solid #dee2e6;
}

.sidebar-closed {
    transform: translateX(-250px);
}

.navbar-toggler {
    border: none;
    background-color: transparent;
}

.nav-link.active {
    background-color: #007bff;
    color: white;
}

.nav-link {
    display: flex;
    align-items: center;
}

.sidebar-header {
    padding: 0.5rem 1rem;
}

.sidebar-brand img {
    height: 30px;
}

.logo {
    width: 40px;
    border-radius: 50%;
}

.sidebar-brand span {
    font-weight: bold;
}
</style>
