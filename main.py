
from typing import List
from random import randint
import time


N_NUMBER: int = 4


def create_code() -> List[int]:
    code: List[int] = []    
    i: int = 0
    while i < N_NUMBER:
        new_number = randint(1,9)
        if new_number not in code:
            code.append(new_number)
            i += 1
    
    return code


def compare_codes(code: List[int], user_code: List[int]):
    correct_number = len([i for i, j in zip(code, user_code) if i == j]) # n number that are in the same place
    number_in = len(set(code) & set(user_code)) # n numbers that are in 
    
    return correct_number, number_in
             

def main():
    code: List[int] = create_code()
    time.sleep(2)
    user_code: List[int] = create_code()
    correct_number, number_in = compare_codes(code, user_code)
    
    while correct_number < N_NUMBER:
        correct_number, number_in = compare_codes(code, user_code)
        print(code)
        print(user_code)
        print(f"{correct_number} are in the same place, {number_in} are in")
        time.sleep(2)
        user_code = create_code()
        exit
    

if __name__ == '__main__':
    main()