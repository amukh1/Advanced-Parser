class Parser {
    parse(tokens){
        this.tokens = tokens;
        this.parsed = [];
        this.index = 0
        return {
            type: "Program",
            body: this.link(tokens)
        };
    };
    link(tokens){
        // return tokens inside AST tree (Abstract Syntax Tree)
        let body = [];
        for(const token of tokens){
            body.push(this.parseStatement(token));
            this.parsed.push(this.parseStatement(token));
            this.index++;
        }
        return body
    }
    parseStatement(token){
        switch(token.type){
            case 'FUNCTION-DEF':
                return this.parseFunctionDef(token);
            case 'IF':
                return this.parseIf(token);
            case 'WHILE':
                return this.parseWhile(token);
            case 'FOR':
                return this.parseFor(token);
            case 'RETURN':
                return this.parseReturn(token);
            case 'WORD':
                return this.parseWord(token);
            case 'ASSIGNMENT':
                return this.parseAssignment(token);
            case 'PLUS':
                return this.parsePlus(token);
            case 'MINUS':
                return this.parseMinus(token);
            case 'MULTIPLY':
                return this.parseMultiply(token);
            case 'DIVIDE':
                return this.parseDivide(token);
            case 'MODULO':
                return this.parseModulo(token);
            case 'STRING':
                return this.parseString(token);
            case 'NUMBER': 
                return this.parseNumber(token);
            
        }
    }
    parsePlus(token){
        // delete the value of the token before
        return {
            type: 'Plus',
            left: this.parseStatement(this.tokens[this.index - 1]),
            right: this.parseStatement(this.tokens[this.index + 1])
        };
    }
    parseNumber(token){
        return {
            type: 'Number',
            value: parseInt(token.value)
        };
    }
};

module.exports = Parser;