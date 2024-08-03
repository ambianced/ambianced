from flask import Flask, jsonify
import easyocr

app = Flask(__name__)

reader = easyocr.Reader(['ch_sim','en']) # load this only once

@app.route('/')
def hello():
    result = reader.readtext('textbook.png')

    textlist = []
    for el in result:
        textlist.append(el[1])
    return jsonify(textlist)

if __name__ == '__main__':
    app.run(debug=True)
