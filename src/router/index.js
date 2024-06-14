import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import DashBoard from '@/components/DashBoard.vue'
import RegisterUser from '../views/RegisterUser.vue'
import DoctorList from '../views/Doctors/DoctorsList.vue'
import UpdateDoctors from '../views/Doctors/UpdateDoctors.vue'
import PatientList from '../views/Patients/PatientList.vue'
import UpdatePatients from '../views/Patients/UpdatePatients.vue'
import MedicalRecordList from '@/views/Patients/MedicalRecordList.vue'
import DoctorProfile from '../views/Doctors/DoctorProfile.vue'
import UpdateDoctorProfile from '@/views/Doctors/UpdateDoctorProfile.vue'
import UpdateMedicalRecord from '@/views/Doctors/UpdateMedicalRecord.vue'
import AppointmentForm from '@/views/AppointmentForm.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginPage
  },
  {
    path: "/logout",
    name: "logout",
    redirect: '/'

  },
  {
    path: "/register",
    name: "register",
    component: RegisterUser
  },
  
  {
    path: "/home",
    component: DashBoard,
    meta: { requiresAuth: true }
  },

  {
    path: '/appointment',
    component: AppointmentForm,
    meta: { requiresAuth: true }
  },

  // Doctor routes
  {
    path: '/doctors/list',
    component: DoctorList,
    meta: { requiresAuth: true }
  },
  
  {
    path: '/doctor/update/:id',
    component: UpdateDoctors,
    meta: { requiresAuth: true }
  },

  {
    path: '/doctor/profile/view',
    component: DoctorProfile,
    meta: { requiresAuth: true }
  },

  {
    path: '/medical/records/update/:id',
    component: UpdateMedicalRecord,
    meta: { requiresAuth: true }
  },

  {
    path: '/doctor/update/profile/:id',
    component: UpdateDoctorProfile,
    meta: { requiresAuth: true }
  },

  // Patient routes
  {
    path: '/patient/list',
    component: PatientList,
    meta: { requiresAuth: true }
  },
  {
    path: '/patient/update/:id',
    component: UpdatePatients,
    meta: { requiresAuth: true }
  },

  {
    path: '/medical/list',
    component: MedicalRecordList,
    meta: { requiresAuth: true }
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // Check if route requires authentication
  if (to.meta.requiresAuth && !localStorage.getItem("token")) {
    // Redirect to login page if not authenticated
    next("/");
  } else {
    next(); // Continue navigation
  }
});

export default router
