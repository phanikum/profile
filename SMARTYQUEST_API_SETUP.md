# SmartyQuest API Setup Guide

This document explains how the SmartyQuest application has been updated to use AWS API Gateway instead of the local JSON file, while maintaining the JSON file for testing purposes.

## Architecture Overview

The SmartyQuest application now uses a **fallback strategy** for fetching quiz data:

1. **Primary**: AWS API Gateway (production)
2. **Secondary**: Local API (development with serverless-offline)
3. **Fallback**: Local JSON file (always available for testing)

## Files Modified/Created

### New Files
- `src/config/api.js` - API configuration and endpoints
- `src/services/quizService.js` - Service layer for fetching quiz data
- `src/services/__tests__/quizService.test.js` - Unit tests for the quiz service

### Modified Files
- `src/pages/SmartyQuestPage.js` - Updated to use QuizService instead of direct fetch

### Preserved Files
- `public/samplequizdata.json` - **Kept for testing purposes**

## Configuration

### Environment Variables

Add these environment variables to configure the API endpoints:

```bash
# Production API Gateway URL (required for production)
REACT_APP_SMARTYQUEST_API_URL=https://your-api-id.execute-api.us-east-1.amazonaws.com/dev

# Enable local API for development (optional)
REACT_APP_USE_LOCAL_API=true
```

### API Gateway Setup

1. **Deploy the Lambda function** using the serverless framework:
   ```bash
   cd ../smartyquest-lambda
   npm install
   serverless deploy
   ```

2. **Get the API Gateway URL** from the deployment output and update the environment variable.

3. **Test the deployment** using the AWS console or curl:
   ```bash
   curl "https://your-api-gateway-url/dev/quiz?count=3"
   ```

## Development Modes

### 1. Production Mode (Default)
- Uses AWS API Gateway
- Falls back to local JSON if API fails
- Set `REACT_APP_SMARTYQUEST_API_URL` environment variable

### 2. Local Development Mode
- Uses local serverless-offline API
- Set `REACT_APP_USE_LOCAL_API=true`
- Run local API: `cd ../smartyquest-lambda && npm run dev`

### 3. Testing Mode
- Always falls back to local JSON file
- No additional configuration needed
- JSON file preserved at `public/samplequizdata.json`

## API Endpoints

### GET /quiz
Fetch quiz questions with optional filtering:

**Query Parameters:**
- `topic` (optional) - Filter by topic (e.g., "Science", "Math")
- `difficulty` (optional) - Filter by difficulty (e.g., "easy", "medium", "hard")
- `count` (optional) - Number of questions (default: 5)

**Example:**
```
GET /quiz?topic=Science&difficulty=easy&count=3
```

### POST /quiz
Fetch quiz questions with complex filtering:

**Request Body:**
```json
{
  "topics": ["Science", "Math"],
  "difficulties": ["easy", "medium"],
  "count": 5
}
```

## Response Format

All API responses follow this structure:

```json
{
  "quiz": [
    {
      "question": "What planet is known as the Red Planet?",
      "options": ["Mars", "Venus", "Jupiter"],
      "answer": "Mars",
      "topic": "Science",
      "difficulty": "easy"
    }
  ],
  "metadata": {
    "totalQuestions": 1,
    "topics": ["Science"],
    "difficulties": ["easy"],
    "timestamp": "2023-01-01T00:00:00.000Z"
  },
  "source": "aws-api-gateway"
}
```

The `source` field indicates where the data came from:
- `"aws-api-gateway"` - Production API
- `"local-api"` - Development API
- `"local-json"` - Fallback JSON file

## Error Handling

The application implements robust error handling:

1. **API Gateway fails** → Try local API (if enabled)
2. **Local API fails** → Fall back to JSON file
3. **All sources fail** → Show user-friendly error message

## Testing

### Unit Tests
Run the quiz service tests:
```bash
npm test src/services/__tests__/quizService.test.js
```

### Integration Testing
The local JSON file (`public/samplequizdata.json`) is preserved specifically for testing purposes and will always be available as a fallback.

### Manual Testing
1. **Test API Gateway**: Set production URL and test
2. **Test Local API**: Enable local mode and run serverless offline
3. **Test Fallback**: Disable network and verify JSON fallback works

## Deployment Checklist

- [ ] Deploy Lambda function to AWS
- [ ] Configure API Gateway endpoint
- [ ] Set `REACT_APP_SMARTYQUEST_API_URL` environment variable
- [ ] Test API Gateway endpoint
- [ ] Deploy React application
- [ ] Verify fallback behavior works
- [ ] Run unit tests

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure API Gateway has CORS enabled
2. **Timeout Errors**: Check Lambda function timeout settings
3. **Environment Variables**: Verify correct API URL is set
4. **Local Development**: Ensure serverless-offline is running on port 3001

### Debug Information

The application logs detailed information to the browser console:
- API attempts and failures
- Fallback strategy execution
- Data source used for each request

Check the browser console for debugging information when issues occur.
