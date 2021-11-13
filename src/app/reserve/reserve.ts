import { Guest } from "../guest/guest";
import { Room } from "../room/room";

export interface Reserve {
    id: string;
    checkIn: Date;
    checkOut: Date;
    room: Room;
    guest: Guest;
}