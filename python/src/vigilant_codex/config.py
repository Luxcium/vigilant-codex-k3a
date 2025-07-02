"""Configuration management using Pydantic Settings."""

import os
from typing import List, Optional

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # Application settings
    debug: bool = Field(default=False, description="Debug mode")
    environment: str = Field(default="development", description="Environment name")
    log_level: str = Field(default="info", description="Logging level")

    # API settings
    api_host: str = Field(default="0.0.0.0", description="API host")
    api_port: int = Field(default=8000, description="API port")
    api_workers: int = Field(default=1, description="API workers")
    api_reload: bool = Field(default=True, description="API auto-reload")

    # Database settings
    database_url: str = Field(
        default="postgresql://postgres:postgres@localhost:5432/vigilant_codex",
        description="Database URL",
    )
    database_pool_size: int = Field(default=5, description="Database pool size")
    database_max_overflow: int = Field(
        default=10, description="Database max overflow"
    )

    # Redis settings
    redis_url: str = Field(
        default="redis://localhost:6379/0", description="Redis URL"
    )

    # Security settings
    secret_key: str = Field(
        default="your-secret-key-here-change-in-production",
        description="Secret key for encryption",
    )
    jwt_secret_key: str = Field(
        default="your-jwt-secret-here", description="JWT secret key"
    )
    jwt_algorithm: str = Field(default="HS256", description="JWT algorithm")
    jwt_expiration_hours: int = Field(
        default=24, description="JWT expiration in hours"
    )

    # External API settings
    openai_api_key: Optional[str] = Field(
        default=None, description="OpenAI API key"
    )
    anthropic_api_key: Optional[str] = Field(
        default=None, description="Anthropic API key"
    )
    huggingface_api_key: Optional[str] = Field(
        default=None, description="HuggingFace API key"
    )

    # Jupyter settings
    jupyter_port: int = Field(default=8888, description="Jupyter Lab port")
    jupyter_token: str = Field(
        default="vigilant-codex-dev", description="Jupyter Lab token"
    )

    # Path settings
    data_dir: str = Field(default="/app/data", description="Data directory")
    models_dir: str = Field(default="/app/models", description="Models directory")
    logs_dir: str = Field(default="/app/logs", description="Logs directory")
    upload_dir: str = Field(default="/app/uploads", description="Upload directory")

    # ML Model settings
    model_cache_dir: str = Field(
        default="/app/cache/models", description="Model cache directory"
    )
    default_model_name: str = Field(
        default="gpt-3.5-turbo", description="Default model name"
    )
    max_tokens: int = Field(default=2048, description="Max tokens for generation")
    temperature: float = Field(default=0.7, description="Temperature for generation")

    # CORS settings
    cors_origins: List[str] = Field(
        default=["http://localhost:3000", "http://localhost:8080"],
        description="CORS allowed origins",
    )
    cors_allow_credentials: bool = Field(
        default=True, description="CORS allow credentials"
    )

    # File upload settings
    max_file_size: int = Field(default=10485760, description="Max file size in bytes")
    allowed_file_types: List[str] = Field(
        default=["csv", "json", "txt", "pdf"], description="Allowed file types"
    )

    # Rate limiting
    rate_limit_requests: int = Field(
        default=100, description="Rate limit requests per window"
    )
    rate_limit_window: int = Field(
        default=3600, description="Rate limit window in seconds"
    )

    def create_directories(self) -> None:
        """Create necessary directories if they don't exist."""
        directories = [
            self.data_dir,
            self.models_dir,
            self.logs_dir,
            self.upload_dir,
            self.model_cache_dir,
        ]
        for directory in directories:
            os.makedirs(directory, exist_ok=True)


# Global settings instance
_settings: Optional[Settings] = None


def get_settings() -> Settings:
    """Get application settings singleton."""
    global _settings
    if _settings is None:
        _settings = Settings()
        _settings.create_directories()
    return _settings
