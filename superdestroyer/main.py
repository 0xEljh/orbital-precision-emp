from flask import Flask, jsonify, request
from dotenv import load_dotenv
import os
from web3 import Web3

load_dotenv()

app = Flask(__name__)


@app.route('/test', methods=['GET'])
def test():
    return jsonify({"status": "healthy"}), 200


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)