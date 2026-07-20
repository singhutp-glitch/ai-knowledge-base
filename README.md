# Internal AI Knowledge Base

An AI-powered internal knowledge base that helps organizations search, ask questions, and retrieve information from their company documents using natural language. Users can upload documents, receive grounded AI answers with citations, and verify every response through an integrated source panel.

## Overview

Most businesses store important information across reports, SOPs, contracts, technical documentation, research, policies, manuals, and other internal documents. As these documents grow over time, employees often spend time searching through folders or asking coworkers for information that already exists.

This project demonstrates how Retrieval-Augmented Generation (RAG) can turn business documents into an AI knowledge assistant that answers questions using retrieved document content instead of relying only on a language model's general knowledge.

The goal is simple: every answer should be grounded in your documents and easy to verify.

Instead of asking users to trust the model, every response can be traced back to the supporting document content.

## Typical Business Documents

This project is designed for knowledge commonly found inside businesses, including:

- Standard Operating Procedures (SOPs)
- Internal policies and manuals
- Research reports and market analysis
- Client reports and project deliverables
- Technical documentation
- Contracts and compliance documents
- Financial reports
- PDF, DOCX, Markdown, and other business documents

## Example Use Cases

- Internal AI knowledge assistant
- Company document search
- Employee onboarding assistant
- Engineering documentation search
- Research document assistant
- Technical manual search
- Financial report search
- Policy and compliance assistant

# Current Features

## Secure Authentication

- User registration and login
- JWT-based authentication
- User-specific chat history

## Persistent AI Conversations

- Create multiple conversations
- Conversation history stored in PostgreSQL
- Resume previous chats at any time

## Document Upload

Upload company documents directly into a conversation.

Supported formats:

- PDF
- DOCX
- TXT

After upload, each document is automatically processed and indexed for semantic retrieval.

## Document Processing

Each uploaded document goes through the following pipeline:

- Text extraction
- Intelligent text chunking
- Embedding generation
- Vector storage using PostgreSQL + pgvector

This allows documents to be searched by semantic meaning rather than exact keywords.

## Retrieval-Augmented Generation (RAG)

Instead of relying only on the language model's general knowledge, the system:

1. Embeds the user's question
2. Searches uploaded documents
3. Retrieves the most relevant document chunks
4. Sends the retrieved context to the language model
5. Streams a grounded response back to the user

## Semantic Search

Questions are answered using vector similarity search, allowing relevant information to be retrieved even when the wording differs from the original document.

## Streaming Responses

Responses are streamed token-by-token to provide a fast and responsive chat experience.

The interface also displays retrieval progress while answers are being generated.

## Source Verification

Every AI response includes inline citations.

Selecting a citation opens a source panel showing:

- Source document
- Retrieved document chunk
- Supporting document content

This allows users to verify the information used to generate each answer.

## Adjustable Source Panel

The source panel is integrated directly into the workspace and can be resized so document evidence and AI responses can be viewed side by side.

## Search Scope

The interface is designed to support multiple knowledge scopes.

Current:

- Chat Documents

Planned:

- User Documents
- Organization Knowledge

## Planned Improvements

- User document library
- Organization knowledge library
- Page-level document citations
- Hybrid keyword + semantic retrieval
- Metadata filtering

# System Architecture

```text
                     User Question
                           │
                           ▼
                    Search Scope
                           │
                           ▼
                  Semantic Retrieval
                           │
                           ▼
                Retrieved Document Chunks
                           │
                           ▼
                Gemini Language Model
                           │
                           ▼
           Grounded AI Response + Citations
                           │
                           ▼
               Interactive Source Panel
```

## Technology Stack

### Frontend

- React
- Vite
- Axios
- React Markdown
- Remark GFM
- Rehype Raw

### Backend

- Node.js
- Express.js
- Prisma ORM
- JWT Authentication

### Database

- PostgreSQL
- pgvector

### AI

- Gemini API
- Gemini Embedding Model

## Retrieval Pipeline

```text
Document Upload
        │
        ▼
Document Parsing
        │
        ▼
Text Chunking
        │
        ▼
Embedding Generation
        │
        ▼
Vector Database
        │
        ▼
Semantic Search
        │
        ▼
Retrieved Context
        │
        ▼
Gemini
        │
        ▼
Grounded Answer
        │
        ▼
Inline Citations
        │
        ▼
Source Verification Panel
```

# Why This Project Matters

Businesses need AI systems that answer questions from their own documents rather than relying only on a language model's general knowledge.

This project demonstrates how Retrieval-Augmented Generation (RAG), semantic search, and source citations can help teams quickly find information while keeping every answer grounded in company documents and easy to verify.

The goal is not only to generate answers, but also to give users confidence in those answers by making the supporting document content easy to inspect.

## Repository Purpose

This repository demonstrates the design and implementation of a modern AI knowledge base for internal company documents.

It showcases:

- Full-stack web application development
- Retrieval-Augmented Generation (RAG)
- Semantic search with vector databases
- Document ingestion pipelines
- Streaming LLM responses
- Source-grounded AI answers
- Interactive citation verification
- Modern React and Node.js architecture