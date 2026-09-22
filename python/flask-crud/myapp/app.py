# 入口文件:创建 app、初始化数据库、注册路由、启动
# 运行方式:./venv/bin/python myapp/app.py  (在 myapp 目录里跑)

from flask import Flask
from db import init_db
from routes import bp        # 从 routes.py 导入蓝图


app = Flask(__name__)
app.register_blueprint(bp)   # 把 routes.py 里的所有路由挂上来


if __name__ == "__main__":
    init_db()                # 启动前建表
    app.run(port=5000, debug=True)
