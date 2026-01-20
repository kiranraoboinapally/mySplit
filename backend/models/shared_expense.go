package models

type SharedExpense struct {
	ID           uint    `gorm:"primaryKey" json:"id"`
	ExpenseID    uint    `gorm:"not null" json:"expenseId"`
	PayerUserID  uint    `gorm:"column:payer_user_id;not null" json:"payerUserId"`
	DebtorUserID uint    `gorm:"column:debtor_user_id;not null" json:"debtorUserId"`
	AmountOwed   float64 `gorm:"column:amount_owed;not null;type:decimal(19,2)" json:"amountOwed"`
	IsSettled    bool    `gorm:"column:is_settled" json:"isSettled"`

	Expense Expense `gorm:"foreignKey:ExpenseID" json:"expense,omitempty"`
	Payer   User    `gorm:"foreignKey:PayerUserID" json:"payer,omitempty"`
	Debtor  User    `gorm:"foreignKey:DebtorUserID" json:"debtor,omitempty"`
}
