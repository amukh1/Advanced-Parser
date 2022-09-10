class Parser {
  parse(tokens) {
    this.tokens = tokens;
    this.parsed = [];
    this.index = 0
    return {
      type: "Program",
      body: this.link(tokens)
    };
  };
  link(tokens) {
    // return tokens inside AST tree (Abstract Syntax Tree)
    let body = [];
    for (var i = 0; i <= tokens.length - 1; i++) {
      let token = tokens[i]
      // body.push(token);
      // console.log(token.type)
    //   console.log(token)
    if(token.type == 'ASM'){
        console.log('asm')
        let asm = {}
        asm.type = 'ASM'
        asm.body = token.value
        body.push(asm)
        continue
        // i +=1
    }else if (token.type == 'FUNCTION-DEF') {
        const func = {}
        func.type = 'FUNCTION-DEF'
        func.name = tokens[i + 1].value
        if (tokens[i + 2].type !== 'O-PAREN') {
        //   console.log('SYNTAX ERROR EXPECTED O-PAREN BUT GOT ' + tokens[i + 2].type)
        throw new SyntaxError(`EXPECTED O-PAREN BUT GOT: "${tokens[i + 2].type}"`);
          break;
        }
        let end = i + 3
        func.args = []
        while (end !== false) {
          if (tokens[end].type == 'C-PAREN') {
            // func.args.push(tokens[end]).type
            // end = true
            break;
          }
          // console.log(tokens[end].type)
          func.args.push(tokens[end].value)
          if (tokens[end].type == 'C-PAREN') {
            // func.args.push(tokens[end]).type
            // end = true
            break;
          }
          end++
        }
        // func.args = func.args.join(" ")
        end += 2
        // console.log(end)
        func.body = []
        let brace_count = 1
        while (true) {
          if (brace_count == 0) {
            break
          }
          let tk = tokens[i + end]

          // console.log(tk)
          if (tk == 'undefinedtk') {
            break
          }
          if (tk.type == 'C-BRACE') {
            brace_count--
          }
          if (tk.type == 'O-BRACE') {
            brace_count++
          }
          func.body.push(tk)
          end++
        }
        let fx = new Parser()
        func.body = fx.parse(func.body).body
        i = i + end - 1
        body.push(func)
      } else if (token.type == 'WORD') {
        if (tokens[i + 1].type == 'O-PAREN') {
          let fc = {}
          fc.type = 'FUNCTION-CALL'
          fc.name = token.value
          // fc.params = tokens[i + 2]
          fc.params = []
          let tt = i + 2
          // console.log(tt)
          while (true) {
            // console.log(tokens[tt])
            if (tokens[tt] == undefined) {
              break;
            }
            if (tokens[tt].type == 'C-PAREN') {
              break
            } else {
              fc.params.push(tokens[tt].value)
              tt++
            }
          }
          body.push(fc)
          i = tt
        }
      } else if (token.type == 'PERIOD') {
        let obr = {}
        obr.type = 'OBJECT-REFRENCE'
        obr.depth = 1
        obr.parent = tokens[i - 1].value
        // obr.child = tokens[i+1].value
        obr.children = []
        let x = i + 1
        while (true) {
          // console.log(x)
          if (tokens[x].type == 'SEMI' || tokens[x].type == 'EOF' || tokens[x].type == undefined) {
            break
          }
          if (tokens[x].type == 'PERIOD') {
            obr.depth++
          } else {
            obr.children.push(tokens[x].value)
          }
          x++
        }
        // i+=x
        i = x + 1
        body.push(obr)
      }else if(token.type == 'RETURN'){
        // console.log('return')
        let re = {}
        re.type = 'RETURN STATEMENT'
        re.body = []
        let xx1 = 1
        while(true){
          if(tokens[xx1].type == 'SEMI'){
            break
          }else {
            re.body.push(tokens[xx1].value)
          }
          xx1++
        }
        body.push(re)
      }
    }
    return body
  }

};

module.exports = Parser;