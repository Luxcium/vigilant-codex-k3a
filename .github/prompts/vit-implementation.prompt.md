---
mode: 'agent'
tools: ['codebase', 'terminalLastCommand']
description: 'Generate a Vision Transformer (ViT) implementation with detailed documentation'
---
# Vision Transformer (ViT) Implementation

Your task is to help me create a complete Vision Transformer (ViT) implementation following our project's coding standards and documentation requirements.

## Requirements

1. Create a modular, well-documented implementation of a Vision Transformer model
2. Follow all TypeScript coding standards from [typescript-standards.instructions.md](../instructions/typescript-standards.instructions.md)
3. Implement the architecture as described in the paper "An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale"

## Implementation Details

### Model Architecture
- Create a configurable ViT implementation with the following parameters:
  - Image size (default: 224x224)
  - Patch size (default: 16x16)
  - Number of channels (default: 3)
  - Hidden dimension (default: 768)
  - MLP dimension (default: 3072)
  - Number of heads (default: 12)
  - Number of layers (default: 12)
  - Number of classes (default: 1000)

### Code Structure
- Implement the model in a modular way with separate files for:
  - Main ViT class
  - Transformer encoder
  - Multi-head self-attention
  - MLP block
  - Patch embedding
  - Position embedding
  - Classification head

### Documentation
- Include a comprehensive model card
- Document preprocessing steps
- Include inference examples
- Document all hyperparameters
- Provide usage examples
- Include performance benchmarks

## Output Format
- Provide well-structured TypeScript code
- Adhere to the project's organization principles
- Include detailed comments and documentation
- Ensure the implementation is modular and extensible
- Include test cases to validate functionality

## References
- Include proper attribution to the original paper
- Reference any third-party code or inspirations
- Document any deviations from the original architecture

Help me implement this Vision Transformer that follows all the project's standards and best practices. Please start by creating the directory structure and main class interfaces.
