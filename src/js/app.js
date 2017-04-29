
class AppConsole
{
    constructor(){
        this.inputHistory = [];
        this.inputHistoryPosition = 0;

        this.command = {
            list: [
                "help",
                "skills",
                "projects",
                "linkedin",
                "github",
                "resume",
                "clear"
            ],
            descriptions: {
                help: "Display a list of available commands",
                skills: "Display my skills",
                projects: "Display my projects",
                linkedin: "Open my LinkedIn profile in a new browser window",
                github: "Open my Github profile in a new browser window",
                resume: "Open my resume in a new browser window",
                clear: "Clear the console of all previous input",
            },
            help: function(scope){
                scope.command.list.forEach(function(command, index){
                    if(command !== "help"){
                        let description = scope.command.descriptions[command];
                        scope.displayText(command + " - " + description);
                    }
                }, scope);
            },
            skills:  function(scope){
                let skills = "HTML 5, CSS 3, Javascript, PHP, MySQL, Git, Laravel, Docker, Vue, Node, Express, Socket.io";
                scope.displayText(skills);
            },
            projects: function(scope){
                let projects = [
                    [
                        "Daemon - Multiplayer monster-battling game using websockets and javascript (currently in active development). <br>Type \'github daemon\' to visit this project's Github repository<br><br>"
                    ],
                    [
                        "Forecast - A seven-day weather forecast app that automatically updates based on the user’s current location. <br>Type \'github forecast\' to visit this project's Github repository<br><br>"
                    ],
                ]
                
                projects.forEach(function(project){
                    scope.displayText(project);
                }, scope);
            },
            linkedin:  function(scope){
                window.open("https://www.linkedin.com/in/daniel-pierce-iv");
            },
            github:  function(scope){
                window.open("https://github.com/daniel-pierce-iv");
            },
            resume:  function(scope){
                window.open("http://daniel-pierce-iv.com/files/resume.pdf");
            },
            clear: function(scope){
                scope.clearInput();
                scope.clearInputHistory();
                scope.clearInputHistoryElement();
            }
        }
        
        this.inputHistoryElement = document.getElementById("input-history");
        this.consoleElement = document.querySelector(".console");
        this.inputElement = document.querySelector("input");
        
        this.initializeInput();
    }
    
    //Keeps the input element focused at all times
    initializeInput(){
        this.inputElement.onblur = (function(event) {
            //Workaround for the "this" problem
            setTimeout(() => {
                this.inputElement.focus();
            }, 10);
        }).bind(this); //Again, a workaround
    }
    
    getLastInput(){
        return this.inputHistory[this.inputHistory.length - 1];
    }
    
    submitInput(){
        let input = this.inputElement.value.trim();
        this.addToHistory(input);
        this.inputHistoryPositionReset();
        this.processInput();
    }
    
    decrementInputHistoryPosition(){
        this.inputHistoryPosition -= 1;
        if(this.inputHistoryPosition < 0){
            this.inputHistoryPosition = 0;
        }
        this.displayInputHistoryAt(this.inputHistoryPosition);
    }
    
    incrementInputHistoryPosition(){
        this.inputHistoryPosition += 1;
        if(this.inputHistoryPosition > this.inputHistory.length){
            this.inputHistoryPosition = this.inputHistory.length;
        }
        this.displayInputHistoryAt(this.inputHistoryPosition);
    }
    
    displayInputHistoryAt(index){
        this.inputElement.value = this.inputHistory[index] || "";
    }
    
    inputHistoryPositionReset(){
        this.inputHistoryPosition = this.inputHistory.length;
    }
    
    processInput(){
        let lastInput = this.getLastInput();
        this.displayText(lastInput);
        
        if(this.commandExists(lastInput)){
            this.runCommand(lastInput);
        } else {
            this.displayText("Sorry, '" + lastInput + "' is not a valid command...");
        }
        
        this.clearInput();
    }
    
    commandExists(input){
        if(this.command.list.indexOf(input) >= 0){
            return true;
        }
        return false;
    }
    
    runCommand(command){
        let scope = this;
        this.command[command](scope);
    }
    
    displayText(output){
        let newLine = this.buildNewLine(output);
        this.appendNewLine(newLine);
    }
    
    buildNewLine(input){
        let divElement = document.createElement("div");
        divElement.classList.add("line");
        
        let spanElement = document.createElement("span");
        spanElement.textContent = ">";
        spanElement.classList.add("line-indicator");
        
//        let textNode = document.createTextNode(input); //Avoid XSS Attack
        
        let pElement = document.createElement("p");
//        pElement.textContent = textNode.textContent;
        pElement.innerHTML = input;
        
        divElement.appendChild(spanElement);
        divElement.appendChild(pElement);
        
        return divElement;
    }
    
    appendNewLine(line){
        this.inputHistoryElement.appendChild(line);
        this.shiftHistoryElementScroll(line);
    }
    
    shiftHistoryElementScroll(lastLine){
        this.inputHistoryElement.scrollTop = lastLine.offsetTop;
    }
    
    addToHistory(addition){
        this.inputHistory.push(addition);
    }
    
    //Handles clearing various parts of the console
    clearInput(){
        this.inputElement.value = "";
    }
    
    clearInputHistory(){
        this.inputHistory = [];
    }
    
    clearInputHistoryElement(){
        let history = this.inputHistoryElement;
        while(history.lastChild){
            history.removeChild(history.lastChild);
        }
    }
    
//    stringTrimAndSanitize(string){
//        
//    }
}

const Console = new AppConsole;

window.addEventListener("keydown", function(event){
    switch(event.key){
        case "Enter":
            Console.submitInput();
            break;
        case "ArrowUp":
            Console.decrementInputHistoryPosition();
            break;
        case "ArrowDown":
            Console.incrementInputHistoryPosition();
            break;
    }
});