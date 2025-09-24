import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppMartPage from '../AppMartPage';
import AppService from '../../services/AppService';

// Mock AppService
jest.mock('../../services/AppService');

// Mock react-router-dom Link component
const MockLink = ({ children, to, className }) => (
  <a href={to} className={className}>
    {children}
  </a>
);

// Create a manual mock for react-router-dom
jest.doMock('react-router-dom', () => ({
  Link: MockLink,
}));

const mockApps = [
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
    installationStatus: { isInstalled: true },
    isTopPick: false
  },
  {
    id: 6,
    name: 'Venmo',
    developer: 'PayPal, Inc',
    category: 'Finance',
    rating: 4.4,
    reviews: 1300000,
    price: 0,
    description: 'Send and receive money.',
    features: ['Social payments', 'Split bills'],
    installationStatus: { isInstalled: false },
    isTopPick: false
  },
  {
    id: 7,
    name: 'Uber',
    developer: 'Uber Technologies',
    category: 'Travel',
    rating: 4.2,
    reviews: 2800000,
    price: 0,
    description: 'Request rides and track your driver.',
    features: ['Live tracking', 'Multiple payment options'],
    installationStatus: { isInstalled: false },
    isTopPick: false
  }
];

const renderAppMartPage = () => {
  return render(<AppMartPage />);
};

