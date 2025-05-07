document.getElementById('guardarDomicilio').addEventListener('click', () => {
    const domicilio = {
        calle: document.getElementById('calle').value,
        numero: document.getElementById('numero').value,
        colonia: document.getElementById('colonia').value,
        ciudad: document.getElementById('ciudad').value
    };

    localStorage.setItem("domicilio", JSON.stringify(domicilio));
    alert("Domicilio guardado correctamente.");
    window.close(); 
});