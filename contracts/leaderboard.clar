;; ChainQuest - Leaderboard
;; Tracks user scores and rankings

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))

;; Data Maps
(define-map user-scores principal uint)

;; Public Functions

;; Update user score (Only Admin/Quest Manager)
(define-public (add-score (user principal) (points uint))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (let
      ((current-score (default-to u0 (map-get? user-scores user))))
      (ok (map-set user-scores user (+ current-score points)))
    )
  )
)

;; Read-only
(define-read-only (get-score (user principal))
  (default-to u0 (map-get? user-scores user))
)
