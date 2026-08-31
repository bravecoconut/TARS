# app.py
from quart import Quart
from quart_cors import cors
from quart_blueprints.sessions import sessions_bp
from quart_blueprints.user_client import user_client_bp
from quart_blueprints.user_srcf import user_srcf_bp
from quart_blueprints.others import user_others_bp
from quart_blueprints.agent_ascii import agent_ascii_bp
from quart_blueprints.agents import agents_bp
from db import init_db


app = Quart(__name__)
app.json.default = str

app = cors(
    app,
    allow_origin="http://localhost:8000",  # match wherever you're serving r.html from
    allow_credentials=True,  # required since you send the sec_key cookie
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


if __name__ == "__main__":
    app.run(debug=True)
