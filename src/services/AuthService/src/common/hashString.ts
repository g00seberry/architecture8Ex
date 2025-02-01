import bcrypt from "bcryptjs";
const salt = 7;
export const hashString = (pass: string) => bcrypt.hashSync(pass, salt);
export const compareHash = (pass: string, other: string) =>
  bcrypt.compare(pass, other);
