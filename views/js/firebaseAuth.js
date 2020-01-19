function signInWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider()

    firebase.auth().signInWithPopup(provider)
        .then(function (data) {
            console.log(data)

            var idToken = data.credential.idToken
            localStorage.setItem('firebase_idToken', idToken)

            var username = data.user.displayName
            localStorage.setItem('u sername', username)
        })
        .catch(function (err) {
            console.log(err)
        })
}