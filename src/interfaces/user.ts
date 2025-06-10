export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  document: string;
  role: "user" | "admin";
  pets: string[];
}
