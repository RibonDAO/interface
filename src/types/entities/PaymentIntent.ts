export default interface PaymentIntent {
  id?: string;
  next_action?: {
    pix_display_qr_code?: {
      image_url_svg?: string;
      expires_at?: Date;
      data?: string;
    };
  };
}
