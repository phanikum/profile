import QuizService from '../quizService.js';

// Mock fetch for testing
global.fetch = jest.fn();

describe('QuizService', () => {
  beforeEach(() => {
    fetch.mockClear();
    console.log = jest.fn();
    console.warn = jest.fn();
    console.error = jest.fn();
  });

  describe('fetchQuizData', () => {
    it('should fetch from AWS API Gateway successfully', async () => {
      const mockResponse = {
        quiz: [
          {
            question: "Test question?",
            options: ["A", "B", "C"],
            answer: "A",
            topic: "Test",
            difficulty: "easy"
          }
        ],
        metadata: {
          totalQuestions: 1,
          topics: ["Test"],
          difficulties: ["easy"],
          timestamp: "2023-01-01T00:00:00.000Z"
        }
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await QuizService.fetchQuizData({ count: 1 });

      expect(result.source).toBe('aws-api-gateway');
      expect(result.quiz).toHaveLength(1);
      expect(result.quiz[0].question).toBe("Test question?");
    });

    it('should fallback to local JSON when AWS API fails', async () => {
      const mockLocalResponse = {
        quiz: [
          {
            question: "Local test question?",
            options: ["A", "B", "C"],
            answer: "A",
            topic: "Local",
            difficulty: "easy"
          }
        ]
      };

      // First call (AWS API) fails
      fetch.mockRejectedValueOnce(new Error('API Gateway failed'));
      
      // Second call (local JSON) succeeds
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockLocalResponse,
      });

      const result = await QuizService.fetchQuizData({ count: 1 });

      expect(result.source).toBe('local-json');
      expect(result.quiz).toHaveLength(1);
      expect(result.quiz[0].question).toBe("Local test question?");
    });

    it('should apply client-side filtering when using local JSON', async () => {
      const mockLocalResponse = {
        quiz: [
          {
            question: "Science question?",
            options: ["A", "B", "C"],
            answer: "A",
            topic: "Science",
            difficulty: "easy"
          },
          {
            question: "Math question?",
            options: ["A", "B", "C"],
            answer: "B",
            topic: "Math",
            difficulty: "medium"
          }
        ]
      };

      // AWS API fails, local JSON succeeds
      fetch.mockRejectedValueOnce(new Error('API Gateway failed'));
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockLocalResponse,
      });

      const result = await QuizService.fetchQuizData({ 
        topic: 'Science',
        count: 5 
      });

      expect(result.source).toBe('local-json');
      expect(result.quiz).toHaveLength(1);
      expect(result.quiz[0].topic).toBe('Science');
    });

    it('should throw error when all sources fail', async () => {
      // All fetch calls fail
      fetch.mockRejectedValue(new Error('Network error'));

      await expect(QuizService.fetchQuizData()).rejects.toThrow(
        'All quiz data sources failed. Please check your connection and try again.'
      );
    });
  });

  describe('fetchCustomQuizData', () => {
    it('should make POST request to AWS API Gateway', async () => {
      const mockResponse = {
        quiz: [],
        metadata: {}
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const requestBody = {
        topics: ['Science'],
        difficulties: ['easy'],
        count: 3
      };

      const result = await QuizService.fetchCustomQuizData(requestBody);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/quiz'),
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        })
      );
      expect(result.source).toBe('aws-api-gateway');
    });
  });

  describe('shuffleArray', () => {
    it('should return array with same length', () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = QuizService.shuffleArray(original);
      
      expect(shuffled).toHaveLength(original.length);
      expect(shuffled).toEqual(expect.arrayContaining(original));
    });

    it('should not modify original array', () => {
      const original = [1, 2, 3, 4, 5];
      const originalCopy = [...original];
      
      QuizService.shuffleArray(original);
      
      expect(original).toEqual(originalCopy);
    });
  });
});
