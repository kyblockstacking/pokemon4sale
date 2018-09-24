let inquirer = require("inquirer");
let mysql = require("mysql");
let chalk = require("chalk");
var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "",
    database: "pokemon4sale"
});
// Execute when mysql is connected successfully
connection.connect(function (err) {
    if (err) throw err;
    start();
});
// Abrupt exit
function exit() {
    console.log("");
    console.log(chalk.red("505050505050505050505050505050505050505050505050505050505050505050"));
    console.log(chalk.red("0!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!5"));
    console.log(chalk.red("5!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!0"));
    console.log(chalk.red("0!!!!!!!!!!!!!!!!!!!!!!!!!! ABORT ABORT !!!!!!!!!!!!!!!!!!!!!!!!!5"));
    console.log(chalk.red("5!!!!!!!!!!!!!!!!!!!!!!!! IT IS THE POPO !!!!!!!!!!!!!!!!!!!!!!!!0"));
    console.log(chalk.red("0!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!5"));
    console.log(chalk.red("5!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!0"));
    console.log(chalk.red("0!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!5"));
    console.log(chalk.red("505050505050505050505050505050505050505050505050505050505050505050"));
    connection.end();
};

// Exit program peacefully
function exit2() {
    console.log("Leaving the Pokemon Black Market...");
    connection.end();
};

// Ends connection after user finishes their transaction
function completeTransaction() {
    console.log("Transaction completed. Have a nice day!");
    connection.end();
};

// Return back to market if use does not continue with purchase
function returnToMarket() {
    console.log("Returning to market...");
    setTimeout(function () { market() }, 2000);
};

