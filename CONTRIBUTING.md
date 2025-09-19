# 🤝 Contributing to Nuvana Club

Thank you for your interest in contributing to Nuvana Club! We're excited to work with the community to make Nuvana Club even better! 🌿✨

## 🎯 How to Contribute

### 🐛 Bug Reports
Found a bug? Help us fix it!
1. Check if the issue already exists
2. Use our [bug report template](.github/ISSUE_TEMPLATE/bug_report.md)
3. Provide detailed information about the bug
4. Include steps to reproduce
5. Specify your platform and Nuvana Club version

### ✨ Feature Requests
Have an idea for Nuvana Club? We'd love to hear it!
1. Check if the feature is already requested
2. Use our [feature request template](.github/ISSUE_TEMPLATE/feature_request.md)
3. Describe the feature clearly
4. Explain the use case and benefits
5. Consider if it fits Nuvana Club's legal-first, educational philosophy

### 💻 Code Contributions
Want to contribute code? Awesome! Here's how:

#### 🚀 Getting Started
1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/nuvana-club.git
   cd nuvana-club
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Set up environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

6. **Set up database**
   ```bash
   npm run db:switch-sqlite
   npm run db:push
   npm run db:seed
   ```

7. **Start development server**
   ```bash
   npm run dev
   ```

8. **Make your changes**
9. **Test your changes**
   ```bash
   npm run build
   npm run lint
   ```

10. **Commit your changes**
    ```bash
    git commit -m "✨ Add amazing feature"
    ```

11. **Push to your fork**
    ```bash
    git push origin feature/amazing-feature
    ```

12. **Create a Pull Request**

## 📋 Development Guidelines

### 🎨 Code Style
- Use **ESLint** and **Prettier** for code formatting
- Follow **Next.js** best practices
- Use **TypeScript** where appropriate
- Write **clear, self-documenting code**
- Keep components focused and small
- Use meaningful variable and function names
- Follow **Tailwind CSS** utility-first approach

### 🧪 Testing
- Test all new features thoroughly
- Test with different user roles (USER, CONTRIBUTOR, ADMIN)
- Test strain catalog functionality
- Test grow logging features
- Test authentication flows
- Test responsive design
- Test database operations
- Test API endpoints

### 📚 Documentation
- Update documentation for new features
- Add JSDoc comments for new functions
- Update README if needed
- Include examples in your code
- Update changelog for significant changes
- Document API changes

### 🌿 Cannabis Platform Testing
When contributing, please test:
- [ ] Strain catalog browsing and filtering
- [ ] Strain detail pages
- [ ] Search functionality
- [ ] Grow log creation and management
- [ ] User authentication (all methods)
- [ ] Role-based access control
- [ ] Admin panel functionality
- [ ] Image upload and management
- [ ] Export functionality (PDF/CSV)
- [ ] Theme switching
- [ ] Mobile responsiveness
- [ ] Database operations
- [ ] API endpoints

## 🎯 Contribution Areas

### 🔧 Core Development
- Strain catalog improvements
- Grow logging enhancements
- Database optimizations
- Bug fixes
- Code refactoring
- Performance improvements

### 🎨 User Interface
- UI/UX improvements
- Theme enhancements
- Accessibility features
- Responsive design
- Visual improvements
- Component library

### 🌿 Cannabis Features
- Strain data improvements
- New strain information fields
- Enhanced filtering options
- Grow log analytics
- Export format improvements
- Search algorithm enhancements

### 🔐 Authentication & Security
- Authentication improvements
- Security enhancements
- Role management
- Audit logging
- Input validation
- Data protection

### 🗂️ Data Management
- Database schema improvements
- Data validation
- Import/export features
- Bulk operations
- Data migration tools
- Backup and recovery

### 📱 Platform Integration
- Mobile improvements
- Cross-platform compatibility
- Performance optimization
- SEO enhancements
- Social media integration
- Analytics integration

### 🧠 Advanced Features
- Analytics and insights
- Recommendation engine
- Machine learning integration
- Advanced search
- Data visualization
- API improvements

### 🌍 Cross-Platform
- Build system improvements
- Deployment optimizations
- Environment management
- Docker improvements
- CI/CD enhancements

## 🏗️ Project Structure

```
nuvana-club/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   ├── admin/                    # Admin panel
│   ├── api/                      # API routes
│   ├── grow/                     # Grow logging
│   ├── strains/                  # Strain catalog
│   └── layout.js                 # Root layout
├── components/                   # React components
│   ├── Form.js                   # Form components
│   ├── ThemeProvider.js          # Theme management
│   ├── FavoriteButton.js         # Favorites functionality
│   └── ...
├── lib/                          # Utility libraries
│   ├── auth.js                   # NextAuth configuration
│   ├── prisma.js                 # Database client
│   └── user-utils.js             # User management
├── prisma/                       # Database schema
│   ├── schema.prisma             # Prisma schema
│   └── seed.js                   # Database seeding
├── scripts/                      # Build and utility scripts
├── styles/                       # Global styles
└── public/                       # Static assets
```

