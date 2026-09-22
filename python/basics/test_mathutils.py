# 测试文件:命名 test_*.py,pytest 会自动发现
# 从被测模块导入要测的函数
from mathutils import add, is_even, max_in_list


# ---------- 示范:测 add ----------
def test_add():
    assert add(2, 3) == 5
    assert add(-1, 1) == 0
    assert add(0, 0) == 0


# ---------- 🎯 任务 1:测 is_even ----------
def test_is_even():
    # TODO: 用 assert 验证
    #   is_even(4) 应该是 True
    #   is_even(7) 应该是 False
    #   提示:assert is_even(4) == True  (或更 Pythonic:assert is_even(4))
    assert is_even(4) == True
    assert is_even(7) == False


# ---------- 🎯 任务 2:测 max_in_list ----------
def test_max_in_list():
    # TODO: 用 assert 验证
    #   max_in_list([3, 9, 2]) == 9
    #   max_in_list([-5, -1, -3]) == -1   (全负数也要对)
    #   max_in_list([]) is None           (空列表返回 None)
    assert max_in_list([3, 9, 2]) == 9
    assert max_in_list([-5, -1, -3]) == -1
    assert max_in_list([]) is None
