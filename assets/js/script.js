

const N_NUMBERS     = 4;
const MIN_NUMBER    = 1;
const MAX_NUMBER    = 9;


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


const main = () =>
{
    let code = create_code();
    let user_code = create_code();
    console.log(code);
    console.log(user_code);
    let [correct_number, number_in] = compare_codes(code, user_code);
    console.log(correct_number + " are in the same place, " + number_in + " are in");
};


main();