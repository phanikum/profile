import API_CONFIG from '../config/api.js';

/**
 * Service for fetching quiz data from various sources
 */
class QuizService {
  /**
   * Fetch quiz data with fallback strategy:
   * 1. Try AWS API Gateway
   * 2. Try local API (if in development)
   * 3. Fallback to local JSON file
   */
  static async fetchQuizData(options = {}) {
    const { topic, difficulty, count = 5, useLocalFallback = true } = options;
    
    // Build query parameters for GET request
    const queryParams = new URLSearchParams();
    if (topic) queryParams.append('topic', topic);
    if (difficulty) queryParams.append('difficulty', difficulty);
    if (count) queryParams.append('count', count.toString());
    
    const queryString = queryParams.toString();
    
    // Try AWS API Gateway first
    try {
      const apiUrl = `${API_CONFIG.AWS_API_GATEWAY_URL}${API_CONFIG.ENDPOINTS.QUIZ}${queryString ? `?${queryString}` : ''}`;
      console.log('Attempting to fetch from AWS API Gateway:', apiUrl);
      
      const response = await this.fetchWithTimeout(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Successfully fetched from AWS API Gateway');
        return {
          ...data,
          source: 'aws-api-gateway'
        };
      }
    } catch (error) {
      console.warn('AWS API Gateway failed:', error.message);
    }
    
    // Try local API if in development mode
    if (API_CONFIG.USE_LOCAL_API) {
      try {
        const localUrl = `${API_CONFIG.LOCAL_API_URL}${API_CONFIG.ENDPOINTS.QUIZ}${queryString ? `?${queryString}` : ''}`;
        console.log('Attempting to fetch from local API:', localUrl);
        
        const response = await this.fetchWithTimeout(localUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('Successfully fetched from local API');
          return {
            ...data,
            source: 'local-api'
          };
        }
      } catch (error) {
        console.warn('Local API failed:', error.message);
      }
    }
    
    // Fallback to local JSON file
    if (useLocalFallback) {
      try {
        console.log('Falling back to local JSON file');
        const response = await this.fetchWithTimeout(API_CONFIG.LOCAL_JSON_URL);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Successfully fetched from local JSON file');
          
          // Apply client-side filtering if needed (since local JSON doesn't support filtering)
          let filteredQuiz = [...data.quiz];
          
          if (topic) {
            filteredQuiz = filteredQuiz.filter(q => 
              q.topic.toLowerCase() === topic.toLowerCase()
            );
          }
          
          if (difficulty) {
            filteredQuiz = filteredQuiz.filter(q => 
              q.difficulty && q.difficulty.toLowerCase() === difficulty.toLowerCase()
            );
          }
          
          // Shuffle and limit
          filteredQuiz = this.shuffleArray(filteredQuiz).slice(0, count);
          
          return {
            quiz: filteredQuiz,
            metadata: {
              totalQuestions: filteredQuiz.length,
              topics: [...new Set(filteredQuiz.map(q => q.topic))],
              difficulties: [...new Set(filteredQuiz.map(q => q.difficulty))],
              timestamp: new Date().toISOString()
            },
            source: 'local-json'
          };
        }
      } catch (error) {
        console.error('Local JSON fallback failed:', error.message);
      }
    }
    
    throw new Error('All quiz data sources failed. Please check your connection and try again.');
  }
  
  /**
   * Fetch quiz data using POST request (for more complex filtering)
   */
  static async fetchCustomQuizData(requestBody) {
    // Try AWS API Gateway first
    try {
      const apiUrl = `${API_CONFIG.AWS_API_GATEWAY_URL}${API_CONFIG.ENDPOINTS.QUIZ}`;
      console.log('Attempting POST to AWS API Gateway:', apiUrl);
      
      const response = await this.fetchWithTimeout(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Successfully fetched from AWS API Gateway (POST)');
        return {
          ...data,
          source: 'aws-api-gateway'
        };
      }
    } catch (error) {
      console.warn('AWS API Gateway POST failed:', error.message);
    }
    
    // Try local API if in development mode
    if (API_CONFIG.USE_LOCAL_API) {
      try {
        const localUrl = `${API_CONFIG.LOCAL_API_URL}${API_CONFIG.ENDPOINTS.QUIZ}`;
        console.log('Attempting POST to local API:', localUrl);
        
        const response = await this.fetchWithTimeout(localUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('Successfully fetched from local API (POST)');
          return {
            ...data,
            source: 'local-api'
          };
        }
      } catch (error) {
        console.warn('Local API POST failed:', error.message);
      }
    }
    
    // Fallback to GET request with basic filtering
    // console.log('Falling back to GET request with basic filtering');
    // const { topics, difficulties, count } = requestBody;
    // const topic = topics && topics.length > 0 ? topics[0] : undefined;
    // const difficulty = difficulties && difficulties.length > 0 ? difficulties[0] : undefined;
    
    // return this.fetchQuizData({ topic, difficulty, count });
  }
  
  /**
   * Fetch with timeout
   */
  static async fetchWithTimeout(url, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }
  
  /**
   * Shuffle array using Fisher-Yates algorithm
   */
  static shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
}

export default QuizService;
