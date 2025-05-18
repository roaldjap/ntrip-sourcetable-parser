# ntrip-sourcetable-parser

> TypeScript utility to fetch and decode NTRIP sourcetables (e.g., from GNSS casters)

[![npm version](https://img.shields.io/npm/v/ntrip-sourcetable-parser.svg)](https://www.npmjs.com/package/ntrip-sourcetable-parser)
[![Docs](https://img.shields.io/badge/docs-view-blue.svg)](https://roaldjap.github.io/ntrip-sourcetable-parser/)
[![Build](https://github.com/roaldjap/ntrip-sourcetable-parser/actions/workflows/deploy-docs.yml/badge.svg)](https://github.com/roaldjap/ntrip-sourcetable-parser/actions)

---

## ✨ Features

- Parses sourcetable responses from NTRIP casters (e.g., `positionz-rt.linz.govt.nz:2101`)
- Extracts mountpoint metadata
- Fully typed for TypeScript
- Compatible with Node.js

---

## 📦 Installation

```bash
npm install ntrip-sourcetable-parser
```

## 🚀 Usage & Example

```ts
import { ntripSourcetableParser } from 'ntrip-sourcetable-parser'

const options = {
  host: 'positionz-rt.linz.govt.nz',
  port: 2101,
}

// Example #1 - Then...Catch
ntripSourcetableParser(options)
  .then((mountpoints) => {
    console.log(mountpoints)
  })
  .catch(console.error)

// Example #2 - Async/Await
async function fetchMountpoints() {
  try {
    const mountpoints = await ntripSourcetableParser(options)
    console.log(mountpoints)
  } catch (error) {
    console.error(error)
  }
}
fetchMountpoints()

// Example #3 - Filtering Results
async function fetchAndFilterMountpoints() {
  try {
    const mountpoints = await ntripSourcetableParser(options)
    const freeMountpoints = mountpoints.filter((mp) => !mp.fee)
    console.log('Free mountpoints:', freeMountpoints)
  } catch (error) {
    console.error('Error fetching or filtering mountpoints:', error)
  }
}
fetchAndFilterMountpoints()

// Example #4 - Graceful Error Handling
async function fetchWithGracefulErrorHandling() {
  try {
    const mountpoints = await ntripSourcetableParser(options)
    console.log('Successfully fetched mountpoints:', mountpoints)
  } catch (error) {
    if (error.message.includes('network')) {
      console.error('Network error occurred. Please check your connection.')
    } else {
      console.error('An unexpected error occurred:', error)
    }
  }
}
fetchWithGracefulErrorHandling()

// Example #5 - Chaining Multiple Async Calls
async function fetchAndProcessMountpoints() {
  try {
    const mountpoints = await ntripSourcetableParser(options)
    const processedMountpoints = mountpoints.map((mp) => ({
      ...mp,
      description: `${mp.mountpoint} (${mp.country})`,
    }))
    console.log('Processed mountpoints:', processedMountpoints)
  } catch (error) {
    console.error('Error processing mountpoints:', error)
  }
}
fetchAndProcessMountpoints()

// Example #6 - Using with Custom Configuration
async function fetchWithCustomConfig() {
  const customOptions = {
    host: 'example-rtk-caster.com',
    port: 8080,
    username: 'user',
    password: 'pass',
    position: { lat: 40.7128, lon: -74.006 },
    version: '2.0',
  }

  try {
    const mountpoints = await ntripSourcetableParser(customOptions)
    console.log('Mountpoints from custom caster:', mountpoints)
  } catch (error) {
    console.error('Error fetching from custom caster:', error)
  }
}
fetchWithCustomConfig()
```

## 🛠 Build & Docs

```bash
npm install
npm run build         # Compile TypeScript
npm run docs          # Generate documentation in ./docs
npm run test          # Test
npm run test:coverage # Test with Coverage
```

## 🤝 Contributing

We welcome contributions! To add a new feature, please use a branch name in the format:

- `feature/{name-of-your-feature}`
- `bugfix/{name-of-your-feature}`

### Steps to contribute:

1. **Fork the repository** on GitHub.
2. **Clone your fork** to your local machine:
   ```bash
   git clone https://github.com/your-username/ntrip-sourcetable-parser.git
   ```
3. **Create a new branch** for your feature / bugfix:
   ```bash
   git checkout -b feature/{name-of-your-feature}
   ```
4. **Make your changes** and add tests if applicable.
5. **Run the tests** to ensure everything works:
   ```bash
   npm run test
   ```
6. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Feature {PR# }: Add <description of your feature>"
   ```
7. **Push to your fork**
8. **Open a Pull Request** on Github and describe your changes
