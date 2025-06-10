import type { IPet } from "./pet";
import type { IService } from "./services";
import type { IUser } from "./user";

export interface IAppointment {
  _id: string;
  date: Date;
  time: string;
  pet: IPet[]
  owner: IUser;
  service: IService;
  notes: string;
  status: "scheduled" | "completed" | "canceled";
}

export interface PCreateAppointment {
  pet: string[];
  service: string;
  date: string;
  time: string;
  notes?: string;
}
