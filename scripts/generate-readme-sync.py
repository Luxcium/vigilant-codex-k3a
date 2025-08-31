#!/usr/bin/env python3
"""
README Synchronization Generator

Automatically generates and updates README files for target directories by scanning
folder contents and creating standardized file indexes and summaries.

Usage:
    python scripts/generate-readme-sync.py [--dry-run] [--target <folder>]

Targets:
    - scripts/README.md
    - memory-bank/instructions/README.md
    - memory-bank/prompts/README.md
    - memory-bank/chatmodes/README.md
"""

import os
import sys
import json
import argparse
from pathlib import Path
from typing import Dict, List, Tuple
from collections import defaultdict

class ReadmeSyncGenerator:
    """Generates synchronized README files for target directories."""
    
    def __init__(self, workspace_root: Path, dry_run: bool = False):
        self.workspace_root = workspace_root
        self.dry_run = dry_run
        self.target_folders = [
            "scripts",
            "memory-bank/instructions", 
            "memory-bank/prompts",
            "memory-bank/chatmodes"
        ]
    
    def scan_directory(self, folder_path: Path) -> Dict:
        """Scan directory and return file metadata."""
        if not folder_path.exists():
            return {"error": f"Directory {folder_path} does not exist"}
        
        files = []
        extensions = defaultdict(int)
        directories = []
        
        for item in folder_path.iterdir():
            if item.is_file():
                ext = item.suffix.lower()
                extensions[ext] += 1
                files.append({
                    "name": item.name,
                    "path": str(item.relative_to(self.workspace_root)),
                    "extension": ext,
                    "size": item.stat().st_size
                })
            elif item.is_dir() and not item.name.startswith('.'):
                directories.append(item.name)
        
        return {
            "total_files": len(files),
            "total_directories": len(directories),
            "files": sorted(files, key=lambda x: x["name"]),
            "directories": sorted(directories),
            "extensions": dict(extensions)
        }
    
    def generate_scripts_section(self, scan_data: Dict) -> str:
        """Generate the scripts section with categorized file listing."""
        total_files = scan_data["total_files"]
        extensions = scan_data["extensions"]
        files = scan_data["files"]
        
        # Count different file types
        sh_files = extensions.get('.sh', 0)
        md_files = extensions.get('.md', 0)
        mjs_files = extensions.get('.mjs', 0)
        dirs = scan_data["total_directories"]
        
        section = f"""## Complete File Index

### **Total Files: {sh_files} scripts + {md_files} README + {mjs_files} JavaScript module + {dirs} archives directory**

**By Extension:**
- `.sh` files: {sh_files} (shell scripts)
- `.md` files: {md_files} (README.md)
- `.mjs` files: {mjs_files} (ES module JavaScript)
- `archives/` directory: {dirs} (archived scripts)

### Per-File Summary

"""
        
        # Categorize shell scripts by function
        categories = {
            "Environment Setup Scripts": [],
            "Python Environment Scripts": [],
            "Docker Lifecycle Scripts": [],
            "TypeScript/SDK Scripts": [],
            "Validation & Quality Scripts": [],
            "Code Generation Scripts": [],
            "Development Tools": [],
            "Utility Scripts": []
        }
        
        # Categorize files based on naming patterns
        for file_data in files:
            if not file_data["name"].endswith('.sh'):
                continue
                
            name = file_data["name"]
            if any(x in name for x in ["setup_", "create-", "init-", "launch_", "activate_"]):
                if "python" in name:
                    categories["Python Environment Scripts"].append(file_data)
                elif any(x in name for x in ["web", "project", "agent", "api", "helper"]):
                    categories["Environment Setup Scripts"].append(file_data)
                else:
                    categories["Utility Scripts"].append(file_data)
            elif any(x in name for x in ["codex_", "docker"]):
                categories["Docker Lifecycle Scripts"].append(file_data)
            elif any(x in name for x in ["ts_sdk", "questrade", "db_prisma"]):
                categories["TypeScript/SDK Scripts"].append(file_data)
            elif any(x in name for x in ["check-", "validate-", "verify-", "local-ci", "commit-guard", "install-hooks"]):
                categories["Validation & Quality Scripts"].append(file_data)
            elif any(x in name for x in ["generate-"]):
                categories["Code Generation Scripts"].append(file_data)
            elif any(x in name for x in ["browser-", "monitor", "autonomous-", "make-scripts"]):
                categories["Development Tools"].append(file_data)
            else:
                categories["Utility Scripts"].append(file_data)
        
        # Generate category sections
        for category, file_list in categories.items():
            if file_list:
                section += f"#### {category} ({len(file_list)} files)\n"
                for file_data in sorted(file_list, key=lambda x: x["name"]):
                    name = file_data["name"]
                    section += f"- `{name}` — TODO: Add description\n"
                section += "\n"
        
        return section
    
    def generate_instructions_section(self, scan_data: Dict) -> str:
        """Generate the instructions section."""
        total_files = scan_data["total_files"]
        
        return f"""## Complete File Index

### **Total Files: {total_files} instruction files (.md)**

**By Extension:**
- `.md` files: {total_files} (instruction files)

All files follow the `.instructions.md` naming convention and provide automatic coding standards.

## Available Instructions ({total_files} Files)

[Existing categorized content would be preserved and updated]
"""
    
    def generate_prompts_section(self, scan_data: Dict) -> str:
        """Generate the prompts section."""
        total_files = scan_data["total_files"] 
        prompt_files = total_files - 1  # Subtract README
        
        return f"""## Complete File Index

### **Total Files: {total_files} prompt files (.md)**

**By Extension:**
- `.md` files: {total_files} (prompt files including README.md)
- `.prompt.md` files: {prompt_files} (executable prompt files)

All prompt files follow the `.prompt.md` naming convention and provide executable workflows.

## Available Prompts ({prompt_files} Files)

[Existing categorized content would be preserved and updated]
"""
    
    def generate_chatmodes_section(self, scan_data: Dict) -> str:
        """Generate the chatmodes section."""
        total_files = scan_data["total_files"]
        total_dirs = scan_data["total_directories"]
        chatmode_files = len([f for f in scan_data["files"] if f["name"].endswith('.chatmode.md')])
        
        return f"""## Complete File Index

### **Total Files: {total_files} total files ({chatmode_files} chatmodes + 1 README + {total_dirs} directory)**

**By Extension:**
- `.chatmode.md` files: {chatmode_files} (specialized interaction modes)
- `.md` files: 1 (README.md)
- Directories: {total_dirs} (planification-agent/)

**File Structure:**
- {chatmode_files} active chatmode files
- 1 README.md file  
- {total_dirs} planification-agent/ directory with planning documents

## Available Chatmodes ({chatmode_files} Files)

[Existing categorized content would be preserved and updated]
"""
    
    def run(self, target_folder: str = None):
        """Execute README synchronization."""
        targets = [target_folder] if target_folder else self.target_folders
        
        for folder in targets:
            folder_path = self.workspace_root / folder
            print(f"Processing {folder}...")
            
            # Scan directory
            scan_data = self.scan_directory(folder_path)
            if "error" in scan_data:
                print(f"Error: {scan_data['error']}")
                continue
            
            # Generate appropriate section based on folder
            if folder == "scripts":
                new_section = self.generate_scripts_section(scan_data)
            elif folder == "memory-bank/instructions":
                new_section = self.generate_instructions_section(scan_data)
            elif folder == "memory-bank/prompts":
                new_section = self.generate_prompts_section(scan_data)
            elif folder == "memory-bank/chatmodes":
                new_section = self.generate_chatmodes_section(scan_data)
            else:
                continue
            
            print(f"Generated section for {folder}:")
            print(f"- Total files: {scan_data['total_files']}")
            print(f"- Extensions: {scan_data['extensions']}")
            print(f"- Directories: {scan_data['total_directories']}")
            
            if self.dry_run:
                print(f"[DRY RUN] Would update {folder}/README.md")
                print("Generated section preview:")
                print(new_section[:500] + "..." if len(new_section) > 500 else new_section)
            else:
                # Here would be the actual README update logic
                print(f"[IMPLEMENTATION NEEDED] Update {folder}/README.md")


def main():
    parser = argparse.ArgumentParser(description="Generate synchronized README files")
    parser.add_argument("--dry-run", action="store_true", help="Show what would be generated without making changes")
    parser.add_argument("--target", help="Specific target folder to process")
    parser.add_argument("--workspace", default=".", help="Workspace root directory")
    
    args = parser.parse_args()
    
    workspace_root = Path(args.workspace).resolve()
    if not workspace_root.exists():
        print(f"Error: Workspace directory {workspace_root} does not exist")
        sys.exit(1)
    
    generator = ReadmeSyncGenerator(workspace_root, dry_run=args.dry_run)
    generator.run(target_folder=args.target)


if __name__ == "__main__":
    main()