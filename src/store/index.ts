import { createStore } from 'vuex';
import axios from 'axios';
// @TODO - resovle this problem
// eslint-disable-next-line import/no-cycle
import router from '@/router';
import {
  AuthLoginData,
  AuthState,
  DefaultResponse,
  FindUserResponse,
  getReservationForUserResponse,
  OrderReservationModel,
  Tariff,
  UserDataAfterFiltrationResponse,
  UserWithDetails,
} from '@/types';

export const store = createStore<AuthState>({
  state: {
    user: null,
    isLoggedIn: false,
    tariffList: [],
    userReservationList: [],
    adminReservationList: [],
    toastMessage: '',
    toastAlert: '',
  },
  getters: {
    userData: (state) => state.user,
    isLoggedIn: (state) => state.isLoggedIn,
    tariffList: (state) => state.tariffList,
    toastMessage: (state) => state.toastMessage,
    toastAlert: (state) => state.toastAlert,
    userReservationList: (state) => state.userReservationList,
    adminReservationList: (state) => state.adminReservationList,
  },
  mutations: {
    login(state, userData: FindUserResponse) {
      state.user = userData;
      state.isLoggedIn = true;
    },

    updateUserData(state, userData: FindUserResponse) {
      state.user = userData;
    },

    adminReservationList(state, adminReservationList: OrderReservationModel[]) {
      state.adminReservationList = adminReservationList;
    },

    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
    tariffList(state, tariffList: Tariff[]) {
      state.tariffList = tariffList;
    },

    userReservationList(state, userReservationList: OrderReservationModel[]) {
      state.userReservationList = userReservationList;
    },
    successToast(state, message: string) {
      state.toastMessage = message;
      state.toastAlert = 'Success';
    },
    warningToast(state, message: string) {
      state.toastMessage = message;
      state.toastAlert = 'Warning';
    },
    errorToast(state, message: string) {
      state.toastMessage = message;
      state.toastAlert = 'Error';
    },
  },
  actions: {
    // Login

    async login({ commit }, payload: AuthLoginData) {
      const {
        data: { userData, isSuccess, message },
      }: { data: UserDataAfterFiltrationResponse } = await axios.post('api/auth/login', payload);
      if (isSuccess) {
        commit('login', userData);
        commit('successToast', message);
        router.push('/panel');
      } else {
        commit('errorToast', message);
      }
    },

    // Register

    async register({ commit }, payload: UserWithDetails) {
      try {
        const {
          data: { isSuccess, message },
        }: { data: UserDataAfterFiltrationResponse } = await axios.post('api/users', payload);
        console.log(isSuccess);

        isSuccess ? commit('successToast', message) : commit('errorToast', message);
      } catch (error) {
        if (error instanceof Error) {
          commit('errorToast', error.message);
        }
      }
    },

    // Auth - send every request (if wants to access protected route)

    async auth({ commit, dispatch }) {
      try {
        const { data }: { data: UserDataAfterFiltrationResponse } = await axios.get(
          'api/users/me'
        );
        commit('login', data);
      } catch (error) {
        dispatch('logout');
      }
    },

    async updateUser({ commit, dispatch }, payload: UserWithDetails) {
      try {
        const {
          data: { userData, isSuccess, message },
        }: { data: UserDataAfterFiltrationResponse } = await axios.patch(
          `api/users/${payload.id}`,
          payload
        );
        isSuccess && commit('updateUserData', userData);
        commit('successToast', message);
      } catch (error) {
        dispatch('logout');
      }
    },

    // Logout

    async logout({ commit }, errorOccured: boolean | null) {
      try {
        if (errorOccured) {
          const {
            data: { message },
          }: { data: UserDataAfterFiltrationResponse } = await axios.get('api/auth/logout');
          commit('successToast', message);
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
        const { data }: { data: Tariff[] } = await axios.get('api/management/tariff');
        commit('tariffList', data);
      } catch (error) {
        if (error instanceof Error) {
          commit('errorToast', error.message);
        }
      }
    },

    async addTariff({ commit, dispatch }, tariff) {
      try {
        const {
          data: { isSuccess, message },
        }: { data: DefaultResponse } = await axios.post('api/management/tariff', tariff);
        isSuccess ? commit('successToast', message) : commit('errorToast', message);
        dispatch('tariffList');
      } catch (error) {
        if (error instanceof Error) {
          commit('errorToast', error.message);
        }
      }
    },

    async updateTariff({ commit, dispatch }, tariff) {
      try {
        const {
          data: { isSuccess, message },
        }: { data: DefaultResponse } = await axios.patch(
          `api/management/tariff/${tariff.id}`,
          tariff
        );
        isSuccess ? commit('successToast', message) : commit('errorToast', message);
        dispatch('tariffList');
      } catch (error) {
        if (error instanceof Error) {
          commit('errorToast', error.message);
        }
      }
    },

    async deleteTariff({ commit, dispatch }, tariff) {
      try {
        const {
          data: { isSuccess, message },
        }: { data: DefaultResponse } = await axios.delete(`api/management/tariff/${tariff.id}`);
        isSuccess ? commit('successToast', message) : commit('errorToast', message);
        dispatch('tariffList');
      } catch (error) {
        if (error instanceof Error) {
          commit('errorToast', error.message);
        }
      }
    },

    // ========================= MANAGEMENT ORDER RESERVATION ===========================

    async addOrderReservation({ commit }, payload) {
      try {
        const {
          data: { isSuccess, message },
        }: { data: DefaultResponse } = await axios.post('api/management/reservation', payload);
        isSuccess ? commit('successToast', message) : commit('errorToast', message);
        return isSuccess;
      } catch (error) {
        if (error instanceof Error) {
          commit('errorToast', error.message);
        }
      }
    },

    async getReservationForCurrentUser({ commit }) {
      try {
        const {
          data: { isSuccess, message, orders },
        }: { data: getReservationForUserResponse } = await axios.get(
          'api/management/reservation/user'
        );
        if (isSuccess) {
          commit('successToast', message);
          commit('userReservationList', orders);
        } else {
          commit('errorToast', message);
        }
      } catch (error) {
        if (error instanceof Error) {
          commit('errorToast', error.message);
        }
      }
    },

    async getAllReservations({ commit }) {
      try {
        const {
          data: { isSuccess, message, orders },
        }: { data: getReservationForUserResponse } = await axios.get('api/management/reservations');
        if (isSuccess) {
          commit('successToast', message);
          commit('adminReservationList', orders);
        } else {
          commit('errorToast', message);
        }
      } catch (error) {
        if (error instanceof Error) {
          commit('errorToast', error.message);
        }
      }
    },

    async updateReservation({ commit, dispatch }, reservation) {
      try {
        const {
          data: { isSuccess, message },
        }: { data: getReservationForUserResponse } = await axios.patch(
          `api/management/reservation/${reservation.id}`,
          reservation
        );
        if (isSuccess) {
          commit('successToast', message);
          dispatch('getAllReservations');
        } else {
          commit('errorToast', message);
        }
      } catch (error) {
        if (error instanceof Error) {
          commit('errorToast', error.message);
        }
      }
    },
  },
  modules: {},
});
