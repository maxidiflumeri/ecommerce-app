import { Application } from "express";
declare class Server {
    app: Application;
    constructor();
    listen(): void;
    private initializeMiddleares;
    private initializeRoutes;
    private initializeSetters;
}
declare const _default: Server;
export default _default;
