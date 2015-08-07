// ==UserScript==
// @name         SaltyBot
// @namespace    http://shaungreiner.com/
// @version      0.4
// @description  It plays saltybet, pretty well!
// @author       Shaun Greiner
// @match        http://www.saltybet.com/
// @grant        none
// ==/UserScript==

/*

Here be dragons. This could all use a refactor or complete rewrite.

*/

console.log("SaltBot is active");

$('document').ready(function(){
    console.log("jQuery Loaded");
    setTimeout(mainLoop,2000);
});

/*

Psudeo Code
0. Load Fighter Index
1. Identify Bet State
2. Place Wager
3. Select Fighter & Bet
4. Update Fighter Index

*/
betMin = 1;
betPercentage = 0.01;
betTournamentPercentage = 0.5;
hasBet = false;
currentState = null;
lastState = null;
fighterIndex = JSON.parse(localStorage.getItem("SBDB"));
if( fighterIndex === null ) fighterIndex = {};
localStorage.setItem('SBDB-BKUP',JSON.stringify(fighterIndex));
console.log(fighterIndex);
balanceHistory = JSON.parse(localStorage.getItem("BalanceH"));

if( balanceHistory === null){
    balanceHistory = [];
}

redPlayer = null;
bluePlayer = null;
lastBet = "";
fightCounter = 0;

function mainLoop(){

    var state = detectStateChange();

    if (state) {
        if (state == "Bets are OPEN!"){
            balanceHistory.push(getBalance());
            localStorage.setItem('BalanceH',JSON.stringify(balanceHistory));
            placeWager( determineWager() );
            redPlayer = $('#player1').val();
            bluePlayer = $('#player2').val();
            console.log(redPlayer," VERSUS ",bluePlayer);
            addFighter(redPlayer);
            addFighter(bluePlayer);
            fightCounter++;
            //pickFighter(Math.round(Math.random())+1);

            if (fighterIndex[redPlayer].wins-fighterIndex[redPlayer].losses > fighterIndex[bluePlayer].wins-fighterIndex[bluePlayer].losses) {
                pickFighter(1);
                lastBet = "red";
                console.log("Red has better stats");
            } else {
                pickFighter(2);
                lastBet = "blue";
                console.log("Blue has better stats");
            }

            if (fighterIndex[redPlayer].wins-fighterIndex[redPlayer].losses == fighterIndex[bluePlayer].wins-fighterIndex[bluePlayer].losses){
                console.log("Just kidding, I dunno, red I guess...");
                placeWager(betMin);
                pickFighter(1);
            } 
        }

        if (state.indexOf("Payouts to Team Red.")!=-1 ){
            console.log("Red won!");
            if(redPlayer && bluePlayer){
                fighterIndex[redPlayer].wins += 1;
                fighterIndex[redPlayer].winstreak +=1;
                fighterIndex[bluePlayer].losses += 1;
                fighterIndex[bluePlayer].winstreak = 0;
                addFightHistory(fighterIndex[redPlayer],fighterIndex[bluePlayer]);
                console.log(fighterIndex);
                localStorage.setItem('SBDB',JSON.stringify(fighterIndex));
            }
        }

        if (state.indexOf("Payouts to Team Blue.")!=-1 ){
            console.log("Blue won!");
            if(bluePlayer && redPlayer){
                fighterIndex[bluePlayer].wins += 1;
                fighterIndex[bluePlayer].winstreak +=1;
                fighterIndex[redPlayer].losses += 1;
                fighterIndex[redPlayer].winstreak = 0;
                addFightHistory(fighterIndex[bluePlayer],fighterIndex[redPlayer]);
                console.log(fighterIndex);
                localStorage.setItem('SBDB',JSON.stringify(fighterIndex));
            }
        }
        //console.log(fighterIndex);
    }                 
    setTimeout(mainLoop,1000);
}

function detectStateChange(){
    currentState = $('#betstatus').text();
    if( currentState == lastState) {
        return false;
    } else {
        lastState=currentState;
        return $('#betstatus').text();
    }
}

function placeWager(amount){
    $('#wager').val(amount);
}

function pickFighter(fighter){
    player = "#player"+fighter;
    setTimeout(function(){
        $(player).trigger('click');
    },3000);
}

function getBalance(){
    balance=$('#balance').text();
    return balance.replace(/[^0-9]/,'');
}

function determineWager(){
    bet = Math.round(getBalance()*betPercentage);
    if($("#tournament-note").text() == "(Tournament Balance)") bet = Math.round( getBalance() * betTournamentPercentage);
    if (bet < betMin) bet = betMin;
    return bet;
}

function addFighter(fighterName){
    if (fighterIndex[fighterName] === undefined){
        console.log("Adding new fighter: "+fighterName);
        fighterIndex[fighterName] = {
            name: fighterName,
            wins: 0,
            losses: 0,
            winstreak: 0
        };
        console.log(fighterIndex[fighterName]);
    } else {
        console.log(fighterName+" returns!");
        console.log(fighterIndex[fighterName]);
    }
}

function addFightHistory(winner,loser){
    if (winner.winHistory === undefined){ winner.winHistory = []};
    if (loser.winHistory === undefined){ loser.winHistory = []};
    if (winner.loseHistory === undefined){ winner.loseHistory = []};
    if (loser.loseHistory === undefined){ loser.loseHistory = []};

    winner.winHistory.push(loser.name);
    loser.loseHistory.push(winner.name);

    console.log(winner);
    console.log(loser);
}
