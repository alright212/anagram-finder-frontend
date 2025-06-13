import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  ApiResponse,
  WordbaseStatus,
  WordbaseImportRequest,
  WordbaseImportResponse,
  AnagramResponse,
  AnagramStats,
  LocaleInfo,
  TranslationData,
  LocalePreference,
} from '../types/api';

class ApiService {
  private client: AxiosInstance;

  constructor(baseURL?: string) {
    this.client = axios.create({
      baseURL: baseURL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      timeout: 30000, // 30 seconds timeout
    });

    // Response interceptor for consistent error handling
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        console.error('API Error:', error);
        throw error;
      }
    );
  }

  // Wordbase Management
  async getWordbaseStatus(): Promise<ApiResponse<WordbaseStatus>> {
    try {
      const response = await this.client.get('/wordbase/status');
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async importWordbase(data: WordbaseImportRequest): Promise<ApiResponse<WordbaseImportResponse>> {
    try {
      const response = await this.client.post('/wordbase/import', data);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Anagram Search
  async searchAnagrams(word: string): Promise<ApiResponse<AnagramResponse>> {
    try {
      const response = await this.client.get(`/anagrams/${encodeURIComponent(word)}`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getAnagramStats(): Promise<ApiResponse<AnagramStats>> {
    try {
      const response = await this.client.get('/anagrams/stats');
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Internationalization
  async getLocaleInfo(): Promise<ApiResponse<LocaleInfo>> {
    try {
      const response = await this.client.get('/locale/info');
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getTranslations(namespace: string): Promise<ApiResponse<TranslationData>> {
    try {
      const response = await this.client.get(`/locale/translations/${namespace}`);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  async setLocalePreference(preference: LocalePreference): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await this.client.post('/locale/preference', preference);
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Debug endpoint (optional)
  async getLocaleDebug(): Promise<ApiResponse<any>> {
    try {
      const response = await this.client.get('/locale/debug');
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: any): ApiResponse {
    let message = 'An unexpected error occurred';
    let code = 'UNKNOWN_ERROR';

    if (error.response) {
      // Server responded with error status
      const data = error.response.data;
      message = data.error?.message || data.message || `HTTP ${error.response.status}`;
      code = data.error?.code || `HTTP_${error.response.status}`;
    } else if (error.request) {
      // Request was made but no response received
      message = 'Network error - please check your connection';
      code = 'NETWORK_ERROR';
    } else {
      // Something else happened
      message = error.message || message;
      code = 'REQUEST_ERROR';
    }

    return {
      success: false,
      error: {
        message,
        code,
      },
    };
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default ApiService;
