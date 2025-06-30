"""FastAPI application main module."""

from contextlib import asynccontextmanager
from typing import AsyncGenerator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from vigilant_codex import __version__
from vigilant_codex.config import get_settings
from vigilant_codex.logger import get_logger

logger = get_logger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Lifespan context manager for FastAPI app."""
    settings = get_settings()
    logger.info("Starting Vigilant Codex API")
    logger.info(f"Version: {__version__}")
    logger.info(f"Environment: {settings.environment}")

    # Startup logic here
    yield

    # Shutdown logic here
    logger.info("Shutting down Vigilant Codex API")


def create_app() -> FastAPI:
    """Create and configure FastAPI application."""
    settings = get_settings()

    app = FastAPI(
        title="Vigilant Codex API",
        description="A modern Python API for data science and machine learning",
        version=__version__,
        docs_url="/docs",
        redoc_url="/redoc",
        openapi_url="/openapi.json",
        lifespan=lifespan,
    )

    # Add CORS middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=settings.cors_allow_credentials,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    return app


app = create_app()


@app.get("/")
async def root() -> JSONResponse:
    """Root endpoint."""
    return JSONResponse(
        content={
            "message": "Welcome to Vigilant Codex API",
            "version": __version__,
            "docs": "/docs",
        }
    )


@app.get("/health")
async def health_check() -> JSONResponse:
    """Health check endpoint."""
    return JSONResponse(content={"status": "healthy", "version": __version__})


@app.get("/version")
async def version() -> JSONResponse:
    """Version endpoint."""
    return JSONResponse(content={"version": __version__})
