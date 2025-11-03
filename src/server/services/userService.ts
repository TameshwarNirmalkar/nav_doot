import { encrypt } from "@src/utility/encrypt_decrypt";

export type NextAuthUser = {
  id: string;
  email_address: string;
  name?: string;
  token: string;
  success: boolean;
  message: string;
  password?: string;
};

const authenticate = async (credentials: {
  email_address: string;
  password: string;  
}): Promise<NextAuthUser> => {
  try {
    const { email_address, password } = credentials;
    // const activeSessionPayload = {
    //   emailaddress,
    //   clientId,
    // };
    // 1. Call for generate timestamp.
    // const timeStampRes = await fetch(
    //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/activesession`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(activeSessionPayload),
    //   }
    // );

    // const sessionStarts = await timeStampRes.json();
    // console.log(" =============== timestapm : ", sessionStarts.time_stamp);
    // const authenticationPayload = {
    //   emailaddress,
    //   password: encrypt(`${password}`),
    // };
    
      // const userRes = await fetch(
      //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/authenticate`,
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(authenticationPayload),
      //   }
      // );

      // const authorisedUser = await userRes.json();
      return {email_address, id: "1", token: "dummy-token", password: encrypt(`${password}`), success: true, message: "Authenticated successfully."};
    
  } catch (error: any) {
    return {
      id: "",
      email_address: "",
      name: "",
      token: "",
      success: false,
      message: `Authentication failed: ${error.cause.code}`,
    };
  }
};

export const userService = {
  authenticate,
};
