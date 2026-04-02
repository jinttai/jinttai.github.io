---
title: "Trajectory Optimization for Free-Floating Space Robots"
description: "Physics-Informed Generative Model (PIGM) 기반 비홀로노믹 우주 로봇의 궤적 최적화 프레임워크"
tech: [Python, PyTorch, CasADi, MuJoCo, CVAE, iLQR]
date_range: "2025.08 — Present"
status: "Ongoing"
---

## Overview

Free-Floating Space Robot의 비홀로노믹 base reorientation을 위한 hybrid motion planning 프레임워크를 개발했습니다. Generative modeling과 gradient-based optimization을 통합하여 복잡한 동역학 제약 하에서 실시간 궤적을 생성합니다.

## Key Contributions

- **Physics-Informed Generative Model (PIGM)**: CVAE 기반으로 angular momentum constraint를 만족하는 valid warm-start trajectory를 생성하여 local minima를 효과적으로 회피
- **Machine-precision accuracy**: < 10⁻⁶ rad 수준의 정밀도를 PyTorch 기반 differentiable simulation으로 달성
- **iLQR solver 확장**: Differentiable Physics (LBFGS)에서 iLQR로 확장하여 high-dimensional configuration space에서의 complex coupled dynamics와 state constraint를 처리

## Technical Details

- PyTorch 기반 differentiable simulation 및 MuJoCo 검증
- CVAE를 활용한 trajectory prior learning
- Gradient-based optimization으로 physics constraint 만족 보장
