import { createStore } from "vuex";
import axios from "axios";
import router from "../router";

const apiUrl = "http://127.0.0.1:8000/api";

export default createStore({
  state: {
    token: localStorage.getItem("token") || "",
    user: JSON.parse(localStorage.getItem("user")) || null,
    status: "",
    error: null,
    userRole: localStorage.getItem("userRole") || "",
    registrationStatus: null,
    doctors: [],
    patients: [],
    medicalRecords: [],
    updateStatus: "",
    selectedPatient: null,
    selectedDoctor: null,
    recentDoctors: [],
    recentPatients: [],
    currentPatientId: null,
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    authStatus: (state) => state.status,
    userRole: (state) => (state.user ? state.user.role : null),
    user: (state) => state.user,
    error: (state) => state.error,
    doctors: (state) => state.doctors,
    patients: (state) => state.patients,
    selectedPatient: (state) => state.selectedPatient,
    selectedDoctor: (state) => state.selectedDoctor,
    recentDoctors: (state) => state.recentDoctors,
    recentPatients: (state) => state.recentPatients,
    currentPatientId: (state) => state.currentPatientId,
    isAdmin: (state) => {
      return state.user && state.user.role === "admin";
    },
    isDoctor: (state) => {
      return state.user && state.user.role === "doctor";
    },
    isPatient: (state) => {
      return state.user && state.user.role === "patient";
    },
  },
  mutations: {
    authRequest(state) {
      state.status = "loading";
      state.error = null;
    },
    authSuccess(state, { token, userData }) {
      console.log('Setting user role to:', userData.role); 
      console.log("User Data:", userData);
      state.status = "success";
      state.token = token;
      state.user = userData;
      state.userRole = userData.role;
      state.error = null;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("userRole", userData.role);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
    authError(state, error) {
      state.status = "error";
      state.error = error;
    },
    logout(state) {
      state.status = "";
      state.token = "";
      state.user = null;
      state.error = null;
      state.userRole = "";
      delete axios.defaults.headers.common["Authorization"];
    },
    registerRequest(state) {
      state.status = "loading";
      state.error = null;
      state.registrationStatus = null;
    },
    registerSuccess(state) {
      state.status = "success";
      state.error = null;
      state.registrationStatus = "success";
    },
    registerError(state, error) {
      state.status = "error";
      state.error = error;
      state.registrationStatus = "error";
    },
    setRegistrationStatus(state, value) {
      state.registrationStatus = value;
      // doctors
    },
    setDoctors(state, doctors) {
      state.doctors = doctors;
    },
    setSelectedDoctor(state, doctor) {
      state.selectedDoctor = doctor;
    },
    // patients
    setPatients(state, patients) {
      state.patients = patients;
    },
    setUpdateStatus(state, status) {
      state.updateStatus = status;
    },
    setSelectedPatient(state, patient) {
      console.log("Setting selectedPatient in Vuex:", patient);
      state.selectedPatient = patient;
    },
    setCountDoctors(state, count) {
      state.countDoctors = count;
    },
    setCountPatients(state, count) {
      state.countPatients = count;
    },

    // remove
    removePatient(state, id) {
      state.patients = state.patients.filter((patient) => patient.id !== id);
    },
    removeDoctor(state, id) {
      state.doctors = state.doctors.filter((doctor) => doctor.id !== id);
    },

    setRecentDoctors(state, doctors) {
      state.recentDoctors = doctors;
    },
    setRecentPatients(state, patients) {
      state.recentPatients = patients;
    },
    setCurrentPatientId(state, id) {
      state.currentPatientId = id;
    },
  },
  actions: {
    async login({ commit }, userData) {
      commit("authRequest");
      try {
        const response = await axios.post(`${apiUrl}/login`, userData);
        if (response.data && response.data.token && response.data.user) {
          const token = response.data.token;
          const user = response.data.user;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("userRole", user.role);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          commit("authSuccess", { token, userData: user });
        } else {
          console.error("Unexpected response structure:", response);
          commit("authError", "Unexpected response structure from the API");
        }
      } catch (error) {
        console.error("API error:", error);
        commit(
          "authError",
          error.response.data.message || "An error occurred during login"
        );
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("userRole");
      }
    },
    async logout({ commit, state }) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          return;
        }
        const response = await axios.post(
          `${apiUrl}/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        );
        if (response && response.data && response.data.message) {
          console.log(response.data.message);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          localStorage.removeItem("userRole");
          commit("logout");
          router.push("/");
        } else {
          console.error("Unexpected response structure:", response);
        }
      } catch (error) {
        console.error("Error logging out:", error);
      }
    },
    async fetchCurrentUser({ commit, state }) {
      if (state.token) {
        commit('authRequest');
        try {
          const response = await axios.get(`${apiUrl}/user`, {
            headers: {
              'Authorization': `Bearer ${state.token}`
            }
          });
          const user = response.data;
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('userRole', user.role);
          commit('authSuccess', { token: state.token, userData: user });
        } catch (error) {
          commit('authError', error.response.data.message || 'An error occurred while fetching user data');
        }
      }
    },
    async registerUser({ commit }, userData) {
      commit("registerRequest");
      try {
        const response = await axios.post(`${apiUrl}/register`, userData);
        if (response.data && response.data.message) {
          commit("registerSuccess");
          localStorage.setItem("registrationSuccess", "true");
          alert("Registration successful");
          router.push("/home");
        } else {
          console.error("Unexpected response structure:", response);
          commit("registerError", "Unexpected response structure from the API");
        }
      } catch (error) {
        console.error("API error:", error);
        commit(
          "registerError",
          error.response.data || "An error occurred during registration"
        );
      }
    },

    async fetchDoctors({ commit, state }) {
      if (state.token) {
        commit("authRequest");
        try {
          const response = await axios.get(`${apiUrl}/doctors/list`, {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          });
          console.log(response);
          const doctors = response.data;
          commit("setDoctors", doctors);
          commit("authSuccess", { token: state.token, userData: state.user });
        } catch (error) {
          commit(
            "authError",
            error.response.data.message ||
              "An error occurred while fetching user data"
          );
        }
      }
    },

    async fetchSingleDoctor({ commit, state }, id) {
      if (state.token) {
        commit("authRequest");
        try {
          const response = await axios.get(`${apiUrl}/doctor/show/${id}`, {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          });
          const doctor = response.data;
          commit("setSelectedDoctor", doctor);
        } catch (error) {
          commit(
            "authError",
            error.response.data.message ||
              "An error occurred while fetching user data"
          );
        }
      }
    },
    async updateDoctor({ commit, state }, doctor) {
      commit("authRequest");
      try {
        const response = await axios.put(
          `${apiUrl}/doctor/update/${doctor.id}`,
          doctor,
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        );
        console.log(response.data);
        const updatedDoctor = response.data;
        commit("setSelectedDoctor", updatedDoctor);
        commit("setUpdateStatus", "success");
      } catch (error) {
        console.error("API error:", error);
        commit(
          "authError",
          error.response.data.message ||
            "An error occurred while updating doctor data"
        );
        commit("setUpdateStatus", "error");
      }
    },
    async deleteDoctor({ commit, state }, id) {
      console.log("Deleting doctor with ID:", id);
      if (confirm("Are you sure you want to delete this user?")) {
        try {
          await axios.delete(`${apiUrl}/user/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          });
          commit("removeDoctor", id);
        } catch (error) {
          console.error("Error deleting user:", error);
          if (error.response && error.response.status === 403) {
            alert(
              "Unauthorized: You do not have permission to delete this user."
            );
          } else {
            alert("An error occurred while deleting the user.");
          }
        }
      }
    },

    async fetchPatients({ commit, state }) {
      if (state.token) {
        commit("authRequest");
        try {
          let response;
          // Check if the user is an admin
          if (state.userRole === "admin" || state.userRole === "doctor") {
            // If admin, fetch all patients
            response = await axios.get(`${apiUrl}/patients/list`, {
              headers: {
                Authorization: `Bearer ${state.token}`,
              },
            });
          } else {
            // If not admin, fetch only the patient's own data
            response = await axios.get(
              `${apiUrl}/patients/profile/${state.user.id}`,
              {
                headers: {
                  Authorization: `Bearer ${state.token}`,
                },
              }
            );
          }
          // Update state with the fetched patient data
          commit("setPatients", response.data);
          commit("authSuccess", { token: state.token, userData: state.user });
        } catch (error) {
          commit(
            "authError",
            error.response.data.message ||
              "An error occurred while fetching patient data"
          );
        }
      }
    },

    async fetchSinglePatient({ commit, state }, id) {
      console.log("Fetching single patient with ID:", id);

      if (state.token) {
        commit("authRequest");
        try {
          const response = await axios.get(`${apiUrl}/patients/show/${id}`, {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          });
          const patient = response.data;
          commit("setSelectedPatient", patient);
        } catch (error) {
          commit(
            "authError",
            error.response.data.message ||
              "An error occurred while fetching patient data"
          );
        }
      }
    },

    async updatePatient({ commit, state }, patient) {
      commit("authRequest");
      try {
        console.log("Patient data:", patient);
        const response = await axios.put(
          `${apiUrl}/patients/update/${patient.id}`,
          patient,
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        );
        console.log(response.data);
        const updatedPatient = response.data;
        commit("setSelectedPatient", updatedPatient);
        commit("setUpdateStatus", "success");
      } catch (error) {
        console.error("API error:", error);
        commit(
          "authError",
          error.response.data.message ||
            "An error occurred while updating patient data"
        );
        commit("setUpdateStatus", "error");
      }
    },
    async deletePatient({ commit, state }, id) {
      console.log("Deleting patient with ID:", id);
      if (confirm("Are you sure you want to delete this user?")) {
        try {
          await axios.delete(`${apiUrl}/user/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          });
          commit("removePatient", id);
        } catch (error) {
          console.error("Error deleting user:", error);
          if (error.response && error.response.status === 403) {
            alert(
              "Unauthorized: You do not have permission to delete this user."
            );
          } else {
            alert("An error occurred while deleting the user.");
          }
        }
      }
    },

    async fetchPatientCount({ commit, state }) {
      if (state.token) {
        commit("authRequest");
        try {
          const response = await axios.get(`${apiUrl}/patients/count`, {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          });
          const count = response.data;
          commit("setCountPatients", count);
          commit("authSuccess", { token: state.token, userData: state.user });
        } catch (error) {
          commit(
            "authError",
            error.response.data.message ||
              "An error occurred while fetching user data"
          );
        }
      }
    },
    async fetchDoctorCount({ commit, state }) {
      if (state.token) {
        commit("authRequest");
        try {
          const response = await axios.get(`${apiUrl}/doctors/count`, {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          });
          const count = response.data;
          commit("setCountDoctors", count);
          commit("authSuccess", { token: state.token, userData: state.user });
        } catch (error) {
          commit(
            "authError",
            error.response.data.message ||
              "An error occurred while fetching user data"
          );
        }
      }
    },

    async fetchRecentDoctors({ commit, state }) {
      if (state.token) {
        commit("authRequest");
        try {
          const response = await axios.get(`${apiUrl}/doctors/recent`, {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          });
          commit("setRecentDoctors", response.data);
          commit("authSuccess", { token: state.token, userData: state.user });
        } catch (error) {
          commit(
            "authError",
            error.response?.data?.message ||
              "An error occurred while fetching recent doctors"
          );
        }
      }
    },

    async fetchRecentPatients({ commit, state }) {
      if (state.token) {
        commit("authRequest");
        try {
          const response = await axios.get(`${apiUrl}/patients/recent`, {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          });
          commit("setRecentPatients", response.data);
          commit("authSuccess", { token: state.token, userData: state.user });
        } catch (error) {
          commit(
            "authError",
            error.response?.data?.message ||
              "An error occurred while fetching recent patients"
          );
        }
      }
    },
  },
});
