# app.py
from quart import Quart, send_from_directory
from quart_cors import cors
from quart_blueprints.sessions import sessions_bp
from quart_blueprints.user_client import user_client_bp
from quart_blueprints.user_srcf import user_srcf_bp
from quart_blueprints.others import user_others_bp
from quart_blueprints.agent_ascii import agent_ascii_bp
from quart_blueprints.agents import agents_bp
from db import init_db
from origins import ALLOW_ORIGINS

app = Quart(__name__, static_folder="client", static_url_path="")
app.json.default = str

app = cors(
    app,
    allow_origin=ALLOW_ORIGINS,
    allow_credentials=True,  
)

blueprints = [
    sessions_bp,
    user_client_bp,
    user_srcf_bp,
    user_others_bp,
    agent_ascii_bp,
    agents_bp,
]

for bp in blueprints:
    app.register_blueprint(bp)


@app.before_serving
async def startup():
    await init_db()

# temp
@app.route("/test")
async def test():
    return await send_from_directory(app.static_folder, "templates/agents-test.html")
@app.route("/")
async def index():
    return await send_from_directory(app.static_folder, "templates/index.html")

if __name__ == "__main__":
    app.run(debug=True)
