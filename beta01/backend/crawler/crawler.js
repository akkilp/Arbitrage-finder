var request = require('request');
var cheerio = require('cheerio');
var util    = require('util');

var links  = [];
var id     = -1;
const hltv = 'https://www.hltv.org';

function fetchUpcomingMatches() {
    console.log("Updating links... ")
    request(hltv+'/matches', function(error, response, html) {
        if (!error && response.statusCode == 200) { 
            var $ = cheerio.load(html);

            // Find Links
            let newLinks = new Array;
            let foundLinks = $('.upcoming-match')
            foundLinks.map((i,e) => {
                let link = $(e).find('a.a-reset').attr('href');
                newLinks.push(link)
            })
            links = newLinks;
            console.log("Links updated. The links:" + links)
        }
    })
}

function getProviderNames (link) {
    let regExr = /(?<=\/logos\/)(.*)(?=\.|_)/g
    let match = link.match(regExr)
    return match;
}

function parseLink (link) {
    let regExr = /(\.[a-z][a-z]*[a-z]\/)/g
    let matchIndex = link.indexOfRegex(regExr)
    // REGEXIN PITÄIS LÖYTÄÄ KOKO ROSKA ILMAN HARDKOODAUSTA
    return link.slice(0,matchIndex+3)
}

String.prototype.indexOfRegex = function(regex){
    var match = this.match(regex);
    return match ? this.indexOf(match[0]) : -1;
}


function updateMatch() {
    id += 1;
    let matchAddress = links[id]
    if(links.length>=id){
        console.log("Fetching link: " + matchAddress)
        request(hltv+matchAddress, function(error, response, html) {
            if (!error && response.statusCode == 200) {  
                var oddFilter = /(?:[0-9]*[0-9]\.[0-9]*[0-9])/
                var $ = cheerio.load(html);
    
                // TIME AND EVENT
                let date =  $(html).find('.timeAndEvent').find('.time').text()
                let event = $(html).find('.timeAndEvent').find('a').text()
    
                // TEAM 1 INFO
                let team1Name = $(html).find('div.team1-gradient').find('.teamName').text()
                let team1Logo = $(html).find('div.team1-gradient').find('img.logo').attr('src')
                let team1odds = new Array;
                // TEAM 2 INFO
                let team2Name = $(html).find('div.team2-gradient').find('.teamName').text()
                let team2Logo = $(html).find('div.team2-gradient').find('img.logo').attr('src')
                let team2odds = new Array;
    
                //GET ODDS
                var providerArr = [];
                let raw =  $(html).find('.compare.standard-box').find('tr').not('.hidden')
                let odds = raw.map((i, element) =>{
                    let providerLink = $(element).find('td').eq(0).find('a').attr('href');
                    let providerLogo = $(element).find('td').eq(0).find('img').eq(0).attr('src');
                    let team1Odd;                    
                    let rawOdd1 = $(element).find('td').eq(1).find('a').text();
                    if(rawOdd1.match(oddFilter)){
                        team1odds.push(rawOdd1)
                        team1Odd = rawOdd1
                    } else return;
                    
                    let team2Odd;
                    let rawOdd2 = $(element).find('td').eq(3).find('a').text();
                    if(rawOdd2.match(oddFilter)){
                        team2odds.push(rawOdd2)
                        team2Odd = rawOdd2
                    } else return;
                    
                    let parsedLink = parseLink(providerLink)

                    let providerObject = {[getProviderNames(providerLogo)]:{
                                            'team1Odd': team1Odd,
                                            'team2Odd': team2Odd,
                                            'link': parsedLink,
                                            'providerLogo': providerLogo
                                        }}

                    providerArr.push(providerObject)

                    return 
                })
                
                let bestOddT1 = (team1odds.sort((a, b)=>{return b-a})).shift()
                let bestOddT2 = (team2odds.sort((a, b)=>{return b-a})).shift()
    
                let matchObject = {
                    "date": date,
                    "event": event,
                    "team1": {
                        "name": team1Name,
                        "logo": team1Logo,
                        "odds": team1odds.sort((a, b)=>{return b-a}),
                        "bestOdd": bestOddT1,
                        },
                    "team2": {
                        "name": team2Name,
                        "logo": team2Logo,
                        "odds": team2odds.sort((a, b)=>{return b-a}),
                        "bestOdd": bestOddT2,
                        },
                    "providers": providerArr,
                    "arbitrage": ((1/bestOddT1)*100) + ((1/bestOddT2)*100)
                }

                console.log(util.inspect(matchObject, {showHidden: false, depth: null}))
                // console.log(team2odds)
                // let first = team1odds.sort((a, b)=>{return b-a})
                // let second  = team2odds.sort((a, b)=>{return b-a})
                // console.log(second)
                // let firstShifted = first.shift()
                // let secondShifted = second.shift()
                // let firstWin = ((1/firstShifted)*100) 
                // let secondWin= ((1/secondShifted)*100)
                // console.log(team1Name+ ": " +first +"  |  "  + team2Name +": " +second + " | ")
                // console.log(team1Name+ ": " +firstShifted  +"  |  "  + team2Name +": " +secondShifted+ " | ")
                // console.log(firstWin+secondWin)
                // console.log((50/firstShifted) + (50/secondShifted))
    
            } else res.send(error)
        })
    } else id = 0;
    return
}



setTimeout(fetchUpcomingMatches, 1000)
setInterval(updateMatch, 5000)


// console.log(randomizeTimeout)
// var randomizeTimeout = (Math.random() * (10000 - 2000) + 2000)
