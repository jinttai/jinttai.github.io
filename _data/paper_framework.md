# Geometry-Informed Learning for Optimal Nonholonomic Reorientation of Free-Floating Space Manipulator Systems

## Paper Framework for JGCD Submission

---

## 1. 연구 개요

### 1.1 핵심 Contribution (한 문장)

Space manipulator의 비홀로노믹 재배향 문제를 principal fiber bundle 위의 최적 loop 탐색 문제로 정식화하고, connection curvature로부터 단일 cycle rotation의 이론적 상한을 유도한 뒤, physics-informed neural network로 이 상한에 근접하는 최적 관절 궤적을 실시간으로 생성한다.

### 1.2 Target Journal

- **Primary:** Journal of Guidance, Control, and Dynamics (JGCD)
- **Alternative:** Aerospace Science and Technology, IEEE Transactions on Robotics

### 1.3 포지셔닝 전략

JGCD는 이론적 엄밀성과 GNC 관점의 기여를 중시하므로, learning이 주인공이 아니라 **물리적 프레임워크 안에서 어려운 부분을 해결하는 도구**로 위치해야 한다. "Geometric mechanics로 문제 구조를 이해하고, 그 위에서 learning으로 최적 해를 찾았다"는 서사가 핵심이다.

---

## 2. 연구 배경 및 관련 연구

### 2.1 Falling Cat Problem의 역사

| 연도 | 저자 | 기여 | 출처 |
|------|------|------|------|
| 1969 | Kane & Scher | 2-body cat model의 역학적 분석 | J. Applied Mechanics |
| 1993 | Montgomery | Gauge theory of the falling cat — fiber bundle 위의 holonomy로 해석 | Fields Inst. Commun. |
| 1993 | Li (in Li & Canny eds.) | Falling cat = constructive nonlinear controllability 문제, Ritz 근사 알고리즘 | Nonholonomic Motion Planning, Kluwer |
| 1994 | Fernandes, Gurvits & Li | Near-optimal nonholonomic motion planning for coupled rigid bodies | IEEE TAC |
| 2007 | Ge & Chen | Gauss-Newton 기반 falling cat 최적 제어 | Applied Math & Mech |

### 2.2 JGCD에서의 Space Manipulator Reorientation 계보

| 연도 | 저자 | 기여 | JGCD Vol. |
|------|------|------|-----------|
| 1992 | Reyhanoglu & McClamroch | 3-link manipulator를 이용한 우주 구조물 재배향, surface integral 접근 | Vol. 15, No. 6 |
| 1994 | Yamada | Arm motion에 의한 우주 로봇 자세 제어 | Vol. 17, No. 5 |
| 1994 | Mukherjee & Zurowski | 3-link rigid manipulator를 이용한 구조물 재배향 | Vol. 17, No. 4 |
| 1995 | Vadali & Krishnan | Cyclic arm motion에 의한 우주 로봇 자세 피드백 제어 | Vol. 18, No. 6 |
| 1997 | Yamada & Yoshikawa | Cyclic arm motion 피드백 제어 | Vol. 20, No. 4 |
| 2001 | Cerven & Coverstone | **Averaging theory 기반 최적 재배향** — 핵심 선행연구 | Vol. 24, No. 4 |
| 2022 | Kubo & Kawaguchi | **Parallelogram actuation 기반 비홀로노믹 재배향** — 최신 JGCD | Vol. 45, No. 7 |

### 2.3 최근 관련 연구 (2020s)

| 연도 | 저자 | 기여 | 출처 |
|------|------|------|------|
| 2022 | Kubo & Kawaguchi | 자유비행 우주 로봇 자세 운동의 근사 해석해, Magnus expansion | Trans. JSASS |
| 2024 | IEEE | Postcapture base-manipulator-target의 falling-cat-inspired 비홀로노믹 궤적 계획 | IEEE TRO |
| 2024 | Ma et al. | 주기적 관절 운동에 의한 multibody 전역 재배향 이론 | Multibody Sys. Dyn. |
| 2025 | Ma et al. | Reconstruction loss 기반 딥러닝으로 free-fall 로봇 재배향 | J. Intell. Robot. Syst. |
| 2025 | Choi et al. | 도마뱀 righting reflex를 SMS에 적용, 다목적 최적화 | arXiv:2508.14258 |
| 2025 | Kubo et al. | Transformable CubeSat의 drop tower 실험 검증 | arXiv:2501.17173 |

