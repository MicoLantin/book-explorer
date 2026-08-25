# Book Explorer

A simple book search app built with React and Vite, using the [Open Library](https://openlibrary.org/) Search API.

## Features

- Search for books by title or author
- Loading, empty, and error states
- Click a book card to view details: description, subjects/genre tags, and edition count

## Tech

- React 19
- Vite
- Open Library Search API (`https://openlibrary.org/search.json`)
- Open Library Covers API (`https://covers.openlibrary.org/b/id/{id}-M.jpg`)
- Open Library Works API (`https://openlibrary.org/works/{id}.json`) for book details

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
