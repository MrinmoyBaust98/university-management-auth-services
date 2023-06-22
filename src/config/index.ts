import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  student_default_pass: process.env.DEFAULT_STUDENT_PASS,
  faculty_default_pass: process.env.DEFAULT_FACULTY_PASS,
  admin_default_pass: process.env.DEFAULT_ADMIN_PASS,
};
