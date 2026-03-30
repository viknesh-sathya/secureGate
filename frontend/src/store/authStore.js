import axios from "axios";
import { create } from "zustand";

const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/api/auth"
    : "/api/auth";

axios.defaults.withCredentials = true;
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios({
        method: "POST",
        url: `${API_URL}/signup`,
        data: {
          email,
          password,
          name,
        },
      });
      set({
        user: res.data.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (err) {
      set({
        isLoading: false,
        error: err.response.data.message || "Error signing up",
      });
      throw err;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios({
        method: "POST",
        url: `${API_URL}/verify-email`,
        data: {
          code,
        },
      });
      set({
        user: res.data.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return res.data.data;
    } catch (err) {
      set({
        isLoading: false,
        error: err.response.data.message || "Verification email error",
      });
      throw err;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const res = await axios.get(`${API_URL}/check-auth`);
      set({
        user: res.data.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
        error: null,
      });
    } catch {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios({
        method: "POST",
        url: `${API_URL}/login`,
        data: {
          email,
          password,
        },
      });
      set({
        user: res.data.data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      set({
        isLoading: false,
        error: err.response.data.message || "Error Logging In.",
      });
      throw err;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios({
        method: "POST",
        url: `${API_URL}/logout`,
      });
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    } catch (err) {
      set({
        isLoading: false,
        error: "Error Logging Out.",
      });
      throw err;
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios({
        method: "POST",
        url: `${API_URL}/forgot-password`,
        data: {
          email,
        },
      });
      set({
        message: res.data.message,
        isLoading: false,
      });
    } catch (err) {
      set({
        isLoading: false,
        error:
          err.response.data.message || "Error sending reset password email",
      });
      throw err;
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios({
        method: "POST",
        url: `${API_URL}/reset-password/${token}`,
        data: {
          password,
        },
      });
      set({
        message: res.data.message,
        isLoading: false,
      });
    } catch (err) {
      set({
        isLoading: false,
        error: err.response.data.message || "Error Resetting Password",
      });
      throw err;
    }
  },
}));
