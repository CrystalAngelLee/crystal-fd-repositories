# 被测模块:一些简单的纯函数
# (纯函数 = 给定输入就有确定输出、不依赖外部状态,最好测)


def add(a, b):
    return a + b


def is_even(n):
    return n % 2 == 0


def max_in_list(numbers):
    if not numbers:              # 空列表返回 None
        return None
    result = numbers[0]
    for n in numbers:
        if n > result:
            result = n
    return result
