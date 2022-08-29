function parseFunctionDef(token){
    return {
        type: 'FunctionDef',
        name: token.value,
        body: []
    }
}

module.exports = parseFunctionDef;