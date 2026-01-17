import axios, { AxiosInstance } from 'axios';

interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api',
      timeout: 60000, // Increased timeout to 60 seconds for initial requests
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  // Task endpoints
  async getTasks(params?: { page?: number; limit?: number; status?: string; priority?: string; search?: string }): Promise<ApiResponse<any[]>> {
    try {
      const response = await this.client.get('/tasks', { params });
      return {
        data: response.data,
        success: true,
      };
    } catch (error: any) {
      return {
        error: error.response?.data?.detail || error.message,
        success: false,
      };
    }
  }

  async createTask(task: { title: string; description?: string; status?: string; priority?: string; dueDate?: string; category?: string }): Promise<ApiResponse<any>> {
    try {
      const response = await this.client.post('/tasks', task);
      return {
        data: response.data,
        success: true,
      };
    } catch (error: any) {
      return {
        error: error.response?.data?.detail || error.message,
        success: false,
      };
    }
  }

  async getTaskById(id: string): Promise<ApiResponse<any>> {
    try {
      const response = await this.client.get(`/tasks/${id}`);
      return {
        data: response.data,
        success: true,
      };
    } catch (error: any) {
      return {
        error: error.response?.data?.detail || error.message,
        success: false,
      };
    }
  }

  async updateTask(id: string, task: { title?: string; description?: string; status?: string; priority?: string; dueDate?: string; category?: string }): Promise<ApiResponse<any>> {
    try {
      const response = await this.client.put(`/tasks/${id}`, task);
      return {
        data: response.data,
        success: true,
      };
    } catch (error: any) {
      return {
        error: error.response?.data?.detail || error.message,
        success: false,
      };
    }
  }

  async deleteTask(id: string): Promise<ApiResponse<void>> {
    try {
      const response = await this.client.delete(`/tasks/${id}`);
      return {
        success: true,
      };
    } catch (error: any) {
      return {
        error: error.response?.data?.detail || error.message,
        success: false,
      };
    }
  }

  async getDashboardStats(): Promise<ApiResponse<any>> {
    try {
      const response = await this.client.get('/dashboard/stats');
      return {
        data: response.data,
        success: true,
      };
    } catch (error: any) {
      return {
        error: error.response?.data?.detail || error.message,
        success: false,
      };
    }
  }
}

export const apiClient = new ApiClient();

export default ApiClient;