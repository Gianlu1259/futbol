const teamsModels = require("../models/teams");
const TeamService  = {};


TeamService.createTeam = (users, amountTeams)=>{
    const teamsLength = users.length / amountTeams;
    let remainignUser = users
    const team1= [];
    const team2 = [];
    remainignUser = sortPlayer(users,team1,team2,"arquero",1);
    remainignUser = sortPlayer(remainignUser,team1,team2,"defensa",Math.floor(teamsLength/2)+1)
    remainignUser = sortPlayer(remainignUser,team1,team2,"medio",Math.floor(teamsLength/2)+1)
    remainignUser = sortPlayer(remainignUser,team1,team2,"delantero",Math.floor(teamsLength/2)+1)
    return {team1,team2}
}

TeamService.deleteTeam = ()=>{

}

const sortPlayer = (users,team1,team2,rol,countAceptly)=>{
    let players = users; 
    players.map(user=>{
        if(team1.filter(e => e.rol1 === rol).length < countAceptly && team1.filter(e => e.rol2 === rol).length < countAceptly){
            if(user.rol1===rol){
                team1.push(user)
                players = players.filter(play => play._id != user._id);
            }
            else if(user.rol2===rol){
                team1.push(user)
                players = players.filter(play => play._id != user._id);
            }
        }
    })
    players.map(user=>{
        if(team2.filter(e => e.rol1 === rol).length < countAceptly && team2.filter(e => e.rol2 === rol).length < countAceptly){
            if(user.rol1===rol){
                team2.push(user)
                players = players.filter(play => play._id != user._id);
            }
            else if(user.rol2===rol){
                team2.push(user)
                players = players.filter(play => play._id != user._id);
            }
        }
    })
    return players
}


module.exports = TeamService;