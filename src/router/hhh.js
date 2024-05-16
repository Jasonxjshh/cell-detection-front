import { createRouter, createWebHistory } from 'vue-router';
import AdminDoctorManagement from '@/components/AdminDoctorManagement.vue';
import AdminPatientManagement from '@/components/AdminPatientManagement.vue';
import DoctorPatientManagement from '@/components/DoctorPatientManagement.vue';
import CellUploadImage from '@/components/CellUploadImage.vue';
import CellResultManagement from '@/components/CellResultManagement.vue';
import PatientInfo from '@/components/PatientInfo.vue';
import PatientCellResult from '@/components/PatientCellResult.vue';
import UserProfile from '@/components/UserProfile.vue';

const routes = [
  {
    path: '/',
    redirect: '/profile'
  },
  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile
  },
  {
    path: '/admin',
    name: 'Admin',
    component: { render: h => h('router-view') }, // Placeholder component to act as a parent for nested routes
    children: [
      { path: 'doctor-management', name: 'AdminDoctorManagement', component: AdminDoctorManagement },
      { path: 'patient-management', name: 'AdminPatientManagement', component: AdminPatientManagement }
    ]
  },
  {
    path: '/doctor',
    name: 'Doctor',
    component: { render: h => h('router-view') },
    children: [
      { path: 'patient-management', name: 'DoctorPatientManagement', component: DoctorPatientManagement },
      { path: 'upload-image', name: 'CellUploadImage', component: CellUploadImage },
      { path: 'result-management', name: 'CellResultManagement', component: CellResultManagement }
    ]
  },
  {
    path: '/patient',
    name: 'Patient',
    component: { render: h => h('router-view') },
    children: [
      { path: 'info', name: 'PatientInfo', component: PatientInfo },
      { path: 'cell-result', name: 'PatientCellResult', component: PatientCellResult }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
