import AppService from '../AppService.js';

// Mock the manifest data
jest.mock('../../manifest.json', () => ({
  apps: [
    {
      id: 1,
      name: 'Netflix',
      developer: 'Netflix, Inc.',
      category: 'Entertainment',
      rating: 4.5,
      reviews: 2500000,
      price: 0,
      description: 'Stream award-winning TV shows, movies, anime, documentaries, and more on your phone.',
      features: ['Download titles to watch offline', 'Multi-language support'],
      tags: ['streaming', 'video', 'entertainment'],
      installationStatus: { isInstalled: false },
      isTopPick: true
    },
    {
      id: 2,
      name: 'Spotify',
      developer: 'Spotify AB',
      category: 'Entertainment',
      rating: 4.7,
      reviews: 3200000,
      price: 0,
      description: 'Listen to your favorite music, podcasts, and more.',
      features: ['Offline playback', 'Playlist creation'],
      tags: ['music', 'audio', 'streaming'],
      installationStatus: { isInstalled: true },
      isTopPick: true
    },
    {
      id: 3,
      name: 'Instagram',
      developer: 'Meta',
      category: 'Social',
      rating: 4.3,
      reviews: 4500000,
      price: 0,
      description: 'Share photos and videos with friends.',
      features: ['Photo filters', 'Stories'],
      tags: ['social', 'photos', 'sharing'],
      installationStatus: { isInstalled: false },
      isTopPick: false
    },
    {
      id: 4,
      name: 'Minecraft',
      developer: 'Mojang',
      category: 'Games',
      rating: 4.5,
      reviews: 1200000,
      price: 7.99,
      description: 'Build, create, and explore infinite worlds.',
      features: ['Multiplayer', 'Creative mode'],
      tags: ['games', 'creative', 'building'],
      installationStatus: { isInstalled: false },
      isTopPick: false
    },
    {
      id: 5,
      name: 'Zoom',
      developer: 'Zoom Video Communications',
      category: 'Business',
      rating: 4.4,
      reviews: 1900000,
      price: 0,
      description: 'Video conferencing and messaging.',
      features: ['HD video', 'Screen sharing'],
      tags: ['business', 'video', 'conferencing'],
      installationStatus: { isInstalled: true },
      isTopPick: false
    }
  ],
  categories: ['Entertainment', 'Social', 'Games', 'Business', 'Finance', 'Travel']
}));

