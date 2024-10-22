export interface IPasswordRecover {
  email: string;
  code: string;
  expiresAt: Date;
}
