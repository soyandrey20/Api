const { Board, Sensor, Led } = require("johnny-five");
const http = require("http");
const board = new Board();

const threshold = 500;
const interval = 10000; // Intervalo de tiempo en milisegundos (10 segundos)
let sensor, led;
let readings = [];
let sum = 0;

board.on("ready", () => {
  sensor = new Sensor("A0");
  led = new Led(13);

  // Función para realizar una lectura del sensor y encender o apagar el LED
  function readSensorAndControlLED() {
    console.log("Sensor value: ", sensor.value);
    readings.push(sensor.value); // Agrega la lectura actual al arreglo de lecturas
    sum += sensor.value; // Suma la lectura actual al total

    if (sensor.value > threshold) {
      console.log("Obstáculo detectado");
      led.on();
    } else {
      console.log("No hay obstáculo");
      led.off();
    }
  }

  // Crear servidor HTTP
  http.createServer((req, res) => {
    if (req.url === "/read-sensor") {
      for (let i = 0; i < 10; i++) {
        // Realiza una lectura del sensor cada segundo
        setTimeout(() => {
          readSensorAndControlLED();
        }, i * 1000);
      }
    
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Lectura del sensor realizada.");
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Endpoint no encontrado.");
    }
  }).listen(3008, () => {
    console.log("Servidor escuchando en el puerto 3000...");
  });

  // Comienza el bucle de lectura del sensor y control del LED
  setInterval(() => {
    const average = sum / readings.length;
    console.log(`Promedio de las lecturas: ${average}`);
    readings = []; // Reinicia el arreglo de lecturas
    sum = 0; // Reinicia la suma de lecturas
  }, interval);
});
