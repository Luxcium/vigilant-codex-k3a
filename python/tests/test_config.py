"""Test configuration module."""

from vigilant_codex.config import Settings, get_settings


def test_settings_creation():
    """Test settings can be created."""
    settings = Settings()
    assert settings.environment == "development"
    assert settings.api_port == 8000


def test_get_settings():
    """Test get_settings function."""
    settings = get_settings()
    assert isinstance(settings, Settings)


def test_settings_validation():
    """Test settings validation."""
    settings = Settings(
        api_port=8080,
        debug=True,
        environment="test"
    )
    assert settings.api_port == 8080
    assert settings.debug is True
    assert settings.environment == "test"
