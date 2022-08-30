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
            body.push(token);
        }
        return body
    }
    
};

module.exports = Parser;