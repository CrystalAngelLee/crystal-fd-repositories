def is_even(n):
    return n % 2 == 0

def max_in_list(numbers):
    max_number = numbers[0]
    for number in numbers:
        if number > max_number:
            max_number = number
    return max_number

print(is_even(4))              # 应该是 True
print(is_even(7))              # 应该是 False
print(max_in_list([3, 9, 2, 7]))   # 应该是 9