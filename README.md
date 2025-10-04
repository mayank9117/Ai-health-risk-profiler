# 🏥 AI-Powered Health Risk Profiler

A smart health analysis API that processes images containing health data and provides comprehensive risk assessment with personalized recommendations.

## ✨ Features

- **📸 Image Processing**: Upload images with health data (OCR powered)
- **🔍 Smart Analysis**: Extracts age, smoking status, exercise, and diet information
- **📊 Risk Scoring**: Calculates health risk levels (low/medium/high)
- **💡 AI Recommendations**: Provides personalized health advice
- **🛡️ Data Validation**: Ensures complete information before analysis

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mayank9117/ai-health-risk-profiler.git
   cd ai-health-risk-profiler
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm run dev
   ```

4. **Server will be running at**: `http://localhost:3000`

## 📡 API Usage

### Single Endpoint: `/health-analysis`

**Method**: `POST`  
**Content-Type**: `multipart/form-data`  
**Input**: Image file with health data

#### Example Image Content
Your image should contain text like:
```
Age: 42
Smoker: yes
Exercise: rarely
Diet: high sugar
```

#### Request (Postman)
- **Method**: POST
- **URL**: `http://localhost:3000/health-analysis`
- **Body**: form-data
  - Key: `image` (Type: File)
  - Value: Select your image file

#### Response Examples

**✅ Success Response**
```json
{
  "risk_level": "high",
  "factors": ["smoking", "poor diet", "low exercise"],
  "recommendations": ["Quit smoking", "Reduce sugar", "Walk 30 mins daily"],
  "status": "ok"
}
```

**⚠️ Incomplete Data Response**
```json
{
  "status": "incomplete_profile",
  "reason": ">50% fields missing"
}
```

## 🎯 How It Works

1. **📸 Image Upload**: You upload an image containing health information
2. **🔍 OCR Processing**: AI extracts text from the image using Tesseract.js
3. **📋 Data Parsing**: System identifies age, smoking, exercise, and diet data
4. **✅ Validation**: Checks if >50% of required fields are present
5. **📊 Risk Analysis**: Calculates risk score based on health factors
6. **💡 Recommendations**: Generates personalized health advice

## 📊 Risk Scoring System

| Factor | Points | Description |
|--------|--------|-------------|
| Smoking | +30 | Current smoker |
| Poor Diet | +20 | High sugar/unhealthy diet |
| Low Exercise | +28 | Sedentary lifestyle |
| Age | +15 | 65+ years old |

**Risk Levels:**
- **Low**: 0-40 points
- **Medium**: 41-70 points  
- **High**: 71+ points

## 🧪 Testing

### Health Check
```bash
GET http://localhost:3000/health
```

### Test with Sample Data
1. Create an image with text:
   ```
   Age: 42
   Smoker: yes
   Exercise: rarely
   Diet: high sugar
   ```
2. Upload to `/health-analysis` endpoint
3. Get complete health analysis!

## 📁 Project Structure

```
├── controllers/
│   └── healthAnalysisController.js    # Main analysis logic
├── services/
│   ├── ocrService.js                 # OCR text extraction
│   └── factorService.js              # Health factor extraction
├── utils/
│   ├── scoring.js                    # Risk scoring logic
│   └── recommend.js                  # Recommendation engine
├── routes/
│   └── index.js                      # API routes
├── samples/
│   ├── postman_collection.json       # Postman test collection
│   └── sample.json                   # Sample data
├── server.js                         # Main server file
└── package.json                      # Dependencies
```

## 🛠️ Development

### Available Scripts
```bash
npm run dev      # Start development server
npm start        # Start production server
```

### Environment Variables
Create a `.env` file (optional):
```
PORT=3000
```

## 📝 API Documentation

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/health-analysis` | Complete health analysis |

### Input Requirements
- **Image format**: PNG, JPG, JPEG
- **Text content**: Must include age, smoking status, exercise level, diet information
- **OCR language**: English

### Response Format
```json
{
  "risk_level": "high|medium|low",
  "factors": ["smoking", "poor diet", "low exercise"],
  "recommendations": ["Quit smoking", "Reduce sugar", "Walk 30 mins daily"],
  "status": "ok"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues:
1. Check the server logs
2. Ensure your image contains clear, readable text
3. Verify all required fields are present in the image
4. Check that the server is running on port 3000

---

**Made with ❤️ for better health analysis**