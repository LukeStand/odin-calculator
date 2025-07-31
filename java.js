const buttonContainer = document.querySelector(".container-allButtons");
const outputScreen = document.querySelector("#outputScreen");

const operatorStack = [];
const outputStack = [];
const objArr = [];
let wasDotUsed = false;
let isFirst = true;
let wasEqualPressed = false;

function operate()
{
    while(objArr.length > 0)
    {
        let current = objArr.shift();
        if(current.type == "operator")
        {
            checkForPop(current);
            if(current.value != ")")
            {
                operatorStack.push(current);
            }
        }
        else if(current.type == "number")
        {
            outputStack.push(current);
        }
        console.log(outputStack)
    }
    while(operatorStack.length > 0)
    {
        console.log("In while loop")
        let operator = operatorStack.pop().value;
        console.log("operator in fi9nla while loop")
        let b = outputStack.pop().value;
        let a = outputStack.pop().value;
        
        outputStack.push({ type: "number", value: evalulate(a, b, operator) });
    }
    outputScreen.textContent = outputStack.pop().value;
}
buttonContainer.addEventListener("click",function (button)
{
    //check for control flow change operations
    if(wasEqualPressed)
    {
        outputScreen.textContent = "0";
        isFirst = true;
        wasEqualPressed = false;
    }
    if(button.target.id == '')
    {
        return;
    }
    else if(button.target.id=="delete")
    {
        if(objArr.length > 0)
        {
            if(objArr[objArr.length - 1].type=="operator" ||objArr[objArr.length - 1].value.length <= 1)
            {
                objArr.pop();
            }
            else
            {
                // console.log("in the else attempting to slice!!!\n before slice: "+ objArr[objArr.length - 1].value);
                objArr[objArr.length - 1].value = objArr[objArr.length - 1].value.slice(0,-1);
                //  console.log("\n after slice: " + objArr[objArr.length - 1].value);
            }
             outputScreen.textContent = outputScreen.textContent.slice(0,-1);
        }
    
        return;
    }
    else if(button.target.id=="equal")
    {
        wasEqualPressed = true;
        operate();
        return;
    }

    if(objArr.length != 0 && objArr[objArr.length - 1].type == "number" && button.target.classList.value == "number")
    {
        if(button.target.value ==".")
        {
            if(wasDotUsed == true)
            {
                return;
            }
            wasDotUsed = true;
        }
        objArr[objArr.length - 1].value += button.target.value;

    }
    else if(button.target.classList.contains("number"))
    {
        let current = { 
            type: button.target.classList.value,
            value: button.target.value,
        };
        if(button.target.value ==".")
        {
            if(wasDotUsed == true)
            {
                return;
            }
            wasDotUsed = true;
        }
        // console.log("type: "+ current.type + "value: " + current.value);
        objArr.push(current);
    }
    else if(button.target.classList.contains("operator"))
    {
        wasDotUsed = false;
        if(button.target.value != "(")
            if(objArr.length <= 0 || objArr[objArr.length-1].type != "number")
            {
                return;
            }
        if(objArr.length > 0)
        {
            if(button.target.value =="(" && objArr[objArr.length-1].type == "number")
            {
                objArr.push({
                    type:"operator",
                    rank:"2",
                    value:"*",

                });
            }
        }
        let current = { 
            type: button.target.classList.value,
            rank: button.target.getAttribute("rank"),
            value: button.target.value,
        };
        // console.log("type: "+ current.type + "rank: " +current.rank + "value: " + current.value);
        objArr.push(current);
    }
    if(isFirst == true)
    {
        outputScreen.textContent = button.target.value;
        isFirst = false;
        return;
    }
    outputScreen.textContent += button.target.value;
});
function evalulate(a,b,operand)
{
    //add check to see if a and b have no more than 1 decimal
    a = parseFloat(a,10);
    b = parseFloat(b,10);
    switch(operand)
    {
        case "%":
        {
            if(b == 0){
                return "error";
            }
            console.log("In % \na: "+ a + "  " + "b: " + b)
            return a % b;
        }
        case "/":
        {
            //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$     need to throw a divide by 0 error here  
            // throw excpetion or use if
            if(b == 0){
               return "error";
            }
            console.log("In / \na: "+ a + "  " + "b: " + b)
            return a / b;
        }
        case "*":
        {
            console.log("In * \na: "+ a + "  " + "b: " + b)
            return a * b;
        }
        case "+":
        {
            console.log("In + \na: "+ a + "  " + "b: " + b)
            return a + b;

        }
        case "-":
        {
            console.log("In - \na: "+ a + "  " + "b: " + b)
            return a - b;
        }
        default:
        {

            console.log("fell through all switch statements a: " + a +" b: " +b + "operator: " + operand)
        }
    }
}
function checkForPop(obj)
{
   //check for closing parenthesis. if true pop until "(" is reached,
   //  if array is empty before reaching "(" throw syntax error 
//    $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$n n n.     STILL INCOMPLETE.  !!!!!!!!!!!!
    if (obj.value == "(")
    {
        return;
    }
    if(obj.value == ")")
    {
        if(operatorStack.length == 0)
        {
            outputScreen.textContent = "Syntax error"
            return;
        }
        while(operatorStack.length > 0 && operatorStack[operatorStack.length - 1].value != "(")
        {
            let operator = operatorStack.pop().value;
            let b = outputStack.pop().value;
            let a = outputStack.pop().value;
            console.log("In  in the for loop while loop" + operator+" a: "+ a+" b: "+b)
        
            outputStack.push({ type: "number", value: evalulate(a, b, operator)});
            if(operatorStack.length == 0)
            {
                outputScreen.textContent = "Syntax error"
                return;
            }
        } 
        operatorStack.pop();
    }
    else if(operatorStack.length > 0 && parseInt(operatorStack[operatorStack.length-1].rank) >= parseInt(obj.rank))
    {
        console.log("in the else if \n length: "+operatorStack.length +"only operator in the stack: " + operatorStack[operatorStack.length-1].value + "current: " + obj.value)
        let operator = operatorStack.pop().value;
        let b = outputStack.pop().value;
        let a = outputStack.pop().value;
        // console.log("In the if in checkforpop" + operator)
        
        outputStack.push({ type: "number", value: evalulate(a, b, operator)});
        // outputStack.push(operatorStack.pop());
    }
    return;
} 