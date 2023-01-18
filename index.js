import characterData from './data.js'
import Character from './Character.js'

let monstersArray = ["orc", "demon", "goblin"];

function getNewMonster() {
    const nextMonsterData = characterData[monstersArray.shift()];
     return nextMonsterData ? new Character(nextMonsterData) : {};
    }

let isWaiting = false;

function attack() {
    

    if(!isWaiting){
        wizard.setDiceHtml();
        monster.setDiceHtml();
        wizard.takeDamage(monster.currentDiceScore);
        monster.takeDamage(wizard.currentDiceScore);
        render();   
    
        if(wizard.dead) {
            endGame();
        } 
        else if(monster.dead) {
            isWaiting = true;
            if(monstersArray.length) {
                setTimeout(() => {
                    
                    monster = getNewMonster()
                    render();
                    isWaiting = false;
                }, 1500);
            } else {
               endGame();
            }
        }
    }
    
};

function endGame() {
    isWaiting = true;
    const endMessage = wizard.health < monster.health ? 'The Orc is Victorious'
                    : wizard.health > monster.health ? 'The Wizard wins!'
                    : 'No victors - all creatures are dead'
   
    const endEmoji = wizard.health > 0 ? '🔮' : '💀'
        setTimeout(() => {
            
            document.body.innerHTML = 
            `<div class="end-game">
                <h2>Game Over</h2>
                <h3>${endMessage}</h3>
                <p class="end-emoji">${endEmoji}</p>
            </div>` 
        }, 1500);
}


document.getElementById('attack-button').addEventListener('click', attack)

function render() {
    document.getElementById('hero').innerHTML = wizard.getCharacterHtml();
    document.getElementById('monster').innerHTML = monster.getCharacterHtml();
}


const wizard = new Character(characterData.hero);
let monster = getNewMonster()
render()

