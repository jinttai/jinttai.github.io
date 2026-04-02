---
title: "Deep RL for Space Manipulator Control"
description: "MuJoCo 기반 6-DOF 우주 로봇의 self-tossing maneuver를 위한 강화학습 제어"
tech: [Python, PyTorch, MuJoCo, TD3, ROS 2]
date_range: "2024.02 — 2025.06"
status: "Completed"
---

## Overview

미소중력 환경에서 6-DOF floating-base 우주 로봇의 self-tossing maneuver를 수행하는 강화학습 에이전트를 개발했습니다. 추진제 없이 벽면 pushing을 통해 정밀한 목표 모멘텀을 생성합니다.

## Key Contributions

- **High-fidelity Simulation**: MuJoCo를 활용하여 미소중력 환경에서의 complex contact dynamics를 모델링한 6-DOF floating-base 시뮬레이션 환경 구축
- **TD3-based RL Agent**: Wall-pushing interaction을 활용한 self-tossing maneuver로 추진제 없이 정밀한 target momentum 생성
- **Robust Control**: 접촉 불확실성과 충격 교란 하에서의 출발 속도 및 방향에 대한 robust control 달성
