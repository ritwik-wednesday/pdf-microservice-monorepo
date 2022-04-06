# PDF microservice monorepo

## Introduction

The PDF Microservice Monorepo is an example of working implementation of calling microservices via service dicovery.

## What is service discovery?

Service discovery makes it easy for your containerized services to discover and connect with each other.
Amazon ECS creates and manages a registry of service names using the Route 53 Auto Naming API. Names are automatically mapped to a set of DNS records so that you can refer to a service by name in your code and write DNS queries to have the name resolve to the service’s endpoint at runtime.

## Project structure

We have 2 packages inside the project:

- PDF microservice: `packages/pdf-microservice`
- test api: `packages/test-api`

```
.
├── packages/
|   ├── pdf-microservic/ <-- The PDF microservice
|   ├── test-api/ <-- test api

```
