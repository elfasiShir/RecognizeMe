import face_recognition
import sys              #import data
import json
import urllib.request as ur
import numpy as np

def arranging_data( data ):
     known_encoding = np.array([])
     for index, list in enumerate( data ):   #Converting the encoded data to an 128 dimension array(for the use of face recognition)
          if index == 0:  #Cut the '[' char from the beginning
              list = list[1:]
          if index == len( data ) - 1:  #Cut the '[' char from the end
              list = list[:-1]

          array = np.array( list.split() )
          known_encoding = np.concatenate((known_encoding,array), axis=0)

     known_encoding = [float(num) for num in known_encoding]    #Converting str items to float
     return known_encoding


if __name__ == '__main__':
    list = json.loads(sys.argv[1])["users"]
    unknown_decoded_data = ur.urlopen( sys.argv[2] )           #Converting _imageAsDataUrl to image
    unknown_image = face_recognition.load_image_file( unknown_decoded_data )

    isAUser = bool(False)
    user_id = ""

    if len(face_recognition.face_locations(unknown_image)) != 0:
        for user in list:
            known_encoding = arranging_data( user["encoding"] )
            unknown_encoding = face_recognition.face_encodings(unknown_image)[0]

            try:
                if face_recognition.compare_faces([known_encoding], unknown_encoding)[0]:
                  isAUser = bool(True)
                  user_id = user["_id"]
            except Exception as e:
                print( e )

            if isAUser is bool(True):
                break
    print(user_id)

