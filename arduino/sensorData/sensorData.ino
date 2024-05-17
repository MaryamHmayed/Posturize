#include <ESP8266WiFi.h>
#include <Adafruit_MQTT.h>
#include <Adafruit_MQTT_Client.h>

#define WIFI_SSID       ""    
#define WIFI_PASSWORD   "" 

#define AIO_SERVER      "io.adafruit.com"
#define AIO_SERVERPORT  1883
#define AIO_USERNAME    "strain_project" //cloud username
#define AIO_KEY         "aio_lBVi28TCPXAyKsfxCFVdfow8EXlc" //auth key
#define FEED_NAME       "data"

WiFiClient client;
Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY);

// Multiplexer control pins
#define S0 D0
#define S1 D1
#define S2 D2
#define S3 D3

#define ANALOG_PIN A0

void setup() {
  Serial.begin(115200);
  delay(10);

  Serial.println("Connecting to WiFi...");
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected");

  mqtt.connect();

  // Set multiplexer control pins as output
  pinMode(S0, OUTPUT);
  pinMode(S1, OUTPUT);
  pinMode(S2, OUTPUT);
  pinMode(S3, OUTPUT);
}

void loop() {

    // Channel 0 (C0 pin - binary output 0,0,0,0)
    digitalWrite(S0,LOW); digitalWrite(S1,LOW); digitalWrite(S2,LOW); digitalWrite(S3,LOW);
    delay(300);
    int sensorValue = analogRead(ANALOG_PIN);

    Serial.print("Sensor ");
    Serial.print(0);
    Serial.print(" Value: ");
    Serial.println(sensorValue);

    // Channel 1 (C1 pin - binary output 1,0,0,0)
    digitalWrite(S0,HIGH); digitalWrite(S1,LOW); digitalWrite(S2,LOW); digitalWrite(S3,LOW);
    delay(1000);
    int sensorValue1 = analogRead(ANALOG_PIN);
    
    Serial.print("Sensor ");
    Serial.print(1);
    Serial.print(" Value: ");
    Serial.println(sensorValue1);

    // Channel 2 (C2 pin - binary output 0,1,0,0)
    digitalWrite(S0,LOW); digitalWrite(S1,HIGH); digitalWrite(S2,LOW); digitalWrite(S3,LOW);
    delay(1000);
    int sensorValue2 = analogRead(ANALOG_PIN);
    
    Serial.print("Sensor ");
    Serial.print(2);
    Serial.print(" Value: ");
    Serial.println(sensorValue2);

    String allValues = "S0: " + String(sensorValue) + ", S1: " + String(sensorValue1) + ", S2: " + String(sensorValue2);
    // Serial.print(" data Feed: ");
    // Serial.println(allValues);
    Serial.println("-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_");
    updateCloud(allValues);
  
}

void updateCloud(String data) {

  char topic[100];
    sprintf(topic, "%s/feeds/%s", AIO_USERNAME, FEED_NAME);
    if (mqtt.connected()) {
      if (!mqtt.publish(topic, data.c_str())) {
        Serial.println("Failed to publish to Adafruit IO!");
      }
    } else {
      mqtt.disconnect();
      mqtt.connect();
    }

}

void setMultiplexerChannel(int channel) {
  digitalWrite(S0, channel & 0x01);
  digitalWrite(S1, (channel >> 1) & 0x01);
  digitalWrite(S2, (channel >> 2) & 0x01);
  digitalWrite(S3, (channel >> 3) & 0x01);
}