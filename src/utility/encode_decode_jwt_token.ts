// import * as dotenv from "dotenv";
import jwt, { decode, type JwtPayload, type Secret } from "jsonwebtoken";

// dotenv.config();

// Define the shape of the user payload to ensure type safety
export interface UserPayload {
  clientId: string;
  email: string;
  roles: string[];
  crmid: string;
  firstname: string;
  lastname: string;
  // Other fields you might want to include in your token
}

// Define the shape of the decoded token, which includes the payload and standard JWT claims
export interface DecodedPayload extends UserPayload, JwtPayload {}

// A placeholder for the secret key.
// In a real application, this should be a strong, unique, and securely stored key.
//* @param {Secret} secretKey - The secret key used for signing the token.
const JWT_SECRET_KEY: Secret = "vyakar@arosys";

/**
 * Encodes a JSON payload into a JWT token.
 *
 * @param {UserPayload} payload - The data to be encoded in the token.
 * @param {string} [expiresIn='1h'] - The token expiration time (e.g., '10d', '24h', '30m').
 * @returns {string | null} The encoded JWT token or null if an error occurs.
 */

const EncodeToken = (
  payload: UserPayload,
  expiresIn: string | any = "1m"
): string | null => {
  try {
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn });
    return token;
  } catch (error: any) {
    console.error("Error encoding token:", error.message);
    return null;
  }
};

/**
 * Decodes and verifies a JWT token.
 *
 * @param {string} token - The JWT token to decode.
 * @param {Secret} secretKey - The secret key used for verifying the token.
 * @returns {DecodedPayload | null} The decoded payload if the token is valid, otherwise null.
 */
const DecodeToken = (
  token: string
  // secret: Secret
): DecodedPayload | string => {
  try {
    // const decoded = jwt.verify(token, JWT_SECRET_KEY) as DecodedPayload;
    const decodedValue = decode(token);
    return decodedValue as DecodedPayload;
  } catch (error: any) {
    return error.name;
  }
};

const VerifyJWTToken = (
  token: string
  // secret: Secret
): DecodedPayload | string => {
  try {
    const verifiedToken = jwt.verify(token, JWT_SECRET_KEY) as DecodedPayload;
    return verifiedToken;
  } catch (error: any) {
    return error.name;
    // Handle different types of JWT errors
    // if (error.name === "TokenExpiredError") {
    //   return "Token has expired.";
    // } else if (error.name === "JsonWebTokenError") {
    //   return `Invalid token: ${error.message}`;
    // } else {
    //   return `Unknown error decoding token: ${error.message}`;
    // }
  }
};

// --- Example Usage ---
// To run this example, you would need to set up a Node.js environment
// with TypeScript and the 'jsonwebtoken' library.

// 1. Define a sample payload
// const userPayload: UserPayload = {
//   userId: "user-123",
//   username: "john.doe",
//   roles: ["admin", "editor"],
// };

// // 2. Encode a token
// console.log("--- Encoding a token ---");
// const token = encodeToken(userPayload, JWT_SECRET_KEY, "1d"); // Expires in 1 day
// if (token) {
//   console.log("Encoded Token:", token);
// }

// // 3. Decode a valid token
// console.log("\n--- Decoding a valid token ---");
// if (token) {
//   const decodedPayload = decodeToken(token, JWT_SECRET_KEY);
//   if (decodedPayload) {
//     console.log("Decoded Payload:", decodedPayload);
//   }
// }

// // 4. Attempt to decode a token with a wrong secret key
// console.log("\n--- Decoding with a wrong key (will fail) ---");
// const wrongKey: Secret = "a_different_key";
// if (token) {
//   const invalidDecoded = decodeToken(token, wrongKey);
//   if (!invalidDecoded) {
//     console.log("Decoding failed as expected. Invalid signature.");
//   }
// }

// // 5. Simulate an expired token (by setting a very short expiration)
// console.log("\n--- Simulating an expired token (will fail) ---");
// const shortLivedToken = encodeToken(userPayload, JWT_SECRET_KEY, "1s"); // Expires in 1 second
// if (shortLivedToken) {
//   setTimeout(() => {
//     const expiredDecoded = decodeToken(shortLivedToken, JWT_SECRET_KEY);
//     if (!expiredDecoded) {
//       console.log("Decoding failed as expected. Token has expired.");
//     }
//   }, 2000); // Wait 2 seconds for the token to expire
// }

export { DecodeToken, EncodeToken, VerifyJWTToken };
