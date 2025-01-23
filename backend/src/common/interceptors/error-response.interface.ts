export interface ErrorResponse {
  status: number;
  message: string;
  code?: string;
  timestamp?: string;
  path?: string;
}