### 2.4 현재 Research Gap

1. **Falling cat model의 체계적 확장 → space manipulator:** Cerven (2001) 이후 20년 넘게 이 직접적 라인이 JGCD에서 업데이트되지 않음
2. **최적성(optimality) + 비홀로노믹 모션 플래닝의 결합:** 기존 연구는 feasibility에 초점, time-optimal/energy-optimal 관점의 체계적 연구 부족
3. **Connection curvature 기반 이론적 상한:** 유한 크기 loop에 대한 global rotation bound가 명시적으로 유도된 적 없음
4. **고차원(6+ DOF) 시스템에서의 실시간 최적 loop 생성:** 해석적 방법은 저차원에서만 작동

---

## 3. Part 1: Nonholonomic 구조의 기하역학적 정리

### 3.1 Configuration Space 구조

Space manipulator 시스템(base + n-link arm)의 configuration space:

$$Q = SO(3) \times M$$

- $SO(3)$: base 자세 (group variable)
- $M$: 관절 각도들의 shape space

각운동량 보존 $\mathbf{L} = 0$ 조건이 principal fiber bundle $\pi: Q \to M$ 위에 **mechanical connection** $\mathcal{A}$를 정의한다.

### 3.2 Connection 방정식 (Nonholonomic Constraint)

Base 자세 $g \in SO(3)$와 shape 변수 $r \in M$의 관계:

$$g^{-1}\dot{g} = -\mathcal{A}(r)\dot{r}$$

- 이것이 비홀로노믹 제약의 핵심
- Falling cat / space manipulator 모두 동일한 형태
- 차이는 connection $\mathcal{A}$의 구체적 형태에만 존재

### 3.3 Falling Cat vs Space Manipulator: 구조적 차이

| 특성 | Falling Cat | Space Manipulator |
|------|-------------|-------------------|
| 질량비 | 대략 대칭 (~1:1) | 비대칭 (base >> arm) |
| DOF | 2-3 DOF | 6-7 DOF |
| 관절 제한 | 생체역학적 범위 | 물리적 joint stop |
| Curvature 분포 | 비교적 균일 | 비대칭, 질량비 의존 |
| 단일 cycle 효율 | 높음 | 낮음 (질량비 때문) |

**JGCD 기여 포인트:** 기존 JGCD 논문들(Reyhanoglu 1992, Cerven 2001, Kubo 2022)을 통합하는 기하역학적 프레임워크를 space manipulator의 실제 파라미터(질량비, 관절 제한)와 연결하여 재구성

---

## 4. Part 2: Connection Curvature 기반 Rotation 상한

### 4.1 Holonomy와 Curvature의 관계

Shape space $M$ 위의 닫힌 곡선(loop) $\gamma$를 따라 관절을 한 바퀴 움직이면, base 자세는 holonomy $\Phi(\gamma) \in SO(3)$만큼 변화한다.

Connection의 curvature form $\mathcal{B}$를 loop이 감싸는 영역 $S$ 위에서 적분:

$$\Phi(\gamma) \approx \exp\left(\int_S \mathcal{B}\right)$$

### 4.2 이론적 상한 유도

관절 제한으로 정의되는 admissible region $\Omega \subset M$에서, 임의의 loop $\gamma \subset \Omega$에 대해:

$$\|\log \Phi(\gamma)\| \leq C \cdot \text{Area}(\gamma) \cdot \sup_\Omega \|\mathcal{B}\|$$

- $C$: 기하학적 상수
- 우변이 **단일 cycle rotation의 이론적 상한**

### 4.3 Curvature-Weighted 최적화 문제

Curvature $\mathcal{B}$가 shape space에서 균일하지 않으므로, curvature가 집중된 영역을 지나는 loop이 더 효율적이다. 핵심 최적화 문제:

> **Curvature-weighted area를 최대화하는 최적 loop은 무엇인가?**

### 4.4 비가환성 처리

SO(3) 위의 holonomy는 비가환적이므로 여러 cycle의 holonomy를 단순히 더할 수 없다.

- Baker-Campbell-Hausdorff (BCH) formula 활용
- Kubo (2022)의 Magnus expansion 참고
- 다중 cycle의 누적 효과에 대한 bound 유도

### 4.5 이론적 의미

