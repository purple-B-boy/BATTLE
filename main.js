
const damageRange = 0.2,
      criticalHitRate = 0.5;
let firstload = true,
    logIndex = 0,
    nowKilledNumver = 0,
    targetKillNumber = 3;


const playerData = {
    name:'プレイヤー',
    hp:100,
    mp:50,
    attack:5,
    magicAttack:10,
    defence:2,
    speed:5
}


const enemiesData = [
    {
        name:'スライム',
        hp:50,
        attack:3,
        defence:1,
        img:'slime.png'
    },
    {
        name:'フェアリー',
        hp:60,
        attack:4,
        defence:2,
        img:'pixy.png'
    },
    {
        name:'ガーゴイル',
        hp:80,
        attack:4,
        defence:2,
        img:'gargoyle.png'
    }
];

for(let i = 0; i < enemiesData.length;i++){
    enemiesData[i]["maxHp"] = enemiesData[i]["hp"];
    enemiesData[i]["img"] = enemiesData[i]["img"];
}
let enemyData = enemiesData [Math. floor (Math. random() * enemiesData. length)];

playerData["maxHp"] = playerData["hp"];
playerData["maxMp"] = playerData["mp"];

function insertText(id,text){
    document.getElementById(id).textContent = text;
}

function insertImage(img){
    const enemyImage = document.getElementById("enemyPlace");
    enemyImage.src = "img/" + img;
}



function damageCaculation(attack,defence){
    const maxDamage = attack * (1 + damageRange),
        minDamage = attack * (1 - damageRange),
        attackDamage = Math.floor(Math.random() * (maxDamage - minDamage)+ minDamage)

    const damage = attackDamage - defence;

    if(damage < 1){
        return 0;
    }else{
        return damage;
    }
}
function magicDamageCaculation(magicAttack,defence){
    const maxMagicDamage = magicAttack * (1 + damageRange),
        minMagicDamage = magicAttack * (1 - damageRange),
        magicAttackDamage = Math.floor(Math.random() * (maxMagicDamage - minMagicDamage)+ minMagicDamage)

    const magicDamage = magicAttackDamage - defence;

    if(magicDamage < 1){
        return 0;
    }else{
        return magicDamage;
    }
}
let hiddenNextButton = false,
    hiddenContinueButton = false;

function insertLog(log){
    
    const logs = document. getElementById("logs"),
      createLog = document.createElement("li");
    logIndex++;
    createLog.innerHTML = logIndex + log;
    logs.insertBefore(createLog, logs.firstChild);
}



function showModal(title,hiddenNextButton = false, hiddenContinueButton = false){
    document.getElementById("mask").classList.add("active");
    document.getElementById("modal").classList.add("active");
    document.getElementById("modalTitle").textContent = title;
    if(firstload){
        document.getElementById("modalNextButton").classList.add("hidden");
        document.getElementById("modalContinueButton").classList.add("hidden");
    }else if(hiddenNextButton){
        document.getElementById("modalFirstButton").classList.add("hidden");
        document.getElementById("modalNextButton").classList.add("hidden");
        document.getElementById("modalContinueButton").classList.remove("hidden");
    }else if(hiddenContinueButton){
        document.getElementById("modalFirstButton").classList.add("hidden");
        document.getElementById("modalContinueButton").classList.add("hidden");
        document.getElementById("modalNextButton").classList.remove("hidden");
    }
}

function changeStory(change = false){
    if(change){
        document.getElementById("logs").classList.remove("hidden");
        document.getElementById("texts").classList.add("hidden");
        

    } else if(!change){
        document.getElementById("logs").classList.add("hidden");
        document.getElementById("texts").classList.remove("hidden");
        
    }
    
}

insertText("playerName",playerData["name"]);
insertText("currentPlayerHp",playerData["hp"]);
insertText("maxPlayerHp",playerData["hp"]);
insertText("currentPlayerMp",playerData["mp"]);
insertText("maxPlayerMp",playerData["mp"]);

insertText("enemyName",enemyData["name"]);
insertText("currentEnemyHp",enemyData["hp"]);
insertText("maxEnemyHp",enemyData["hp"]);
insertImage(enemyData["img"]);
insertText("nowKilledNumber", nowKilledNumver);
insertText("targetKillsNumber", targetKillNumber);

