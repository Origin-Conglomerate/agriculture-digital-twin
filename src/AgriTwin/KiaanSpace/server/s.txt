from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import cv2
import numpy as np
from ultralytics import YOLO
import io
from PIL import Image
import json
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Load YOLOv8 model
try:
    model = YOLO('yolov8n.pt')
    logger.info("YOLOv8 model loaded successfully")
except Exception as e:
    logger.error(f"Error loading YOLOv8 model: {e}")
    raise

def decode_base64_image(base64_string):
    try:
        # Convert base64 string to bytes
        image_bytes = base64.b64decode(base64_string)
        
        # Convert bytes to numpy array
        image_array = np.frombuffer(image_bytes, np.uint8)
        
        # Decode image array to CV2 image
        image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
        
        if image is None:
            raise ValueError("Failed to decode image")
            
        logger.debug(f"Image decoded successfully: shape={image.shape}")
        return image
    except Exception as e:
        logger.error(f"Error decoding base64 image: {e}")
        raise

def encode_cv2_image(image):
    try:
        # Convert CV2 image to bytes
        success, encoded_image = cv2.imencode('.jpg', image)
        if not success:
            raise ValueError("Failed to encode image")
        
        # Convert bytes to base64 string
        base64_string = base64.b64encode(encoded_image.tobytes()).decode('utf-8')
        logger.debug("Image encoded successfully")
        return base64_string
    except Exception as e:
        logger.error(f"Error encoding CV2 image: {e}")
        raise

@app.route('/detect', methods=['POST'])
def detect_objects():
    try:
        logger.info("Received detection request")
        
        # Get base64 image from request
        data = request.json
        if not data:
            logger.error("No JSON data in request")
            return jsonify({'error': 'No JSON data provided'}), 400
            
        frame = data.get('frame')
        if not frame:
            logger.error("No frame data in request")
            return jsonify({'error': 'No image data provided'}), 400
        
        logger.debug("Attempting to decode image")
        image = decode_base64_image(frame)
        
        logger.info("Running YOLOv8 detection")
        results = model(image)
        
        # Process detection results
        detected_objects = {}
        for r in results:
            boxes = r.boxes
            for box in boxes:
                # Get class name
                cls_id = int(box.cls[0])
                cls_name = model.names[cls_id]
                
                # Update count
                detected_objects[cls_name] = detected_objects.get(cls_name, 0) + 1
                
                # Draw bounding box
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                cv2.rectangle(image, (x1, y1), (x2, y2), (0, 255, 0), 2)
                
                # Add label
                conf = float(box.conf[0])
                label = f'{cls_name} {conf:.2f}'
                cv2.putText(image, label, (x1, y1 - 10), 
                           cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
        
        logger.debug(f"Objects detected: {detected_objects}")
        
        # Encode processed image
        processed_image = encode_cv2_image(image)
        
        response_data = {
            'detections': [{
                'image': processed_image,
                'counts': detected_objects,
                'timestamp': datetime.now().isoformat()
            }]
        }
        
        logger.info("Successfully processed detection request")
        return jsonify(response_data)
        
    except Exception as e:
        logger.error(f"Error processing detection request: {e}", exc_info=True)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # For local development with SSL
    app.run(host='0.0.0.0', port=5000, debug=True)