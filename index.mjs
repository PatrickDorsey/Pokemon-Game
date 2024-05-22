import readline from 'readline-sync';
import chalk from 'chalk';

class Pokemon {
    constructor(name, health, attack, defense, skill, color) {
        this.name = name;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.skill = skill;
        this.color = color;
    }

    getColorText(text) {
        return chalk[this.color](text);
    }
}

const pokemons = [
    new Pokemon('Pikachu', 100, 25, 15, 'Thunderbolt', 'yellow'),
    new Pokemon('Charmander', 100, 30, 10, 'Flamethrower', 'red'),
    new Pokemon('Bulbasaur', 100, 20, 20, 'Vine Whip', 'green'),
    new Pokemon('Squirtle', 100, 15, 25, 'Water Gun', 'blue'),
    new Pokemon('Eevee', 100, 20, 15, 'Quick Attack', 'magenta')
];

function choosePokemon(playerNumber) {
    console.clear();
    console.log(`Player ${playerNumber}, choose your Pokemon:\n`);
    pokemons.forEach((pokemon, index) => {
        console.log(`${index + 1}. ${pokemon.getColorText(pokemon.name)} (Health: ${pokemon.health}, Attack: ${pokemon.attack}, Defense: ${pokemon.defense}, Skill: ${pokemon.skill})`);
        
    });
    console.log('\n\n'); 
    const choice = readline.questionInt(`Enter the number of your choice (1-${pokemons.length}): `);
    console.clear();
    return pokemons[choice - 1];
}

function attackPhase(attacker, defender) {
    console.clear();
    let attackGuess = readline.questionInt(`${attacker.getColorText(attacker.name)}, enter a value between 1 and 10: `);
    
    // Validate the input to ensure it's between 1 and 10
    if (attackGuess < 1 || attackGuess > 10) {
        console.log(`${attacker.getColorText(attacker.name)} missed.`);
        readline.question('Press Enter to continue...');
        console.clear();
        return 0; // Return 0 damage if the attack misses
    }

    const actualNumber = Math.floor(Math.random() * 10) + 1;
    console.clear();
    console.log(`The actual number is: ${actualNumber}`);
    console.log('\n');

    let damage; // Define damage variable here

    if (attackGuess === actualNumber) {
        console.log(`Exact match! ${defender.getColorText(defender.name)} takes full damage and loses all health.`);
        damage = defender.health; // Assign damage as defender's health when attack is successful
        defender.health = 0;
    } else {
        damage = Math.abs(attackGuess - actualNumber) <= 2 ? attacker.attack : attacker.attack / 2;
        console.log(`${attacker.getColorText(attacker.name)} deals ${damage} damage to ${defender.getColorText(defender.name)}.`);
        defender.health -= damage;
    }
    
    // Display remaining health after the attack
    console.log(`${attacker.getColorText(attacker.name)}'s Health: ${attacker.health}`);
    console.log(`${defender.getColorText(defender.name)}'s Health: ${defender.health}`);
    
    readline.question('Press Enter to continue...');
    console.clear();

    return damage; // Return the damage dealt
}

function playGame() {
    const player1Pokemon = choosePokemon(1);
    const player2Pokemon = choosePokemon(2);

    console.log(`\n\nPlayer 1 chose ${player1Pokemon.getColorText(player1Pokemon.name)}`);
    console.log(`\n\nPlayer 2 chose ${player2Pokemon.getColorText(player2Pokemon.name)}`);
    readline.question('\n\nPress Enter to start the battle...');
    console.clear();

    let player1DamageTotal = 0; // Total damage dealt by player 1
    let player2DamageTotal = 0; // Total damage dealt by player 2
    let attackCount = 0; // Counter to track the number of attacks made

    while (player1Pokemon.health > 0 && player2Pokemon.health > 0) {
        attackCount++;

        if (attackCount % 2 === 0) { // Display remaining health every second attack
            console.log(`${player1Pokemon.getColorText(player1Pokemon.name)}'s Health: ${player1Pokemon.health}`);
            console.log(`${player2Pokemon.getColorText(player2Pokemon.name)}'s Health: ${player2Pokemon.health}`);
            console.log('\n');
        }

        player1DamageTotal += attackPhase(player1Pokemon, player2Pokemon);
        if (player2Pokemon.health <= 0) break;

        player2DamageTotal += attackPhase(player2Pokemon, player1Pokemon);
    }

    // Display remaining health after the battle ends
    console.log(`${player1Pokemon.getColorText(player1Pokemon.name)}'s Health: ${player1Pokemon.health}`);
    console.log(`${player2Pokemon.getColorText(player2Pokemon.name)}'s Health: ${player2Pokemon.health}`);

    if (player1Pokemon.health > 0) {
        console.log(`Player 1 wins with ${player1Pokemon.getColorText(player1Pokemon.name)}!`);
    } else {
        console.log(`Player 2 wins with ${player2Pokemon.getColorText(player2Pokemon.name)}!`);
    }

    console.log(`Total damage dealt by Player 1: ${player1DamageTotal}`);
    console.log(`Total damage dealt by Player 2: ${player2DamageTotal}`);
}

playGame();