if(firstload){
    showModal("ポートフォリオゲーム",true,true);
}
// ストーリーテキスト
let storyIndex = 0;

let storyData = [
    
  { title: "作成者", text: "初めまして！", player:1 , battleMode:false},
  { title: "作成者", text: "私は久保開と申します！", player:1 , battleMode:false},
  { title: "作成者", text: "このポートフォリオはJSとHTML、CSSで作っています!", player:1 , battleMode:false},
  { title: "作成者", text: "1度敵と戦ってみましょう!",  player:2, battleMode:false },
  { title: "", text: "敵が出てきた！",  player:2, battleMode:true },
  { title: "", text: "敵を倒した！",  player:2, battleMode:false },
  { title: "作成者", text: "また出てきた！",  player:2, battleMode:true },
  { title: "作成者", text: "敵を倒した！",  player:2, battleMode:false },
  { title: "作成者", text: "最後の戦いが始まる..." , player:1, battleMode:true},
  { title: "作成者", text: "" , player:1, battleMode:false}

];

function advanceStory() {
  if (storyIndex < storyData.length - 1) {
    if(storyData[storyIndex].battleMode==false){
        document.getElementById("battleStart").classList.add("deactive");
        storyIndex++;
        updateStory();
    } else if(storyData[storyIndex].battleMode==true){
        document.getElementById("battle").classList.add("active");
        document.getElementById("battleStart").classList.remove("deactive");
        document.getElementById("storyButton").classList.add("deactive");
        document.getElementById("enemyStatus").classList.add("active");
        document.getElementById("enemyImage").classList.add("active");
        document.getElementById("playerStatus").classList.add("active");
        document.getElementById("playerImage").classList.add("active");
    }
  }
}

function updateStory() {
  document.getElementById("storyTitle").textContent = storyData[storyIndex].title;
  document.getElementById("storyText").textContent = storyData[storyIndex].text;
}
// ストーリーテキスト エンド

document.getElementById("battleStart").classList.add("deactive");
document.getElementById("attack").classList.add("deactive");
document.getElementById("heal").classList.add("deactive");
document.getElementById("magic").classList.add("deactive");
document.getElementById("escape").classList.add("deactive");

document.getElementById("battleStart").addEventListener("click",function(){
    changeStory(true);
    document.getElementById("battleStart").classList.add("deactive");
    document.getElementById("attack").classList.remove("deactive");
    document.getElementById("heal").classList.remove("deactive");
    document.getElementById("magic").classList.remove("deactive");
    document.getElementById("escape").classList.remove("deactive");
})

