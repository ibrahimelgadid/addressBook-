import * as express from "express";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      mongoURL: string;
      JWT_SECRET: string;
      PORT: number;
      NODE_ENV?: "development" | "production";
    }
  }
}

export {};
