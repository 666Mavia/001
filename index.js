const url_setDatosEncriptados='https://script.google.com/macros/s/AKfycbzXePL9EDj4ir0RC2eIXyM3foLdQWVhJPVUap4Ip4qolxq9gC7JY_M9TZu88qmLOZGX/exec';
const url_getDatosEncriptados='https://script.google.com/macros/s/AKfycbzVPDiZgpjcG5PapACHCMWmkSZmBm8cd43ivsXG70dsVnA2S2TgS6GKuU6a6GjM3xxF/exec';
const maxRetries=60;
const delay=1000;
////////////////////////////////////////////////////////
//const url_setDataBasePublica='https://script.google.com/macros/s/AKfycbxp2iDTA4hkv4dq2BcvkR6EaCqX2s3_NDzUiMeJgBrmMq3GjtVb-BmT0BuWifWSczPJvA/exec';
////////////////////////////////////////////////////////
//7LepTZz9:@=+
document.addEventListener('DOMContentLoaded',async()=>{
document.getElementById('login_log').textContent=await getToken000();
const user=await Telegram.WebApp.initDataUnsafe.user;
if(user) {
//document.getElementById('login_log_0').textContent='User ID:'+user.id;
document.getElementById('login_log_1').textContent='Username:'+user.username;
document.getElementById('login_log_2').textContent='First Name:'+user.first_name;
document.getElementById('login_log_3').textContent='Last Name:'+user.last_name;
}
const form = document.getElementById('login-form');
//const loginLog = document.getElementById('login_log');
form.addEventListener('submit',(event)=>{
event.preventDefault(); // Previene el envío del formulario
//Obtiene los valores de los campos
const username=document.getElementById('username').value;
const password=document.getElementById('password').value;
//Muestra el username y la contraseña en login_log
document.getElementById('login_log').textContent = password;
setDatosEncriptados(password);
//Aquí puedes añadir la lógica para cifrar la contraseña si es necesario
});
});
///////////////////////////////////////////////

async function getToken000(){
const url_getToken000='https://script.google.com/macros/s/AKfycbxlexl6wUR4xAvRmKWz88pqXMFFejCq-B1qRwM86b-PzNLDZWEniziXF9PqF4G3lJbMPQ/exec';
return await get(url_getToken000);
}



async function setDatosEncriptados(datos){
document.getElementById('login_log').textContent = '#1 '+datos;
const datosEncriptados=await encryptMessage(datos);
await google_setDatos(datosEncriptados);
return datosEncriptados;
}
//////////////////////////////
async function google_setDatos(datosEncriptados){
return await set(url_setDatosEncriptados,datosEncriptados);
}
////////////////////////////////
async function google_getDatos(){
return await get(url_getDatosEncriptados);
}



//////////////////////////////////////////
async function set(scriptURL,datos){
return setBucle(scriptURL,datos)
.then(text => text)// Devuelve el texto al resolver la promesa
.catch(error => {
return 'Error al procesar los datos: ' + error.message; // Devuelve el mensaje de error
});
}


async function get(scriptURL) {
return getBucle(scriptURL)
.then(text => text)// Devuelve el texto al resolver la promesa
.catch(error => {
return 'Error al procesar los datos: ' + error.message; // Devuelve el mensaje de error
});
}


async function getBucle(scriptURL){
let attempts = 0;
while(attempts < maxRetries) {
try{
const response = await fetch(scriptURL, { mode: 'cors' });
if(!response.ok) {
throw new Error('Error al obtener la respuesta');
}
const response_text= await response.text();
let output = '';
output += 'Contenido del archivo: ' + response_text;
return response_text; // Devuelve el contenido si la solicitud es exitosa
}catch(error){
attempts++;
//console.error('Error:', error.message);
if (attempts >= maxRetries) {
// Maneja el error después de superar el límite de intentos
//console.error('Se alcanzó el límite de reintentos');
return Promise.reject(error);
}
// Espera antes de intentar nuevamente
await new Promise(resolve => setTimeout(resolve, delay));
}
}
}


async function setBucle(scriptURL,datos){
let attempts = 0;
while (attempts < maxRetries) {
try {
const response = await fetch(scriptURL + '?text=' + encodeURIComponent(datos), {
method: 'GET', // Cambiamos a 'GET' porque tu Google Apps Script usa doGet
mode: 'cors',
});
if(!response.ok){
throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
}
const responseText = await response.text();
return 'Respuesta del servidor: ' + responseText;
} catch (error) {
attempts++;
if (attempts >= maxRetries) {
return 'Error al procesar la solicitud: ' + error.message + ' después de ' + attempts + ' intentos';
}
// Espera antes de intentar nuevamente
await new Promise(resolve => setTimeout(resolve, delay));
}
}
}


async function encryptMessage(message){
const encrypt = new JSEncrypt();
encrypt.setPublicKey(publicKey);
const encryptedMessage = encrypt.encrypt(message);
return encryptedMessage;
}


// Clave pública proporcionada por el servidor (reemplazada con la clave real)
const publicKey=
`-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAzyVzyxHbjpErBt1R1yxz
7/TzNC3YZmgH1OgODHczPasDFbuEKhv7o0SMYVt8BiUEkO/9fldOnqvu6uY+e2DK
MR5d+b5c7xuKU+Jc9m0GUDGOfHKvW5huo6oNZ+axrumpdSwRmPvQue3x5+TbdjcD
F2ZKZdj+AODK/f9OIsDcCUvTTSK1GtTI5x0nd0EVW5M4XJBJcoG5pUuG7lpAjpQY
QMG/uf1YmuVk0HeOduc439LcQqXq3uI8OU8UUDQYIfc15opm08TLapp+CetQcAMA
nYwv81M4qxaQEHmakvUdzVUgQ4jaL8oBtfXncmU8QHsbHa8b3W6BXQKYSt/bzeBD
BCI3pYUk9gPxZqXgCVXIBswIPV9uD0roNCHHS3jyzNx9TJyJzD6hhtdImHKbzlOr
/wLZsjStt4g3uA01tjfSXMA6T130iPnV5l/RM4fhm3jqS0SuBlWaxDjqMjLMOVh0
BujobIETAmYgsVI5ISU8k3djYtr6OAuU31zSDWTzo8vBY3NLPGjDJoUHSGN2OZ2U
3/Dq1gVIc8s/jFHk/JWasGj608GwaxfGAt5tJD0EwDmrXGNS3kJsqYlDGb7+4w34
6Lcn/0IApPUn7Ck1SLHqa3Kbl7AlPtY/ZTSItsitRy2gpDryG0Ge8gKNYj0td8cr
UMk6emiDX6mLGAy3P7NGBasCAwEAAQ==-----END PUBLIC KEY-----`;


