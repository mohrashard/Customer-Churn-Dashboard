import os
from flask import Flask, request, jsonify, session, make_response
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
import re
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

app.secret_key = os.getenv('SECRET_KEY', 'secret-key')

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["retentifyDB"]
users_collection = db["users"]

# Create unique index on email field to enforce uniqueness
users_collection.create_index("email", unique=True)

# CORS middleware
@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response

# Handle OPTIONS requests
@app.route('/register', methods=['OPTIONS'])
@app.route('/login', methods=['OPTIONS'])
@app.route('/logout', methods=['OPTIONS'])
@app.route('/profile', methods=['OPTIONS'])
def options_handler():
    return '', 200

def validate_password(password):
    """
    Validate password requirements:
    - At least 6 characters long
    - Contains at least one symbol (special character)
    """
    if len(password) < 6:
        return False, "Password must be at least 6 characters long"
    
    # Check for at least one symbol/special character
    symbol_pattern = r'[!@#$%^&*()_+\-=\[\]{};\':"\\|,.<>/?`~]'
    if not re.search(symbol_pattern, password):
        return False, "Password must contain at least one symbol (!@#$%^&* etc.)"
    
    return True, "Password is valid"

def validate_email(email):
    """Basic email validation"""
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(email_pattern, email) is not None

# Add root route to handle default requests
@app.route('/')
def home():
    return jsonify({
        'status': 'running',
        'message': 'Welcome to Retentify Auth Service',
        'endpoints': {
            'register': '/register (POST)',
            'login': '/login (POST)',
            'logout': '/logout (POST)',
            'profile': '/profile (GET)',
            'health': '/health (GET)'
        }
    }), 200

@app.route('/register', methods=['POST'])
def register():
    try:
        # Get data from JSON or form data
        if request.is_json:
            data = request.get_json()
        else:
            data = request.form.to_dict()
        
        # Extract and validate required fields
        full_name = data.get('full_name', '').strip()
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        confirm_password = data.get('confirm_password', '')
        
        # Optional fields
        role = data.get('role', '').strip()
        company_name = data.get('company_name', '').strip()
        phone_number = data.get('phone_number', '').strip()
        
        # Validate required fields
        if not full_name:
            return jsonify({'error': 'Full name is required'}), 400
        
        if not email:
            return jsonify({'error': 'Email is required'}), 400
        
        if not password:
            return jsonify({'error': 'Password is required'}), 400
        
        if not confirm_password:
            return jsonify({'error': 'Password confirmation is required'}), 400
        
        # Validate email format
        if not validate_email(email):
            return jsonify({'error': 'Invalid email format'}), 400
        
        # Check if passwords match
        if password != confirm_password:
            return jsonify({'error': 'Passwords do not match'}), 400
        
        # Validate password requirements
        is_valid, message = validate_password(password)
        if not is_valid:
            return jsonify({'error': message}), 400
        
        # Check if email already exists
        existing_user = users_collection.find_one({'email': email})
        if existing_user:
            return jsonify({'error': 'Email is already registered'}), 409
        
        # Hash the password
        password_hash = generate_password_hash(password)
        
        # Create user document
        user_doc = {
            'full_name': full_name,
            'email': email,
            'password_hash': password_hash,
            'role': role,
            'company_name': company_name,
            'phone_number': phone_number,
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
        
        # Insert user into database
        result = users_collection.insert_one(user_doc)
        
        return jsonify({
            'success': True,
            'message': 'User registered successfully',
            'user_id': str(result.inserted_id)
        }), 201
        
    except Exception as e:
        # Handle duplicate key error (email uniqueness)
        if 'duplicate key error' in str(e).lower():
            return jsonify({'error': 'Email is already registered'}), 409
        
        return jsonify({'error': 'Registration failed. Please try again.'}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        # Get data from JSON or form data
        if request.is_json:
            data = request.get_json()
        else:
            data = request.form.to_dict()
        
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')
        
        # Validate required fields
        if not email:
            return jsonify({'error': 'Email is required'}), 400
        
        if not password:
            return jsonify({'error': 'Password is required'}), 400
        
        # Find user by email
        user = users_collection.find_one({'email': email})
        if not user:
            return jsonify({'error': 'Invalid email or password'}), 401
        
        # Verify password
        if not check_password_hash(user['password_hash'], password):
            return jsonify({'error': 'Invalid email or password'}), 401
        
        # Store user info in session
        session['user_id'] = str(user['_id'])
        session['email'] = user['email']
        session['full_name'] = user['full_name']
        session['role'] = user.get('role', '')
        
        # Update last login time
        users_collection.update_one(
            {'_id': user['_id']},
            {'$set': {'last_login': datetime.utcnow()}}
        )
        
        return jsonify({
            'success': True,
            'message': 'Login successful',
            'user': {
                'id': str(user['_id']),
                'full_name': user['full_name'],
                'email': user['email'],
                'role': user.get('role', ''),
                'company_name': user.get('company_name', ''),
                'phone_number': user.get('phone_number', '')
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Login failed. Please try again.'}), 500

@app.route('/logout', methods=['POST'])
def logout():
    """Logout route to clear session"""
    session.clear()
    return jsonify({
        'success': True,
        'message': 'Logged out successfully'
    }), 200

@app.route('/profile', methods=['GET'])
def get_profile():
    """Get current user profile (requires login)"""
    if 'user_id' not in session:
        return jsonify({'error': 'Authentication required'}), 401
    
    try:
        from bson import ObjectId
        user = users_collection.find_one({'_id': ObjectId(session['user_id'])})
        if not user:
            return jsonify({'error': 'User not found'}), 404
        
        return jsonify({
            'success': True,
            'user': {
                'id': str(user['_id']),
                'full_name': user['full_name'],
                'email': user['email'],
                'role': user.get('role', ''),
                'company_name': user.get('company_name', ''),
                'phone_number': user.get('phone_number', ''),
                'created_at': user.get('created_at'),
                'last_login': user.get('last_login')
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': 'Failed to retrieve profile'}), 500

# Health check endpoint
@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'message': 'Flask auth system is running'
    }), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)