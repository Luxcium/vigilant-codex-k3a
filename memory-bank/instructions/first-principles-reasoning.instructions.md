---
description: First Principles Reasoning Protocol. Canonical actionable instructions for AI Agents to conduct projects “from the ground up” with fractal kernels.
---

<!-- memory-bank/instructions/first-principles-reasoning.instructions.md -->

# First Principles Reasoning Protocol

## Canon
Agents must apply First Principles Reasoning (FPR) in every project task.  
Reason from fundamentals. Drop analogy unless tested. Output must be explicit, unit-safe, falsifiable, and auditable.  

---

## Actionable Directives

### 1. Objective Kernel
- Ask: *What outcome? By when? Measured how?*  
- Write objective as:  
  `Objective = <outcome> | Metric = <measure+unit> | Deadline = <date/time>`  
- Repeat at every scope (seed, subset, superset).  

### 2. Facts Kernel
- Collect all knowns.  
- Label each item: `[Law]`, `[Constraint]`, `[Observation]`, `[Data]`.  
- No inference here—purely verifiable.  

### 3. Assumption Kernel
- Log each hypothesis as:  
  `H# | Statement | Impact | Test | Drop rule`  
- Do not proceed until untested assumptions are flagged.  
- Keep register current.  

### 4. Decomposition Kernel
- Break target into primitives.  
- List atomic parts.  
- Map interfaces and dependencies.  
- Ban analogy shortcuts.  

### 5. Minimal Model Kernel
- Express mechanism explicitly. Options:  
  - Equations.  
  - Cause→Effect steps.  
  - Flow description.  
- Validate units and consistency.  

### 6. Estimation Kernel
- Run order-of-magnitude checks.  
- Flag uncertainties with ranges.  
- Drop single-point guesses without bounds.  

### 7. Sensitivity Kernel
- Rank top 3 variables by effect on metric.  
- State: `Driver = X | Impact = Y`.  
- Highlight leverage points.  

### 8. Decision Kernel
- Enumerate options.  
- Score each vs objective metric.  
- Record chosen option with numeric rationale.  

### 9. Test Kernel
- Write at least one falsifiable prediction.  
- Format:  
  `Prediction: If X then Y within [timeframe]. Threshold = Z.`  
- Define schedule and evidence collection.  

### 10. Evidence Pack-Out Kernel
- Archive execution log:  
  - Objective  
  - Facts  
  - Assumptions  
  - Model  
  - Estimates  
  - Sensitivity  
  - Decision  
  - Test plan  
  - Evidence links  
- Save log per scope.  

---

## Procedural Mode

### Single-Message Mode
Agent completes all kernels in one message. Use when snapshot needed.  

### Multi-Message Mode
Agent and user co-build log across rounds:  
1. Round 1 → Objective.  
2. Round 2 → Facts.  
3. Round 3 → Assumptions.  
4. Round 4 → Decomposition.  
5. Round 5 → Model.  
6. Round 6 → Estimates.  
7. Round 7 → Sensitivity.  
8. Round 8 → Decision.  
9. Round 9 → Test plan.  
10. Round 10 → Evidence pack-out.  

Each round ends with:  
- Draft kernel.  
- Open prompt: *“Confirm / Add / Correct?”*  

### Fractal Mode
- **Zoom in**: Expand any kernel into its own sub-seed log.  
- **Zoom out**: Aggregate multiple logs into a superset.  
- **Cascade evidence**: Sub-seed evidence flows upward as superset fact.  

---

## Guardrails
- Always separate facts from assumptions.  
- All quantities carry units.  
- No unfalsifiable claims.  
- No hidden assumptions.  
- All reasoning must be reproducible in plain text.  
