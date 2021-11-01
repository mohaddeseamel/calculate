const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number){
    //Replace current display value if firstValue entered
    if(awaitingNextValue){
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    }else{
        //If current Display value is 0 replace it If not add number
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
        }
}


function AddDecimal(){
    if(awaitingNextValue) return;
    if(!calculatorDisplay.textContent.includes('.')){
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

//calculate first and second values depending on operator
const calculate = {
    '/':(firstNumber , secondNumber) => firstNumber / secondNumber,
    '*':(firstNumber , secondNumber) => firstNumber * secondNumber,
    '+':(firstNumber , secondNumber) => firstNumber + secondNumber,
    '-':(firstNumber , secondNumber) => firstNumber - secondNumber,
    '=':(firstNumber , secondNumber) => secondNumber,
};

function useOperator(operator){
    const currentValue = Number(calculatorDisplay.textContent);
    //prevent multiple operators
    if(operatorValue && awaitingNextValue){
        operatorValue = operator;
        return;
    };
    if(!firstValue){
        firstValue = currentValue;
    }else{
        const calculation = calculate[operatorValue](firstValue,currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    //Ready for next value , store operator
    awaitingNextValue = true;
    operatorValue = operator;
}

//Add EventListener for numbers , operator , decimal buttons

inputBtns.forEach((inputBtn) =>{
    if(inputBtn.classList.length === 0){
        inputBtn.addEventListener('click' , () => sendNumberValue(inputBtn.value));
    }else if(inputBtn.classList.contains('operator')){
        inputBtn.addEventListener('click' , () => useOperator(inputBtn.value));
    }else if(inputBtn.classList.contains('decimal')){
        inputBtn.addEventListener('click' , () => AddDecimal());
    }
});

//Reset all value display
function resetAll(){
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}

//EventListener
clearBtn.addEventListener('click',resetAll)