document.getElementById("attack").addEventListener("click",function(){
    changeStory(true);
    let victory = false,
        defeat = false;
    

    const playerName = '<span style="color:blue">' + playerData["name"] + "</span>",
          enemyName = '<span style="color:red">' + enemyData["name"] + "</span>";
    if(!defeat){
        let playerDamage = damageCaculation(playerData["attack"],enemyData["defence"]);
        if(Math.random() < criticalHitRate){
            playerDamage *= 2;
            insertLog(": " + playerName + "の攻撃!" + enemyName + "に" + playerDamage + "のダメージ！");
        } else {
            insertLog(": " + playerName + "の攻撃!急所に当たった！" + enemyName + "に" + playerDamage + "のダメージ！");
        }
        enemyData["hp"] -= playerDamage;
        insertText("currentEnemyHp",enemyData["hp"]);
        document.getElementById("currentEnemyHpGaugeValue").style.width = (enemyData["hp"] / enemyData["maxHp"] * 100) + "%";
        if(enemyData["hp"] <= 0){
            
            victory = true;
            enemyData["hp"] = 0;
            insertText("currentEnemyHp",enemyData["hp"]);

            document.getElementById("currentEnemyHpGaugeValue").style.width = "0%";
            showModal(enemyData["name"] + "を倒した！",false,true);
            changeStory(false);
            document.getElementById("attack").classList.add("deactive");
            document.getElementById("heal").classList.add("deactive");
            document.getElementById("magic").classList.add("deactive");
            document.getElementById("escape").classList.add("deactive");
            document.getElementById("enemyImage").classList.remove("active");
            document.getElementById("enemyStatus").classList.remove("active");
        }
    }
    


    if(!victory){
        let enemyDamage = damageCaculation(enemyData["attack"],playerData["defence"]);
        if(Math.random() < criticalHitRate){
            enemyDamage *= 2;
            insertLog(": " + enemyName + "の攻撃!急所に当たった！" + playerName + "に" + enemyDamage + "のダメージ！");
        } else {
            insertLog(": " + enemyName + "の攻撃!" + playerName + "に" + enemyDamage + "のダメージ！" );
        }

        playerData["hp"] -= enemyDamage;
        insertText("currentPlayerHp",playerData["hp"]);
        document.getElementById("currentPlayerHpGaugeValue").style.width = (playerData["hp"] / playerData["maxHp"]* 100) + "%";
            
        if(playerData["hp"] <=0){
            victory = false;
            defeat = true;

            playerData["hp"] = 0;
            insertText("currentPlayerHp",playerData["hp"]);
            document.getElementById("currentPlayerHpGaugeValue").style.width = "0%";
            showModal(enemyData["name"] + "に負けてしまった...",true,false);
            changeStory(false);
            document.getElementById("playerStatus").classList.remove("active");
            document.getElementById("playerImage").classList.remove("active");
        }
        
    }
    

    if(victory || defeat){
        storyData[storyIndex].battleMode=false;
        document.getElementById("storyButton").classList.remove("deactive");

    }
    if(victory){
        nowKilledNumver++;
        insertText("nowKilledNumber", nowKilledNumver);
        if(nowKilledNumver === targetKillNumber){
            insertText("nowKilledNumber", nowKilledNumver);
            showModal("　プレイして頂きありがとうございます！　ゲームクリアです！",true,false);
            changeStory(false);
        }
        
    }
})

