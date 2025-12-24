;; ChainQuest - Achievement Badges (NFT)
;; SIP-009 Compliant NFT for Quest Completions

(impl-trait .sip009-nft-trait.sip009-nft-trait)

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-not-token-owner (err u101))
(define-constant err-token-exists (err u102))

;; Data Vars
(define-data-var last-token-id uint u0)

;; Data Maps
(define-non-fungible-token achievement-badge uint)
(define-map token-uris uint (string-ascii 256))

;; SIP-009 Functions

(define-read-only (get-last-token-id)
  (ok (var-get last-token-id))
)

(define-read-only (get-token-uri (token-id uint))
  (ok (map-get? token-uris token-id))
)

(define-read-only (get-owner (token-id uint))
  (ok (nft-get-owner? achievement-badge token-id))
)

(define-public (transfer (token-id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) err-not-token-owner)
    (nft-transfer? achievement-badge token-id sender recipient)
  )
)

;; Minting Function (Only Admin/Quest Manager)
(define-public (mint (recipient principal) (uri (string-ascii 256)))
  (let
    ((token-id (+ (var-get last-token-id) u1)))
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (try! (nft-mint? achievement-badge token-id recipient))
    (map-set token-uris token-id uri)
    (var-set last-token-id token-id)
    (ok token-id)
  )
)
