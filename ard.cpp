#include <ESP8266WiFi.h>
#include <ArduinoWebsockets.h>

const char* ssid = "ВашеWiFiSSID";
const char* password = "ВашПарольWiFi";
const char* webSocketServerAddress = "ws://адрес-вашего-сервера-websocket:8080";

WebsocketsClient client;

void setup() {
  Serial.begin(115200);
  
  // Подключение к WiFi
  Serial.println();
  Serial.print("Подключение к ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi подключено");
  Serial.println("IP адрес: ");
  Serial.println(WiFi.localIP());

  client.connect(webSocketServerAddress);

  client.onMessage([](WebsocketsMessage message) {
    Serial.print("Получено сообщение от сервера: ");
    Serial.println(message.data());
  });
}

void loop() {

  if (client.available()) {
 
    float ampere = analogRead(A0) * (3.3 / 1023);
    
    
    DynamicJsonDocument doc(128);
    doc["source"] = "esp8266";
    doc["type"] = "ampere";
    doc["value"] = ampere;
    String jsonData;
    serializeJson(doc, jsonData);
    
    
    client.send(jsonData);
    
   
    delay(10000);
  }
  
  client.poll();
}
