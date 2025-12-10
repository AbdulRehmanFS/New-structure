# Frontend Repository Setup

## Local Development

### Prerequisites
- Node.js installed on your system
- npm package manager

### Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Configuration**
   
   Create a `.env` file in the root directory with the following environment variable:
   ```bash
   REACT_APP_API_URL=http://localhost:5001
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000` (or the next available port).

## Deployment

The application is deployed on AWS Amplify with the following environments:

- **Development**: https://admin-dev.livekanvas.com
- **Production**: https://admin.livekanvas.com

## Environment Variables

| Variable | Local Development | Purpose |
|----------|-------------------|---------|
| `REACT_APP_API_URL` | `http://localhost:5001` | Backend API endpoint |

## Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd <repository-name>

# Install dependencies
npm install

# Create environment file
echo "REACT_APP_API_URL=http://localhost:5001" > .env

# Start development server
npm start
```