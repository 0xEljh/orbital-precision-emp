import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/styles/theme";
import { UserProvider } from "@/contexts";

import { api } from "@/utils/api";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </ChakraProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
