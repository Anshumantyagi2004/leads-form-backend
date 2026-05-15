import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY,

  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,

  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,

  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,

  messagingSenderId:
    process.env
      .NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,

  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID,

  measurementId:
    process.env
      .NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

window.initializeOTP = function ({
  phoneInputId,
  sendOtpBtnId,
  otpInputId,
  verifyOtpBtnId,
  recaptchaId,
  onVerified
}) {

  window.recaptchaVerifier = new RecaptchaVerifier(
    auth,
    recaptchaId,
    {
      size: "normal",
    }
  );

  document
    .getElementById(sendOtpBtnId)
    .addEventListener("click", async () => {

      const phone =
        document.getElementById(phoneInputId).value;

      if (!phone) {
        alert("Enter mobile number");
        return;
      }

      try {

        const confirmationResult =
          await signInWithPhoneNumber(
            auth,
            "+91" + phone,
            window.recaptchaVerifier
          );

        window.confirmationResult = confirmationResult;

        alert("OTP Sent Successfully");

      } catch (error) {

        console.log(error);
        alert(error.message);

      }

  });

  document
    .getElementById(verifyOtpBtnId)
    .addEventListener("click", async () => {

      const otp =
        document.getElementById(otpInputId).value;

      if (!otp) {
        alert("Enter OTP");
        return;
      }

      try {

        const result =
          await window.confirmationResult.confirm(otp);

        console.log(result.user);

        alert("Phone Verified");

        onVerified();

      } catch (error) {

        console.log(error);
        alert("Invalid OTP");

      }

  });

};