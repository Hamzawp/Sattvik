import os
import io
import requests
import cv2
import pytesseract
import openpyxl
import wikipedia
from flask import Flask, request, jsonify, send_file
from bs4 import BeautifulSoup
import ollama
from PIL import Image, ImageDraw, ImageFont

app = Flask(__name__)

wb = openpyxl.load_workbook("harmful-ingredients/harmful_ingredients.xlsx")
sheet = wb.active

class ImageProcessingExample:
    def fetch_wikipedia_definition(ingredient):
        try:
            return wikipedia.summary(ingredient, sentences=2)
        except wikipedia.exceptions.DisambiguationError as e:
            return wikipedia.summary(e.options[0], sentences=2)
        except (
            wikipedia.exceptions.PageError,
            wikipedia.exceptions.WikipediaException,
        ):
            return None

    # Check safety of ingredients based on workbook data
    def check_safety(product_text):
        unsafe_ingredients = []
        for row in sheet.iter_rows(min_row=2, values_only=True):
            ingredient, _ = row
            if ingredient.lower() in product_text.lower():
                unsafe_ingredients.append(ingredient.lower())
        return unsafe_ingredients

    def process_openimage(image_path):
        # Resize the image
        img_org = Image.open(image_path)
        factor = 1
        width = int(800 * factor)
        height = int(495 * factor)
        img_resized = img_org.resize((width, height), Image.LANCZOS)
        resized_path = f"{os.path.splitext(image_path)[0]}_resized.png"
        img_resized.save(resized_path)

        # Further processing with OpenCV
        imageNo1 = cv2.imread(resized_path)
        imageNo2 = cv2.imread(image_path)
        imageNo1 = imageNo1[200:600, 200:1000]

        orb = cv2.ORB_create()
        keypoint1, descriptor1 = orb.detectAndCompute(imageNo1, None)
        keypoint2, descriptor2 = orb.detectAndCompute(imageNo2, None)

        bfMatcher = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
        matchResults = bfMatcher.match(descriptor1, descriptor2)
        matchResults = sorted(matchResults, key=lambda x: x.distance)

        resultImage = cv2.drawMatches(
            imageNo1, keypoint1, imageNo2, keypoint2, matchResults[:100], None, flags=2
        )

        # Convert the result image to bytes for sending in response
        _, result_image_png = cv2.imencode(".png", resultImage)
        result_image_bytes = io.BytesIO(result_image_png)

        # Determine similarity percentage
        similarity = "Unknown"
        if len(matchResults) >= 171:
            similarity = "90% unadulterated"
        elif len(matchResults) >= 152:
            similarity = "80% unadulterated"
        elif len(matchResults) >= 131:
            similarity = "70% unadulterated"
        elif len(matchResults) >= 120:
            similarity = "60% unadulterated"
        else:
            similarity = "Adulterated"

        return result_image_bytes, similarity


@app.route("/process-openimage", methods=["POST"])
def process_openimage():
    data = request.json
    if "image_url" not in data:
        return jsonify({"error": "No image URL provided"}), 400

    image_url = data["image_url"]

    # Download the image from the URL
    try:
        response = requests.get(image_url)
        response.raise_for_status()
        image_path = "downloaded_image.jpg"  # Save image in the current directory
        with open(image_path, "wb") as f:
            f.write(response.content)
    except requests.RequestException as e:
        return jsonify({"error": f"Failed to download image: {str(e)}"}), 400

    # Process the downloaded image
    result_image_bytes, similarity = ImageProcessingExample.process_openimage(
        image_path
    )

    # Send response with similarity and processed image
    response = {
        "similarity": similarity,
    }
    return jsonify(response)

@app.route("/process-packedimage", methods=["POST"])
def process_packedimage():
    data = request.json
    if "image_url" not in data:
        return jsonify({"error": "No image URL provided"}), 400

    image_url = data["image_url"]

    # Download the image from the URL
    try:
        response = requests.get(image_url)
        response.raise_for_status()
        image_path = "downloaded_image.jpg"  # Save image locally
        with open(image_path, "wb") as f:
            f.write(response.content)
    except requests.RequestException as e:
        return jsonify({"error": f"Failed to download image: {str(e)}"}), 400

    # Read and process the image
    image = cv2.imread(image_path)
    product_text = pytesseract.image_to_string(image)
    unsafe_ingredients = ImageProcessingExample.check_safety(product_text)

    # Remove the downloaded image after processing
    os.remove(image_path)

    # Prepare response based on ingredient check
    if unsafe_ingredients:
        result_text = "The Product is Not Recommended due to UNSAFE Ingredients."
        definitions = {}
        for ingredient in unsafe_ingredients:
            definition = ImageProcessingExample.fetch_wikipedia_definition(ingredient)
            definitions[ingredient] = (
                definition if definition else "Definition not found."
            )

        return jsonify({"result": result_text, "unsafe_ingredients": definitions})
    else:
        result_text = "The Product is SAFE to Use. All Ingredients are Safe."
        return jsonify({"result": result_text, "unsafe_ingredients": {}})