- **실용적 질문에 답변:** "n번의 cycle로 목표 자세에 도달할 수 있는가?"
- **Learning의 benchmark:** 학습된 정책이 이론적 상한의 몇 %에 도달하는지 평가 가능
- **기존 연구 대비 novelty:** Cerven (2001)의 averaging은 small amplitude 가정, 본 연구는 유한 크기 loop에 대한 global bound

---

## 5. Part 3: Physics-Informed Learning으로 최적 Loop 탐색

### 5.1 Learning이 필요한 이론적 정당화

| 문제 특성 | 기존 해석적 방법의 한계 |
|-----------|----------------------|
| 무한 차원 최적화 (loop 형태가 미지수) | Direct collocation은 초기 추측에 민감 |
| 목적함수가 경로 적분으로 정의 | Gradient 계산 비용 높음 |
| 고차원 shape space (6+ DOF) | 차원의 저주 |
| 매 초기조건마다 새로 풀어야 함 | 실시간 적용 불가 |

### 5.2 네트워크 아키텍처

```
Input: 현재 자세 오차 (SO(3) 위 geodesic), 시스템 파라미터 (질량비, 관성 모멘트)
  ↓
Neural Network (MLP or Transformer)
  ↓
Output: Fourier 계수 {a_k, b_k}
  ↓
Loop 재구성: γ(t) = Σ (a_k cos kωt + b_k sin kωt)
  ↓
Connection 방정식 수치 적분 → Holonomy Φ(γ)
```

### 5.3 Physics-Informed 제약 삽입

| 제약 조건 | 처리 방식 | 보장 수준 |
|-----------|----------|----------|
| 각운동량 보존 (L = 0) | Connection 방정식으로 base 자세 결정 (hard constraint) | **Exact** (적분기 정밀도) |
| 관절 제한 | Output layer에 sigmoid/tanh | Exact |
| 폐루프 조건 | Fourier basis가 자동 보장 | Exact |
| 속도/가속도 제한 | Fourier 계수 norm에 penalty | Soft → tunable |

**핵심 차별점:** 네트워크가 직접 궤적을 출력하는 것이 아니라, **loop의 parameterization(Fourier 계수)**을 출력한다. 물리 법칙은 네트워크 밖에서 exact하게 보장된다.

### 5.4 Loss Function 설계

$$\mathcal{L} = \mathcal{L}_\text{reorientation} + \lambda_1 \mathcal{L}_\text{efficiency} + \lambda_2 \mathcal{L}_\text{smoothness}$$

- $\mathcal{L}_\text{reorientation} = \|\log(\Phi(\gamma)^{-1} \Phi_\text{target})\|^2$ — 목표 자세와의 오차
- $\mathcal{L}_\text{efficiency} = \int \|\dot{r}\|^2 dt$ — 제어 노력
- $\mathcal{L}_\text{smoothness} = \int \|\ddot{r}\|^2 dt$ — 궤적 부드러움

### 5.5 학습 방식: Self-Supervised with Differentiable Physics

```
[Random Fourier coefficients] → [Fourier loop γ(t)]
                                        ↓
                              [Connection equation integration]
                                        ↓
                              [Holonomy Φ(γ) computation]
                                        ↓
                              [Loss computation + Backpropagation]
```

- Forward pass가 **미분 가능**하므로 holonomy에 대한 gradient를 backpropagation으로 계산
- Differentiable physics simulation을 training loop에 통합
- Labeled data 불필요 (self-supervised)

### 5.6 Part 2와의 연결 (핵심)

- 이론적 상한 = 학습된 정책의 **performance benchmark**
- "학습된 loop이 이론적 상한의 몇 %에 도달하는가?" → 정량적 평가
- Curvature가 높은 shape space 영역을 사전 계산 → **curriculum learning** 전략
- 블랙박스 learning에 대한 JGCD 리뷰어의 우려 불식

---

## 6. Part 4: 안정성/수렴성 분석

### 6.1 반복적 재배향의 수렴성

매 cycle마다:
1. 현재 자세 오차 측정
2. 학습된 정책이 최적 loop 출력
3. Loop 실행 → 자세 업데이트

이 반복 과정이 목표 자세로 **수렴하는지** 증명 필요.

### 6.2 Lyapunov 기반 안정성 증명

**Lyapunov 함수 후보:**

$$V = \|\log(g^{-1} g_\text{target})\|^2$$

