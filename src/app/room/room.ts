import { Host } from "../host/host";
    

export interface Room{
    id: string;
    title: string;
    description: string;
    host: Host;
    price: string;
}