document.getElementById("magic").addEventListener("click",function(){
    playerData["mp"]  -= playerData["magicAttack"];
    if( playerData["mp"] < playerData["magicAttack"]){
        document.getElementById("magic").classList.add("deuse");
        document.getElementById("heal").classList.add("deuse");
    }
    if(playerData["mp"] <=0){

        playerData["mp"] = 0;
    }
    insertText("currentPlayerMp",playerData["mp"]);
    document.getElementById("currentPlayerMpGaugeValue").style.width = (playerData["mp"] / playerData["maxMp"] * 100) + "%";
    changeStory(true);
    let victory = false,
        defeat = false;

    const playerName = '<span style="color:blue">' + playerData["name"] + "</span>",
          enemyName = '<span style="color:red">' + enemyData["name"] + "</span>";
    if(!defeat){
        let playerDamage = damageCaculation(playerData["magicAttack"],enemyData["defence"]);
        if(Math.random() < criticalHitRate){
            playerDamage *= 2;
            insertLog(": " + playerName + "の魔法攻撃!急所に当たった！" + enemyName + "に" + playerDamage + "のダメージ！");
        } else {
            insertLog(": " + playerName + "の魔法攻撃!" + enemyName + "に" + playerDamage + "のダメージ！");
        }
        enemyData["hp"] -= playerDamage;

        insertText("currentEnemyHp",enemyData["hp"]);
        
        document.getElementById("currentEnemyHpGaugeValue").style.width = (enemyData["hp"] / enemyData["maxHp"] * 100) + "%";
        if(enemyData["hp"] <= 0){
            
            victory = true;
            enemyData["hp"] = 0;
            insertText("currentEnemyHp",enemyData["hp"]);

            document.getElementById("currentEnemyHpGaugeValue").style.width = "0%";
            showModal(enemyData["name"] + "を倒した！",false,true);
            changeStory(false);
            document.getElementById("attack").classList.add("deactive");
            document.getElementById("heal").classList.add("deactive");
            document.getElementById("magic").classList.add("deactive");
            document.getElementById("escape").classList.add("deactive");
            document.getElementById("enemyImage").classList.remove("active");
            document.getElementById("enemyStatus").classList.remove("active");
        }
    }
    


    if(!victory){
        let enemyDamage = damageCaculation(enemyData["attack"],playerData["defence"]);
        if(Math.random() < criticalHitRate){
            enemyDamage *= 2;
            insertLog(": " + enemyName + "の攻撃!急所に当たった！" + playerName + "に" + enemyDamage + "のダメージ！");
        } else {
            insertLog(": " + enemyName + "の攻撃!" + playerName + "に" + enemyDamage + "のダメージ！" );
        }

        playerData["hp"] -= enemyDamage;
        insertText("currentPlayerHp",playerData["hp"]);
        document.getElementById("currentPlayerHpGaugeValue").style.width = (playerData["hp"] / playerData["maxHp"]* 100) + "%";
            
        if(playerData["hp"] <=0){
            victory = false;
            defeat = true;

            playerData["hp"] = 0;
            insertText("currentPlayerHp",playerData["hp"]);
            document.getElementById("currentPlayerHpGaugeValue").style.width = "0%";
            showModal(enemyData["name"] + "に負けてしまった...",true,false);
            changeStory(false);
            document.getElementById("playerStatus").classList.remove("active");
            document.getElementById("playerImage").classList.remove("active");
        }
        
    }
    

    if(victory || defeat){
        storyData[storyIndex].battleMode=false;
        document.getElementById("storyButton").classList.remove("deactive");
    }
    if(victory){
        nowKilledNumver++;
        insertText("nowKilledNumber", nowKilledNumver);
        if(nowKilledNumver === targetKillNumber){
            insertText("nowKilledNumber", nowKilledNumver);
            showModal("　プレイして頂きありがとうございます！　ゲームクリアです！",true,false);
            changeStory(false);
        }
        
    }
    })
    document.getElementById("heal").addEventListener("click",function(){
        playerData["mp"]  -= playerData["magicAttack"];
        if( playerData["mp"] < playerData["magicAttack"]){
            document.getElementById("magic").classList.add("deuse");
            document.getElementById("heal").classList.add("deuse");
        }
    insertText("currentPlayerMp",playerData["mp"]);
    document.getElementById("currentPlayerMpGaugeValue").style.width = (playerData["mp"] / playerData["maxMp"] * 100) + "%";
    const victory = false;
    const defeat = false;
    const playerName = '<span style="color:blue">' + playerData["name"] + "</span>",
    enemyName = '<span style="color:red">' + enemyData["name"] + "</span>";
    let playerHeal = magicDamageCaculation(playerData["magicAttack"],0);
    playerHeal *= 2;
    insertLog(": " + playerName + "は"+ playerHeal + "回復した!");
    playerData["hp"] += playerHeal;
    insertText("currentPlayerHp",playerData["hp"]);
    document.getElementById("currentPlayerHpGaugeValue").style.width = (playerData["hp"] / playerData["maxHp"] * 100) + "%";
    if(playerData["hp"]>playerData["maxHp"]){
        playerData["hp"] = playerData["maxHp"];
    }
    


    if(!victory){
        let enemyDamage = damageCaculation(enemyData["attack"],playerData["defence"]);
        if(Math.random() < criticalHitRate){
            enemyDamage *= 2;
            insertLog(": " + enemyName + "の攻撃!急所に当たった！" + playerName + "に" + enemyDamage + "のダメージ！");
        } else {
            insertLog(": " + enemyName + "の攻撃!" + playerName + "に" + enemyDamage + "のダメージ！" );
        }

        playerData["hp"] -= enemyDamage;
        insertText("currentPlayerHp",playerData["hp"]);
        document.getElementById("currentPlayerHpGaugeValue").style.width = (playerData["hp"] / playerData["maxHp"]* 100) + "%";
            
        if(playerData["hp"] <=0){
            victory = false;
            defeat = true;

            playerData["hp"] = 0;
            insertText("currentPlayerHp",playerData["hp"]);
            document.getElementById("currentPlayerHpGaugeValue").style.width = "0%";
            showModal(enemyData["name"] + "に負けてしまった...",true,false);
            changeStory(false);
            document.getElementById("playerStatus").classList.remove("active");
            document.getElementById("playerImage").classList.remove("active");
        }
        
     }
    

        if(defeat){
            storyData[storyIndex].battleMode=false;
            document.getElementById("storyButton").classList.remove("deactive");
        }
    })

