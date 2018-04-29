function serviceWorker(){
  if (!navigator.serviceWorker) return;

  navigator.serviceWorker.register('/sw.js').then(function() {
      console.log("Success");
  }).catch(function(e){
    console.log("Failed",e);
  });
}

serviceWorker();
