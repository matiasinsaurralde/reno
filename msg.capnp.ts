/**
 * This file has been automatically generated by the [capnpc-ts utility](https://github.com/jdiaz5513/capnp-ts).
 */

/* tslint:disable */

import * as capnp from "capnp-ts";
import { ObjectSize as __O, Struct as __S } from 'capnp-ts';
export const _capnpFileId = "ac5d44cb6d8d6291";
export enum CapMsg_Channel {
    START,
    OS
}
export enum CapMsg_Command {
    START_CMD,
    CODE_FETCH,
    CODE_FETCH_RES,
    READ_FILE_SYNC,
    READ_FILE_SYNC_RES
}
export class CapMsg extends __S {
    static readonly Channel = CapMsg_Channel;
    static readonly Command = CapMsg_Command;
    static readonly _capnp = { displayName: "CapMsg", id: "ebce0264fcda667f", size: new __O(8, 12) };
    getChannel(): CapMsg_Channel { return __S.getUint16(0, this); }
    setChannel(value: CapMsg_Channel): void { __S.setUint16(0, value, this); }
    getCommand(): CapMsg_Command { return __S.getUint16(2, this); }
    setCommand(value: CapMsg_Command): void { __S.setUint16(2, value, this); }
    getStartCmdCwd(): string { return __S.getText(0, this); }
    setStartCmdCwd(value: string): void { __S.setText(0, value, this); }
    adoptStartCmdArgv(value: capnp.Orphan<capnp.List<string>>): void { __S.adopt(value, __S.getPointer(1, this)); }
    disownStartCmdArgv(): capnp.Orphan<capnp.List<string>> { return __S.disown(this.getStartCmdArgv()); }
    getStartCmdArgv(): capnp.List<string> { return __S.getList(1, capnp.TextList, this); }
    hasStartCmdArgv(): boolean { return !__S.isNull(__S.getPointer(1, this)); }
    initStartCmdArgv(length: number): capnp.List<string> { return __S.initList(1, capnp.TextList, length, this); }
    setStartCmdArgv(value: capnp.List<string>): void { __S.copyFrom(value, __S.getPointer(1, this)); }
    getStartCmdDebugFlag(): boolean { return __S.getBit(32, this); }
    setStartCmdDebugFlag(value: boolean): void { __S.setBit(32, value, this); }
    getStartCmdMainJs(): string { return __S.getText(2, this); }
    setStartCmdMainJs(value: string): void { __S.setText(2, value, this); }
    getStartCmdMainMap(): string { return __S.getText(3, this); }
    setStartCmdMainMap(value: string): void { __S.setText(3, value, this); }
    getCodeFetchModuleSpecifier(): string { return __S.getText(4, this); }
    setCodeFetchModuleSpecifier(value: string): void { __S.setText(4, value, this); }
    getCodeFetchContainingFile(): string { return __S.getText(5, this); }
    setCodeFetchContainingFile(value: string): void { __S.setText(5, value, this); }
    getCodeFetchResModuleName(): string { return __S.getText(6, this); }
    setCodeFetchResModuleName(value: string): void { __S.setText(6, value, this); }
    getCodeFetchResFilename(): string { return __S.getText(7, this); }
    setCodeFetchResFilename(value: string): void { __S.setText(7, value, this); }
    getCodeFetchResSourceCode(): string { return __S.getText(8, this); }
    setCodeFetchResSourceCode(value: string): void { __S.setText(8, value, this); }
    getCodeFetchResOutputCode(): string { return __S.getText(9, this); }
    setCodeFetchResOutputCode(value: string): void { __S.setText(9, value, this); }
    getReadFileSyncFilename(): string { return __S.getText(10, this); }
    setReadFileSyncFilename(value: string): void { __S.setText(10, value, this); }
    adoptReadFileSyncData(value: capnp.Orphan<capnp.Data>): void { __S.adopt(value, __S.getPointer(11, this)); }
    disownReadFileSyncData(): capnp.Orphan<capnp.Data> { return __S.disown(this.getReadFileSyncData()); }
    getReadFileSyncData(): capnp.Data { return __S.getData(11, this); }
    hasReadFileSyncData(): boolean { return !__S.isNull(__S.getPointer(11, this)); }
    initReadFileSyncData(length: number): capnp.Data { return __S.initData(11, length, this); }
    setReadFileSyncData(value: capnp.Data): void { __S.copyFrom(value, __S.getPointer(11, this)); }
    toString(): string { return "CapMsg_" + super.toString(); }
}