def scrape_amazon_product(url):
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }

    # Send a request to the product page
    response = requests.get(url, headers=headers)

    # Check if the request was successful
    if response.status_code != 200:
        print(f"Failed to retrieve the page. Status code: {response.status_code}")
        return None

    # Parse the page content
    soup = BeautifulSoup(response.content, 'html.parser')

    # Extract product details
    try:
        title = soup.find(id='productTitle').get_text(strip=True)
        price = soup.find('span', {'class': 'a-price-whole'}).get_text(strip=True)
        rating = soup.find('span', {'class': 'a-icon-alt'}).get_text(strip=True)
        description = soup.find('div', {'id': 'productDescription'}).get_text(strip=True)

        ingredients = get_ingredients(title, description)

        create_image(ingredients)

        return ingredients

    except AttributeError:
        print("Could not find one or more product details. The page structure may have changed.")

def get_ingredients(product_title, prod_desc):
    prompt = f"Product title: {product_title}. Product Description: {prod_desc}. Tell the ingredients of this product in array format according to the title and product description given.Also list the combinations these ingredients could possibly make if they are mixed and add it in a seperate array.  Example of output - Ingredients: [Myristic Acid, Glycerin, Water, Propylene Glycol, Potassium Hydroxide, Palmitic Acid and Stearic Acid, Lauric Acid, Glycol Distearate, Decyl Glucoside, Palmitic Acid, Hydroxystearic Acid, Glyceryl Stearate, Perfume, Guar Hydroxypropyltrimonium Chloride, DMDM Hydantoin and Iodopropynyl Butylcarbamate, Polyquaternium-7, Disodium EDTA, Niacinamide, Benzyl Salicylate, Butylphenyl Methylpropional, Citronellol, Geraniol, Hexyl Cinnamal, Limonene, Linalool]"
    response = ollama.chat(model='phi3', messages=[{'role': 'user', 'content': prompt}])
    
    # Extract the ingredients
    ingredients = response['message']['content']
    return ingredients.split(", ")  # Assuming the response is a comma-separated string

def create_image(ingredients):
    # Prepare text for the image
    ingredients_text = "\n".join(ingredients)

    # Create a blank image
    img = Image.new('RGB', (400, 300), color='white')
    draw = ImageDraw.Draw(img)

    # Define a font (you may need to adjust the font path)
    font = ImageFont.load_default()

    # Draw the text on the image
    draw.text((10, 10), ingredients_text, fill='black', font=font)

    # Save the image
    img.save('ingredients.png')
    print("Ingredients image saved as 'ingredients.png'.")

def get_combinations(ingredients):
    ingredients_list = ", ".join(ingredients)
    prompt = f"Given the following ingredients: [{ingredients_list}], what combinations could these ingredients possibly make if they are mixed?"
    response = ollama.chat(model='phi3', messages=[{'role': 'user', 'content': prompt}])
    
    # Extract the possible combinations
    combinations = response['message']['content']
    return combinations

@app.route("/process-url", methods=["POST"])
def process_url():
    data = request.json
    if "url" not in data:
        return jsonify({"error": "No URL provided"}), 400

    url = data["url"]
    ingredients =  scrape_amazon_product(url)
    unsafe_ingredients = ImageProcessingExample.check_safety(ingredients)
    if unsafe_ingredients:
        result_text = "The Product is Not Recommended due to UNSAFE Ingredients."
        definitions = {}
        for ingredient in unsafe_ingredients:
            definition = ImageProcessingExample.fetch_wikipedia_definition(ingredient)
            definitions[ingredient] = (
                definition if definition else "Definition not found."
            )

        return jsonify({"result": result_text, "unsafe_ingredients": definitions})
    else:
        result_text = "The Product is SAFE to Use. All Ingredients are Safe."
        return jsonify({"result": result_text, "unsafe_ingredients": {}})

if __name__ == "__main__":
    app.run(debug=True)
