from flask import send_file

@app.route("/api/download/<filename>")
def download(filename):
    return send_file(filename, mimetype="application/pdf")