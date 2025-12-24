;; ChainQuest - Quest Manager Contract
;; Manages quest creation, user progress tracking, and verified completion

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-quest-not-found (err u101))
(define-constant err-already-completed (err u102))

;; Data Maps
(define-map quests
  uint 
  {
    title: (string-utf8 100),
    description: (string-utf8 500),
    reward-amount: uint,
    difficulty: uint,
    active: bool
  }
)

(define-map user-progress
  { user: principal, quest-id: uint }
  {
    started: bool,
    completed: bool,
    completed-at: (optional uint)
  }
)

;; Data Vars
(define-data-var quest-nonce uint u0)

;; Public Functions

;; Admin: Create a new quest
(define-public (create-quest (title (string-utf8 100)) (description (string-utf8 500)) (reward-amount uint) (difficulty uint))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (let
      ((quest-id (+ (var-get quest-nonce) u1)))
      (map-set quests quest-id {
        title: title,
        description: description,
        reward-amount: reward-amount,
        difficulty: difficulty,
        active: true
      })
      (var-set quest-nonce quest-id)
      (ok quest-id)
    )
  )
)

;; User: Start a quest
(define-public (start-quest (quest-id uint))
  (begin
    (asserts! (is-some (map-get? quests quest-id)) err-quest-not-found)
    (ok (map-set user-progress { user: tx-sender, quest-id: quest-id }
      (merge 
        (default-to { started: false, completed: false, completed-at: none } 
          (map-get? user-progress { user: tx-sender, quest-id: quest-id }))
        { started: true }
      )
    ))
  )
)

;; Admin/Oracle: Complete a quest for a user
;; In a production version, this could verify a proof or be called by a trusted oracle
(define-public (complete-quest (quest-id uint) (user principal))
  (let
    ((quest (unwrap! (map-get? quests quest-id) err-quest-not-found))
     (progress (default-to { started: false, completed: false, completed-at: none } 
                 (map-get? user-progress { user: user, quest-id: quest-id })))
    )
    (asserts! (is-eq tx-sender contract-owner) err-owner-only) ;; Only admin can verify for now
    (asserts! (not (get completed progress)) err-already-completed)
    
      { started: true, completed: true, completed-at: (some burn-block-height) }
    
    ;; Call into other contracts (to be linked later) for rewards/badges
    ;; For now just returning success
    (ok true)
  )
)

;; Read-only Functions

(define-read-only (get-quest (quest-id uint))
  (map-get? quests quest-id)
)

(define-read-only (get-user-progress (user principal) (quest-id uint))
  (map-get? user-progress { user: user, quest-id: quest-id })
)

(define-read-only (get-quest-nonce)
  (var-get quest-nonce)
)
