export interface PaymentVoucher {
  id: number;
  paymentVoucherImportantId: string;
  description: string;
  paymentVoucherStatus: number;
  createdAt: Date;
  personApproving: string;
}
