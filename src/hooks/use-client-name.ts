"use client";

import { useSyncExternalStore } from "react";
import { readClientName, subscribeClientName } from "@/lib/client-name";

const serverSnapshot = () => "";

/** The sanitised "Prepared for" name, or "" when none is set. */
export function useClientName(): string {
  return useSyncExternalStore(subscribeClientName, readClientName, serverSnapshot);
}
