# Internal AI Knowledge Base

An AI-powered internal knowledge base that enables organizations to search, ask questions, and retrieve information from their company documents using natural language. Users can upload documents, receive grounded AI answers with inline citations, and verify every response through an integrated source panel.

---

## Overview

Businesses accumulate valuable knowledge across technical documentation, research reports, policies, manuals, contracts, financial reports, SOPs, and other internal documents. As this knowledge grows, employees often spend time searching through folders or asking coworkers for information that is already documented.

This project demonstrates how Retrieval-Augmented Generation (RAG) can transform static business documents into an interactive AI knowledge assistant capable of answering questions while remaining grounded in retrieved document content.

The application focuses on one core principle:

> **Every answer should be grounded in company documents and easy to verify.**

Instead of asking users to blindly trust the model, every response can be traced back to the supporting document content.

---

## Typical Business Documents

This project is designed for knowledge commonly found inside businesses, including:

* Standard Operating Procedures (SOPs)
* Internal policies and manuals
* Research reports and market analysis
* Client reports and project deliverables
* Technical documentation
* Contracts and compliance documents
* Financial reports
* PDF, DOCX, Markdown, and other business documents

---

## Example Use Cases

* Internal AI knowledge assistant
* Company document search
* Employee onboarding assistant
* Engineering documentation search
* Research document assistant
* Technical manual search
* Financial report search
* Policy and compliance assistant

---

# Current Features

## Secure Authentication

* User registration and login
* JWT-based authentication
* User-specific chat history

---

## Persistent AI Conversations

* Create multiple conversations
* Conversation history stored in PostgreSQL
* Resume previous chats at any time

---

## Document Upload

Upload company documents directly into a conversation.

Current support:

* PDF
* DOCX
* TXT

After upload, each document is automatically processed and indexed for semantic retrieval.

---

## Document Processing

Every uploaded document passes through a document processing pipeline:

* PDF text extraction
* Intelligent text chunking
* Embedding generation
* Vector storage using PostgreSQL + pgvector

This allows documents to be searched by semantic meaning rather than exact keywords.

---

## Retrieval-Augmented Generation (RAG)

Instead of relying only on the language model's general knowledge, the system:

1. Embeds the user's question
2. Searches the uploaded documents
3. Retrieves the most relevant document chunks
4. Sends the retrieved document content to the LLM
5. Streams a grounded response back to the user

---

## Semantic Search

Questions are answered using vector similarity search, allowing the assistant to retrieve relevant information even when the wording differs from the original document.

---

## Streaming Responses

Responses are streamed token-by-token, providing a fast and responsive chat experience.

The interface also displays retrieval progress during answer generation.

---

## Source Verification

Every AI response includes inline citations.

Clicking a citation opens a dedicated source panel showing:

* Source document
* Retrieved document chunk
* Supporting document content used by the model

This enables users to immediately verify the information behind every generated response.

---

## Adjustable Source Panel

The source panel is integrated directly into the workspace and can be resized by the user, allowing document evidence and AI responses to be viewed side by side.

---

## Search Scope

The interface is designed to support multiple knowledge scopes.

Current implementation:

* Chat Documents

UI prepared for:

* User Documents
* Organization Knowledge

---

# Planned Improvements

The following improvements are currently planned for this project:

* User document library
* Organization knowledge library
* Page-level document citations
* Hybrid keyword + semantic retrieval
* Metadata filtering

---

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

---

# Technology Stack

## Frontend

* React
* Vite
* Axios
* React Markdown
* Remark GFM
* Rehype Raw

---

## Backend

* Node.js
* Express.js
* Prisma ORM
* JWT Authentication

---

## Database

* PostgreSQL
* pgvector

---

## AI

* Gemini API
* Gemini Embedding Model

---

# Retrieval Pipeline

```text
PDF Upload

↓

Document Parsing

↓

Text Chunking

↓

Embedding Generation

↓

Vector Database

↓

Semantic Search

↓

Retrieved Context

↓

Gemini

↓

Grounded Answer

↓

Inline Citations

↓

Source Verification Panel
```

---

# Why This Project Matters

Businesses need AI systems that answer questions from their own documents rather than relying only on a language model's general knowledge.

This project demonstrates how Retrieval-Augmented Generation (RAG), semantic search, and source citations can help teams quickly find information while keeping every answer grounded in company documents and easy to verify.

The focus is not only on generating answers, but on giving users confidence in those answers through an integrated evidence verification workflow.

---

# Repository Purpose

This repository demonstrates the design and implementation of a modern AI knowledge base for internal company documents.

It showcases:

* Full-stack web application development
* Retrieval-Augmented Generation (RAG)
* Semantic search with vector databases
* Document ingestion pipelines
* Streaming LLM responses
* Source-grounded AI answers
* Interactive citation verification
* Modern React and Node.js architecture
