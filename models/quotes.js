var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var QuoteSchema = new Schema({
  quote: String,
  author: String,
  year: Number
});

var Quote = mongoose.model('Quote', QuoteSchema);

module.exports = Quote;
