import { Reserve } from "../reserve/reserve";

export interface Guest {
    id: string;
    email: string;
    password: string;
    name: string;
    lastName: string;
    phone: string;
    reserve: Reserve;
}