// Initialize marketplace with listings
function market() {
    console.log("");
    console.log("          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("          ~~~~~~~~~~~~~~~~~" + chalk.cyanBright(" POKEMON ") + chalk.gray("BLACKMARKET ") + "~~~~~~~~~~~~~~~~~");
    console.log("          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("          $$$$$$$$$$ " + chalk.greenBright("These are the Pokemon(s) for sale ") + "$$$$$$$$$$");
    console.log("          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("");
    let query = "SELECT * FROM pokemons";
    connection.query(query, function (err, res) {
        for (let i = 0; i < res.length; i++) {
            // Changes Pokemon type to its respective background colors
            switch (res[i].pokemon_type) {
                case "grass":
                    type = chalk.bgGreen(res[i].pokemon_type);
                    break;
                case "fire":
                    type = chalk.bgRed(res[i].pokemon_type);
                    break;
                case "water":
                    type = chalk.bgBlue(res[i].pokemon_type);
                    break;
                case "electric":
                    type = chalk.bgYellow(res[i].pokemon_type);
                    break;
            };
            // Changes Pokemon name to its respective text colors
            switch (res[i].pokemon_type) {
                case "grass":
                    name = chalk.green(res[i].pokemon_name);
                    break;
                case "fire":
                    name = chalk.red(res[i].pokemon_name);
                    break;
                case "water":
                    name = chalk.blue(res[i].pokemon_name);
                    break;
                case "electric":
                    name = chalk.yellow(res[i].pokemon_name);
                    break;
            };
            // Display all listing in market to user
            console.log("                 ___________________________________");
            console.log("");
            console.log("               " + chalk.cyan(res[i].id), chalk.bold(name) + " (type: " + type + ")");
            console.log("                 " + "price per: " + chalk.yellow(res[i].price) + chalk.yellow(" gold") + " // " + "stock: " + res[i].stock_quanity);
        };
        // Initialize purchase prompts after user selects a Pokemon to buy
        function purchase(x) {
            inquirer.prompt([
                {
                    type: "input",
                    name: "one",
                    message: "How many do you want buy?"
                }
            ]).then(answers => {
                if (answers.one > res[x].stock_quanity) {
                    console.log("Sorry. We do not have that many.")
                    goBack();
                }
                else {
                    let total = answers.one * res[x].price;
                    console.log("Your total will be: " + total + " gold");
                    inquirer.prompt([
                        {
                            type: "confirm",
                            name: "confirmPurchase",
                            message: "Are you sure?"
                        }
                    ]).then(answers => {
                        return (answers.confirmPurchase ? completeTransaction() : returnToMarket());
                    });
                };
            });
        };
        console.log("");
        inquirer.prompt([
            {
                type: "input",
                name: "selectBuy",
                message: "Which Pokemon would you like to buy?"
            }
        ]).then(answers => {
            // Eliminates case sensitivity with user input
            answers.selectBuy = answers.selectBuy.toLowerCase();
            // Shows user their total (price for each Pokemon * amount user wants to buy)
            switch (answers.selectBuy) {
                case "1":
                    if (answers.selectBuy === "1") {
                        let x = 0;
                        purchase(x);
                        break;
                    }
                case "bulbasaur":
                    if (answers.selectBuy === "bulbasaur") {
                        let x = 0;
                        purchase(x);
                        break;
                    };
                case "2":
                    if (answers.selectBuy === "2") {
                        let x = 1;
                        purchase(x);
                        break;
                    };
                case "ivysaur":
                    if (answers.selectBuy === "ivysaur") {
                        let x = 1;
                        purchase(x);
                        break;
                    };
                case "3":
                    if (answers.selectBuy === "3") {
                        let x = 2;
                        purchase(x);
                        break;
                    };
                case "venusaur":
                    if (answers.selectBuy === "venusaur") {
                        let x = 3;
                        purchase(x);
                        break;
                    };
                case "4":
                    if (answers.selectBuy === "4") {
                        let x = 3;
                        purchase(x);
                        break;
                    };
                case "charmander":
                    if (answers.selectBuy === "charmander") {
                        let x = 3;
                        purchase(x);
                        break;
                    };
                case "5":
                    if (answers.selectBuy === "5") {
                        let x = 4;
                        purchase(x);
                        break;
                    };
                case "chameleon":
                    if (answers.selectBuy === "chameleon") {
                        let x = 4;
                        purchase(x);
                        break;
                    };
                case "6":
                    if (answers.selectBuy === "6") {
                        let x = 5;
                        purchase(x);
                        break;
                    };
                case "charizard":
                    if (answers.selectBuy === "charizard") {
                        let x = 5;
                        purchase(x);
                        break;
                    };
                case "7":
                    if (answers.selectBuy === "7") {
                        let x = 6;
                        purchase(x);
                        break;
                    };
                case "squirtle":
                    if (answers.selectBuy === "squirtle") {
                        let x = 6;
                        purchase(x);
                        break;
                    };
                case "8":
                    if (answers.selectBuy === "8") {
                        let x = 7;
                        purchase(x);
                        break;
                    };
                case "wartortle":
                    if (answers.selectBuy === "wartortle") {
                        let x = 7;
                        purchase(x);
                        break;
                    };
                case "9":
                    if (answers.selectBuy === "9") {
                        let x = 8;
                        purchase(x);
                        break;
                    };
                case "blastoise":
                    if (answers.selectBuy === "blastoise") {
                        let x = 8;
                        purchase(x);
                        break;
                    };
                case "10":
                    if (answers.selectBuy === "10") {
                        let x = 9;
                        purchase(x);
                        break;
                    };
                case "pikachu":
                    if (answers.selectBuy === "pikachu") {
                        let x = 9;
                        purchase(x);
                        break;
                    };
                default: console.log("Sorry we do not have that Pokemon");
                    goBack();
            };
        });
    });
};

// Check if user wants to go back to marketplace or exit program
function goBack() {
    inquirer.prompt([
        {
            type: "confirm",
            name: "goBack",
            message: "Go back to market page?"
        }
    ]).then(answers => {
        return (answers.goBack ? returnToMarket() : exit2());
    });
};

// Initialize program with secuirty checks
function start() {
    console.log("");
    console.log("          -------------------------------------------------------");
    console.log("          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("          -------------------------------------------------------");
    console.log("          ~~" + chalk.cyanBright(" WELCOME TO THE") + chalk.gray(" BLACK MARKET ") + chalk.cyanBright("FOR BUYING POKEMON(S) ") + "~~");
    console.log("          -------------------------------------------------------");
    console.log("          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("          -------------------------------------------------------");
    console.log("");

    inquirer.prompt([
        {
            type: "confirm",
            name: "copcheck1",
            message: "Are you a cop?"
        }
    ]).then(answers => {
        return (answers.copcheck1 ? exit() : accessGranted());
        function accessGranted() {
            inquirer.prompt([
                {
                    type: "confirm",
                    name: "copcheck2",
                    message: "Are you sure? (because if you are, you have to tell me)"
                }
            ]).then(answers => {
                return (answers.copcheck2 ? next() : exit());
                function next() {
                    inquirer.prompt([
                        {
                            type: "confirm",
                            name: "enter",
                            message: "Alright, I believe you. Do you want to enter the market?"
                        }
                    ]).then(answers => {
                        return (answers.enter ? market() : exit2());
                    });
                };
            });
        };
    });
};