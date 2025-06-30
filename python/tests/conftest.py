"""Test configuration and fixtures."""

import pytest

from vigilant_codex.config import Settings


@pytest.fixture
def test_settings() -> Settings:
    """Create test settings."""
    return Settings(
        debug=True,
        environment="test",
        database_url="sqlite:///:memory:",
        secret_key="test-secret-key",
        jwt_secret_key="test-jwt-secret",
    )
