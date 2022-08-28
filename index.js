const Parser = require('./parser.js')
const Tokenizer = require('./tokenizer.js');
const fs = require('fs');

const parser = new Parser();
const tokenizer = new Tokenizer();
tokenizer._init(fs.readFileSync('./program.parse', 'utf8'));
// console.log(tokenizer.getNextToken());
// console.log(tokenizer.getNextToken());
let tokens = tokenizer.Tokenize();
let x = parser.parse(tokens)
console.log(x);
fs.writeFileSync('output_tokens.json', JSON.stringify(tokens, null, '\t'));