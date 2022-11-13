
const N_NUMBERS     = 4;    // Code length
const MIN_NUMBER    = 1;
const MAX_NUMBER    = 9;
const N_TRIES       = 10;   // N tries for user get one lose


let username;
let n_rounds;               // In a game
let game_win        = false;
let game_code       = [];

let user_wins       = 0;    // Total
let user_losses     = 0;    // Total


const create_code = () =>
{
    let code = [];
    while(code.length < N_NUMBERS)
    {
        let new_number = Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER) + MIN_NUMBER);
        if(code.indexOf(new_number) === -1)
        {
            code.push(new_number);
        }
    }

    return code;
};


const convert_code = (code) =>
{
    let result_code = [];
    for(let i = 0; i < code.length; ++i)
    {
        result_code.push(parseInt(code[i]));
    }

    return result_code;
};


const compare_codes = (code, user_code) =>
{
    let correct_number  = 0;
    let number_in       = 0;
    for(let i = 0; i < N_NUMBERS; ++i)
    {
        if(code[i] === user_code[i])
        {
            ++correct_number;
        }

        for(let j = 0; j < N_NUMBERS; ++j)
        {
            if(code[i] === user_code[j])
            {
                ++number_in;
            }
        }
    }

    return [correct_number, number_in];
};


const startGame = () =>
{
    document.getElementById("username_title").innerHTML = username;
    document.getElementById("wins").innerHTML = "<h3>Wins: " + user_wins + "</h3>";
    document.getElementById("losses").innerHTML = "<h3>Losses: " + user_losses + "</h3>";
    document.getElementById("round_input").style.display = "flex";
    game_code = create_code();
    n_rounds = 1;
    game_win = false;
    let round_title = document.getElementById("round_title");
    round_title.innerHTML = "Round " + n_rounds;  
};


function round()
{
    let correct_number, number_in;
    let round_table = document.getElementById("round_table"); 

    if(n_rounds < N_TRIES && game_win == false) 
    {
        let user_code = convert_code(document.getElementById("user_code").value);
        [correct_number, number_in] = compare_codes(game_code, user_code);

        let round = round_table.insertRow(-1);
        let cell1 = round.insertCell(0);
        let cell2 = round.insertCell(1);
        let cell3 = round.insertCell(1);

        cell1.innerHTML = "<td>" + user_code + "</td>";
        cell2.innerHTML = "<td>" + number_in + "</td>";
        cell3.innerHTML = "<td>" + correct_number + "</td>";

        round_title.innerHTML = "Round " + ++n_rounds;
    }
    else if(n_rounds === N_TRIES && confirm("You have lose, the code was " + game_code + ", do you want to start a new game?"))
    {
        ++user_losses;
        for (let i = 0; i < n_rounds-1; ++i) // Delete all tries of the table
        {
            round_table.deleteRow(1);
        }
        startGame(); // Start a new game 
    }

    if(correct_number === N_NUMBERS || game_win)
    {
        game_win = true; 
        if(confirm("You have win, do you want to start a new game?"))
        {             
            ++user_wins;
            for (let i = 0; i < n_rounds-1; ++i) // Delete all tries of the table
            {
                round_table.deleteRow(1);
            }
            startGame(); // Start a new game 
        }
    }
};


function playerInformationInput()
{
    username = document.getElementById("username").value;
    document.getElementById("user_information").style.display = "none";

    startGame();
};


information_button.addEventListener("click", playerInformationInput);

round_button.addEventListener("click", round);


document.getElementById("round_input").style.display = "none";
