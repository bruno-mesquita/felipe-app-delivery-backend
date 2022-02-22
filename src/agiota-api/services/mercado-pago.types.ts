export interface PaymentResponse {
  id: number;
  date_created: string;
  date_approved: string;
  date_last_updated: string;
  date_of_expiration: Date;
  operation_type: string;
  barcode: { content: string };
  transaction_details: {
    external_resource_url: string;
    verification_code: string;
    payment_method_reference_id: string;
  };
  status_detail: string;
  verification_code: string;
  payment_method_reference_id: string;
  status: string;
}
