/**
 * API Configuration and Service Layer
 * Handles all API calls to the Astra API backend
 */

const API_BASE_URL = __DEV__ 
  ? 'http://localhost:3001' // Development
  : 'https://api.example.com'; // Production - update with actual production URL

export interface ApiError {
  error: string;
}

export interface AuthResponse {
  token: string;
  user: {
    email: string;
    userHash: string;
  };
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
  nickname?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  user_id: string;
  telegram_id?: string;
  user_hash: string;
  wallet_address?: string;
  proof_of_passport_id?: string;
  name?: string;
  nickname?: string;
  checkIns: number;
  points: number;
  lastCheckIn?: string;
  currentStreak: number;
  longestStreak: number;
  streakHistory: string[];
  created_at: string;
  updated_at: string;
  isGenderVerified: boolean;
  isRegistered: boolean;
  currentHealthDataId?: string;
  healthData?: HealthData;
}

export interface HealthData {
  schema_version: 'v1' | 'v2';
  healthDataId: string;
  user_hash: string;
  research_opt_in: boolean;
  profile?: Profile;
  conditions?: Condition[];
  medications?: string[];
  treatments?: Treatment[];
  caretaker?: string[];
  timestamp: string;
}

export interface Profile {
  age_range?: '18-20' | '20-25' | '25-30' | '30-35' | '35-40' | '40-45' | '45-50' | '50+';
  ethnicity?: string[];
  location?: string;
  is_pregnant?: boolean;
}

export interface Condition {
  name: string;
  date_diagnosed?: string;
  type?: 'clinically diagnosed' | 'self diagnosed' | 'suspected';
  status?: 'Untreated' | 'Treating' | 'Remission' | 'Resolved';
  notes?: string;
}

export interface Treatment {
  name: string;
  start_date?: string;
  location?: 'Clinical' | 'At home' | 'Appt-based';
  type?: string;
  status?: 'Ongoing' | 'Completed' | 'Paused' | 'Discontinued';
  frequency?: 'Multiple times per day' | 'Daily' | 'Weekly' | 'Biweekly' | 'Monthly' | 'Intermittent';
  notes?: string;
}

export interface UpdateUserRequest {
  name?: string;
  nickname?: string;
  healthData?: HealthData;
}

export interface CheckInRequest {
  mood?: string;
  health_comment?: string;
  doctor_visit?: boolean;
  health_profile_update?: boolean;
  anxiety_level?: number;
  anxiety_details?: string;
  pain_level?: number;
  pain_details?: string;
  fatigue_level?: number;
  fatigue_details?: string;
}

export interface CheckIn {
  schema_version: 'v1';
  user_hash: string;
  timestamp: string;
  checkinId: string;
  mood?: string;
  health_comment?: string;
  doctor_visit?: boolean;
  health_profile_update?: boolean;
  anxiety_level?: number;
  anxiety_details?: string;
  pain_level?: number;
  pain_details?: string;
  fatigue_level?: number;
  fatigue_details?: string;
}

export interface CheckInResponse {
  success: boolean;
  checkIn: CheckIn;
  stats: {
    totalCheckIns: number;
    currentStreak: number;
    longestStreak: number;
    streakHistory: string[];
  };
}

export interface NotificationSettings {
  user_id: string;
  type: string;
  scheduled_time?: string;
  reminder_schedule: 'daily' | 'specific_days' | 'weekly';
  reminder_days?: string[];
  reminder_time?: string;
  email_notifications: boolean;
  substack: boolean;
  last_sent?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UpdateNotificationSettingsRequest {
  reminder_schedule?: 'daily' | 'specific_days' | 'weekly';
  reminder_days?: string[];
  reminder_time?: string;
  email_notifications?: boolean;
  substack?: boolean;
  is_active?: boolean;
  scheduled_time?: string;
  type?: string;
}

class ApiService {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.loadToken();
  }

