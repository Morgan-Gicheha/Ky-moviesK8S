export interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
  timestamp?: string;
}