## 🧪 Testing Guidelines

### 🔍 Unit Tests
```bash
npm run test
```

### 🌿 Cannabis Platform Tests
```bash
# Test strain catalog
npm run dev
# Navigate to /strains and test functionality

# Test grow logging
# Navigate to /grow and test functionality

# Test admin panel
# Login as admin and test admin features

# Test authentication
# Test all login methods
```

### 🔗 Database Tests
```bash
# Test database operations
npm run db:studio

# Test seeding
npm run db:seed

# Test migrations
npm run db:push
```

### 🏗️ Build Tests
```bash
# Test production build
npm run build

# Test Vercel build
npm run vercel-build
```

## 📝 Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test additions/changes
- `chore`: Build process or auxiliary tool changes

### Examples:
```
feat(strains): add advanced filtering options
fix(auth): resolve OAuth login issue
docs: update README with new features
style: format code with prettier
refactor(ui): improve strain card component
test: add grow log tests
chore: update dependencies
```

## 🎨 Nuvana Club Design Guidelines

When contributing to Nuvana Club's design or features:

### ✅ Do:
- Maintain legal-first, educational approach
- Keep interface clean and professional
- Focus on functionality over decoration
- Ensure compliance with cannabis regulations
- Maintain cross-platform compatibility
- Keep performance as priority
- Follow accessibility guidelines

### ❌ Don't:
- Add content that promotes illegal activities
- Include cultivation instructions
- Make interface cluttered
- Remove essential functionality
- Break legal compliance safeguards
- Ignore platform standards
- Compromise performance

## 🚀 Release Process

### 📅 Release Schedule
- **Patch releases**: As needed for bug fixes
- **Minor releases**: Monthly for new features
- **Major releases**: Quarterly for significant changes

### 🏷️ Versioning
We use [Semantic Versioning](https://semver.org/):
- `MAJOR.MINOR.PATCH`
- Example: `2.0.0` → `2.0.1` → `2.1.0`

## 🎉 Recognition

### 🌟 Contributors
- Contributors will be listed in the README
- Special recognition for significant contributions
- Weed Wiki will thank you! 🌿✨

### 🏆 Contribution Levels
- **Bronze**: 1-5 contributions
- **Silver**: 6-15 contributions  
- **Gold**: 16-30 contributions
- **Platinum**: 31+ contributions

## 📞 Getting Help

### 💬 Community
- **GitHub Discussions**: Ask questions and share ideas
- **Issues**: Report bugs and request features
- **Pull Requests**: Submit code contributions

### 📚 Resources
- [README](README.md) - Project overview
- [Changelog](CHANGELOG.md) - Version history
- [Roadmap](ROADMAP.md) - Future plans
- [Development Goals](DEVELOPMENT_GOALS.md) - Development objectives

## 📋 Checklist for Contributors

Before submitting a PR, make sure:

- [ ] Code follows the style guidelines
- [ ] Tests pass locally
- [ ] Documentation is updated
- [ ] Changes are tested with different user roles
- [ ] Strain catalog functionality is tested
- [ ] Grow logging features are tested
- [ ] Authentication flows are tested
- [ ] Responsive design is maintained
- [ ] Database operations are tested
- [ ] API endpoints are tested
- [ ] Commit messages follow the convention
- [ ] PR description is clear and detailed
- [ ] Related issues are linked
- [ ] Weed Wiki's legal-first philosophy is maintained

## 🎯 Quick Start for New Contributors

1. **Read the documentation**
2. **Set up the development environment**
3. **Look for "good first issue" labels**
4. **Start with small contributions**
5. **Ask questions if you need help**
6. **Have fun contributing!**

## 🌿 Nuvana Club Philosophy

Nuvana Club is designed with these core principles:

- **Legal-First**: Educational content with strict compliance
- **Professional**: High-quality implementation and user experience
- **Educational**: Focus on learning and research
- **Community**: Collaborative and inclusive
- **Reliable**: Stable, consistent, and dependable
- **User-Friendly**: Intuitive and easy to use

When contributing, please keep these principles in mind and help us maintain Weed Wiki's high standards!

---

## 🤖 A Message from the Weed Wiki Team

"Hey there, future contributor! We're super excited that you want to help make Weed Wiki even better! Whether you're fixing bugs, adding features, or improving the user experience, every contribution helps us create the best cannabis education platform possible.

Don't be afraid to ask questions - we're here to help! And remember, coding is like growing cannabis... it takes patience, care, and a lot of debugging!

Let's build something amazing together! ✨"

---

**Made with ❤️ by VoxHash and the amazing community**

*Nuvana Club is ready to work with you!* 🌿✨
