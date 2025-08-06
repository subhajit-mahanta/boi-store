# 📚 Boi Store - Literary Paradise

A modern, responsive e-commerce website for books and magazines, built with vanilla HTML, CSS, and JavaScript.

![Boi Store Hero](https://img.shields.io/badge/Status-Live-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/Responsive-Yes-green)

## 🌟 Features

### 🛍️ **E-commerce Functionality**
- **Shopping Cart** - Add, remove, and manage items with persistent storage
- **Wishlist/Reading List** - Save favorite books for later
- **Product Filtering** - Filter by categories (Fiction, Non-Fiction, Magazines, Bestsellers)
- **Search Functionality** - Advanced search with suggestions
- **Quick View Modal** - Preview products without leaving the page

### 🎨 **Modern Design**
- **Responsive Design** - Works perfectly on all devices
- **Hero Slider** - Dynamic carousel showcasing featured content
- **Smooth Animations** - CSS transitions and JavaScript animations
- **Loading Screen** - Elegant loading experience
- **Dark/Light Theme Ready** - Built with CSS custom properties

### ♿ **Accessibility & Performance**
- **WCAG Compliance** - Screen reader friendly with proper ARIA labels
- **Keyboard Navigation** - Full keyboard accessibility
- **Skip Links** - Quick navigation for screen readers
- **Optimized Images** - Lazy loading and responsive images
- **Fast Loading** - Optimized CSS and JavaScript

### 📱 **Mobile-First**
- **Touch-Friendly** - Optimized for mobile interactions
- **Responsive Grid** - Flexible layouts for all screen sizes
- **Mobile Menu** - Collapsible navigation for mobile devices
- **Swipe Gestures** - Touch gestures for hero slider

## 🚀 Live Demo

Visit the live website: [Boi Store](https://subhajit-mahanta.github.io/boi-store/)

## 📋 Table of Contents

- [Features](#-features)
- [Installation](#-installation)
- [Usage](#-usage)
- [File Structure](#-file-structure)
- [Technologies](#-technologies)
- [Browser Support](#-browser-support)
- [Contributing](#-contributing)
- [License](#-license)

## 💻 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/subhajit-mahanta/boi-store.git
   cd boi-store
   ```

2. **Open in your browser**
   ```bash
   # Simply open index.html in your preferred browser
   open index.html
   # Or use a local server (recommended)
   python -m http.server 3000
   # Or with Node.js
   npx serve .
   ```

3. **For development**
   ```bash
   # Use VS Code Live Server extension
   # Or any local development server
   ```

## 🎯 Usage

### Basic Navigation
- Browse books and magazines by category
- Use the search function to find specific titles
- Add items to cart or wishlist
- View product details with Quick View

### Shopping Cart
- Items persist between browser sessions
- Adjust quantities or remove items
- View total pricing with free shipping info

### Search & Filter
- **Search**: Use the search icon or `Ctrl+K` (or `Cmd+K` on Mac)
- **Filter**: Click category buttons to filter products
- **Quick Tags**: Use suggested search terms

## 📁 File Structure

```
boi-store/
│
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # All JavaScript functionality
├── README.md           # Project documentation
│
└── assets/             # (External images via CDN)
    ├── images/         # Product and hero images
    └── icons/          # FontAwesome icons
```

## 🛠️ Technologies

### Frontend
- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Modern styling with Flexbox, Grid, and Custom Properties
- **JavaScript (ES6+)** - Vanilla JS with modern features
- **FontAwesome 6.4.0** - Icon library
- **Google Fonts** - Inter & Playfair Display typography

### External APIs & CDNs
- **Pexels** - High-quality stock images
- **Google Fonts** - Web font loading
- **FontAwesome** - Icon CDN

### Development Features
- **CSS Custom Properties** - Theme customization
- **Local Storage** - Cart and wishlist persistence
- **Intersection Observer** - Scroll animations
- **Touch Events** - Mobile gesture support
- **Keyboard Events** - Accessibility shortcuts

## 🌐 Browser Support

| Browser | Version |
|---------|---------|
| Chrome  | 88+     |
| Firefox | 85+     |
| Safari  | 14+     |
| Edge    | 88+     |

### Mobile Support
- iOS Safari 14+
- Chrome Mobile 88+
- Samsung Internet 13+

## 🎨 Customization

### Colors
The website uses CSS custom properties for easy theming:

```css
:root {
  --primary-color: #1e3a8a;     /* Deep blue */
  --accent-color: #d97706;      /* Warm orange */
  --bg-primary: #ffffff;        /* White background */
  --text-primary: #0f172a;      /* Dark text */
}
```

### Fonts
- **Headings**: Playfair Display (serif)
- **Body Text**: Inter (sans-serif)

## 📊 Performance

- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow semantic HTML5 structure
- Use CSS custom properties for theming
- Maintain accessibility standards (WCAG 2.1)
- Test on multiple devices and browsers
- Keep JavaScript vanilla (no frameworks)

## 🐛 Bug Reports

If you find a bug, please create an issue with:
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)

## 🔮 Future Enhancements

- [ ] User authentication system
- [ ] Payment gateway integration
- [ ] Admin panel for inventory management
- [ ] Advanced filtering options
- [ ] Customer reviews and ratings
- [ ] Email newsletter integration
- [ ] Multi-language support
- [ ] Dark/Light theme toggle

## 📞 Contact

**Subhajit Mahanta**
- GitHub: [@subhajit-mahanta](https://github.com/subhajit-mahanta)
- Email: support@boisstore.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Modern e-commerce trends
- **Images**: Pexels photographers
- **Icons**: FontAwesome team
- **Fonts**: Google Fonts team

---

<div align="center">
  <strong>Built with ❤️ for book lovers everywhere</strong>
  <br>
  <em>Boi Store - Where every page tells a story</em>
</div>
