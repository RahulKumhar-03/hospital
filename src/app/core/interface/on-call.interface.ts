import { Block } from "./block.interface";
import { Nurse } from "./nurse.interface";

export interface OnCall {
    onCallId?:number,
    nurse: Nurse,
    block: Block,
    onCallStart: Date,
    onCallEnd:Date
}
