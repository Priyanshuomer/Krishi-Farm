# Krishi-Farm

## Overview
This project outlines the technical design and implementation of a plant disease detection system. The system features a mobile application enabling real-time image upload capabilities and additional functionalities such as type of plant recommendations and weather services.

## 1.Application Framework
The mobile application for plant disease detection is developed using a Python-based framework known for its ease of use and rapid prototyping capabilities. It allows for the creation of interactive, user-friendly mobile applications with minimal effort. The app provides a simple interface for farmers and agricultural experts to upload images of tomato leaves and receive real-time predictions of possible diseases.
(https://github.com/user-attachments/assets/a1c574bc-025e-4b3e-ae7a-4df27b493f56)

### Features of Streamlit in this project:
- **Real-time Image Upload**: Users can upload images of plant leaves to detect diseases.
- **Disease Classification**: AI-powered model for identifying various plant diseases.
- **Pesticide Recommendations**: Provides suitable pesticide suggestions based on detected disease.

## 2. Usage
![Uploading the Image to the Main Page from Local Folder](https://tse3.mm.bing.net/th?id=OIP.nT113o02ReFJWwwMrDTOnAHaDt&pid=Api&P=0&h=180)  <!-- Replace with your image path -->

1. Upload an image of a plant leaf.
![Uploading the Image to the Main Page from Local Folder](https://debuggercafe.com/wp-content/uploads/2022/12/Plant-Disease-Detection-using-the-PlantDoc-Dataset-and-PyTorch-Faster-RCNN-e1670983189939.png)
<!-- Replace with your image path -->
2. The system analyzes the image and detects the disease (if any).

3. Recommendations for suitable pesticides are provided.

4. Geolocation services help in mapping disease outbreaks.

- **Upload Images**: Users can upload an image from their device, which is then resized and preprocessed to fit the input requirements of the deep learning models (MobileNetV2, ResNet50, and VGG16).
- **Real-Time Diagnosis**: After uploading, the image is fed through the pre-trained model, which predicts the disease associated with the plant leaf. The prediction process takes only a few seconds, ensuring minimal delay between the image upload and disease diagnosis.
- **camera Image Capture**: For real-time usage in the field, the app includes a "Capture Image" feature that allows users to take a photo using their camera. This image is processed in the same manner as an uploaded image.

### Tech Stack:
1. Frontend: Streamlit.
2. Backend: Python.
3. Database: Firebase.
4. Cloud Storage: Google Cloud Storage for image processing.
5. Weather API Integration: Provides real-time weather data to help farmers make informed decisions.


## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Priyanshuomer/Krishi-Farm.git
   cd Krishi-Farm
   ```
2. Install the required packages and dependencies:
   ```bash
    npm init -y
    npm install
   ```
3. Run the application:
    ```bash
    node index.js
    ```