describe('AppService', () => {
  beforeEach(() => {
    // No need to reset since we're mocking the data
  });

  describe('initialization', () => {
    it('should load apps data on first access', () => {
      const apps = AppService.getAllApps();
      expect(Array.isArray(apps)).toBe(true);
      expect(apps.length).toBeGreaterThan(0);
    });

    it('should return the same data on subsequent calls (singleton pattern)', () => {
      const apps1 = AppService.getAllApps();
      const apps2 = AppService.getAllApps();
      expect(apps1).toBe(apps2); // Same reference
    });
  });

  describe('getAllApps', () => {
    it('should return an array of apps', () => {
      const apps = AppService.getAllApps();
      expect(Array.isArray(apps)).toBe(true);
      expect(apps.length).toBeGreaterThan(0);
    });

    it('should return apps with required properties', () => {
      const apps = AppService.getAllApps();
      const app = apps[0];
      
      expect(app).toHaveProperty('id');
      expect(app).toHaveProperty('name');
      expect(app).toHaveProperty('developer');
      expect(app).toHaveProperty('category');
      expect(app).toHaveProperty('rating');
      expect(app).toHaveProperty('reviews');
      expect(app).toHaveProperty('price');
      expect(app).toHaveProperty('description');
      expect(app).toHaveProperty('features');
      expect(app).toHaveProperty('installationStatus');
    });
  });

  describe('getTopPicks', () => {
    it('should return apps with high ratings', () => {
      const topPicks = AppService.getTopPicks(5);
      expect(Array.isArray(topPicks)).toBe(true);
      expect(topPicks.length).toBeLessThanOrEqual(5);
      
      topPicks.forEach(app => {
        expect(app.rating).toBeGreaterThanOrEqual(4.0);
      });
    });

    it('should limit results to requested count', () => {
      const topPicks = AppService.getTopPicks(3);
      expect(topPicks.length).toBeLessThanOrEqual(3);
    });

    it('should return apps sorted by rating (descending)', () => {
      const topPicks = AppService.getTopPicks(10);
      for (let i = 1; i < topPicks.length; i++) {
        expect(topPicks[i-1].rating).toBeGreaterThanOrEqual(topPicks[i].rating);
      }
    });

    it('should prioritize apps marked as top picks', () => {
      const topPicks = AppService.getTopPicks(10);
      const topPickApps = topPicks.filter(app => app.isTopPick);
      expect(topPickApps.length).toBeGreaterThan(0);
    });
  });

  describe('getAppsByCategory', () => {
    it('should return apps from specified category', () => {
      const entertainmentApps = AppService.getAppsByCategory('Entertainment');
      expect(Array.isArray(entertainmentApps)).toBe(true);
      
      entertainmentApps.forEach(app => {
        expect(app.category.toLowerCase()).toBe('entertainment');
      });
    });

    it('should be case insensitive', () => {
      const apps1 = AppService.getAppsByCategory('ENTERTAINMENT');
      const apps2 = AppService.getAppsByCategory('entertainment');
      const apps3 = AppService.getAppsByCategory('Entertainment');
      
      expect(apps1).toEqual(apps2);
      expect(apps2).toEqual(apps3);
    });

    it('should return empty array for non-existent category', () => {
      const apps = AppService.getAppsByCategory('NonExistentCategory');
      expect(Array.isArray(apps)).toBe(true);
      expect(apps.length).toBe(0);
    });

    it('should return apps for available categories', () => {
      const categories = ['Entertainment', 'Social', 'Games', 'Business'];
      
      categories.forEach(category => {
        const apps = AppService.getAppsByCategory(category);
        expect(apps.length).toBeGreaterThan(0);
      });
    });
  });

  describe('searchApps', () => {
    it('should return apps matching search query in name', () => {
      const results = AppService.searchApps('Netflix');
      expect(Array.isArray(results)).toBe(true);
      
      const hasNetflix = results.some(app => 
        app.name.toLowerCase().includes('netflix')
      );
      expect(hasNetflix).toBe(true);
    });

    it('should return apps matching search query in description', () => {
      const results = AppService.searchApps('music');
      expect(Array.isArray(results)).toBe(true);
      
      const hasMusicApp = results.some(app => 
        app.description.toLowerCase().includes('music') ||
        app.name.toLowerCase().includes('music')
      );
      expect(hasMusicApp).toBe(true);
    });

    it('should return apps matching search query in developer', () => {
      const results = AppService.searchApps('Meta');
      expect(Array.isArray(results)).toBe(true);
      
      const hasMetaApp = results.some(app => 
        app.developer.toLowerCase().includes('meta')
      );
      expect(hasMetaApp).toBe(true);
    });

    it('should be case insensitive', () => {
      const results1 = AppService.searchApps('NETFLIX');
      const results2 = AppService.searchApps('netflix');
      const results3 = AppService.searchApps('Netflix');
      
      expect(results1).toEqual(results2);
      expect(results2).toEqual(results3);
    });

    it('should return empty array for no matches', () => {
      const results = AppService.searchApps('XYZNonExistentApp123');
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBe(0);
    });

    it('should return empty array for empty search query', () => {
      const results = AppService.searchApps('');
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBe(0);
    });

    it('should search in features', () => {
      const results = AppService.searchApps('offline');
      expect(Array.isArray(results)).toBe(true);
      
      const hasOfflineFeature = results.some(app => 
        app.features.some(feature => 
          feature.toLowerCase().includes('offline')
        )
      );
      expect(hasOfflineFeature).toBe(true);
    });
  });

  describe('formatPrice', () => {
    it('should format free apps correctly', () => {
      expect(AppService.formatPrice(0)).toBe('Free');
      expect(AppService.formatPrice('0')).toBe('Free');
    });

    it('should format paid apps with dollar sign', () => {
      expect(AppService.formatPrice(9.99)).toBe('$9.99');
      expect(AppService.formatPrice(1.99)).toBe('$1.99');
      expect(AppService.formatPrice(15)).toBe('$15.00');
    });

    it('should handle string prices', () => {
      expect(AppService.formatPrice('9.99')).toBe('$9.99');
      expect(AppService.formatPrice('0')).toBe('Free');
    });

    it('should handle invalid prices', () => {
      expect(AppService.formatPrice(null)).toBe('Free');
      expect(AppService.formatPrice(undefined)).toBe('Free');
      expect(AppService.formatPrice('invalid')).toBe('Free');
    });
  });

  describe('formatReviewCount', () => {
    it('should format thousands with K suffix', () => {
      expect(AppService.formatReviewCount(1500)).toBe('1.5K');
      expect(AppService.formatReviewCount(2000)).toBe('2K');
      expect(AppService.formatReviewCount(12500)).toBe('12.5K');
    });

    it('should format millions with M suffix', () => {
      expect(AppService.formatReviewCount(1500000)).toBe('1.5M');
      expect(AppService.formatReviewCount(2000000)).toBe('2M');
      expect(AppService.formatReviewCount(12500000)).toBe('12.5M');
    });

    it('should return numbers under 1000 as is', () => {
      expect(AppService.formatReviewCount(999)).toBe('999');
      expect(AppService.formatReviewCount(500)).toBe('500');
      expect(AppService.formatReviewCount(1)).toBe('1');
    });

    it('should handle string numbers', () => {
      expect(AppService.formatReviewCount('1500')).toBe('1.5K');
      expect(AppService.formatReviewCount('2000000')).toBe('2M');
    });

    it('should handle invalid input', () => {
      expect(AppService.formatReviewCount(null)).toBe('0');
      expect(AppService.formatReviewCount(undefined)).toBe('0');
      expect(AppService.formatReviewCount('invalid')).toBe('0');
    });
  });
});
