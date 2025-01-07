import { AppType } from "@ssms/app/api/[[...v1]]/route";
import { hc } from "hono/client";

export const rpcClient = hc<AppType>(process.env.BETTER_AUTH!);
