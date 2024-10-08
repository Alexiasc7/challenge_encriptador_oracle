const textArea = document.querySelector(".text-area");
const mensaje = document.querySelector("#myOutput");

let textoOriginal = ''; // Variable para almacenar el texto original encriptado

function btnEncriptar() {
    textoOriginal = textArea.value; // Guardamos el texto original antes de encriptar
    const textoEncriptado = encriptar(cleanText(textArea.value));
    mensaje.value = textoEncriptado;
    textArea.value = "";
    mensaje.style.backgroundImage = "none";
}

function encriptar(stringEncriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringEncriptada = stringEncriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringEncriptada.includes(matrizCodigo[i][0])) {
            stringEncriptada = stringEncriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1]);
        }
    }
    return stringEncriptada;
}

function btnDesencriptar() {
    const textoDesencriptado = desencriptar(mensaje.value); // Desencriptamos el texto del área de salida
    textArea.value = textoOriginal; // Restauramos el texto original en el área de entrada
    mensaje.value = textoDesencriptado;
    mensaje.style.backgroundImage = "none";
}

function desencriptar(stringDesencriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringDesencriptada = stringDesencriptada.toLowerCase();

    for (let i = 0; i < matrizCodigo.length; i++) {
        if (stringDesencriptada.includes(matrizCodigo[i][1])) {
            stringDesencriptada = stringDesencriptada.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0]);
        }
    }
    return stringDesencriptada;
}

function copyText() {
    let output = document.getElementById("myOutput");
    output.select();
    document.execCommand('copy');
}
function clearText() {
  textArea.value = ''; // Limpia el textarea de entrada
  mensaje.value = ''; // Limpia el textarea de salida
}

// Función para limpiar el texto: minúsculas, sin acentos ni signos
function cleanText(text) {
    return text.toLowerCase() // Convertir a minúsculas
        .normalize('NFD') // Descomponer caracteres acentuados
        .replace(/[\u0300-\u036f]/g, '') // Eliminar acentos
        .replace(/[^a-z\s]/g, ''); // Eliminar caracteres no alfabéticos (excepto espacios)
}

textArea.addEventListener('input', function() {
    textArea.value = cleanText(textArea.value);
});
