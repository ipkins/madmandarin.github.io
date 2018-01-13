from flask import Flask, jsonify
from flask_cors import CORS                           
import mcrcon

app = Flask(__name__)
CORS(app, resources={'/rest/*': {'origins': '*'}})

@app.route('/rest/minecraft/list')
def user_list():
    rcon = mcrcon.MCRcon()
    rcon.connect('localhost', 27014, '271271')
    data = rcon.command('/list')

    return jsonify({
        "users": sorted(x.strip() for x in data.split(':')[1].split(','))
    })

@app.route('/rest/minecraft/ban')
def ban_player():
    if request.method == 'POST':
        if request.form['password'] == 'kWb1QY8d':
            rcon = mcrcon.MCRcon()
            rcon.connect('localhost', 27014, '271271')
            data = rcon.command('/ban ' + request.form['nick'])
    else:
        data = 'Ошибка авторизации'

    return jsonify({
        "result": data
    })

@app.route('/rest/minecraft/kick')
def kick_player():
    if request.method == 'POST':
        if request.form['password'] == 'kWb1QY8d':
            rcon = mcrcon.MCRcon()
            rcon.connect('localhost', 27014, '271271')
            data = rcon.command('/kick ' + request.form['nick'])
        else:
            data = 'Ошибка авторизации'
    else:
        data = 'Ошибка запроса'

    return jsonify({
        "result": data
    })

@app.route('/rest/minecraft/restart')
def server_restart():
    if request.method == 'POST':
        if request.form['password'] == 'kWb1QY8d':
            rcon = mcrcon.MCRcon()
            rcon.connect('localhost', 27014, '271271')
            data = rcon.command('/stop')
        else:
            data = 'Ошибка авторизации'
    else:
        data = 'Ошибка запроса'

    return jsonify({
        "result": data
    })

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000, debug=True)