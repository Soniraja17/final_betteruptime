import "express"
// declare namespace Express{
//     export interface request{
//         userid?:string
//     }

// }
declare module "express-serve-static-core" {
  interface Request {
    userid?: string;
  }
}