describe('AppMartPage', () => {
  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    
    // Setup default mock implementations
    AppService.getAllApps.mockReturnValue(mockApps);
    AppService.getTopPicks.mockImplementation((count) => 
      mockApps.filter(app => app.isTopPick).slice(0, count)
    );
    AppService.getAppsByCategory.mockImplementation((category) => 
      mockApps.filter(app => app.category.toLowerCase() === category.toLowerCase())
    );
    AppService.searchApps.mockImplementation((query) => 
      mockApps.filter(app => 
        app.name.toLowerCase().includes(query.toLowerCase()) ||
        app.description.toLowerCase().includes(query.toLowerCase()) ||
        app.developer.toLowerCase().includes(query.toLowerCase())
      )
    );
    AppService.formatPrice.mockImplementation((price) => 
      price === 0 ? 'Free' : `$${price.toFixed(2)}`
    );
    AppService.formatReviewCount.mockImplementation((count) => {
      if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
      if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
      return count.toString();
    });
  });

  describe('Page Structure', () => {
    it('should render the page header correctly', () => {
      renderAppMartPage();
      
      expect(screen.getByText('🏪 App Mart')).toBeInTheDocument();
      expect(screen.getByText('Discover Amazing Apps')).toBeInTheDocument();
      expect(screen.getByText('← Back to Profile')).toBeInTheDocument();
    });

    it('should render the search section', () => {
      renderAppMartPage();
      
      const searchInput = screen.getByPlaceholderText('Search apps, games, and more...');
      expect(searchInput).toBeInTheDocument();
      expect(screen.getByText('🔍')).toBeInTheDocument();
    });

    it('should render all app sections when not searching', () => {
      renderAppMartPage();
      
      expect(screen.getByText('🏆 Top Picks')).toBeInTheDocument();
      expect(screen.getByText('🎬 Entertainment')).toBeInTheDocument();
      expect(screen.getByText('👥 Social')).toBeInTheDocument();
      expect(screen.getByText('🎮 Games')).toBeInTheDocument();
      expect(screen.getByText('💼 Business')).toBeInTheDocument();
      expect(screen.getByText('💰 Finance')).toBeInTheDocument();
      expect(screen.getByText('✈️ Travel')).toBeInTheDocument();
    });
  });

  describe('Data Loading', () => {
    it('should call AppService methods to load data on mount', () => {
      renderAppMartPage();
      
      expect(AppService.getTopPicks).toHaveBeenCalledWith(4);
      expect(AppService.getAppsByCategory).toHaveBeenCalledWith('Entertainment');
      expect(AppService.getAppsByCategory).toHaveBeenCalledWith('Social');
      expect(AppService.getAppsByCategory).toHaveBeenCalledWith('Games');
      expect(AppService.getAppsByCategory).toHaveBeenCalledWith('Business');
      expect(AppService.getAppsByCategory).toHaveBeenCalledWith('Finance');
      expect(AppService.getAppsByCategory).toHaveBeenCalledWith('Travel');
    });

    it('should display apps in their respective sections', () => {
      renderAppMartPage();
      
      // Check if apps appear in correct sections
      expect(screen.getByText('Netflix')).toBeInTheDocument();
      expect(screen.getByText('Spotify')).toBeInTheDocument();
      expect(screen.getByText('Instagram')).toBeInTheDocument();
      expect(screen.getByText('Minecraft')).toBeInTheDocument();
      expect(screen.getByText('Zoom')).toBeInTheDocument();
      expect(screen.getByText('Venmo')).toBeInTheDocument();
      expect(screen.getByText('Uber')).toBeInTheDocument();
    });
  });

  describe('App Cards', () => {
    it('should display app information correctly', () => {
      renderAppMartPage();
      
      // Check Netflix app card
      expect(screen.getByText('Netflix')).toBeInTheDocument();
      expect(screen.getByText('Netflix, Inc.')).toBeInTheDocument();
      expect(screen.getByText('4.5 (2.5M)')).toBeInTheDocument();
      expect(screen.getByText('Stream award-winning TV shows, movies, anime, documentaries, and more on your phone.')).toBeInTheDocument();
      expect(screen.getByText('Download titles to watch offline')).toBeInTheDocument();
      expect(screen.getByText('Free')).toBeInTheDocument();
    });

    it('should display correct install button text based on installation status', () => {
      renderAppMartPage();
      
      // Netflix is not installed
      const netflixCard = screen.getByText('Netflix').closest('.app-card');
      expect(netflixCard).toHaveTextContent('Install');
      
      // Spotify is installed
      const spotifyCard = screen.getByText('Spotify').closest('.app-card');
      expect(spotifyCard).toHaveTextContent('Open');
    });

    it('should display paid app prices correctly', () => {
      renderAppMartPage();
      
      const minecraftCard = screen.getByText('Minecraft').closest('.app-card');
      expect(minecraftCard).toHaveTextContent('$7.99');
    });

    it('should render star ratings', () => {
      renderAppMartPage();
      
      // Check that star elements are rendered
      const stars = screen.getAllByText('★');
      expect(stars.length).toBeGreaterThan(0);
    });

    it('should apply correct data-category attribute', () => {
      renderAppMartPage();
      
      const netflixCard = screen.getByText('Netflix').closest('.app-card');
      expect(netflixCard).toHaveAttribute('data-category', 'entertainment');
      
      const instagramCard = screen.getByText('Instagram').closest('.app-card');
      expect(instagramCard).toHaveAttribute('data-category', 'social');
    });
  });

  describe('Search Functionality', () => {
    it('should update search query when typing in search input', () => {
      renderAppMartPage();
      
      const searchInput = screen.getByPlaceholderText('Search apps, games, and more...');
      fireEvent.change(searchInput, { target: { value: 'Netflix' } });
      
      expect(searchInput.value).toBe('Netflix');
    });

    it('should display search results when searching', async () => {
      renderAppMartPage();
      
      const searchInput = screen.getByPlaceholderText('Search apps, games, and more...');
      fireEvent.change(searchInput, { target: { value: 'Netflix' } });
      
      await waitFor(() => {
        expect(screen.getByText('Search Results (1)')).toBeInTheDocument();
        expect(AppService.searchApps).toHaveBeenCalledWith('Netflix');
      });
    });

    it('should hide sections when searching', async () => {
      renderAppMartPage();
      
      const searchInput = screen.getByPlaceholderText('Search apps, games, and more...');
      fireEvent.change(searchInput, { target: { value: 'Netflix' } });
      
      await waitFor(() => {
        expect(screen.queryByText('🏆 Top Picks')).not.toBeInTheDocument();
        expect(screen.queryByText('🎬 Entertainment')).not.toBeInTheDocument();
      });
    });

    it('should show sections again when search is cleared', async () => {
      renderAppMartPage();
      
      const searchInput = screen.getByPlaceholderText('Search apps, games, and more...');
      
      // Search first
      fireEvent.change(searchInput, { target: { value: 'Netflix' } });
      await waitFor(() => {
        expect(screen.getByText('Search Results (1)')).toBeInTheDocument();
      });
      
      // Clear search
      fireEvent.change(searchInput, { target: { value: '' } });
      await waitFor(() => {
        expect(screen.getByText('🏆 Top Picks')).toBeInTheDocument();
        expect(screen.getByText('🎬 Entertainment')).toBeInTheDocument();
      });
    });

    it('should call searchApps with correct query', () => {
      renderAppMartPage();
      
      const searchInput = screen.getByPlaceholderText('Search apps, games, and more...');
      fireEvent.change(searchInput, { target: { value: 'music' } });
      
      expect(AppService.searchApps).toHaveBeenCalledWith('music');
    });

    it('should limit search results to 8 apps', async () => {
      // Mock searchApps to return more than 8 results
      AppService.searchApps.mockReturnValue(Array(15).fill(mockApps[0]));
      
      renderAppMartPage();
      
      const searchInput = screen.getByPlaceholderText('Search apps, games, and more...');
      fireEvent.change(searchInput, { target: { value: 'app' } });
      
      await waitFor(() => {
        const searchResults = screen.getByText('Search Results (15)').parentElement;
        const appCards = searchResults.querySelectorAll('.app-card');
        expect(appCards.length).toBe(8);
      });
    });
  });

  describe('Star Rating Component', () => {
    it('should render correct number of full stars', () => {
      renderAppMartPage();
      
      // Netflix has 4.5 rating, should have 4 full stars and 1 half star
      const netflixCard = screen.getByText('Netflix').closest('.app-card');
      const fullStars = netflixCard.querySelectorAll('.star.full');
      expect(fullStars.length).toBe(4);
    });

    it('should render half star for decimal ratings', () => {
      renderAppMartPage();
      
      const netflixCard = screen.getByText('Netflix').closest('.app-card');
      const halfStars = netflixCard.querySelectorAll('.star.half');
      expect(halfStars.length).toBe(1);
    });

    it('should render empty stars to complete 5-star rating', () => {
      renderAppMartPage();
      
      const netflixCard = screen.getByText('Netflix').closest('.app-card');
      const emptyStars = netflixCard.querySelectorAll('.star.empty');
      expect(emptyStars.length).toBe(0); // 4.5 rating = 4 full + 1 half + 0 empty
    });
  });

  describe('Section Rendering', () => {
    it('should render AppSection with correct props', () => {
      renderAppMartPage();
      
      // Check that sections have correct emojis and titles
      expect(screen.getByText('🏆')).toBeInTheDocument();
      expect(screen.getByText('🎬')).toBeInTheDocument();
      expect(screen.getByText('👥')).toBeInTheDocument();
      expect(screen.getByText('🎮')).toBeInTheDocument();
      expect(screen.getByText('💼')).toBeInTheDocument();
      expect(screen.getByText('💰')).toBeInTheDocument();
      expect(screen.getByText('✈️')).toBeInTheDocument();
    });

    it('should render apps in grid layout', () => {
      renderAppMartPage();
      
      const grids = screen.getAllByClassName('apps-grid');
      expect(grids.length).toBeGreaterThan(0);
      
      grids.forEach(grid => {
        expect(grid).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle empty app data gracefully', () => {
      AppService.getTopPicks.mockReturnValue([]);
      AppService.getAppsByCategory.mockReturnValue([]);
      
      renderAppMartPage();
      
      // Should still render sections even with no apps
      expect(screen.getByText('🏆 Top Picks')).toBeInTheDocument();
      expect(screen.getByText('🎬 Entertainment')).toBeInTheDocument();
    });

    it('should handle search with no results', async () => {
      AppService.searchApps.mockReturnValue([]);
      
      renderAppMartPage();
      
      const searchInput = screen.getByPlaceholderText('Search apps, games, and more...');
      fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
      
      await waitFor(() => {
        expect(screen.getByText('Search Results (0)')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper heading structure', () => {
      renderAppMartPage();
      
      const mainHeading = screen.getByRole('heading', { level: 1 });
      expect(mainHeading).toHaveTextContent('🏪 App Mart');
      
      const sectionHeadings = screen.getAllByRole('heading', { level: 2 });
      expect(sectionHeadings.length).toBeGreaterThan(0);
    });

    it('should have accessible search input', () => {
      renderAppMartPage();
      
      const searchInput = screen.getByPlaceholderText('Search apps, games, and more...');
      expect(searchInput).toHaveAttribute('type', 'text');
    });

    it('should have accessible buttons', () => {
      renderAppMartPage();
      
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
      
      buttons.forEach(button => {
        expect(button).toBeInTheDocument();
      });
    });
  });
});
