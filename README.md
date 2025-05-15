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

🚀 Usage & Example
```ts
import { fetchSourcetable } from 'ntrip-sourcetable-parser';

const host = 'positionz-rt.linz.govt.nz';
const port = 2101;

fetchSourcetable(host, port)
  .then((mountpoints) => {
    console.log(mountpoints);
  })
  .catch(console.error);
```

📘 Mountpoint Interface
```ts
export interface Mountpoint {
  mountpoint: string;
  format: string;
  formatDetails: string;
  carrier: string;
  navSystem: string;
  network: string;
  country: string;
  latitude: number;
  longitude: number;
  nmea: boolean;
  authentication: boolean;
  fee: boolean;
  bitrate: number;
}
```

🛠 Build & Docs
```bash
npm install
npm run build       # Compile TypeScript
npm run docs        # Generate documentation in ./docs
```
