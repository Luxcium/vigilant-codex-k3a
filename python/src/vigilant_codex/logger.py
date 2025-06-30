"""Logging configuration for the application."""

import logging
import sys
from typing import Optional


try:
    from rich.console import Console
    from rich.logging import RichHandler
    _RICH_AVAILABLE = True
except ImportError:
    _RICH_AVAILABLE = False
    Console = None
    RichHandler = None

from vigilant_codex.config import get_settings



def setup_logging(level: Optional[str] = None) -> None:
    """Setup logging configuration with Rich handler, fallback to stdlib if unavailable."""
    settings = get_settings()
    log_level = level or settings.log_level.upper()

    if _RICH_AVAILABLE:
        console = Console(stderr=True)
        handler = RichHandler(console=console, rich_tracebacks=True)
        fmt = "%(message)s"
    else:
        handler = logging.StreamHandler()
        fmt = "[%(asctime)s] %(levelname)s %(name)s: %(message)s"
        logging.warning("Rich is not available, using standard logging handler.")

    logging.basicConfig(
        level=getattr(logging, log_level, logging.INFO),
        format=fmt,
        datefmt="[%X]",
        handlers=[handler],
        force=True,
    )

    # Set third-party loggers to WARNING
    logging.getLogger("urllib3").setLevel(logging.WARNING)
    logging.getLogger("httpx").setLevel(logging.WARNING)
    logging.getLogger("httpcore").setLevel(logging.WARNING)


def get_logger(name: str) -> logging.Logger:
    """Get a logger instance with the given name."""
    logger = logging.getLogger(name)

    # Setup logging if not already configured
    if not logger.handlers:
        setup_logging()

    return logger


# Module-level logger
logger = get_logger(__name__)