  private async loadToken() {
    // Load token from AsyncStorage or secure storage
    try {
      // Dynamic import to avoid issues if package not installed
      const AsyncStorageModule = await import('@react-native-async-storage/async-storage');
      const AsyncStorage = AsyncStorageModule.default || AsyncStorageModule;
      const token = await AsyncStorage.getItem('auth_token');
      if (token) {
        this.token = token;
      }
    } catch (error) {
      // AsyncStorage might not be available, use in-memory only
      // This is fine for development, but production should have AsyncStorage installed
      console.warn('AsyncStorage not available, using in-memory token storage only');
    }
  }

  async saveToken(token: string) {
    this.token = token;
    try {
      const AsyncStorageModule = await import('@react-native-async-storage/async-storage');
      const AsyncStorage = AsyncStorageModule.default || AsyncStorageModule;
      await AsyncStorage.setItem('auth_token', token);
    } catch (error) {
      // AsyncStorage might not be available, use in-memory only
      console.warn('AsyncStorage not available, token stored in memory only');
    }
  }

  async clearToken() {
    this.token = null;
    try {
      const AsyncStorageModule = await import('@react-native-async-storage/async-storage');
      const AsyncStorage = AsyncStorageModule.default || AsyncStorageModule;
      await AsyncStorage.removeItem('auth_token');
    } catch (error) {
      console.warn('AsyncStorage not available, token cleared from memory only');
    }
  }

  private getHeaders(includeAuth: boolean = true): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    if (includeAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const isAuthEndpoint = endpoint.includes('/auth/');
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getHeaders(!isAuthEndpoint),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  // Auth endpoints
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (response.token) {
      await this.saveToken(response.token);
    }
    return response;
  }

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (response.token) {
      await this.saveToken(response.token);
    }
    return response;
  }

  // User endpoints
  async getUser(userHash: string): Promise<User> {
    return this.request<User>(`/api/users/${userHash}`);
  }

  async updateUser(data: UpdateUserRequest): Promise<User & { healthData: HealthData }> {
    return this.request<User & { healthData: HealthData }>('/api/users/update', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Check-in endpoints
  async createCheckIn(userHash: string, data: CheckInRequest): Promise<CheckInResponse> {
    return this.request<CheckInResponse>(`/api/checkins/${userHash}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getCheckIns(userHash: string): Promise<CheckIn[]> {
    return this.request<CheckIn[]>(`/api/checkins/${userHash}`);
  }

  // Notification endpoints
  async getNotificationSettings(): Promise<NotificationSettings> {
    return this.request<NotificationSettings>('/api/users/notifications/settings');
  }

  async updateNotificationSettings(
    data: UpdateNotificationSettingsRequest
  ): Promise<NotificationSettings> {
    return this.request<NotificationSettings>('/api/users/notifications/settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Gender Verification endpoint
  async verifyGender(data: {
    attestationId: string;
    proof: any;
    publicSignals: any;
    userContextData: any;
  }): Promise<{
    status: string;
    result: boolean;
    credentialSubject?: any;
    userData?: any;
  }> {
    return this.request('/api/users/verify-gender', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Feedback endpoints
  async createFeedback(data: {
    type: string;
    message: string;
    user_hash?: string;
  }): Promise<{
    id: string;
    type: string;
    message: string;
    resolved: boolean;
    created_at: string;
  }> {
    return this.request('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Research Invite endpoints
  async getResearchInvites(): Promise<any[]> {
    return this.request<any[]>('/api/research-invites');
  }

  async getResearchInviteById(id: string): Promise<any> {
    return this.request<any>(`/api/research-invites/${id}`);
  }

  async recordResearchInviteResponse(
    inviteId: string,
    data: { user_hash: string; response: 'yes' | 'no' }
  ): Promise<{
    message: string;
    response: any;
  }> {
    return this.request(`/api/research-invites/${inviteId}/respond`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getResearchInviteUserStatus(
    inviteId: string,
    userHash: string
  ): Promise<{
    isPrivate: boolean;
    invited: boolean;
    canRespond: boolean;
    hasResponded: boolean;
    response: 'yes' | 'no' | null;
    responded_at: string | null;
  }> {
    return this.request(`/api/research-invites/${inviteId}/status?user_hash=${userHash}`);
  }
}

export const apiService = new ApiService(API_BASE_URL);

