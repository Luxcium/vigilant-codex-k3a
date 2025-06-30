"""Command-line interface for Vigilant Codex."""

import typer
from rich.console import Console

from vigilant_codex import __version__
from vigilant_codex.config import get_settings
from vigilant_codex.logger import get_logger

app = typer.Typer(help="Vigilant Codex Python CLI")
console = Console()
logger = get_logger(__name__)


@app.command()
def version() -> None:
    """Show version information."""
    console.print(f"Vigilant Codex v{__version__}")


@app.command()
def config() -> None:
    """Show current configuration."""
    settings = get_settings()
    console.print("[bold]Current Configuration:[/bold]")
    console.print(f"Environment: {settings.environment}")
    console.print(f"Debug: {settings.debug}")
    console.print(f"Log Level: {settings.log_level}")
    console.print(f"API Host: {settings.api_host}")
    console.print(f"API Port: {settings.api_port}")


@app.command()
def serve(
    host: str = typer.Option("0.0.0.0", help="Host to bind to"),
    port: int = typer.Option(8000, help="Port to bind to"),
    reload: bool = typer.Option(True, help="Enable auto-reload"),
) -> None:
    """Start the FastAPI server."""
    import uvicorn

    logger.info(f"Starting server on {host}:{port}")
    uvicorn.run(
        "vigilant_codex.api.main:app",
        host=host,
        port=port,
        reload=reload,
        log_level="info",
    )


@app.command()
def jupyter(
    port: int = typer.Option(8888, help="Port for Jupyter Lab"),
    host: str = typer.Option("0.0.0.0", help="Host for Jupyter Lab"),
    token: str = typer.Option("vigilant-codex", help="Jupyter Lab token"),
) -> None:
    """Start Jupyter Lab."""
    import subprocess
    import sys

    cmd = [
        sys.executable,
        "-m",
        "jupyter",
        "lab",
        f"--ip={host}",
        f"--port={port}",
        f"--NotebookApp.token={token}",
        "--no-browser",
        "--allow-root",
    ]

    logger.info(f"Starting Jupyter Lab on {host}:{port}")
    console.print(f"[green]Access Jupyter Lab at:[/green] http://{host}:{port}")
    console.print(f"[yellow]Token:[/yellow] {token}")

    subprocess.run(cmd)


def main() -> None:
    """Main entry point for the CLI."""
    app()


if __name__ == "__main__":
    main()
