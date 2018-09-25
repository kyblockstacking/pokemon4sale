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

    console.log("");
    console.log("  ----------------------------------------");
    console.log("  ---- " + chalk.yellowBright("Pokemon") + chalk.gray(" Blackmarket ") + "Warehouse  ----");
    console.log("  ----------------------------------------");
    console.log("");
    inquirer.prompt([
        {
            type: "password",
            mask: chalk.whiteBright("*"),
            name: "password",
            message: chalk.green("Enter password for access into warehouse: ")
        }
    ]).then(answers => {
        if (answers.password === "admin") {
            inquirer.prompt([
                {
                    type: "list",
                    name: "inventory",
                    message: "What would you like to do?",
                    choices: ["View current inventory", "View all low inventory", "Add to inventory", "Add new Pokemon"]
                }
            ]).then(answers => {
                let query = "SELECT * FROM pokemons";
                switch (answers.inventory) {
                    case "View current inventory":
                        connection.query(query, function (err, res) {
                            for (i = 0; i < res.length; i++) {
                                if (res[i].stock_quanity < 5) {
                                    stock = chalk.redBright(res[i].stock_quanity);
                                }
                                else {
                                    stock = chalk.greenBright(res[i].stock_quanity);
                                }
                                console.log(res[i].id + " Pokemon: " + chalk.yellowBright(res[i].pokemon_name) + "  stock: " + stock);
                                console.log(chalk.cyan("---------------------------------"));
                            };
                        });
                        break;
                    case "View all low inventory":
                        connection.query(query, function (err, res) {
                            console.log(chalk.cyan("---------------------------------"));
                            console.log(chalk.cyan("|") + " Pokemon(s) with low inventory " + chalk.cyan("|"));
                            console.log(chalk.cyan("---------------------------------"));
                            for (i = 0; i < res.length; i++) {
                                if (res[i].stock_quanity < 5) {
                                    console.log(" There are " + chalk.redBright(res[i].stock_quanity) + " " + chalk.yellowBright(res[i].pokemon_name + "(s)") + " left ");
                                };
                            };
                        });
                        break;
                    case "Add to inventory":
                        connection.query(query, function (err, res) {
                            let stockUp = []
                            console.log(res);
                            for (i = 0; i < res.length; i++) {
                                stockUp.push(res[i].id + " " + res[i].pokemon_name);
                            };
                            inquirer.prompt([
                                {
                                    type: "list",
                                    name: "addInventory",
                                    message: "Which Pokemon do you want to stock up on?",
                                    choices: stockUp
                                }
                            ]).then(answers => {
                                // Conversion that puts an id into the list and uses id to compare to database id
                                var kevin = answers.addInventory.split(" ");
                                var kevin2 = (parseInt(kevin[0]));
                                var kevin5 = kevin[1];
                                inquirer.prompt([
                                    {
                                        type: "input",
                                        name: "buyPokemon",
                                        message: "How many do you want to add?"
                                    }
                                ]).then(answers => {
                                    connection.query("SELECT * FROM pokemons", function (err, res) {
                                        if (err) throw err;
                                        // Formula for getting current stock quantity
                                        var kevin3 = res[kevin2 - 1].stock_quanity;
                                        var kevin4 = parseInt(answers.buyPokemon);
                                        // Formula for getting current stock quantity + additional stock
                                        var add = kevin3 + kevin4;
                                        connection.query("UPDATE pokemons SET stock_quanity = ? WHERE id = ?;", [add, kevin2], function (err, res) {
                                            if (err) throw err;
                                            console.log("You have added " + chalk.greenBright(kevin4) + " " + chalk.yellowBright(kevin5) + chalk.yellowBright("(s)") + " into the blackmarket!");
                                        })
                                    })
                                })
                            })
                        });
                        break;
                    case "Add new Pokemon":
                        inquirer.prompt([
                            {
                                type: "input",
                                name: "addPokemon",
                                message: "Which Pokemon would you like to add onto the blackmarket list?"
                            },
                            {
                                type: "input",
                                name: "addPokemon2",
                                message: "What type of Pokemon is it?"
                            },
                            {
                                type: "input",
                                name: "addPokemon3",
                                message: "What is the listing price?"
                            }
                        ]).then(answers => {
                            var kevin6 = answers.addPokemon;
                            var kevin7 = answers.addPokemon2;
                            var kevin8 = answers.addPokemon3;
                            connection.query("INSERT INTO pokemons SET pokemon_name = ?, pokemon_type = ?, price = ?, stock_quanity = ?", [kevin6, kevin7, kevin8, 0], function () {
                                console.log("You have successfully added " + chalk.yellowBright(kevin6) + " to the blackmarket listings");
                                connection.end();
                            })
                        })
                        break;
                };
            })
        }
        else {
            console.log("");
            console.log(chalk.redBright("  !!!!!!!!!!!!!!!!!!!!!!!!"));
            console.log(chalk.redBright("  !!!! INTRUDER ALERT !!!!"));
            console.log(chalk.redBright("  !!!!!!!!!!!!!!!!!!!!!!!!"));
            console.log("");

            function timeOut1() {
                console.log("Calling the police in 3...");
            };
            function timeOut2() {
                console.log("Calling the police in 2...");
            };
            function timeOut3() {
                console.log("Calling the police in 1...");
            };
            function ohWait() {
                console.log("");
                console.log("Oh wait...")
            }

            setTimeout(timeOut1, 500);
            setTimeout(timeOut2, 1500);
            setTimeout(timeOut3, 2500);
            setTimeout(ohWait, 4000);

            connection.end();
        }
    });
});
