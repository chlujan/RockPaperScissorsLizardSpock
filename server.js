#!/usr/bin/env node

"use strict";

var http = require("http"),
    server,
    count = {"outcome":"", "win":0, "lose":0, "tie":0};
    
function beginPage(res, title) {
    res.write("<!DOCTYPE html>\n");
    res.write("<html lang='en'>\n");
    res.write("<head>\n");
    res.write("<meta charset='utf-8'>\n");
    res.write("<title>"+ title + "</title>\n");
    res.write("<link rel='stylesheet' href='style.css' type='text/css'>\n");
    res.write("</head>\n");
    res.write("<body>\n");
}
 
function endPage(res) {
    res.write("</body>\n");
    res.write("</html>\n");
    res.end();
}

function createButtons(res) {
    res.write("<form method='POST' action='/play/rock'>\n");
    res.write("<input type='submit' value='Rock'>\n");
    res.write("</form>\n");
    res.write("<form method='POST' action='/play/paper'>\n");
    res.write("<input type='submit' value='Paper'>\n");
    res.write("</form>\n");
    res.write("<form method='POST' action='/play/scissors'>\n");
    res.write("<input type='submit' value='Scissors'>\n");
    res.write("</form>\n");
    res.write("<form method='POST' action='/play/lizard'>\n");
    res.write("<input type='submit' value='Lizard'>\n");
    res.write("</form>\n");
    res.write("<form method='POST' action='/play/spock'>\n");
    res.write("<input type='submit' value='Spock'>\n");
    res.write("</form>\n");

}
 
function playGame(req, res) {
    var ran = ['rock', 'paper', 'scissors', 'lizard', 'spock'][Math.floor(Math.random() * 5)];

    if (req.url === "/play/rock") {
        if (ran === ("lizard" || "scissors")) {
	    count.win += 1 ;
	    count.outcome = "win";
	} else if (ran === ("paper" || "spock")) {
	    count.lose += 1 ;
            count.outcome = "lose";
	} else {
	    count.tie += 1 ;
            count.outcome = "tie";
	} 
        res.write(JSON.stringify(count));
    }
    else if (req.url === "/play/paper") {
        var ran = ['rock', 'paper', 'scissors', 'lizard', 'spock'][Math.floor(Math.random() * 5)];
	if (ran === ("rock" || "spock")) {
	    count.win += 1;
	    count.outcome = "win";
	} else if (ran === ("lizard" || "scissors")) {
	    count.lose += 1;
            count.outcome = "lose";
	} else {
	    count.tie += 1;
            count.outcome = "tie";
	}
        res.write(JSON.stringify(count));
    }
    else if (req.url === "/play/scissors") {
        var ran = ['rock', 'paper', 'scissors', 'lizard', 'spock'][Math.floor(Math.random() * 5)];
	if (ran === ("paper" || "lizard")) {
	    count.win += 1;
	    count.outcome = "win";
	} else if (ran === ("rock" || "spock")) {
	    count.lose += 1;
            count.outcome = "lose";
	} else {
	    count.tie += 1;
            count.outcome = "tie";
	} 
        res.write(JSON.stringify(count));
    }
    else if (req.url === "/play/lizard") {
        var ran = ['rock', 'paper', 'scissors', 'lizard', 'spock'][Math.floor(Math.random() * 5)];
	if (ran === ("paper" || "spock")) {
	    count.win += 1;
	    count.outcome = "win";
	} else if (ran === ("rock" || "scissors")) {
	    count.lose += 1 ;
            count.outcome = "lose";
	} else {
	    count.tie += 1 ;
            count.outcome = "tie";
	} 
        res.write(JSON.stringify(count));
    }
    else if (req.url === "/play/spock") {
        var ran = ['rock', 'paper', 'scissors', 'lizard', 'spock'][Math.floor(Math.random() * 5)];
        if (ran === ("rock" || "scissors")) {
	    count.win += 1 ;
	    count.outcome = "win";
	} else if (ran === ("paper" || "lizard")) {
	    count.lose += 1 ;
            count.outcome = "lose";
	} else {
	    count.tie += 1 ;
            count.outcome = "tie";
	} 
        res.write(JSON.stringify(count));
    }
}

function frontPage(req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});
    
    var title = "Rock Paper Scissors Lizard Spock";
    
    beginPage(res, title);    
    createButtons(res);

    if (req.method === "POST") {
        playGame(req, res);
    }
    
    endPage(res);   
}


server = http.createServer(frontPage);
server.listen();
var address = server.address();
console.log("Server is listening at http://localhost:" + address.port + "/");

