const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dbUrl = process.env.DB_URI;

// Connect to MongoDB
mongoose.connect(dbUrl).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

// Define the schema for the transaction object
const TransactionSchema = new Schema({
  senderAddress: { type: String, required: true },
  receiverAddress: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

// Define the schema for the account object
const AccountSchema = new Schema({
  name: { type: String, required: true },  
  username: { type: String, required: true },
  adhaar_number: { type: String, required: true },
  pan_number: { type: String, required: true },
  accountAddress: { type: String, required: true, unique: true },
  transactions: [TransactionSchema],
});

// Create the model for the account object
const AccountModel = mongoose.models.Account || mongoose.model('Account', AccountSchema);

module.exports = AccountModel;