import nodemailer from "nodemailer";
import { YOUR_APP_PASSWORD, YOUR_EMAIL_ADDRESS } from "../config/env.js";

// ------------------------------------------------------------------------

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: YOUR_EMAIL_ADDRESS,
    pass: YOUR_APP_PASSWORD,
  },
});

// 2. Wrap the Mailer Call in an Async Function
const sendWelcomeEmail = async (data) => {
  const RECIPIENT_EMAIL = [data?.platformEmail, YOUR_EMAIL_ADDRESS];

  try {
    const info = await transporter.sendMail({
      // The sender address (must match auth.user)
      from: `Inquiry from ${data?.platform} <${YOUR_EMAIL_ADDRESS}>`,
      // The destination address
      to: RECIPIENT_EMAIL,
      subject: `New in inquiry from ${data.platform}`,
      text: "Checkout the new lead",
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
          <h2>Congratulation you get Inquiry from ${data?.name}</h2>

          <table style="width: 50%; border-collapse: collapse; margin: 20px auto; font-family: Arial, sans-serif;">
    <tr style="background-color: #f2f2f2;">
      <th style="border: 1px solid #999; padding: 8px;">Field</th>
      <th style="border: 1px solid #999; padding: 8px;">Value</th>
    </tr>
    <tr>
      <td style="border: 1px solid #999; padding: 8px;">Platform</td>
      <td style="border: 1px solid #999; padding: 8px;">${data?.platform}</td>
    </tr>
    <tr>
      <td style="border: 1px solid #999; padding: 8px;">Name</td>
      <td style="border: 1px solid #999; padding: 8px;">${data?.name}</td>
    </tr>
    <tr>
      <td style="border: 1px solid #999; padding: 8px;">Phone</td>
      <td style="border: 1px solid #999; padding: 8px;">${data?.phone}</td>
    </tr>
    <tr>
      <td style="border: 1px solid #999; padding: 8px;">Email</td>
      <td style="border: 1px solid #999; padding: 8px;">${data?.email}</td>
    </tr>
    <tr>
      <td style="border: 1px solid #999; padding: 8px;">Product</td>
      <td style="border: 1px solid #999; padding: 8px;">${data?.product}</td>
    </tr>
   <tr>
  <td style="border: 1px solid #999; padding: 8px;">Place</td>
  <td style="border: 1px solid #999; padding: 8px;">${data?.place}</td>
</tr>

<tr>
  <td style="border: 1px solid #999; padding: 8px;">Price Range</td>
  <td style="border: 1px solid #999; padding: 8px;">
    ${data?.priceRange || "N/A"}
  </td>
</tr>

<tr>
  <td style="border: 1px solid #999; padding: 8px;">Message</td>
  <td style="border: 1px solid #999; padding: 8px;">${data?.message}</td>
</tr>

  </table>
        </div>
      `, // HTML content
    });

    console.log("Message sent successfully!");
    console.log(
      "Preview URL (for Ethereal only):",
      nodemailer.getTestMessageUrl(info),
    );
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Execute the function
export default sendWelcomeEmail;
