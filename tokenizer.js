const tokens = [
        // whitespace
        [/^\s+/, null],
        // semicolon
        [/^;/, null],
        // comments
        [/^\/\/.*/, null],
        // multiline comments
        [/^\/\*[\s\S]*?\*\//, null],
        // literals: number
        [/^\d+/, 'NUMBER'],
        // literals: string
        [/^"[^"]*"|^'[^']*'/, 'STRING'],
        // curly braces
        [/^\{/, 'O-BRACE'], [/^\}/, 'C-BRACE'],
        // functions
        [/^def(.*)=.{/, 'FUNCTION-DEF'],
        // return statement
        [/^return(.*)\n/, 'RETURN'],
        // operators
        [/^\+/, 'PLUS'], 
        [/^-/, 'MINUS'], 
        [/^\*/, 'MULTIPLY'], 
        [/^\//, 'DIVIDE'], 
        [/^\(/, 'O-PAREN'], 
        [/^\)/, 'C-PAREN'],
        // // modulo
        // [/%/, 'MODULO'],
        // . for objects
        [/^([a-zA-Z.]+)\.([a-zA-Z.]+)/, 'OBJECT-REFRENCE'],
        // word
        [/^[a-zA-Z]*/, 'WORD'],
];

class Tokenizer {
    _init(input){
        this._string = input;
        this._cursor = 0;
    }
    get_cursor() {
        return this._cursor;
    }
    isEOF(){
        return this._cursor < this._string.length;
    }
    getNextToken(){
        // console.log(`lost at ${this._string.slice(this._cursor)}`)
        if(!this.isEOF()){
            return {
                type: 'EOF',
                value: '',
            };
        }

        const string = this._string.slice(this._cursor);
        for(const [regex, tokenType] of tokens){
            const tokenValue = this._match(regex, string);
            // console.log(tokenType)
            if(tokenValue == null){
                continue;
            }

            if(tokenType == null){
                this._cursor += tokenValue.length;
                return this.getNextToken();
            }

            this._cursor += tokenValue.length;

            if(tokenType == 'STRING'){
            return {
                    type: tokenType,
                    value: tokenValue.slice(1, -1),
                }
            }else if(tokenType == 'FUNCTION-DEF'){
                let tokenizer2 = new Tokenizer();
                let val = [];
                let braces = -1
                // console.log(tokenizer2._init(tokenValue.slice(3)));
                // init tokenizer 2 with everything inside {}
                // tokenizer2._init(tokenValue.slice(tokenValue.indexOf('{') + 1, tokenValue.indexOf('}')));
                // let tokenValue2 = tokenizer2.Tokenize();
                while(braces !== 0){
                    let tok = this.getNextToken()
                val.push(JSON.stringify(tok));
                // count opening and closing braces in tok
                let obraces = tok.value.split('{').length - 1;
                let cbraces = tok.value.split('}').length - 1;
                braces = braces - obraces
                braces = braces + cbraces
                }
                return {
                    type: tokenType,
                    name: tokenValue.slice(4, tokenValue.indexOf('(')),
                    args: tokenValue.slice(tokenValue.indexOf('(') + 1, tokenValue.indexOf(')')),
                    body: val,
                }
            }
            // if(string[0] == '^'){
            //     throw new SyntaxError(`Unexpected token: "${string[0]}"`);
            // }
            // this._cursor += tokenValue.length;
            // console.log(tokenValue)
            // console.log(tokenType)
            // if(typeof(tokenType) !== 'string'){
            //     throw new SyntaxError(`Unexpected token: "${string[0]}"`);
            // }
            return {
                type: tokenType,
                value: tokenValue,
            }
        }
        // console.log('thisfar')
        throw new SyntaxError(`Unexpected token: "${string[0]}" at line ${this._string.slice(0, this._cursor).split('\n').length}, position: ${this._cursor - 1}`);
    }
    _match(regexp, string){
        // console.log(regexp, string);
        // console.log(regexp.exec(string));
        const matched = regexp.exec(string);
        if(matched == null){
            return null
        }
        // this._cursor += matched[0].length;
        return matched[0];
    }
    Tokenize(){
        const tokens = [];
        while(this.isEOF()){
            tokens.push(this.getNextToken());
        }
        return tokens;
    }
}

module.exports = Tokenizer;