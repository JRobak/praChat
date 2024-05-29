import random

LENGTH = 3

numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]


def create_user_code(lenght):
    user_code = random.choices(numbers, k=lenght)
    user_code = [str(x) for x in user_code]
    return int(''.join(user_code))
