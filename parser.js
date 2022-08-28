class Parser {
    parse(tokens){
        return {
            type: "Program",
            body: tokens
        };
    };
};

module.exports = Parser;