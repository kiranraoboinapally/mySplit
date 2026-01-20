package models

type SharedExpense struct {
	ID           uint    `gorm:"primaryKey"`
	ExpenseID    uint    `gorm:"not null"`
	PayerUserID  uint    `gorm:"column:payer_user_id;not null"`
	DebtorUserID uint    `gorm:"column:debtor_user_id;not null"`
	AmountOwed   float64 `gorm:"column:amount_owed;not null;type:decimal(19,2)"`
	IsSettled    bool    `gorm:"column:is_settled"`

	Expense Expense `gorm:"foreignKey:ExpenseID"`
	Payer   User    `gorm:"foreignKey:PayerUserID"`
	Debtor  User    `gorm:"foreignKey:DebtorUserID"`
}
