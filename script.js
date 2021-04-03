class Calculator {

    constructor(previousOperand, currentOperand) {
        this.previousOperand = previousOperand
        this.currentOperand = currentOperand
        this.clear()

    }


    clear() {
        this.currentOp = ''
        this.previousOp = ''
        this.operation = undefined


    }

    delete() {
        this.currentOp = this.currentOp.toString().slice(0, -1)

    }

    appendNumber(number) {
        if (number === '.' && this.currentOp.includes('.')) return
        this.currentOp = this.currentOp.toString() + number.toString()


    }

    chooseOperation(operation) {
        if (this.currentOp === '') return
        if (this.previousOp !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOp = this.currentOp
        this.currentOp = ''


    }

    compute() {

        let result
        const prev = parseFloat(this.previousOp)
        const current = parseFloat(this.currentOp)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                result = prev + current
                break
            case '-':
                result = prev - current
                break
            case '*':
                result = prev * current
                break
            case '/':
                result = prev / current
                break

            default:
                return
        }
        this.currentOp = result
        this.operation = undefined
        this.previousOp = ''

    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })

        }

        if (decimalDigits != null) {
            return '${integerDisplay}.${decimalDigits}'
        } else {
            return integerDisplay
        }
    }
    updateDisplay() {

        this.currentOperand.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperand.innerText = '${this.getDisplayNumber(this.previousOp)} ${this.operation}'
        } else {
            this.previousOperand.innerText = ''
        }


    }

}




const numberButtons = document.querySelectorAll('[data-nums]')
const ops = document.querySelectorAll('[data-ops]')
const equals = document.querySelector('[data-equals]')
const del = document.querySelector('[data-delete]')
const allClear = document.querySelector('[data-all-clear]')
const previousOperand = document.querySelector('[data-previous-op]')
const currentOperand = document.querySelector('[data-current-op]')

const calculator = new Calculator(previousOperand, currentOperand)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

ops.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equals.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClear.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

del.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()

})