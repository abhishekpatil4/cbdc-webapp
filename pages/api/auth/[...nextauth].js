import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
const AccountModel = require('../../../mongodb/index.js')

// var acc = new AccountModel({
// name: "SBI KUD Branch",
// username: "admin",
// adhaar_number: "IDIB000T131",
// pan_number: "Nirmala Shetty",
// accountAddress:"0x717c913b027e831f82b8623be4550e2e92fb96b4"
// });
// acc.save();

export default NextAuth({
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "username",
          type: "text",
          placeholder: "username",
        },
        password: {
          label: "Password",
          type: "password"
        },
      },
      authorize: async (credentials) => {
        // verifying credentials using if statement
        if ((credentials.username === "abhishek" ||
          credentials.username === "athar" ||
          credentials.username === "sangamesh" ||
          credentials.username === "hrishikesh" || 
          credentials.username === "admin") && credentials.password === "123") {
          try {
            const account = await AccountModel.findOne({username: credentials.username});
            if(!account){
              console.error('Account not found');
              return null;
            }
            console.log('fetched details for: ', account.name);
            return {
              id: 11,
              account,
            };
          } catch (error) {
            console.error('Error finding account: ', error.message);
            return null;
          }
        }
        // login failed
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      // first time jwt callback is run, user object is available
      if (user) {
        token.id = user.id;
        token.address = user.address;
        token.account = user.account;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        const { account } = token;
        if (account) {
          session.user.name = account.name;
          session.user.username = account.username;
          session.user.adhaar_number = account.adhaar_number;
          session.user.pan_number = account.pan_number;
          session.user.account_address = account.accountAddress;
        }
      }
      return session;
    },
  },
  pages: {
    signIn : '/',
  },
  secret: "test",
  jwt: {
    secret: "test",
    encryption: true,
  },
});
