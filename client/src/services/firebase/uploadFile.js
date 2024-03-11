import Compressor from 'compressorjs'
import firebase from 'src/services/firebase'

// REJECT: Upload error
// RESOLVE: Img download url
const uploadFile = (file, directory) =>
  new Promise((resolve, reject) => {
    console.log('file', file)
    const storage = firebase.storage()
    const storageRef = storage.ref()
    const path = `${directory}/${file.name}`

    // compress file
    new Compressor(file, {
      quality: 0.6,
      convertSize: 1,
      success(result) {
        const uploadTask = storageRef.child(path).put(result)
        uploadTask.on(
          'state_changed',
          (snapshot) => {},
          (e) => {
            reject(e)
          },
          () => {
            // UPLOAD SUCCESS
            uploadTask.snapshot.ref.getDownloadURL().then((src) => {
              resolve(src)
            })
          }
        )
      },
      error(err) {
        console.log(err.message)
      },
    })
  })

export default uploadFile
