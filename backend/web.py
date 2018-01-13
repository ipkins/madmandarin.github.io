from flask import Flask, jsonify
import mcrcon

app = Flask(__name__)

@app.route('/rest/minecraft/list')
def status_json():
    rcon = mcrcon.MCRcon()
    rcon.connect('localhost', 27014, '271271')
    data = rcon.command('/list')

    return jsonify({
        "users": sorted(x.strip() for x in data.split(':')[1].split(','))
    })

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000, debug=True)