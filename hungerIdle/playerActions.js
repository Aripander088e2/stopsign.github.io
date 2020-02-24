function findMonster() {
    combatTime = 0;
    all.char.attackSpeedCur = 0;

    let currentFight = fightList[fightListIndex];
    if(currentFight === undefined) {
        return;
    }
    all.enemy = createEnemy(currentFight.col, currentFight.row);

    document.getElementById("enemyDiv").style.opacity = "1";
    document.getElementById("hunt").style.display = "block";
    document.getElementById("fight").style.display = "none";
    document.getElementById("consume").style.display = "none";

    isCombat = true;
    isHunt = true;
    isFight = false;
    isConsume = false;
    view.updating.update();
    view.create.fightList();
}

function processDying() {
    fightListIndex = 0;
    all.char.healthCur = all.char.healthCur < 0 ? 0 : all.char.healthCur;
    all.logs.push({message: "You have died!", timer: combatTime});
    exitCombat();
    for(let i = 0; i < enemySelectionData.length; i++) {
        for(let j = 0; j < enemySelectionData[i].length; j++) {
            enemySelectionData[i][j].consumed = 0;
        }
    }
    fixStartingStats(all.char);
    let totalCombatTime = combatTime; //unfinished timer
    for(let i = 0; i < fightList.length; i++) {
        totalCombatTime += fightList[i].timer;
        fightList[i].fought = 0;
        fightList[i].timer = 0;
    }
    document.getElementById("totalFightTimer").innerHTML = "You died after " + totalCombatTime/1000+"s.";
    view.create.fightList();

    if(document.getElementById("continueFightCheck").checked) {
        findMonster();
    } else {
        isCombat = false;
    }
    selectFight(selectedFight.col, selectedFight.row);
}

function outOfFights() {
    fightListIndex = 0;
    for(let i = 0; i < fightList.length; i++) { //clear out fought
        fightList[i].fought = 0;
    }
    if(document.getElementById("loopCheck").checked && fightList.length > 0) { //loop if necessary
        findMonster();
        for(let i = 0; i < fightList.length; i++) { //clear out fought
            fightList[i].timer = 0;
        }
    } else if(document.getElementById("dieCheck").checked ) {
        processDying()
    } else { //otherwise pause
        isCombat = false;
    }
}

function exitCombat() {
    isCombat = false;
    document.getElementById("enemyDiv").style.opacity = "0";
    document.getElementById("hunt").style.display = "none";
    document.getElementById("fight").style.display = "none";
    document.getElementById("consume").style.display = "none";

    fightListIndex = 0;
    view.create.fightList();
}