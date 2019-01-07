new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameRunning: false,
        gameLog: [],
        turn: '',
        playerBar: 'green',
        monsterBar: 'green'
    },
    methods: {
        startGame: function(){
            this.gameLog = []
            this.gameRunning = !this.gameRunning
            this.playerHealth = this.monsterHealth = 100
            this.playerBar = this.monsterBar = 'green'
        },
        attack: function(){
            this.damage(3, 9)
        },
        specialAttack: function(){
            this.damage(5, 12)
        },
        damage: function(min, max){
            damage = Math.floor(Math.random() * (max - min + 1) + min)
            this.monsterHealth -= damage
            if(this.monsterHealth < 50 && this.monsterHealth > 20){
                this.monsterBar = 'yellow'
            }else if(this.monsterHealth < 20){
                this.monsterBar = 'red'
            }
            this.gameLog.unshift({
                message: `Player did ${damage} damage to monster.`,
                turn: 'player-turn'
            })
            if(this.monsterHealth <= 0){
                this.monsterHealth = 0
                this.endGame('You won!')
                return
            }
            this.monsterDamage()
        },
        monsterDamage: function(){
            let damage = Math.floor(Math.random() * (10 - 4 + 1) + 4)
            this.playerHealth -= damage
            if(this.playerHealth < 50 && this.playerHealth > 20){
                this.playerBar = 'yellow'
            }else if(this.playerHealth < 20){
                this.playerBar = 'red'
            }
            this.gameLog.unshift({
                message: `Monster did ${damage} damage to player.`,
                turn: 'monster-turn'
            })
            if(this.playerHealth <= 0){
                this.playerHealth = 0
                this.endGame('You lost!')
            }
        },
        heal: function(){
            if(this.playerHealth >= 90){
                this.playerHealth = 100
            }else{
                this.playerHealth += Math.floor(Math.random() * (10 - 7 + 1) + 7)
            } 
            if(this.playerHealth >= 50){
                this.playerBar = 'green'
            }
            this.gameLog.unshift({
                message: `Player healed for 10 points.`,
                turn: 'player-turn-heal'
            })
            this.monsterDamage()
        },
        endGame: function(message){
            let choice = confirm(message)
            if(choice){
                this.gameRunning = false
            }
            this.startGame()
        }
    }
})