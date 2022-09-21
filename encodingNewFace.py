import face_recognition
import sys
import json
import urllib.request as ur

if __name__ == '__main__':
        decoded_data = ur.urlopen( sys.argv[1] )
        image = face_recognition.load_image_file( decoded_data )
        if len(face_recognition.face_locations(image)) != 0:
          encoding = face_recognition.face_encodings(image)[0]
          print( encoding )
        else:
          print( False )


