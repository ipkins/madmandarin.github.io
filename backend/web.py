from flask import Flask, jsonify
import mcrcon

app = Flask(__name__)

@app.route('/rest/minecraft/list')
def status_json():
    rcon = mcrcon.MCRcon()
    rcon.connect('localhost', 27014, '271271')
    test = rcon.command('/list')
    data = ''
    if test:
        data = test
    return jsonify({
        "test": data
    })

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000, debug=True)