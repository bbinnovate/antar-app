export const RAZORPAY_CONFIG = {
  KEY_ID: __DEV__ ? "rzp_test_R9TcCjdXNTjVZJ" : "rzp_live_your_live_key_here",

  KEY_SECRET: "3aVENIFVEd6JDDXQy5j41mAA",

  COMPANY_NAME: "Antar Wellness",
  COMPANY_LOGO: "./assets/images/antar-logo.png",

  THEME_COLOR: "#236A61",
};

export const PARIVAR_PLAN_CONFIG = {
  planId: "antar_parivar_monthly",
  name: "Antar Parivar Membership",
  amount: 19900,
  currency: "INR",
  description:
    "Monthly subscription to Antar Parivar - guided practices, live sessions, and nurturing community",
  features: [
    "3x/week live sessions (Yoga, Breathwork, Mobility)",
    "Monthly expert webinar + Live Q&A",
    "Monthly wellness toolkit",
    "24/7 chat support",
    "Private WhatsApp community access",
    "Personalized wellness plans",
  ],
};
