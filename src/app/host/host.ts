import { Room } from "../room/room";

export interface Host {
    id: string;
    email: string;
    password: string;
    name: string;
    lastName: string;
    phone: string;
    rooms: Room;
}