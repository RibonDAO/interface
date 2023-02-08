const events: any = {
  pages: {
    "/": "P1",
    "/promoters/support-cause": "P2",
    "/promoters/support-cause?payment_method=card": "P2",
    "/promoters/support-cause?payment_method=crypto": "P3",
    "/promoters/support-non-profit": "P4",
    "/promoters/payment?cause": "P5",
    "/promoters/payment?payment_method=card?cause": "P5",
    "/promoters/payment?nonProfit": "P6",
    "/donation-done-cause": "P7",
    "/donation-done-cause?cause": "P7",
    "/post-donation": "P8",
    "/impact": "P9",
  },
};

export default events;
