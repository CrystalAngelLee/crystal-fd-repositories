users = [
    {"name": "小明", "age": 25, "city": "北京"},
    {"name": "小红", "age": 30, "city": "上海"},
    {"name": "小刚", "age": 22, "city": "北京"},
    {"name": "小美", "age": 28, "city": "上海"},
]


def find_by_city(users, city):
    result = []
    for u in users:
        if u["city"] == city:
            result.append(u)
    return result

print(find_by_city(users, "北京"))   # 应返回小明和小刚两条

def average_age(users):
    total_age = 0
    for user in users:
        total_age += user["age"]
    return total_age / len(users)

print(average_age(users))   # (25+30+22+28)/4 = 26.25