#!/usr/bin/python
# -*- coding: utf-8 -*-
from PIL import Image, ImageOps
from hash_utils import Hash
import numpy as np
import cv2
import urllib2, json

faceDetect = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
requestUrl = 'http://157.227.254.232:8080/instoretraffic/insertTrafficCount'
values = json.dumps({'strNbr': '9078', 'trafficTimeStamp': '2017-04-16 15:21', 'trafficCount' : '1','trafficType' : 'Entry'})
req = urllib2.Request(requestUrl, values,headers={'Content-Type': 'application/json'})

bytes = ''
hashArray = []

class FaceCompare(object):
    
    def __init__(self):
        global stream
        stream = urllib2.urlopen('http://192.168.42.129:8080/video?x.mjpg')

    def dhash(image, hash_size=8):

            # Grayscale and shrink the image in one step.

        image = image.convert('L').resize((hash_size + 1, hash_size),
                Image.ANTIALIAS)

        pixels = list(image.getdata())

            # Compare adjacent pixels.

        difference = []
        for row in xrange(hash_size):
            for col in xrange(hash_size):
                pixel_left = image.getpixel((col, row))
                pixel_right = image.getpixel((col + 1, row))
                difference.append(pixel_left > pixel_right)

            # Convert the binary array to a hexadecimal string.

        decimal_value = 0
        hex_string = []
        for (index, value) in enumerate(difference):
            if value:
                decimal_value += 2 ** (index % 8)
            if index % 8 == 7:
                hex_string.append(hex(decimal_value)[2:].rjust(2, '0'))
                decimal_value = 0

        return ''.join(hex_string)


    def hamming2(s1, s2):
        """Calculate the Hamming distance between two bit strings"""

        assert len(s1) == len(s2)

        return sum(c1 != c2 for (c1, c2) in zip(s1, s2))

    def isFaceExists(self, currFaceScore, faceScoreArray):
            print 'inside isFaceExists'
            faceExist = False
            for faceScore in faceScoreArray:
                    diff = 0
                    for i in range(len(currFaceScore)):
                            if faceScore[i] != currFaceScore[i]:
                                diff += 1
                    if diff < 60:
                            faceExist = True
                            print 'faceExist', faceExist
                            return faceExist
            print 'faceExist', faceExist
            return faceExist

            
    def get_frame(self):
        global bytes
        bytes += stream.read(1024)
        a = bytes.find('\xff\xd8')
        b = bytes.find('\xff\xd9')
        if a != -1 and b != -1:
            jpg = bytes[a:b + 2]
            bytes = bytes[b + 2:]
            img = cv2.imdecode(np.fromstring(jpg, dtype=np.uint8),
                               cv2.CV_LOAD_IMAGE_COLOR)
            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            faces = faceDetect.detectMultiScale(gray, 1.3, 5)
            for (x, y, w, h) in faces:
                print 'no.of faces=', len(faces)
                cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)
                image = Image.fromarray(img[y:y + h, x:x + w])
                image_hasher = Hash(image)
                curr_image_score = image_hasher.ahash()
                if len(hashArray) > 0:
                    currentArray = hashArray
                    for imageInArray in currentArray:
                        diff = 0
                        for i in range(len(curr_image_score)):
                            if imageInArray[i] != curr_image_score[i]:
                                diff += 1
                        if diff > 60:
                            isFaceExisted = self.isFaceExists(curr_image_score,currentArray)
                            if isFaceExisted != True:
                                    hashArray.append(curr_image_score)
                                    urllib2.urlopen(req)
                else:
                    hashArray.append(curr_image_score)
                    urllib2.urlopen(req)
                print 'length of array', len(hashArray)

            ret, jpeg = cv2.imencode('.jpg', img)
            return jpeg.tobytes()

    cv2.destroyAllWindows()
