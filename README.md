[![npm version](https://badge.fury.io/js/advanced-parser.svg)](https://www.npmjs.com/package/advanced-parser)

# Advanced-Parser

> A small **Parser* to parse a future programming language.

<br>

> Contact me for details, because I *will* respond. Discord: amukh1#9613

## Prerequisites

This project requires NodeJS (version 8 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
6.4.1
v8.16.0
```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Installation
<br>

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

<br>

To install and set up the library, run:

```sh
$ npm install advanced-parser
```

Or if you prefer using Yarn:

```sh
$ yarn add --dev advanced-parser
```

<!-- ## There is also a vscode extension:
**[Extension Link](https://marketplace.visualstudio.com/items?itemName=amukh1.advanced-parser)**

**Or  just search up "advanced-parser" in the extensions section**

![img](./advanced-parser.png) -->

## Usage
<br>
this is what a program looks like:

```py
def f(x) = {
    return 2*x
}
16
hello
"string"
// comment
object.property.method()
```

## Parsed to:

```json
[
	{
		"type": "FUNCTION-DEF",
		"name": "f",
		"args": "x",
		"body": [
			"{\"type\":\"WORD\",\"value\":\"return\"}",
			"{\"type\":\"NUMBER\",\"value\":\"2\"}",
			"{\"type\":\"MULTIPLY\",\"value\":\"*\"}",
			"{\"type\":\"WORD\",\"value\":\"x\"}",
			"{\"type\":\"C-BRACE\",\"value\":\"}\"}"
		]
	},
	{
		"type": "NUMBER",
		"value": "16"
	},
	{
		"type": "WORD",
		"value": "hello"
	},
	{
		"type": "STRING",
		"value": "string"
	},
	{
		"type": "OBJECT-REFRENCE",
		"value": "object.property.method"
	},
	{
		"type": "O-PAREN",
		"value": "("
	},
	{
		"type": "WORD",
		"value": "x"
	},
	{
		"type": "C-PAREN",
		"value": ")"
	}
]
```

<br>

## Contributing

You can contribute to the project by making a pull request on [GitHub](https://github.com/amukh1/advanced-parser).

## Credits

### Amukh1.

## Built With

* [Node](https://nodejs.org/)
* [Javascript](https://www.javascript.com/)
* [Love](https://amukh1.dev)

## Authors

* **Amukh1** - [Github](https://github.com/amukh1)

See also the list of [contributors](https://github.com/amukh1/advanced-parser/contributors) who participated in this project.

## License

[MIT License](https://mit-license.org/2022) © Amukh1 2022