**증명할 것:**
- 매 cycle마다 $\Delta V < 0$ (단조 감소)
- Part 2의 상한 활용: 매 cycle마다 최소 $\delta > 0$ 이상의 rotation 달성 보장
- Curvature가 0이 아닌 한 → 유한 횟수의 cycle로 임의의 목표 자세에 도달

### 6.3 Controllability 조건

- SO(3) 위의 비가환성 때문에 오차 크기 감소 ≠ 올바른 방향
- 정책이 "올바른 방향"의 loop을 선택함을 보여야 함
- **Lie bracket rank condition:** dim $M \geq 3$이면 임의의 SO(3) 방향으로의 holonomy 생성 가능 (기존 결과 활용)

### 6.4 Robustness 분석

| 불확실성 요소 | 영향 | 대응 |
|-------------|------|------|
| 관성 파라미터 오차 | Connection $\mathcal{A}$ 부정확 | Holonomy 예측 오차 bounded → 피드백 보상 |
| 포획 후 미지 payload | 질량비/관성 변화 | 시스템 파라미터를 네트워크 입력에 포함, 온라인 적응 |
| 수치 적분 오차 | 각운동량 drift | Symplectic integrator 사용으로 최소화 |

---

## 7. 시뮬레이션 시나리오

### Scenario 1: Benchmark 검증

- **모델:** 2-body axisymmetric model (classic falling cat)
- **목적:** 기존 해석적 해 (Fernandes et al. 1994)와 비교
- **검증 항목:** 학습된 정책의 정확도, 최적성, 이론적 상한 대비 도달률

### Scenario 2: Space Manipulator 대각도 재배향

- **모델:** 6-DOF arm이 달린 위성 (ETS-VII 급)
- **시나리오:** 90°, 180° 재배향
- **비교 대상:**
  - Cerven (2001)의 averaging 기반 방법
  - Kubo (2022)의 parallelogram actuation
  - Direct collocation (비실시간 최적해)
- **파라미터 연구:** 질량비 변화에 따른 성능

### Scenario 3: Postcapture 시나리오

- **모델:** 위성 + 6-DOF arm + 미지 타겟 (포획 후)
- **시나리오:** 미지 관성 파라미터 하에서 base 자세 복원
- **핵심:** 온라인 적응 능력, 실용적 의미 강조

---

## 8. 예상 리뷰어 질문 및 대비

### Q1: "왜 기존 최적화(direct collocation 등)가 아니라 learning인가?"

**A:** Direct collocation은 각 초기조건마다 새로 풀어야 하고, 6+ DOF에서 수렴이 보장되지 않는다. 학습된 정책은 한 번 학습 후 임의의 초기 자세에 대해 실시간(< 1ms)으로 최적 loop을 출력한다. 논문에서 direct collocation 결과를 offline optimal로 제시하고, 학습된 정책이 이에 근접함을 보여줄 것.

### Q2: "각운동량 보존이 정확히 만족되는가?"

**A:** 네트워크는 shape 궤적만 출력하고, base 자세는 connection 방정식의 수치 적분으로 결정되므로, 각운동량 보존은 적분기의 정밀도 수준에서 exact하게 만족된다. Symplectic integrator를 사용하여 장기 drift를 최소화한다. 이것이 end-to-end learning과의 핵심 차별점이다.

### Q3: "이론적 상한이 tight한가?"

**A:** 저차원 모델(2-body)에서 해석적으로 tightness 검증. 고차원에서는 학습된 정책이 상한의 몇 %에 도달하는지를 수치적으로 제시. 또한 direct collocation으로 구한 "numerical optimal"과 비교하여 상한의 보수성(conservatism) 정도를 정량화한다.

### Q4: "기존 Kubo (2022)와의 차이는?"

**A:** Kubo (2022)는 parallelogram actuation이라는 특정 maneuver 클래스에 국한. 본 연구는 (1) 일반적 loop 공간에서의 최적화, (2) curvature 기반 이론적 상한, (3) learning을 통한 실시간 생성이라는 세 가지 차원에서 확장한다. Kubo의 방법은 본 연구의 special case로 포함됨을 보여줄 수 있다.

### Q5: "학습된 정책의 일반화 성능은?"

