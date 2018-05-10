const manifest_url = '/media/tos/ready/live.mpd'

function start_streaming(user) {
  var player = dashjs.MediaPlayer().create();
  player.initialize(document.getElementById("tv-player"), manifest_url, true);
  player.clearDefaultUTCTimingSources();
}

function initApp() {
  /* Listening for auth state changes */
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      document.getElementById('user-signed-in').style.display = 'block';
      document.getElementById('user-info').textContent = 'Welcome! ' + user.displayName;

      /* User is signed in */
      start_streaming(user);
    } else {
      /* Redirect to the sign-in page if user is not signed in */
      window.location.replace('/widget.html');
    }
  });

  document.getElementById('sign-out').addEventListener('click',
    function() {
      firebase.auth().signOut();
    }
  );
}

window.addEventListener('load', initApp);
