import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
const AccountModel = require('../../../mongodb/index.js')

let _username = "";

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
              console.log('Account name: ', account.name);
              _username = account.username;
            }).catch((error)=>{
              console.error('Error finding account: ', error.message);
            });
          return {
            id: 11,
            name: "Abhishek",
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
        session.user.username = "abhishek";
        session.user.adhaar_number = "adhaar_num";
        session.user.pan_number = "pan_num";
        session.user.account_address = "acc_address";
      }
      return session;
    },
  },
  secret: "test",
  jwt: {
    secret: "test",
    encryption: true,
  },
});