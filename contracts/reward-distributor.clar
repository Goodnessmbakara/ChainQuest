;; ChainQuest - Reward Distributor
;; Manages STX rewards for quest completion

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-insufficient-balance (err u101))

;; Public Functions

;; Fund the contract with STX
(define-public (fund-pool (amount uint))
  (stx-transfer? amount tx-sender (as-contract tx-sender))
)

;; Distribute reward to user (Only Admin)
(define-public (distribute-reward (recipient principal) (amount uint))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (as-contract (stx-transfer? amount tx-sender recipient))
  )
)

;; Read-only
(define-read-only (get-pool-balance)
  (stx-get-balance (as-contract tx-sender))
)
