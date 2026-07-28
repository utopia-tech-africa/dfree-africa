"use client";

import { NextIntlClientProvider, type AbstractIntlMessages } from "next-intl";

type NextIntlProviderProps = {
  children: React.ReactNode;
  messages: AbstractIntlMessages;
};

export function NextIntlProvider({
  children,
  messages,
}: NextIntlProviderProps) {
  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
