# Firestore Data Model

## users
doc: uuid
data:
  id: uuid
  email: string
  preferredName: string
  role: string
  gemes: map('game id': 'is active')
 
## games
doc: uuid
data:
  id: uuid
  admin: string (user id)
  name: string
  description: string
  status: string (active, canceled, done)
  startDate: string
  endDate: string
  weightFrequency: string
  minWeightLoss: number
  weightUnit: string
  fee: number
  currency: string
  vacationLength: number
  isLastWeightPaid: boolean

## members
doc: uuid
data:
  id: uuid
  gameId: uuid
  userId: uuid
  preferredName: string
  weightGoal: number
  vacationStartDate: string
  status: string (admin, applied, accepted, rejected, done, withdrawn)
  isActive: boolean

## weights
doc: uuid
data:
  id: uuid
  memberId: uuid
  gameId: uuid
  date: string
  weight: number

## payments
doc: uuid
data:
  id: uuid
  memberId: uuid
  gameId: uuid
  date: string
  amount: number

