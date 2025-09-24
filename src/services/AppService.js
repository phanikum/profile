import manifestData from '../manifest.json';

class AppService {
  constructor() {
    this.apps = manifestData.apps;
    this.categories = manifestData.categories;
  }

  // Get all apps
  getAllApps() {
    return this.apps;
  }

  // Get apps by category
  getAppsByCategory(category) {
    return this.apps.filter(app => 
      app.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Get top picks (based on isTopPick flag and rating)
  getTopPicks(limit = 4) {
    return this.apps
      .filter(app => app.isTopPick)
      .sort((a, b) => {
        // Sort by rating first, then by review count
        if (b.rating !== a.rating) {
          return b.rating - a.rating;
        }
        return b.reviews - a.reviews;
      })
      .slice(0, limit);
  }

  // Search apps by name, description, tags, developer, or features
  searchApps(query) {
    if (!query || query.trim() === '') {
      return [];
    }

    const searchTerm = query.toLowerCase().trim();
    
    return this.apps.filter(app => {
      const nameMatch = app.name.toLowerCase().includes(searchTerm);
      const descriptionMatch = app.description.toLowerCase().includes(searchTerm);
      const tagMatch = app.tags.some(tag => tag.toLowerCase().includes(searchTerm));
      const developerMatch = app.developer.toLowerCase().includes(searchTerm);
      const featureMatch = app.features.some(feature => feature.toLowerCase().includes(searchTerm));
      
      return nameMatch || descriptionMatch || tagMatch || developerMatch || featureMatch;
    });
  }

  // Get apps sorted by rating and review count
  getAppsByRating(limit = 4) {
    return this.apps
      .sort((a, b) => {
        // Sort by rating first, then by review count
        if (b.rating !== a.rating) {
          return b.rating - a.rating;
        }
        return b.reviews - a.reviews;
      })
      .slice(0, limit);
  }

  // Get app by ID
  getAppById(id) {
    return this.apps.find(app => app.id === id);
  }

  // Get all categories
  getCategories() {
    return this.categories;
  }

  // Format price for display
  formatPrice(price) {
    const numPrice = parseFloat(price);
    if (isNaN(numPrice) || numPrice === 0) {
      return 'Free';
    }
    return `$${numPrice.toFixed(2)}`;
  }

  // Format review count for display
  formatReviewCount(count) {
    const numCount = parseInt(count);
    if (isNaN(numCount) || numCount === null || numCount === undefined) {
      return '0';
    }
    
    if (numCount >= 1000000) {
      const millions = numCount / 1000000;
      return millions % 1 === 0 ? `${millions.toFixed(0)}M` : `${millions.toFixed(1)}M`;
    } else if (numCount >= 1000) {
      const thousands = numCount / 1000;
      return thousands % 1 === 0 ? `${thousands.toFixed(0)}K` : `${thousands.toFixed(1)}K`;
    }
    return numCount.toString();
  }
}

// Export a singleton instance
export default new AppService();
