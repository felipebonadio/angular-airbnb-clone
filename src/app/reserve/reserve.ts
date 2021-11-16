import { Guest } from "../guest/guest";
import { Room } from "../room/room";

export interface Reserve {
    id: string;
    checkIn: string;
    checkOut: string;
    room: Room;
    guest: Guest;
}