import crypto from "crypto";

export const sha256 = (url: string) => crypto.createHash("sha256").update(url).digest("hex");
