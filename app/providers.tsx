"use client";

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { CookingProvider } from "@/context/CookingContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <CookingProvider>{children}</CookingProvider>
    </Provider>
  );
}
