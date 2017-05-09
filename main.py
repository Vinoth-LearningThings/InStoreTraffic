from flask import Flask, render_template, Response
from imageCompare_ahash import FaceCompare

app = Flask(__name__, template_folder="pages")



@app.route('/')
def index():
    return render_template('home.html')

def gen(camera):
    while True:
        frame = camera.get_frame()
        if frame != None:
            yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(gen(FaceCompare()),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(host='localhost', port=8080)
