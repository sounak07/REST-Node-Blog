function serviceWorker(){
  if (!navigator.serviceWorker) return;

  navigator.serviceWorker.register('/sw.js').then(function(reg) {

  });
}

serviceWorker();
