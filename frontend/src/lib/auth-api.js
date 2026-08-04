import { gql } from "@/lib/graphql";

export function requestPasswordReset(email) {
  console.log("call the function requestPassword");
  
  return gql(
    `mutation RequestPasswordReset($email: String!) {
       requestPasswordReset(email: $email) { success message }
     }`,
    { email }
  );
}

export function verifyResetToken(token) {
  return gql(
    `query VerifyResetToken($token: String!) {
       verifyResetToken(token: $token) { valid email expiresAt }
     }`,
    { token }
  );
}

export function resetPassword(token, password) {
  return gql(
    `mutation ResetPassword($token: String!, $password: String!) {
       resetPassword(token: $token, password: $password) { success message }
     }`,
    { token, password }
  );
}
