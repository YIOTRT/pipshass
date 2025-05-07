document.addEventListener("DOMContentLoaded", () => {
    const metodoPago = document.getElementById('pago');
    const datosTarjeta = document.getElementById('datosTarjeta');
    const form = document.getElementById('pedidoForm');
    const ticket = document.getElementById('ticket');
    const detallePizzas = document.getElementById('detallePizzas');
    const detallePago = document.getElementById('detallePago');
    const detalleDireccion = document.getElementById('detalleDireccion');
    const detalleTotal = document.getElementById('detalleTotal');
    const servicioDomicilio = document.getElementById('servicioDomicilio');
    const pedidoLocal = document.getElementById('pedidoLocal');
    const domicilioSeccion = document.getElementById('domicilioSeccion');
    const seguirPedido = document.getElementById('seguirPedido');

    const tablaPizzas = document.getElementById('tablaPizzas').querySelector('tbody');
    const agregarPizzaBtn = document.getElementById('agregarPizza');
    const pizzaSelect = document.getElementById('pizza');
    const cantidadPizzaInput = document.getElementById('cantidadPizza');
    let total = 0;

   
    function actualizarTicket() {
        const filas = tablaPizzas.querySelectorAll('tr');
        let pizzasPedido = '';

        filas.forEach((fila) => {
            const tipoPizza = fila.cells[0].textContent;
            const cantidad = fila.cells[1].textContent;
            const precio = parseInt(fila.cells[0].dataset.precio);
            const subtotal = parseInt(cantidad) * precio;

            pizzasPedido += `${cantidad}x ${tipoPizza} - $${subtotal} MXN\n`;
        });

        detallePizzas.textContent = `Pedido:\n${pizzasPedido}`;
        detalleTotal.textContent = `Total a pagar: $${total} MXN.`;
    }

   
    agregarPizzaBtn.addEventListener('click', () => {
        const pizzaNombre = pizzaSelect.value;
        const pizzaPrecio = parseInt(pizzaSelect.options[pizzaSelect.selectedIndex].dataset.precio);
        const cantidad = parseInt(cantidadPizzaInput.value);

        if (cantidad <= 0) {
            alert('Por favor, ingresa una cantidad válida.');
            return;
        }

        const subtotal = pizzaPrecio * cantidad;
        total += subtotal;

        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td data-precio="${pizzaPrecio}">${pizzaNombre}</td>
            <td>${cantidad}</td>
            <td>
                <button class="eliminarPizza" style="background-color: red; color: white; border: none; padding: 5px 10px; border-radius: 5px;">Eliminar</button>
            </td>
        `;

        fila.querySelector('.eliminarPizza').addEventListener('click', () => {
            fila.remove();
            total -= subtotal;
            actualizarTicket();
        });

        tablaPizzas.appendChild(fila);
        actualizarTicket();
    });

    
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        
        const domicilio = JSON.parse(localStorage.getItem("domicilio"));
        const direccionTexto = domicilio
            ? `${domicilio.calle} ${domicilio.numero}, ${domicilio.colonia}, ${domicilio.ciudad}`
            : "Domicilio no proporcionado.";

        if (servicioDomicilio.checked) {
            detalleDireccion.textContent = `Dirección: ${direccionTexto}`;
        } else {
            detalleDireccion.textContent = ''; // Oculta la dirección si es "Pedido Local"
        }

        if (metodoPago.value === "Tarjeta") {
            const numeroTarjeta = document.getElementById('tarjeta').value;
            detallePago.textContent = `Método de pago: Tarjeta (****${numeroTarjeta.slice(-4)}).`;
        } else {
            detallePago.textContent = `Método de pago: Efectivo.`;
        }

        ticket.style.display = "block";
    });

    
    metodoPago.addEventListener('change', () => {
        datosTarjeta.style.display = metodoPago.value === "Tarjeta" ? "block" : "none";
    });

    
    servicioDomicilio.addEventListener('change', () => {
        domicilioSeccion.style.display = 'block';
        seguirPedido.style.display = 'block';
    });

    pedidoLocal.addEventListener('change', () => {
        domicilioSeccion.style.display = 'none';
        seguirPedido.style.display = 'none';
    });

    
    document.getElementById('agregarDomicilio').addEventListener('click', () => {
        window.open("domicilio.html", "_blank");
    });
});