# Clover Health Platform

Healthcare technology solutions for Clover Health - a Medicare Advantage insurance company.

## Products

### 1. Clover Claims Processing System
Comprehensive claims adjudication platform replacing HealthEdge HRP system.

**Core Features:**
- Claims Intake & Validation (EDI 837i/837p)
- Member Matching & Eligibility
- Provider Network Management
- Fee-for-Service Claims Pricing
- Claims Adjudication Engine
- Real-Time Analytics Dashboard
- Prior Authorization Processing
- CMS Reporting & Compliance

### 2. Payment Integrity Platform
AI-powered prepay fraud detection to reduce Cotiviti dependency.

**Core Features:**
- Claims Ingestion from HealthEdge
- LLM-Based Initial Assessment
- ML Pattern Detection
- Training Data Integration
- Flagging & Output System
- Provider Communication Staging

### 3. Claims Edit Engine
Rules-based claims validation (post-HealthEdge, pre-Cotiviti).

**Phase 1 - Deterministic Rules:**
- Claims Ingestion Engine (SFTP, <20s response)
- Rule Maintenance Web UI
- Rules Processing Engine

**Phase 2 - LLM Evaluation:**
- Custom prompts for pattern analysis (<2min/claim)

## Tech Stack

- **Frontend:** React + TypeScript + Vite
- **Backend:** Node.js + Express
- **Database:** PostgreSQL

## Getting Started

```bash
# Install dependencies
cd frontend && npm install
cd ../backend && npm install

# Run development servers
npm run dev
```
