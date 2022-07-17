import { createStore } from 'vuex';
import axios from 'axios';
import router from '@/router';

export default createStore({
  state: {
    user: null,
    isLoggedIn: false,
    tariffList: [],
    userReservationList: [],
    adminReservationList: [],
    alertColor: 'White',
    alertMessage: '',
    triggerSnackBar: 0,
  },
  getters: {
    userData: (state) => state.user,
    isLoggedIn: (state) => state.isLoggedIn,
    tariffList: (state) => state.tariffList,
    triggerSnackBar: (state) => state.triggerSnackBar,
    alertMessage: (state) => state.alertMessage,
    alertColor: (state) => state.alertColor,
    userReservationList: (state) => state.userReservationList,
    adminReservationList: (state) => state.adminReservationList,
  },
  mutations: {
    login(state, userData) {
      state.user = userData;
      state.isLoggedIn = true;
    },

    updateUserData(state, userData) {
      state.user = userData;
    },

    adminReservationList(state, adminReservationList) {
      state.adminReservationList = adminReservationList;
    },

    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
    tariffList(state, tariffList) {
      state.tariffList = tariffList;
    },

    userReservationList(state, userReservationList) {
      state.userReservationList = userReservationList;
    },
    showErrorAlert(state, message) {
      state.triggerSnackBar = state.triggerSnackBar + 1;
      (state.alertMessage = message), (state.alertColor = 'red');
    },
    showWarningAlert(state, message) {
      state.triggerSnackBar = state.triggerSnackBar + 1;
      (state.alertMessage = message), (state.alertColor = 'warning');
    },
    showSuccessAlert(state, message) {
      state.triggerSnackBar = state.triggerSnackBar + 1;
      (state.alertMessage = message), (state.alertColor = 'success');
    },
  },
  actions: {
    async login({ commit }, payload) {
      const {
        data: { userData, isSuccess, message },
      } = await axios.post('api/auth/login', payload);
      if (isSuccess) {
        commit('login', userData);
        commit('showSuccessAlert', message);
        router.push('/panel');
      } else {
        commit('showErrorAlert', message);
      }
    },

    // Register

    async register({ commit }, payload) {
      try {
        const {
          data: { isSuccess, message },
        } = await axios.post('api/users', payload);

        isSuccess
          ? commit('showSuccessAlert', message)
          : commit('showErrorAlert', message);
      } catch (error) {
        commit('showErrorAlert', error.message);
      }
    },

    // Auth - send every request (if wants to access protected route)

    async auth({ commit, dispatch }) {
      try {
        const { data } = await axios.get('api/users/me');
        commit('login', data);
      } catch (error) {
        dispatch('logout');
      }
    },

    async updateUser({ commit, dispatch }, payload) {
      try {
        const {
          data: { userData, isSuccess, message },
        } = await axios.patch(`api/users/${payload.id}`, payload);
        isSuccess && commit('updateUserData', userData);
        commit('showErrorAlert', message);
      } catch (error) {
        dispatch('logout');
      }
    },

    // Logout

    async logout({ commit }, errorOccured) {
      try {
        if (errorOccured) {
          const {
            data: { message },
          } = await axios.get('api/auth/logout');
          commit('showSuccessAlert', message);
        }
      } catch (error) {
        error && null;
      } finally {
        commit('logout');
        router.push('login');
      }
    },

    // ========================= MANAGEMENT TARIFF ===========================

    // Get Tariff List

    async tariffList({ commit }) {
      try {
        const { data } = await axios.get('api/management/tariff');
        commit('tariffList', data);
      } catch (error) {
        commit('showErrorAlert', error.message);
      }
    },

    async addTariff({ commit, dispatch }, tariff) {
      try {
        const {
          data: { isSuccess, message },
        } = await axios.post('api/management/tariff', tariff);
        isSuccess
          ? commit('showSuccessAlert', message)
          : commit('showErrorAlert', message);
        dispatch('tariffList');
      } catch (error) {
        commit('showErrorAlert', error.message);
      }
    },

    async updateTariff({ commit, dispatch }, tariff) {
      try {
        const {
          data: { isSuccess, message },
        } = await axios.patch(`api/management/tariff/${tariff.id}`, tariff);
        isSuccess
          ? commit('showSuccessAlert', message)
          : commit('showErrorAlert', message);
        dispatch('tariffList');
      } catch (error) {
        commit('showErrorAlert', error.message);
      }
    },

    async deleteTariff({ commit, dispatch }, tariff) {
      try {
        const {
          data: { isSuccess, message },
        } = await axios.delete(`api/management/tariff/${tariff.id}`);
        isSuccess
          ? commit('showSuccessAlert', message)
          : commit('showErrorAlert', message);
        dispatch('tariffList');
      } catch (error) {
        commit('showErrorAlert', error.message);
      }
    },

    // ========================= MANAGEMENT ORDER RESERVATION ===========================

    async addOrderReservation({ commit }, payload) {
      try {
        const {
          data: { isSuccess, message },
        } = await axios.post('api/management/reservation', payload);
        isSuccess
          ? commit('showSuccessAlert', message)
          : commit('showErrorAlert', message);
        return isSuccess;
      } catch (error) {
        commit('showErrorAlert', error.message);
      }
    },

    async getReservationForCurrentUser({ commit }) {
      try {
        const {
          data: { isSuccess, message, orders },
        } = await axios.get('api/management/reservation/user');
        if (isSuccess) {
          commit('showSuccessAlert', message);
          commit('userReservationList', orders);
        } else {
          commit('showErrorAlert', message);
        }
      } catch (error) {
        commit('showErrorAlert', error.message);
      }
    },

    async getAllReservations({ commit }) {
      try {
        const {
          data: { isSuccess, message, orders },
        } = await axios.get('api/management/reservations');
        if (isSuccess) {
          commit('showSuccessAlert', message);
          commit('adminReservationList', orders);
        } else {
          commit('showErrorAlert', message);
        }
      } catch (error) {
        commit('showErrorAlert', error.message);
      }
    },

    async updateReservation({ commit, dispatch }, reservation) {
      try {
        const {
          data: { isSuccess, message },
        } = await axios.patch(
          `api/management/reservation/${reservation.id}`,
          reservation,
        );
        if (isSuccess) {
          commit('showSuccessAlert', message);
          dispatch('getAllReservations');
        } else {
          commit('showErrorAlert', message);
        }
      } catch (error) {
        commit('showErrorAlert', error.message);
      }
    },
  },
  modules: {},
});
