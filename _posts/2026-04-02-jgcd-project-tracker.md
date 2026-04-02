---
layout: post
title: "JGCD Paper Project Tracker"
date: 2026-04-02
tags: [research, space-robotics, JGCD, project-management]
---

JGCD 논문 **"Geometry-Informed Learning for Optimal Nonholonomic Reorientation of Free-Floating Space Manipulator Systems"** 프로젝트 관리 페이지.

---

## Contribution (한 문장)

Space manipulator의 비홀로노믹 재배향 문제를 **principal fiber bundle 위의 최적 loop 탐색 문제**로 정식화하고, connection curvature로부터 단일 cycle rotation의 이론적 상한을 유도한 뒤, **physics-informed neural network**로 이 상한에 근접하는 최적 관절 궤적을 실시간으로 생성한다.

---

## Target & Strategy

| | |
|---|---|
| **Primary** | Journal of Guidance, Control, and Dynamics (JGCD) |
| **Backup** | Aerospace Science and Technology / IEEE TRO |
| **포지셔닝** | Learning이 주인공이 아닌, **물리적 프레임워크 안에서 어려운 부분을 해결하는 도구** |
| **서사** | "Geometric mechanics로 구조를 이해하고, 그 위에서 learning으로 최적 해를 찾았다" |

---

## Progress Tracker

### Part 1: Nonholonomic 구조의 기하역학적 정리

- [x] Configuration space 구조 정리: `Q = SO(3) × M`
- [ ] Connection 방정식 유도: `g⁻¹ġ = -A(r)ṙ`
- [ ] Falling Cat vs Space Manipulator 구조적 차이 분석
- [ ] 기존 JGCD 논문 (Reyhanoglu 1992, Cerven 2001, Kubo 2022) 통합 프레임워크 작성

### Part 2: Connection Curvature 기반 Rotation 상한

- [ ] Holonomy-Curvature 관계식 유도
- [ ] 단일 cycle rotation 이론적 상한 정리 및 증명
- [ ] Curvature-weighted 최적화 문제 정의
- [ ] BCH formula 기반 다중 cycle 비가환성 처리
- [ ] 저차원 모델에서 tightness 해석적 검증

### Part 3: Physics-Informed Learning

- [ ] Fourier basis loop parameterization 구현
- [ ] Network 아키텍처 설계 (MLP or Transformer)
- [ ] Physics-informed constraints 삽입
  - [ ] 각운동량 보존 (connection 방정식, exact)
  - [ ] 관절 제한 (sigmoid/tanh, exact)
  - [ ] 폐루프 조건 (Fourier basis, exact)
  - [ ] 속도/가속도 제한 (penalty, soft)
- [ ] Loss function 구현 (reorientation + efficiency + smoothness)
- [ ] Self-supervised training with differentiable physics
- [ ] Part 2 상한 대비 정량적 평가

### Part 4: 안정성/수렴성 분석

- [ ] Lyapunov 함수 설계: `V = ‖log(g⁻¹g_target)‖²`
- [ ] 매 cycle ΔV < 0 단조 감소 증명
- [ ] Lie bracket rank condition 확인 (dim M ≥ 3)
- [ ] Robustness 분석 (관성 파라미터 오차, 미지 payload, 수치 적분 오차)

### Simulations

- [ ] **Scenario 1** — 2-body axisymmetric (Fernandes 1994 비교)
- [ ] **Scenario 2** — 6-DOF arm 위성 (ETS-VII 급) 90°/180° 재배향
- [ ] **Scenario 3** — Postcapture 미지 관성 파라미터

### Writing

- [ ] I. Introduction (2p)
- [ ] II. Problem Formulation (2.5p)
- [ ] III. Rotation Bound (3p)
- [ ] IV. Learning-Based Motion Planning (2.5p)
- [ ] V. Convergence Analysis (2p)
- [ ] VI. Numerical Results (3.5p)
- [ ] VII. Conclusions (0.5p)
- [ ] Figures & Tables
- [ ] Internal review
- [ ] Submission

---

## Research Gaps (왜 이 연구가 필요한가)

