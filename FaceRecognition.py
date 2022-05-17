import face_recognition

def face_encoding(image){
  return face_recognition.api.face_encodings(
    image,
    known_face_locations=None,
    num_jitters=1,
    model='large')
}
