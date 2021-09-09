 // Initialize Firebase com os parametros do database
 var firebaseConfig = {
     apiKey: "AIzaSyA4TUQckCM7kN_u-I5f4p2O_3JvFh29RX4",
     authDomain: "iot-7b861.firebaseapp.com",
     databaseURL: "https://iot-7b861-default-rtdb.firebaseio.com",
     projectId: "iot-7b861",
     storageBucket: "iot-7b861.appspot.com",
     messagingSenderId: "1036489764101",
     appId: "1:1036489764101:web:375fa080e06a7a2b1ddb6c",
     measurementId: "G-FERQ91D9M8"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 let lamp = document.querySelector('#lamp');

 // Evento de Click na imagem, set gravando no database
 lamp.addEventListener('click', () => {
     let val = lamp.getAttribute('data-state');
     console.log(val);
     if (val == 'off') {
         firebase.database().ref('led/').set('on');
     }

     if (val == 'on') {
         firebase.database().ref('led/').set('off');
     }

 });

 // Consulta do firebase snapshot para capturar a chave valor do campo led
 firebase.database().ref('led').on('value', snapshot => {
     let buttonState = snapshot.val();

     if (buttonState == 'on') {
         lamp.src = 'on.png';
         lamp.setAttribute('data-state', 'on');
     } else {
         lamp.src = 'off.png';
         lamp.setAttribute('data-state', 'off');

     }
 });