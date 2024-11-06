# Sattvik

<br/>

<p align="center">
  <img src="./client/assets/images/logo.png" width="20%" />
</p>

<p align="center">
  Sattvik: Food Adulteration and Safety Detector App
  <br />
  <br />
  <a href="#table-of-contents"><b>Explore the docs »</b></a>
  <br />
  <br />
  <a href="#architecture-and-design">Architecture</a>
  &nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="#demonstration">Features</a>
  &nbsp;&nbsp;·&nbsp;&nbsp;
  <a href="#contributing">Local Setup</a>
  <br />
</p>

## Table Of Contents

- [About the Project](#about-the-project)
- [Architecture](#architecture)
- [Demonstration & Features](#demonstration)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [Authors](#authors)

## About The Project

Sattvik is an innovative mobile application designed to empower consumers with the knowledge and tools necessary to ensure food safety and quality. By leveraging advanced AI technologies, Sattvik provides real-time analysis of food products, enabling users to make informed decisions about their dietary choices. With features like ingredient analysis, personalized allergy alerts, and a food safety chatbot, Sattvik stands out as a comprehensive solution for modern consumers concerned about food adulteration and safety.

**Objectives**

- Ingredient Analysis: Utilize GenAI-powered models to assess food purity, nutritional value, and allergen risks, ensuring compliance with safety standards.

- Live Market Integration: Seamlessly connect with e-commerce and food delivery platforms for real-time product availability and safety information.

- Allergy Profile: Allow users to enter their allergies and scan products for instant alerts on harmful ingredients.

- Ingredient Combined Analysis: Provide AI-driven assessments of ingredient pairings to highlight potential interactions and allergen risks.

- Food Safety Chatbot: Offer a GenAI-powered chatbot that provides intelligent responses to food safety queries, analyzes ingredient lists, and offers nutritional advice.


## Architecture

![image](https://github.com/user-attachments/assets/b7caa1d6-b23b-4eda-86f1-a2fb28a6ec75)

## Demonstration

https://www.youtube.com/watch?v=hkY5oynES-s

<br />

### Technologies Used

- Frontend
  - React Native
  - CSS
- Backend
  - Flask
  - Firebase
  - LLaMA 3.2
  - Computer Vision

<br />

## Contributing

**Local Setup || Project Structure**

NOTE: Individual instructions can be found in respective directories.

- The project contains 4 broad directories.

```
*
├───client
└───server
```

- `client`: The frontend for the application.
- `server`: The backend for the application.

<br />

**Client**

For local setup of frontend:

- `cd client`
- `npm i`
- `npx expo start`

Structure

```
client
├───app
├───assets
├───components
└───configs
```

Individual Component & Pages Structure

```
component
└───component.jsx
```

```
app
├───(tabs)
├───└───tab.jsx
├───index.jsx
├───productdetail.jsx
└───_layout.jsx
```

<br />

**Server**

For local setup of backend:

- `cd server`
- `venv/Scripts/activate`
- `python app.py`

```
server
├───harmful-ingriedents
├───app.py
├───finetune.py
└───requirements.txt
```

<br />

## Authors

- Hamza Sayyed
  - [LinkedIn](https://shorturl.at/hjAEI)
- Om Shete
- Mohib Abbas Sayed
- Parth Puranik

## License 📜

[GPU License](https://github.com/Hamzawp/Sattvik/blob/main/LICENSE.txt)
