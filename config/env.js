import { config } from "dotenv";

config({ path: ".env.local", debug: false });

export const { PORT, MONGO_URI, YOUR_APP_PASSWORD,RECIPIENT_EMAIL,YOUR_EMAIL_ADDRESS } = process.env;
