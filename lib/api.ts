import axios from "axios";

// Create an Axios instance with default config
// This will connect to your NestJS backend API
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable cookies for authentication
});

// Request interceptor - add auth token if available
api.interceptors.request.use(
  (config) => {
    // Add authorization header if token exists
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      if (typeof window !== "undefined") {
        window.location.href = "/auth/signin";
      }
    }
    return Promise.reject(error);
  }
);

// API helper functions
export const apiHelpers = {
  // Wedding/Couple APIs
  getWedding: (subdomain: string) => api.get(`/wedding/${subdomain}`),
  createWedding: (data: any) => api.post("/wedding", data),
  updateWedding: (id: string, data: any) => api.put(`/wedding/${id}`, data),
  deleteWedding: (id: string) => api.delete(`/wedding/${id}`),

  // Guest APIs
  getGuests: (weddingId: string) => api.get(`/guests/${weddingId}`),
  getGuest: (id: string) => api.get(`/guest/${id}`),
  createGuest: (data: any) => api.post("/guest", data),
  updateGuest: (id: string, data: any) => api.put(`/guest/${id}`, data),
  deleteGuest: (id: string) => api.delete(`/guest/${id}`),
  bulkImportGuests: (weddingId: string, guests: any[]) => 
    api.post(`/guests/${weddingId}/bulk`, { guests }),

  // RSVP APIs
  submitRSVP: (data: any) => api.post("/rsvp", data),
  getRSVPs: (weddingId: string) => api.get(`/rsvp/${weddingId}`),
  updateRSVP: (id: string, data: any) => api.put(`/rsvp/${id}`, data),

  // Template APIs
  getTemplates: () => api.get("/templates"),
  getTemplate: (id: string) => api.get(`/template/${id}`),
  updateWeddingTemplate: (weddingId: string, templateId: string) =>
    api.put(`/wedding/${weddingId}/template`, { templateId }),

  // Invitation APIs
  generateInviteLink: (guestId: string) => api.post(`/invite/generate`, { guestId }),
  generateQRCode: (guestId: string) => api.post(`/invite/qr`, { guestId }),
  sendInvitation: (data: {
    guestId: string;
    method: "email" | "whatsapp";
    message?: string;
  }) => api.post("/invite/send", data),
  bulkSendInvitations: (weddingId: string, method: "email" | "whatsapp") =>
    api.post(`/invite/bulk-send`, { weddingId, method }),

  // Analytics
  getAnalytics: (weddingId: string) => api.get(`/analytics/${weddingId}`),
};

export default api;
