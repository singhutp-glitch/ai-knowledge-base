# AI Knowledge Base for Businesses

An AI-powered internal knowledge assistant that enables organizations to chat with their documents using natural language. Employees can upload company documents, ask questions, and receive grounded answers with source citations instead of manually searching through hundreds of pages.

---

## Overview

Businesses accumulate a large amount of internal knowledge in documents such as:

* Policies and procedures
* Technical documentation
* Product manuals
* Research reports
* Meeting notes
* Financial documents
* Standard operating procedures

Finding the right information often requires manually searching through multiple files, which is slow and error-prone.

This project demonstrates how Large Language Models (LLMs) can be combined with semantic search (Retrieval-Augmented Generation) to build an internal AI assistant that answers questions directly from company documents while citing the sources used.

---

## Example Use Cases

* Internal company knowledge assistant
* Engineering documentation search
* Employee onboarding assistant
* Technical manual search
* Research document assistant
* Financial report search
* Policy and compliance assistant

---

# Features

### Secure Authentication

* User registration and login
* JWT-based authentication
* User-specific document access

---

### Document Upload

Upload PDF documents directly into a chat.

Current support:

* PDF

Future support:

* DOCX
* PPTX
* Excel
* HTML
* Markdown

---

### Intelligent Document Processing

After upload, documents are automatically processed through an ingestion pipeline:

* Text extraction
* Chunking
* Metadata generation
* Vector embedding generation
* Storage in PostgreSQL + pgvector

This makes documents searchable using semantic meaning instead of only keywords.

---

### Semantic Search

Instead of matching exact words, the system retrieves information based on meaning.

Example:

User asks:

> "How does chain-of-thought improve reasoning?"

The document might only contain:

> "Intermediate reasoning steps significantly improve performance."

The system can still retrieve the correct section because both sentences have similar semantic meaning.

---

### Retrieval-Augmented Generation (RAG)

Instead of relying only on the language model's memory, the system:

1. Embeds the user's question.
2. Searches the uploaded documents.
3. Retrieves the most relevant chunks.
4. Sends both the question and retrieved context to the LLM.
5. Generates an answer grounded in the retrieved evidence.

This greatly reduces hallucinations and improves factual accuracy.

---

### Source Citations

Every generated answer is accompanied by references to the original document.

(Current implementation is being expanded to include page-level citations.)

---

### Streaming Responses

Answers are streamed token-by-token for a responsive user experience.

---

## System Architecture

```text
                    PDF Upload
                         │
                         ▼
                 Document Parser
                         │
                         ▼
                  Text Chunking
                         │
                         ▼
              Gemini Embedding Model
                         │
                         ▼
             PostgreSQL + pgvector
                         │
                  Semantic Search
                         │
                         ▼
             Retrieved Context Chunks
                         │
                         ▼
                  Gemini Language Model
                         │
                         ▼
          Answer + Source Citations
```

---

## Technology Stack

### Frontend

* React
* Vite
* Axios
* React Markdown

### Backend

* Node.js
* Express.js
* Prisma ORM

### Database

* PostgreSQL
* pgvector

### AI

* Gemini API
* Gemini Embedding Model

---

## Current Retrieval Pipeline

```
User Question

↓

Embedding Generation

↓

Vector Similarity Search

↓

Top-k Relevant Chunks

↓

Prompt Construction

↓

Gemini

↓

Grounded Answer
```

---

## Future Improvements

* Hybrid Search (Keyword + Semantic Search)
* Metadata filtering
* Document collections
* Multi-document citations
* Page number citations
* Reranking models
* Query decomposition
* Agentic retrieval
* OCR support
* DOCX and PPTX parsing
* Evaluation framework
* Enterprise connectors (Google Drive, SharePoint, Notion)

---

## Why This Project Matters

Many organizations already possess valuable internal knowledge, but employees often spend significant time locating relevant information.

This project demonstrates how modern Retrieval-Augmented Generation (RAG) techniques can transform static documents into an interactive knowledge assistant, enabling faster information retrieval while maintaining traceability through source citations.

The architecture is modular, making it suitable as a foundation for industry-specific AI assistants in domains such as engineering, finance, healthcare, legal, and research.

---

## Repository Purpose

This repository is intended as a portfolio project demonstrating the design and implementation of a production-oriented Retrieval-Augmented Generation (RAG) system.

It showcases:

* End-to-end document ingestion
* Semantic search with vector databases
* Retrieval-Augmented Generation
* Modern AI application architecture
* Full-stack web development
* Integration with Large Language Models

The architecture is intentionally designed to be extensible and adaptable to different business domains and document workflows.
