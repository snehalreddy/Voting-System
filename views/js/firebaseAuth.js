function checkIfLoggedIn() {
    // implement logic to check if the user is logged in

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log('User logged in.')

            document.getElementById('google-signin')
                .setAttribute('style', 'display: none; visibility: hidden')
            document.getElementById('signout')
                .setAttribute('style', 'display: inline-block; visibility: visible')
        } else {
            console.log('User not signed in.')

            document.getElementById('google-signin')
                .setAttribute('style', 'display: inline-block; visibility: visible')
            document.getElementById('signout')
                .setAttribute('style', 'display: none; visibility: hidden')
        }
    })
}

window.onload = () => {
    checkIfLoggedIn()
}

function signOut() {
    firebase.auth().signOut()

    checkIfLoggedIn()
}

function signInWithGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider()

    firebase.auth().signInWithPopup(provider)
        .then(function (data) {
            // console.log(data)

            var idToken = data.credential.idToken
            // localStorage.setItem('firebase_idToken', idToken

            var username = data.user.displayName
            // localStorage.setItem('username', username)

            checkIfLoggedIn()
        })
        .catch(function (err) {
            console.log(err)
        })
}