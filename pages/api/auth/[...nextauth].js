import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
const AccountModel = require('../../../mongodb/index.js')

let _name = "";
let _username = "";
let _adhaar_number = "";
let _pan_number = "";
let _account_address = "";

// var account_data = new account({
// name: 'Hrishikesh Vastrad',
// username: 'hrishikesh',
// adhaar_number: '2144 8674 8552',
// pan_number: 'QRI37583560',
// accountAddress: '0xb4049f51c10b848987fDCb61F4d7440A20aEc997',
// });
// account_data.save();


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
      authorize: (credentials) => {
        // verifying credentials using if statement
        if ((credentials.username === "abhishek" ||
          credentials.username === "athar" ||
          credentials.username === "sangamesh" ||
          credentials.username === "hrishikesh") && credentials.password === "123") {

            // Database look up
            AccountModel.findOne({username: credentials.username}).then((account)=>{
              if(!account){
                console.error('Account not found');
                return;
              }
              console.log('fetched details for: ', account.name);
              _name = account.name;
              _username = account.username;
              _adhaar_number = account.adhaar_number;
              _pan_number = account.pan_number;
              _account_address = account.accountAddress;
            }).catch((error)=>{
              console.error('Error finding account: ', error.message);
            });
          return {
            id: 11,
          };
        }
        // login failed
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      // first time jwt callback is run, user object is available
      if (user) {
        token.id = user.id;
        token.address = user.address;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.user.name = _name;
        session.user.username = _username;
        session.user.adhaar_number = _adhaar_number;
        session.user.pan_number = _pan_number;
        session.user.account_address = _account_address;
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