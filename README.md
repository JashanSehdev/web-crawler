# Web Crawler

## Overview

Web Crawler is a Node.js application that automatically visits web pages, downloads their HTML content, extracts useful information, and discovers additional links for further crawling.

The project demonstrates concepts used in search engines such as URL discovery, page fetching, HTML parsing, duplicate detection, queue management, and persistent storage.

This project was built to understand how modern web crawlers work rather than to replace production-grade crawlers.

---

## Features

- Crawl websites starting from a seed URL
- Extract hyperlinks from HTML pages
- Prevent duplicate crawling
- Store crawled data in a database
- Queue-based crawling system
- Configurable crawling depth
- Error handling for invalid or unreachable URLs
- REST API for controlling crawler operations

---

## Technology Stack

| Component | Technology |
|-----------|------------|
| Runtime | Node.js |
| Backend | Express.js |
| Tester | jest |


---

# Project Structure

```
web-crawler/
│
├── crawl.js            # Utility that crawls through all urls
│
├── crawl.test.js       # Tester functions
│
├── main.js             # Main function
│
├──report.js            # This file represents how CLI looks
│
├──report.test.js       # Report Tester funtion
│
├── package.json
│
└── README.md
```

---

# Architecture

```
             User

               │

               ▼

         REST API (Express)

               │

               ▼

            main

               │

               ▼

         Crawl Service

        ┌──────────────┐
        │ URL Queue    │
        └──────────────┘
               │
               ▼
        Fetch HTML Page
               │
               ▼
            Parse HTML
               │
               ▼
    Show all URLS on the CLI Terminal
        

---

# How the Crawler Works

1. A user submits a starting URL.
2. The URL is added to the crawling queue.
3. The crawler downloads the webpage.
4. HTML content is parsed.
5. Links are extracted.
6. Duplicate URLs are ignored.
7. New URLs are added to the queue.
8. The page content is stored in the database.
9. The process repeats until the queue becomes empty or the maximum crawl depth is reached.

---

# Installation

## Clone the repository

```bash
git clone https://github.com/JashanSehdev/web-crawler.git

cd web-crawler
```

## Install dependencies

```bash
npm install
```


---

# Running the Project

Start the server:

```bash
npm start {seed url link}
```

---


```


# Author

**Jashan Sehdev**

GitHub: https://github.com/JashanSehdev