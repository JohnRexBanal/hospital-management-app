<template>
    <div class="container mt-5">
      <div class="card shadow mx-auto custom-card">
        <div class="card-header bg-primary text-white">
          <h4 class="mb-0">Update Doctor</h4>
        </div>
        <div class="card-body">
          <form @submit.prevent="updateDoctorData">
            <div class="mb-3">
              <label for="name" class="form-label custom-label">Name</label>
              <input type="text" class="form-control custom-input" id="name" v-model="form.name" required>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label custom-label">Email</label>
              <input type="email" class="form-control custom-input" id="email" v-model="form.email" required>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label custom-label">Password</label>
              <input type="password" class="form-control custom-input" id="password" v-model="form.password">
            </div>
            <div class="mb-3">
              <label for="password_confirmation" class="form-label custom-label">Confirm Password</label>
              <input type="password" class="form-control custom-input" id="password_confirmation" v-model="form.password_confirmation">
            </div>
            <div class="mb-3">
              <label for="specialization" class="form-label custom-label">Specialization</label>
              <input type="text" class="form-control custom-input" id="specialization" v-model="form.specialization" required>
            </div>
            <div class="mb-3">
              <label for="address" class="form-label custom-label">Address</label>
              <input type="text" class="form-control custom-input" id="address" v-model="form.address" required>
            </div>
            <div class="mb-3">
              <label for="phone" class="form-label custom-label">Phone</label>
              <input type="text" class="form-control custom-input" id="phone" v-model="form.phone" required>
            </div>
            <button type="submit" class="btn btn-primary">Update</button>
            <router-link to="/doctors/list" class="btn btn-secondary ms-2">Back</router-link>
          </form>
          <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
          <div v-if="updateStatus === 'error'" class="alert alert-danger mt-3">An error occurred while updating the doctor.</div>
        </div>
      </div>
    </div>
  </template>