**A:** 시스템 파라미터(질량비, 관성 모멘트)를 네트워크 입력에 포함하므로, 학습 분포 내에서의 일반화는 보장된다. 학습 분포 외(out-of-distribution)에 대해서는 피드백 구조(매 cycle마다 자세 측정 → 정책 업데이트)가 보상한다. Scenario 3에서 미지 payload 상황을 통해 검증한다.

---

## 9. 논문 구성안 (예상 페이지)

| 섹션 | 내용 | 예상 비중 |
|------|------|----------|
| I. Introduction | 동기, 관련 연구, contribution 요약 | 2 pages |
| II. Problem Formulation | Fiber bundle 구조, connection 방정식, falling cat과의 관계 | 2.5 pages |
| III. Rotation Bound | Curvature form 유도, 단일 cycle 상한 정리 및 증명 | 3 pages |
| IV. Learning-Based Motion Planning | 네트워크 설계, loss function, 학습 방식 | 2.5 pages |
| V. Convergence Analysis | Lyapunov 안정성, controllability, robustness | 2 pages |
| VI. Numerical Results | 3개 시나리오, 비교 분석 | 3.5 pages |
| VII. Conclusions | 요약, 한계, 향후 연구 | 0.5 pages |
| **Total** | | **~16 pages** |

---

## 10. 핵심 참고문헌

### 기하역학/이론

1. Montgomery, R., "Gauge Theory of the Falling Cat," Fields Inst. Commun., 1993.
2. Li, Z., "Optimal Nonholonomic Motion Planning for a Falling Cat," in *Nonholonomic Motion Planning*, Kluwer, 1993.
3. Fernandes, C., Gurvits, L., Li, Z., "Near-Optimal Nonholonomic Motion Planning for Coupled Rigid Bodies," IEEE TAC, Vol. 39, No. 3, 1994.
4. Marsden, J.E. and Ratiu, T.S., *Introduction to Mechanics and Symmetry*, Springer, 1999.

### JGCD 핵심 논문

5. Reyhanoglu, M. and McClamroch, N.H., "Planar Reorientation Maneuvers of Space Multibody Systems Using Internal Controls," JGCD, Vol. 15, No. 6, 1992.
6. Cerven, W.T. and Coverstone, V.L., "Optimal Reorientation of a Multibody Spacecraft Through Joint Motion Using Averaging Theory," JGCD, Vol. 24, No. 4, 2001.
7. Kubo, Y. and Kawaguchi, J., "Nonholonomic Reorientation of Free-Flying Space Robots Using Parallelogram Actuation in Joint Space," JGCD, Vol. 45, No. 7, 2022.
8. Yamada, K. and Yoshikawa, S., "Feedback Control of Space Robot Attitude by Cyclic Arm Motion," JGCD, Vol. 20, No. 4, 1997.

### 최근 연구

9. Ma, T. et al., "Global Reorientation of a Free-Fall Multibody System Using Periodical Joint Motions," Multibody System Dynamics, 2024.
10. Ma, T. et al., "Global Reorientation...using Reconstruction Loss-based Deep Learning," J. Intell. Robot. Syst., 2025.
11. Choi, D. et al., "Adapting Biological Reflexes for Dynamic Reorientation in Space Manipulator Systems," arXiv:2508.14258, 2025.
12. Kubo, Y. et al., "Model Evaluation of a Transformable CubeSat for Nonholonomic Attitude Reorientation Using a Drop Tower," arXiv:2501.17173, 2025.

### Space Manipulator 동역학/제어

13. Antonello, A. et al., "Dynamics and Control of Spacecraft Manipulators with Thrusters and Momentum Exchange Devices," JGCD, Vol. 42, No. 1, 2019.
14. Aghili, F., "Adaptive Reactionless Motion and Parameter Identification in Postcapture of Space Debris," JGCD, 2013.
15. Papadopoulos, E., "Path Planning for Space Manipulators Exhibiting Nonholonomic Behavior," IROS, 1992.

---

## 11. 향후 확장 가능성

1. **Non-zero angular momentum (NZAM) 시나리오:** 포획 후 NZAM 상황에서 falling cat strategy 변형
2. **실험 검증:** 에어베어링 테이블 또는 낙하탑에서의 하드웨어 검증 → 후속 논문
3. **Multi-arm 시스템:** Dual-arm space robot으로의 확장
4. **Reinforcement learning:** Self-supervised → RL로 확장하여 disturbance rejection 포함

---

*Last updated: 2026-04-02*
