const buttonContainer = document.querySelector(".container-allButtons");
const outputScreen = document.querySelector("#outputScreen");
let prevIndex = 0;
const objArr = [];
function operate()
{
    evalulate(left,right,operation)

}
buttonContainer.addEventListener("click",function (button)
{
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
        operate()
        return;
    }
    let current = { 
        type: button.target.classList,
        rank: button.target.rank,
        value: button.target.value,
    }
    objArr.push(current);
    outputScreen.textContent += button.target.value;
});
function evalulate(left,right, operand){
    switch(operand)
    {
        
    }
}
