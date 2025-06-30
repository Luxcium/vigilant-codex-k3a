"""Vigilant Codex Python Package.

A modern Python package for data science, machine learning, and API development.
"""

__version__ = "0.1.0"
__author__ = "Vigilant Codex Team"
__email__ = "team@vigilantcodex.dev"

from vigilant_codex.config import get_settings
from vigilant_codex.logger import get_logger

__all__ = ["get_settings", "get_logger", "__version__"]
