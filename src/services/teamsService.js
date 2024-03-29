const teamsModels = require("../models/teams");
const TeamService  = {};


TeamService.createTeam = (users, amountTeams)=>{
    const teamsLength = users.length / amountTeams;
    const lenghtPostition = Math.floor(teamsLength/2)
    let remainignUser = users
    const team1= [];
    const team2 = [];
    remainignUser = sortPlayer(users,team1,team2,"POR",1,teamsLength);
    remainignUser = sortPlayer(remainignUser,team1,team2,"DEF",lenghtPostition,teamsLength)
    remainignUser = sortPlayer(remainignUser,team1,team2,"MED",lenghtPostition,teamsLength)
    remainignUser = sortPlayer(remainignUser,team1,team2,"ATA",lenghtPostition,teamsLength)
    reguleTeams(remainignUser,teamsLength,[team1,team2])
    return {team1,team2}
}

TeamService.deleteTeam = ()=>{

}

const reguleTeams = (lastUser,teamsLength,teams)=>{
    lastUser.forEach(user => {
        teams.forEach(team=>{
            if(!team.length!==teamsLength){
                if(team.length<teamsLength){
                    team.push(user)
                }
            }
        })
    });
}

const sortPlayer = (users,team1,team2,rol,countAceptly,teamsLength)=>{
    let players = users; 
    players.map(user=>{
        if(team1.filter(e => e.rol1 === rol).length < countAceptly && team1.filter(e => e.rol2 === rol).length < countAceptly){
            if(user.rol1===rol){
                console.log()
                 if(team1.length!=teamsLength){
                    team1.push(user)
                    players = players.filter(play => play._id != user._id);
                 }
                
            }
            else if(user.rol2===rol){
                if(team1.length!=teamsLength){
                    team1.push(user)
                    players = players.filter(play => play._id != user._id);
                } 
            }
        }
    })
    players.map(user=>{
        if(team2.filter(e => e.rol1 === rol).length < countAceptly && team2.filter(e => e.rol2 === rol).length < countAceptly){
            if(user.rol1===rol){
                if(team2.length!=teamsLength){
                    team2.push(user)
                    players = players.filter(play => play._id != user._id);
                }
            }
            else if(user.rol2===rol){
                if(team2.length!=teamsLength){
                    team2.push(user)
                    players = players.filter(play => play._id != user._id);
                }
            }
        }
    })
    return players
}


module.exports = TeamService;