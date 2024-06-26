<template>
    <div>
      <SideBar></SideBar>
      <div v-if="isDoctor && user" class="card mb-5 mt-5 mx-5">
        <div class="card-header bg-primary text-white">
          <h5 class="card-title">Your Profile</h5>
        </div>
        <div class="card-body">
          <div class="table-responsive" v-if="!isLoadingUser && doctorProfile.name">
            <table class="table table-bordered">
              <thead>
                <tr class="table-dark">
                  <th>Name</th>
                  <th>Email</th>
                  <th>Specialization</th>
                  <th>Address</th>
                  <th>Contact Number</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{{ doctorProfile.name }}</td>
                  <td>{{ doctorProfile.email }}</td>
                  <td>{{ doctorProfile.specialization }}</td>
                  <td>{{ doctorProfile.address }}</td>
                  <td>{{ doctorProfile.phone }}</td>
                  <td>
                    <router-link :to="'/doctor/update/profile/' + doctorProfile.id" class="btn btn-primary btn-sm">Update</router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else-if="isLoadingUser">
            <p>Loading your profile data...</p>
          </div>
          <div v-else>
            <p>{{ userFetchError }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>

<script>
import SideBar from '@/components/SideBar.vue';
import { mapState, mapActions } from 'vuex';
import axios from 'axios';

export default {
  name: 'DoctorProfile',
  components: {
    SideBar
  },
  data() {
    return {
      doctorProfile: {},
      isLoadingUser: true,
      userFetchError: null
    };
  },
  computed: {
    ...mapState(['user']),
    isAuthenticated() {
      return !!this.user;
    },
    isDoctor() {
      return this.user && this.user.role === 'doctor';
    }
  },
  methods: {
    ...mapActions(['fetchCurrentUser']),
    async fetchDoctorProfile() {
      try {
        const response = await axios.get(`${this.$root.$data.apiUrl}/doctor/profile/${this.user.id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
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
    }
  },
  created() {
      if (this.isAuthenticated) {
        this.fetchCurrentUser().then(() => {
          if (this.isDoctor) {
            this.fetchDoctorProfile();
          }
        });
      }
    }
};
</script>