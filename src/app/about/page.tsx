'use client'

import * as React from 'react'
import { useState } from 'react'

// Button component
const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

// Input component
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

// Card components
const Card = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
    {...props}
  />
)
Card.displayName = 'Card'

const CardHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
)
CardHeader.displayName = 'CardHeader'

const CardTitle = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`} {...props} />
)
CardTitle.displayName = 'CardTitle'

const CardContent = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 pt-0 ${className}`} {...props} />
)
CardContent.displayName = 'CardContent'

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [currentValue, setCurrentValue] = useState('')
  const [operator, setOperator] = useState('')
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? digit : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const clearDisplay = () => {
    setDisplay('0')
    setCurrentValue('')
    setOperator('')
    setWaitingForOperand(false)
  }

  const inputOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display)

    if (currentValue === '') {
      setCurrentValue(inputValue.toString())
    } else if (operator) {
      const result = performCalculation()
      setDisplay(result.toString())
      setCurrentValue(result.toString())
    }

    setWaitingForOperand(true)
    setOperator(nextOperator)
  }

  const performCalculation = () => {
    const prevValue = parseFloat(currentValue)
    const nextValue = parseFloat(display)

    switch (operator) {
      case '+':
        return prevValue + nextValue
      case '-':
        return prevValue - nextValue
      case '*':
        return prevValue * nextValue
      case '/':
        return prevValue / nextValue
      default:
        return nextValue
    }
  }

  const handleEquals = () => {
    if (!operator) return

    const result = performCalculation()
    setDisplay(result.toString())
    setCurrentValue('')
    setOperator('')
    setWaitingForOperand(true)
  }

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-center">電卓</CardTitle>
      </CardHeader>
      <CardContent>
        <Input className="text-right text-2xl mb-4" value={display} readOnly />
        <div className="grid grid-cols-4 gap-2">
          {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0].map((num) => (
            <Button key={num} onClick={() => inputDigit(num.toString())}>
              {num}
            </Button>
          ))}
          <Button onClick={inputDecimal}>
            .
          </Button>
          <Button onClick={clearDisplay} >
            C
          </Button>
          {['+', '-', '*', '/'].map((op) => (
            <Button key={op} onClick={() => inputOperator(op)} >
              {op}
            </Button>
          ))}
          <Button onClick={handleEquals} className="col-span-2">
            =
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
