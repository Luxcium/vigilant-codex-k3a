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
import re
from pathlib import Path
from typing import Dict, List, Tuple, Optional
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
    
    def read_existing_readme(self, readme_path: Path) -> Optional[str]:
        """Read existing README content if it exists."""
        if readme_path.exists():
            try:
                return readme_path.read_text(encoding='utf-8')
            except OSError as e:
                print(f"Warning: Could not read {readme_path}: {e}")
                raise
        return None
    
    def extract_preserved_sections(self, content: str, folder_type: str) -> Dict[str, str]:
        """Extract sections that should be preserved from existing content."""
        if not content:
            return {}
        
        preserved = {}
        
        # Extract content before "## Complete File Index" section
        pre_index_match = re.search(r'^(.*?)(?=## Complete File Index)', content, re.DOTALL | re.MULTILINE)
        if pre_index_match:
            preserved['header'] = pre_index_match.group(1).rstrip()
        
        # Extract existing categorized content based on folder type
        if folder_type == "instructions":
            # Extract content after "## Available Instructions" but preserve structure
            match = re.search(r'(## Available Instructions.*?)(?=\n## |$)', content, re.DOTALL)
            if match:
                preserved['categorized_content'] = match.group(1)
        elif folder_type == "prompts":
            # Extract content after "## Available Prompts" but preserve structure  
            match = re.search(r'(## Available Prompts.*?)(?=\n## |$)', content, re.DOTALL)
            if match:
                preserved['categorized_content'] = match.group(1)
        elif folder_type == "chatmodes":
            # Extract content after "## Available Chatmodes" but preserve structure
            match = re.search(r'(## Available Chatmodes.*?)(?=\n## |$)', content, re.DOTALL)
            if match:
                preserved['categorized_content'] = match.group(1)
        elif folder_type == "scripts":
            # Extract categorized script content
            match = re.search(r'(#### .*?)(?=\n## |$)', content, re.DOTALL)
            if match:
                preserved['categorized_content'] = match.group(1)
        
        return preserved
    
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
    
    def pluralize(self, count: int, singular: str, plural: str = None) -> str:
        """Return properly pluralized string based on count."""
        if count == 1:
            return f"{count} {singular}"
        else:
            plural_form = plural or f"{singular}s"
            return f"{count} {plural_form}"
    
    def generate_scripts_section(self, scan_data: Dict, preserved_content: Dict[str, str] = None) -> str:
        """Generate the scripts section with categorized file listing."""
        total_files = scan_data["total_files"]
        extensions = scan_data["extensions"]
        files = scan_data["files"]
        preserved_content = preserved_content or {}
        
        # Count different file types
        sh_files = extensions.get('.sh', 0)
        md_files = extensions.get('.md', 0)
        mjs_files = extensions.get('.mjs', 0)
        dirs = scan_data["total_directories"]
        
        # Generate pluralized descriptions
        sh_desc = self.pluralize(sh_files, "script")
        md_desc = self.pluralize(md_files, "README")
        mjs_desc = self.pluralize(mjs_files, "JavaScript module")
        dirs_desc = self.pluralize(dirs, "archives directory", "archives directories")
        
        # Get preserved header content
        header_section = preserved_content.get('header', '')
        if header_section:
            header_section += "\n\n"
        
        file_index_section = f"""## Complete File Index

### **Total Files: {sh_desc} + {md_desc} + {mjs_desc} + {dirs_desc}**

**By Extension:**
- `.sh` files: {sh_files} (shell scripts)
- `.md` files: {md_files} (README.md)
- `.mjs` files: {mjs_files} (ES module JavaScript)
- `archives/` directory: {dirs} (archived scripts)

### Per-File Summary

"""
        
        # Use preserved categorized content if available, otherwise generate basic structure
        if preserved_content.get('categorized_content'):
            categorized_section = preserved_content['categorized_content']
        else:
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
            categorized_section = ""
            for category, file_list in categories.items():
                if file_list:
                    categorized_section += f"#### {category} ({len(file_list)} files)\n"
                    for file_data in sorted(file_list, key=lambda x: x["name"]):
                        name = file_data["name"]
                        categorized_section += f"- `{name}` — TODO: Add description\n"
                    categorized_section += "\n"
        
        return header_section + file_index_section + categorized_section
    
    def generate_instructions_section(self, scan_data: Dict, preserved_content: Dict[str, str] = None) -> str:
        """Generate the instructions section."""
        total_files = scan_data["total_files"]
        preserved_content = preserved_content or {}
        
        header_section = preserved_content.get('header', '')
        if header_section:
            header_section += "\n\n"
        
        file_index_section = f"""## Complete File Index

### **Total Files: {self.pluralize(total_files, "instruction file")} (.md)**

**By Extension:**
- `.md` files: {total_files} (instruction files)

All files follow the `.instructions.md` naming convention and provide automatic coding standards.

"""
        
        # Use preserved categorized content if available, otherwise provide basic structure
        categorized_section = preserved_content.get('categorized_content', f"""## Available Instructions ({total_files} Files)

### AI Agent Workflow & Creation
[Content will be preserved from existing README]

### AI Agent Framework & Workflow  
[Content will be preserved from existing README]

### Environment Standards
[Content will be preserved from existing README]

### Language Standards
[Content will be preserved from existing README]

### Web Meta-Configuration
[Content will be preserved from existing README]
""")
        
        return header_section + file_index_section + categorized_section
    
    def generate_prompts_section(self, scan_data: Dict, preserved_content: Dict[str, str] = None) -> str:
        """Generate the prompts section."""
        total_files = scan_data["total_files"] 
        prompt_files = total_files - 1  # Subtract README
        preserved_content = preserved_content or {}
        
        header_section = preserved_content.get('header', '')
        if header_section:
            header_section += "\n\n"
        
        file_index_section = f"""## Complete File Index

### **Total Files: {self.pluralize(total_files, "prompt file")} (.md)**

**By Extension:**
- `.md` files: {total_files} (prompt files including README.md)
- `.prompt.md` files: {prompt_files} (executable prompt files)

All prompt files follow the `.prompt.md` naming convention and provide executable workflows.

"""
        
        # Use preserved categorized content if available
        categorized_section = preserved_content.get('categorized_content', f"""## Available Prompts ({prompt_files} Files)

### Template Management & AI Framework
[Content will be preserved from existing README]

### System Automation & Management
[Content will be preserved from existing README]

### Development Workflows
[Content will be preserved from existing README]

### Validation & Quality Assurance
[Content will be preserved from existing README]
""")
        
        return header_section + file_index_section + categorized_section
    
    def generate_chatmodes_section(self, scan_data: Dict, preserved_content: Dict[str, str] = None) -> str:
        """Generate the chatmodes section."""
        total_files = scan_data["total_files"]
        total_dirs = scan_data["total_directories"]
        chatmode_files = len([f for f in scan_data["files"] if f["name"].endswith('.chatmode.md')])
        preserved_content = preserved_content or {}
        
        header_section = preserved_content.get('header', '')
        if header_section:
            header_section += "\n\n"
        
        file_index_section = f"""## Complete File Index

### **Total Files: {total_files} total files ({self.pluralize(chatmode_files, "chatmode")} + 1 README + {self.pluralize(total_dirs, "directory", "directories")})**

**By Extension:**
- `.chatmode.md` files: {chatmode_files} (specialized interaction modes)
- `.md` files: 1 (README.md)
- Directories: {total_dirs} (planification-agent/)

**File Structure:**
- {chatmode_files} active chatmode files
- 1 README.md file  
- {total_dirs} planification-agent/ directory with planning documents

"""
        
        # Use preserved categorized content if available
        categorized_section = preserved_content.get('categorized_content', f"""## Available Chatmodes ({chatmode_files} Files)

### Development Expertise
[Content will be preserved from existing README]

### Framework & Technology Specialists
[Content will be preserved from existing README]

### Data Science & Notebooks
[Content will be preserved from existing README]

### Planning & Organization
[Content will be preserved from existing README]
""")
        
        return header_section + file_index_section + categorized_section
    
    def run(self, target_folder: str = None):
        """Execute README synchronization."""
        targets = [target_folder] if target_folder else self.target_folders
        
        for folder in targets:
            folder_path = self.workspace_root / folder
            readme_path = folder_path / "README.md"
            print(f"Processing {folder}...")
            
            # Scan directory
            scan_data = self.scan_directory(folder_path)
            if "error" in scan_data:
                print(f"Error: {scan_data['error']}")
                continue
            
            # Read existing README and extract preserved content
            existing_content = self.read_existing_readme(readme_path)
            folder_type = folder.split('/')[-1]  # Extract folder name (scripts, instructions, etc.)
            preserved_content = self.extract_preserved_sections(existing_content, folder_type)
            
            # Generate appropriate section based on folder
            if folder == "scripts":
                new_content = self.generate_scripts_section(scan_data, preserved_content)
            elif folder == "memory-bank/instructions":
                new_content = self.generate_instructions_section(scan_data, preserved_content)
            elif folder == "memory-bank/prompts":
                new_content = self.generate_prompts_section(scan_data, preserved_content)
            elif folder == "memory-bank/chatmodes":
                new_content = self.generate_chatmodes_section(scan_data, preserved_content)
            else:
                continue
            
            print(f"Generated section for {folder}:")
            print(f"- Total files: {scan_data['total_files']}")
            print(f"- Extensions: {scan_data['extensions']}")
            print(f"- Directories: {scan_data['total_directories']}")
            print(f"- Preserved content sections: {list(preserved_content.keys())}")
            
            if self.dry_run:
                print(f"[DRY RUN] Would update {folder}/README.md")
                print("Generated content preview:")
                print(new_content[:500] + "..." if len(new_content) > 500 else new_content)
            else:
                # Write the new content to the README file
                try:
                    readme_path.write_text(new_content, encoding='utf-8')
                    print(f"✅ Updated {folder}/README.md")
                except Exception as e:
                    print(f"❌ Error updating {folder}/README.md: {e}")
                    continue


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