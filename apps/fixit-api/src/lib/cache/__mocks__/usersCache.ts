import { Cache } from "@fixit/node-cache";
import type { UsersCacheObject } from "@/lib/cache/usersCache.js";

/**
 * MOCK Users Cache
 */
export const usersCache = new Cache<UsersCacheObject>([]);
