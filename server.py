# app.py
from quart import Quart
from quart_blueprints.sessions import sessions_bp
from quart_blueprints.user_client import user_client_bp
from quart_blueprints.user_srcf import user_srcf_bp
from quart_blueprints.others import user_others_bp
from db import init_db

app = Quart(__name__)
app.json.default = str
blueprints = [sessions_bp, user_client_bp, user_srcf_bp, user_others_bp]

for bp in blueprints:
    app.register_blueprint(bp)
    
@app.before_serving
async def startup():
    await init_db()

if __name__ == "__main__":
    app.run(debug=True)