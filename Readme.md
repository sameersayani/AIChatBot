# AI ChatBot API

A FastAPI-based chatbot application powered by OpenAI that supports both text prompts and image analysis. The API includes a Next.js frontend for an interactive chat experience.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Features

- **Text-based Chat**: Send prompts and receive AI-generated responses
- **Image Analysis**: Upload images with prompts for vision-based AI analysis
- **Bedtime Stories**: Specialized system prompt for creating children's bedtime stories
- **CORS Support**: Cross-origin requests enabled for frontend integration
- **FormData Support**: Handles multipart form data for file uploads
- **Real-time Responses**: Async processing for efficient handling of requests

## Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8+** - [Download Python](https://www.python.org/downloads/)
- **Node.js 14+** - [Download Node.js](https://nodejs.org/)
- **pip** - Python package manager (comes with Python)
- **OpenAI API Key** - [Get your API key](https://platform.openai.com/api-keys)

## Installation

### Backend Setup

1. **Clone/Navigate to the project directory:**
   ```bash
   cd d:\My Projects\AIChatBot
   ```

2. **Create a virtual environment:**
   ```powershell
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   ```powershell
   .\venv\Scripts\Activate.ps1
   ```
   
   > **Note:** If you get an execution policy error, run:
   > ```powershell
   > Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   > ```

4. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd Next-Chat-App\ai-chat-app
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

## Configuration

### Backend Configuration

1. **Set up your OpenAI API Key:**
   
   Create a `.env` file in the project root:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```
   
   OR add your API key to `OpenAIKey.txt`:
   ```
   your_api_key_here
   ```

### Frontend Configuration

The frontend is already configured to connect to `http://127.0.0.1:8000`. If you need to change the backend URL, update it in:
- `src/components/messageList.js` - line with `fetch('http://127.0.0.1:8000/uploadfile', ...)`

## Running the Application

### Start the Backend

1. **Ensure virtual environment is activated:**
   ```powershell
   .\venv\Scripts\Activate.ps1
   ```

2. **Run the FastAPI server:**
   ```bash
   python chatapi.py
   ```
   
   The API will be available at: `http://127.0.0.1:8000`
   
   Access the interactive API docs: `http://127.0.0.1:8000/docs`

### Start the Frontend

1. **In a new terminal, navigate to the frontend:**
   ```bash
   cd Next-Chat-App\ai-chat-app
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```
   
   The application will be available at: `http://localhost:3000`

## API Endpoints

### 1. **POST `/`** - Text-based Chat
Send a text prompt and receive an AI response.

**Request:**
```json
{
  "prompt": "Tell me a bedtime story for children about a sleepy dragon"
}
```

**Response:**
```json
{
  "response": "Once upon a time, in a magical kingdom..."
}
```

**cURL Example:**
```bash
curl -X POST "http://127.0.0.1:8000/" \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Tell me a bedtime story"}'
```

---

### 2. **POST `/uploadfile`** - Image Analysis with Text
Send an image along with a prompt for vision-based analysis.

**Request:**
- `prompt` (string, required): Your prompt/question about the image
- `file` (file, optional): Image file to analyze

**Response:**
```json
{
  "response": "Based on the image, I can see... [AI analysis]"
}
```

**cURL Example:**
```bash
curl -X POST "http://127.0.0.1:8000/uploadfile" \
  -F "prompt=Analyze this image and tell me a story about it" \
  -F "file=@/path/to/image.jpg"
```

**JavaScript/Fetch Example:**
```javascript
const formData = new FormData();
formData.append('prompt', 'Tell me about this image');
formData.append('file', fileInput.files[0]);

const response = await fetch('http://127.0.0.1:8000/uploadfile', {
  method: 'POST',
  body: formData
});

const data = await response.json();
console.log(data.response);
```

---

## Project Structure

```
AIChatBot/
├── chatapi.py                 # Main FastAPI application
├── requirements.txt           # Python dependencies
├── OpenAIKey.txt             # API key file (add your key here)
├── Readme.md                 # This file
├── venv/                     # Virtual environment (created after setup)
└── Next-Chat-App/
    └── ai-chat-app/
        ├── package.json      # Node.js dependencies
        ├── next.config.mjs   # Next.js configuration
        ├── public/           # Static files
        └── src/
            ├── components/
            │   ├── app.js
            │   ├── messageList.js
            │   └── css/
            │       └── messageList.module.css
            ├── pages/
            │   ├── index.js
            │   └── api/
            │       └── hello.js
            └── styles/
                ├── globals.css
                └── Home.module.css
```

## Technologies Used

### Backend
- **FastAPI** - Modern, fast web framework for building APIs
- **Python** - Programming language
- **OpenAI API** - AI model (GPT-4o) for generating responses and analyzing images
- **Pydantic** - Data validation and settings management
- **CORS Middleware** - Handle cross-origin requests
- **Uvicorn** - ASGI server for running FastAPI

### Frontend
- **Next.js** - React framework for production
- **React** - JavaScript library for building user interfaces
- **CSS Modules** - Component-scoped styling
- **JavaScript Fetch API** - HTTP client for API requests

## Troubleshooting

### 1. **"POST /uploadfile/ HTTP/1.1" 307 Error**
This is a redirect error. Make sure you're posting to `/uploadfile` (without trailing slash).

### 2. **"I can't see images" Response**
- Ensure you're using `gpt-4o` model (not `gpt-4.1`)
- Verify the image file is being sent with key name `file` (not `image`)
- Check that the API key is valid and has vision capabilities enabled

### 3. **Module Not Found Errors**
Make sure all dependencies are installed:
```bash
pip install -r requirements.txt
```

### 4. **Virtual Environment Issues**
Reset your virtual environment:
```powershell
# Remove old venv
Remove-Item -Recurse venv

# Create new venv
python -m venv venv

# Activate and reinstall
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### 5. **OpenAI API Key Error**
- Verify your API key is valid: https://platform.openai.com/account/api-keys
- Check that the key has the correct permissions
- Ensure it's properly set in `.env` file or `OpenAIKey.txt`

### 6. **Port Already in Use**
If port 8000 is already in use, change it in `chatapi.py`:
```python
uvicorn.run(app, host="127.0.0.1", port=8001)  # Change to 8001
```

### 7. **CORS Errors**
The API has CORS enabled for all origins. If you still get CORS errors:
- Check your frontend URL matches what you're accessing from
- Clear browser cache and cookies

## Environment Variables

Create a `.env` file in the root directory:

```
OPENAI_API_KEY=your_openai_api_key_here
```

## Requirements

See `requirements.txt` for all Python dependencies:
- fastapi
- uvicorn
- openai
- pydantic
- python-multipart
- python-dotenv

## Future Enhancements

- [ ] Add conversation history/context management
- [ ] Implement user authentication
- [ ] Add more AI models support
- [ ] Database integration for chat history
- [ ] WebSocket support for real-time streaming
- [ ] Rate limiting and usage tracking
- [ ] Support for more file types (PDF, audio, etc.)

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

This project is open source and available under the MIT License.

## Support

For issues or questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review your OpenAI API key configuration
3. Check the FastAPI documentation: https://fastapi.tiangolo.com/
4. Check the Next.js documentation: https://nextjs.org/docs
