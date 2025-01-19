import { createClient } from "microcms-js-sdk";

if (!process.env.MICROCMS_API_KEY) {
    throw new Error("MICROCMS_API_KEY is not set");
}

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
    throw new Error("MICROCMS_SERVICE_DOMAIN is not set");
}

export const client = createClient({
    apiKey: process.env.MICROCMS_API_KEY,
    serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
});
