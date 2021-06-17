// navigator = browser
if ('serviceWorker' in navigator) {

    // the serviceWorker.register function returns a promise
    navigator.serviceWorker.register('/sw.js')
        .then(function () {
            // console.log('service worker registered!')
        })

        .catch(function (err) {
            console.log(err);
        });
}

// prevents the default add to homescreen option prompted by google chrome (provided criteria has been met)
// criteria: https://web.dev/install-criteria/
var deferredPromt;
window.addEventListener('beforeinstallprompt', function (event) {
    event.preventDefault();
    deferredPromt = event;
    return false;
})


var button = document.getElementById('js-a2hs');

button.addEventListener('click', (e) => {

    deferredPromt.prompt();

    deferredPromt.userChoice.then(function (choiceResult) {

      console.log(choiceResult.outcome);

      if (choiceResult.outcome === 'dismissed') {
        console.log('user cancelled installation');
      } else {
        console.log('user added to homescreen');
      }

      deferredPromt = null;

    })


});