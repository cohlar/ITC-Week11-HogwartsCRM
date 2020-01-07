from flask import Flask
import lib.hogwarts as hogwarts

app = Flask(__name__)

@app.route('/')
def index():
    return 'Index'
    
if __name__ == '__main__':
    app.run()