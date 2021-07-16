export interface AuthResponse {
  ok: boolean;
  uid?: string;
  correo?: string;
  token?: string;
  message?: string;
}

export interface Usuario {
  uid: string;
  correo: string;
}