1. **Falling cat → Space manipulator 확장**: Cerven (2001) 이후 20년 넘게 JGCD에서 업데이트 없음
2. **최적성 + 비홀로노믹 모션 플래닝의 결합**: 기존은 feasibility 중심, optimal 관점 부재
3. **Connection curvature 기반 이론적 상한**: 유한 크기 loop에 대한 global rotation bound 유도된 적 없음
4. **고차원(6+ DOF) 실시간 최적 loop 생성**: 해석적 방법은 저차원에서만 작동

---

## Literature Timeline

### Falling Cat Problem

| 연도 | 저자 | 기여 |
|------|------|------|
| 1969 | Kane & Scher | 2-body cat model 역학적 분석 |
| 1993 | Montgomery | Gauge theory — fiber bundle holonomy 해석 |
| 1993 | Li | Constructive nonlinear controllability, Ritz 근사 |
| 1994 | Fernandes, Gurvits & Li | Near-optimal nonholonomic motion planning |
| 2007 | Ge & Chen | Gauss-Newton 기반 최적 제어 |

### JGCD Space Manipulator Reorientation 계보

| 연도 | 저자 | 기여 |
|------|------|------|
| 1992 | Reyhanoglu & McClamroch | 3-link manipulator, surface integral 접근 |
| 1994 | Yamada | Arm motion 우주 로봇 자세 제어 |
| 1994 | Mukherjee & Zurowski | 3-link rigid manipulator 재배향 |
| 1995 | Vadali & Krishnan | Cyclic arm motion 자세 피드백 제어 |
| 1997 | Yamada & Yoshikawa | Cyclic arm motion 피드백 |
| 2001 | **Cerven & Coverstone** | **Averaging theory 기반 최적 재배향** |
| 2022 | **Kubo & Kawaguchi** | **Parallelogram actuation 비홀로노믹 재배향** |

### 최근 연구 (2020s)

| 연도 | 저자 | 기여 |
|------|------|------|
| 2022 | Kubo & Kawaguchi | 자유비행 로봇 자세 운동 근사 해석해, Magnus expansion |
| 2024 | IEEE TRO | Postcapture falling-cat-inspired 비홀로노믹 궤적 계획 |
| 2024 | Ma et al. | 주기적 관절 운동 multibody 전역 재배향 이론 |
| 2025 | Ma et al. | Reconstruction loss 딥러닝 free-fall 재배향 |
| 2025 | Choi et al. | 도마뱀 righting reflex → SMS 다목적 최적화 |
| 2025 | Kubo et al. | Transformable CubeSat drop tower 실험 검증 |

---

## Reviewer Q&A Prep

**Q: 왜 direct collocation이 아닌 learning인가?**
> DC는 매 초기조건마다 재풀이, 6+ DOF 수렴 미보장. 학습 정책은 한 번 학습 후 임의 초기 자세에 실시간(< 1ms) 출력. DC를 offline optimal baseline으로 제시.

**Q: 각운동량 보존이 정확히 만족되는가?**
> 네트워크는 shape 궤적만 출력, base 자세는 connection 방정식 수치 적분으로 결정. Symplectic integrator로 장기 drift 최소화. End-to-end learning과의 핵심 차별점.

**Q: 이론적 상한이 tight한가?**
> 2-body에서 해석적 tightness 검증. 고차원에서는 학습 정책이 상한의 몇 %에 도달하는지 수치 제시 + DC numerical optimal과 비교하여 보수성 정량화.

**Q: Kubo (2022)와의 차이는?**
> Kubo는 parallelogram actuation 특정 maneuver에 국한. 본 연구는 (1) 일반 loop 공간 최적화, (2) curvature 상한, (3) learning 실시간 생성 세 차원 확장. Kubo의 방법은 special case로 포함.

**Q: 일반화 성능은?**
> 시스템 파라미터(질량비, 관성)를 네트워크 입력 포함, 학습 분포 내 일반화 보장. OOD는 매 cycle 피드백으로 보상. Scenario 3 미지 payload로 검증.

---

## Future Extensions

1. Non-zero angular momentum (NZAM) 시나리오
2. 에어베어링 테이블/낙하탑 하드웨어 실험 검증 → 후속 논문
3. Dual-arm space robot 확장
4. Self-supervised → RL 확장 (disturbance rejection)

---

*Last updated: 2026-04-02*
