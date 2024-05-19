<img src="./readme/title1.svg"/>

<br><br>

<!-- project philosophy -->
<img src="./readme/title2.svg"/>

> Posturize targets employees sitting on the chair for a long period of time and suffering from spine pain caused by poor sitting posture and helps them maintain a good one by monitoring it, providing a user-friendly platform that notifies user when a poor sitting posture is detected.

### User Stories
Employee Stories
- As an employee, I want to receive notifications on my mobile device when my sitting posture is incorrect, so that I can adjust my posture and prevent spine pain caused by prolonged sitting.
- As an employee, I want the system to provide guidance on how to correct my sitting posture when it detects that it's incorrect, so that I can improve my posture over time.
- As an employee with a history of spine pain due to poor sitting posture, I want the system to track my sitting habits over time and provide insights and recommendations for improving my posture, so that I can prevent future health problems.

Physiotherapist Stories 
- As a physiotherapist, I want to access data about my patients' sitting habits and posture over time, so that I can provide personalized recommendations for improving their posture and reducing back pain.
- As a physiotherapist, I want to receive real-time notifications when my patients exhibit poor sitting posture, so that I can intervene promptly and provide immediate feedback or guidance to help them correct their position.
- As a physiotherapist, I want to track the effectiveness of posture correction interventions prescribed to my patients, so that I can make informed adjustments to their treatment plans and optimize their rehabilitation outcomes.
<br><br>
<!-- Tech stack -->
<img src="./readme/title3.svg"/>

###  Posturize is built using the following technologies:

- This project uses the [React Native app development framework](https://reactnative.dev/) with [Expo](https://expo.dev/). React Native is a cross-platform hybrid app development platform which allows us to use a single codebase for apps on mobile, desktop, and the web.
- The backend of the app is built using the [Laravel framework](https://laravel.com/). Laravel is a popular PHP framework known for its elegant syntax, extensive feature set, and developer-friendly tools, making it ideal for building robust backends for mobile applications.
- To send local push notifications, the app uses the [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) package which supports Android, iOS, and macOS.
- For the live chat feature, the app uses [Firebase](https://firebase.google.com/) and [Firestore](https://firebase.google.com/docs/firestore), which provide real-time data synchronization and reliable cloud storage.

<br><br>
<!-- UI UX -->
<img src="./readme/title4.svg"/>


> We designed Posturize using wireframes and mockups, iterating on the design until we reached the ideal layout for easy navigation and a seamless user experience.

- Project Figma design [figma](https://www.figma.com/design/1KkHNvv5MPKDxcgSjpcrfX/Posturize?node-id=625-1031&t=8l71yW8tLkKQNfq3-0)


### Mockups
| Home screen  | Physiotherapists Screen | Profile Screen |
| ---| ---| ---|
| <img src="./readme/demo/Home.png" height="600" />  | <img src="./readme/demo/user-physio.png" height="600"/>  | <img src="./readme/demo/Profile.png" height="600" />  |

<br><br>

<!-- Database Design -->
<img src="./readme/title5.svg"/>

###  Architecting Data Excellence: Innovative Database Design Strategies:

<img src="./readme/Posturize_db (1).png" height="500" />



<br><br>


<!-- Implementation -->
<img src="./readme/title6.svg"/>


### User Screens (Mobile)
| Login screen                               | Register screen                       | Setup Screen                              |
| ------------------------------------------ | ------------------------------------- | ----------------------------------------- |
| ![Login](./readme/demo/splashLoginGIF.gif) | ![SignUn](/readme/demo/signupGIF.gif) | ![SetupScreen](/readme/demo/SetupGIF.gif) |
| Physiotherapists screen                             | Progress screen                                  | Home Screen                             |
| --------------------------------------------------- | ------------------------------------------------ | --------------------------------------- |
| ![physiotherapistsScreen](./readme/demo/PTsGIF.gif) | ![ProgressScreen](./readme/demo/ProgressGIF.gif) |![HomeScreen](./readme/demo/Profile.png) |
| Patients screen                                  | RecentChat screen                                    | Profile Screen                                 |
| ------------------------------------------------ | ---------------------------------------------------- | ---------------------------------------------- |
| ![PatientsScreen](./readme/demo/PatientsGIF.gif) | ![RecentChatScreen](./readme/demo/RecentChatGIF.gif) | ![ProfileScreen](./readme/demo/profileGIf.gif) |




### Arduino
| Demo | Real Image |
| ---| ---|
| <img src="./readme/arduino.jpeg" height="500" />  | <img src="./readme/arduino1.jpeg" height="500"/> |

<img src="./readme/WhatsApp Video 2024-05-18 at 2.42.44 PM (1).gif"/>

<br><br>
 
<!-- AWS Deployment -->
<img src="./readme/title8.svg"/>

###  Efficient AI Deployment: Unleashing the Potential with AWS Integration:

- This project leverages AWS deployment strategies to seamlessly integrate and deploy natural language processing models. With a focus on scalability, reliability, and performance, we ensure that AI applications powered by these models deliver robust and responsive solutions for diverse use cases.

<br><br>

<!-- Unit Testing -->
<img src="./readme/title9.svg"/>

###  Precision in Development: Harnessing the Power of Unit Testing:

- This project employs rigorous unit testing methodologies to ensure the reliability and accuracy of code components. By systematically evaluating individual units of the software, we guarantee a robust foundation, identifying and addressing potential issues early in the development process.
<img src="./readme/Tests.png" height="500" />
<br><br>


<!-- How to run -->
<img src="./readme/title10.svg"/>

> To set up Coffee Express locally, follow these steps:

### Prerequisites

1. Install [Node & NPM](https://nodejs.org/en/download).

2. Install [Composer](https://getcomposer.org/download/)

3. Database server: Any Apache HTTP Server, MariaDB database server, recommended [XAMPP](https://www.apachefriends.org/download.html).

4. Install [Arduino IDE](https://www.arduino.cc/en/software)  and create an account on [Adafruit website](https://io.adafruit.com/)

5. For hardware: ESP8266, 3 Strain Gauge Bending sensors, and a Multiplexer.

### Installation

### Frontend (React Native)

```sh
git clone https://github.com/MaryamHmayed/Posturize
```

1. Navigate to the frontend directory

```sh
cd frontend
```

2. Install NPM packages

```sh
 npm install npm@latest -g
```

3. Start the project

```sh
  npm start
```
4. After running the command above, you will see a QR code in your terminal. Scan this QR code to open the app on your device (if you're using an Android Emulator or iOS Simulator, you can press a or i respectively to open the ).

### Backend (Laravel)

1. Navigate to the backend directory

```sh
cd backend
```

2. Install Composer dependencies

```sh
composer install
```

3. Install Composer dependencies

```sh
composer install
```

4. Generate the application key

```sh
php artisan key:generate
```

5. Download Laravel dependencies

```sh
php artisan migrate
```
6. Run the server on computer's local IP address

```sh
php artisan serve --host local_IP_address
```

### Hardware

1. Connect the arduino to the sensors.

2. Connect the arduino to the computer.

3. Upload the code in arduino/sensorData file.

4. Start a new feed in your Adafruit account and get the AIO_KEY.

5. Add your Wifi credentials to the code.

6. Add your AIO credentials 

```sh
#define AIO_USERNAME    "strain_project" //cloud username
#define AIO_KEY         "" //auth key
#define FEED_NAME       "data"

```
Now, you should be able to run Posturize locally and explore its features.