export interface SubscribeResponse {
  success: boolean;
  subscriber?: {
    id: number;
    email_address: string;
    state: string;
    created_at: string;
  };
  error?: string;
}

export interface SubscribeRequest {
  email: string;
}