document.getElementById("escape").addEventListener("click",function(){
    let victory = false;
    const playerName = '<span style="color:blue">' + playerData["name"] + "</span>",
          enemyName = '<span style="color:red">' + enemyData["name"] + "</span>";
    if(!victory){
        let enemyDamage = damageCaculation(enemyData["attack"],playerData["defence"]);
        if(Math.random() < criticalHitRate){
            enemyDamage = 0;
            insertLog(": " + enemyName + "の攻撃!" + playerName + "は避けた！" + enemyDamage + "のダメージ！");
        } else {
            insertLog(": " + enemyName + "の攻撃!" + playerName + "に" + enemyDamage + "のダメージ！" );
        }

        playerData["hp"] -= enemyDamage;
        insertText("currentPlayerHp",playerData["hp"]);
        document.getElementById("currentPlayerHpGaugeValue").style.width = (playerData["hp"] / playerData["maxHp"]* 100) + "%";
            
        if(playerData["hp"] <=0){
            victory = false;

            playerData["hp"] = 0;
            insertText("currentPlayerHp",playerData["hp"]);
            document.getElementById("currentPlayerHpGaugeValue").style.width = "0%";
            showModal(enemyData["name"] + "に負けてしまった...",true,false);
            changeStory(false);
            document.getElementById("playerStatus").classList.remove("active");
            document.getElementById("playerImage").classList.remove("active");
        }
        
    }
})



document.getElementById("modalFirstButton").addEventListener("click",function(){
    document.getElementById("mask").classList.remove("active");
    document.getElementById("modal").classList.remove("active");
    firstload = false;
    hiddenNextButton = false;
    hiddenContinueButton = false;
    changeStory(false);
})
    

document.getElementById("modalNextButton").addEventListener("click",function(){
    enemyData["hp"] = enemyData["maxHp"];
    enemyData["img"] = enemyData["img"];
    enemyData = enemiesData [Math. floor (Math. random() * enemiesData.length)];
    insertText("enemyName",enemyData["name"]);
    insertText("currentEnemyHp",enemyData["hp"]);
    insertText("maxEnemyHp",enemyData["hp"]);
    insertImage(enemyData["img"]);
    document.getElementById("currentEnemyHpGaugeValue").style.width = "100%";

    document.getElementById("mask").classList.remove("active");
    document.getElementById("modal").classList.remove("active");
    hiddenNextButton = false;
    hiddenContinueButton = false;
    changeStory(false);
    document.getElementById("battle").classList.remove("active");
    document.getElementById("playerStatus").classList.remove("active");
    document.getElementById("playerImage").classList.remove("active");
    storyIndex++;
    updateStory();
    let removeLogs = document.querySelector('#logs');
    while(removeLogs.firstChild) {
        removeLogs.removeChild(removeLogs.firstChild);
    }


})
document.getElementById("modalContinueButton").addEventListener("click",function(){
    nowKilledNumver = 0;
    insertText("nowKilledNumber", nowKilledNumver);

    enemyData["hp"] = enemyData["maxHp"];
    enemyData = enemiesData [Math. floor (Math. random() * enemiesData.length)];
    insertText("enemyName",enemyData["name"]);
    insertText("currentEnemyHp",enemyData["hp"]);
    insertText("maxEnemyHp",enemyData["hp"]);
    document.getElementById("currentEnemyHpGaugeValue").style.width = "100%";

    playerData["hp"] = playerData["maxHp"];
    playerData["mp"] = playerData["maxMp"];
    document.getElementById("currentPlayerHpGaugeValue").style.width = "100%";
    document.getElementById("currentPlayerMpGaugeValue").style.width = "100%";
    insertText("playerName",playerData["name"]);
    insertText("currentPlayerHp",playerData["hp"]);
    insertText("maxPlayerHp",playerData["hp"]);
    document.getElementById("mask").classList.remove("active");
    document.getElementById("modal").classList.remove("active");
    hiddenNextButton = false;
    hiddenContinueButton = false;

    let removeLogs = document.querySelector('#logs');
    while(removeLogs.firstChild) {
        removeLogs.removeChild(removeLogs.firstChild);
    }
    logIndex = 0;
    storyIndex = 0;
    changeStory(false);
})




