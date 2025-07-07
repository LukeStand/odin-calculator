const buttonContainer = document.querySelector(".container-allButtons");
const outputScreen = document.querySelector("#outputScreen");

const operatorStack = [];
const outputStack = [];
const objArr = [];
function operate()
{
    while(objArr.length > 0)
    {

    }
}
buttonContainer.addEventListener("click",function (button)
{
    //check for control flow change operations
    if(button.target.id == '')
    {
        return;
    }
    else if(button.target.id=="delete")
    {
        outputScreen.textContent = outputScreen.textContent.slice(0,-1);
        return;
    }
    else if(button.target.id=="equal")
    {
        operate();
        return;
    }

    if(objArr.length != 0 && objArr[objArr.length - 1].type == "number" && button.target.classList == "number")
    {
        objArr[objArr.length - 1].value += button.target.value;
    }
    else
    {
        let current = { 
            type: button.target.classList,
            rank: button.target.rank,
            value: button.target.value,
        };
         objArr.push(current);
    }
    outputScreen.textContent += button.target.value;
});
function evalulate(a ,b , operand)
{
    switch(operand)
    {
        case "%":
        {
            return a % b;
        }
        case "/":
        {
            //need to catch a divide by 0 error here $$$$$$$$$$$$%^$$$$$$$$$$$$$$$$$$$$ 
            // throw excpetion or use if
            return a / b;
        }
        case "*":
        {
            return a * b;
        }
        case "+":
        {
            return a + b;

        }
        case "-":
        {
            return a - b;
        }
        default:
        {
            console.log("fell through all switch statements")
        }
    }
}
