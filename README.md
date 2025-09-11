# Profile - Personal Portfolio Website

A modern, responsive personal profile website built with React and Node.js. This application showcases your professional background, skills, experience, education, patents, and side projects in a clean, organized layout.

## Features

- **About Section**: Personal introduction and background
- **Key Skills**: Organized by categories (Technical, Soft Skills, Tools & Technologies)
- **Professional Experience**: Timeline of work history with detailed descriptions
- **Education**: Academic background and certifications
- **Patents**: Showcase of intellectual property and innovations
- **Side Projects**: Space for personal projects and contributions (ready to be customized)

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
   ```bash
   cd profile
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open your browser and visit `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## Customization

### Personal Information

1. **Header**: Update your name and tagline in `src/App.js`
2. **About Section**: Modify the content in `src/components/About.js`
3. **Skills**: Update the skills arrays in `src/components/Skills.js`
4. **Experience**: Replace the sample data in `src/components/Experience.js`
5. **Education**: Update degrees and certifications in `src/components/Education.js`
6. **Patents**: Replace with your actual patents in `src/components/Patents.js`
7. **Side Projects**: Add your projects to `src/components/SideProjects.js`

### Styling

- Main styles are in `src/App.css`
- Global styles are in `src/index.css`
- The design uses a modern gradient header with clean, card-based sections
- Responsive design works on desktop, tablet, and mobile devices

### Color Scheme

The default color scheme uses:
- Primary: #667eea (blue gradient)
- Secondary: #764ba2 (purple gradient)
- Text: #2c3e50 (dark blue-gray)
- Background: #f8f9fa (light gray)

## Project Structure

```
profile/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── About.js
│   │   ├── Skills.js
│   │   ├── Experience.js
│   │   ├── Education.js
│   │   ├── Patents.js
│   │   └── SideProjects.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Deployment

To deploy this application:

1. Build the production version:
   ```bash
   npm run build
   ```

2. The `build` folder will contain the optimized production files
3. Deploy the contents of the `build` folder to your hosting service

## Technologies Used

- React 18
- Create React App
- CSS3 with Flexbox and Grid
- Responsive Design
- Modern JavaScript (ES6+)

## License

MIT License - feel free to use this template for your own profile website.
