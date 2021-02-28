const monthsArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
function writeAsDate(str){
  let newArr = str.split('T')[0].split('-')
  let output =`${monthsArr[parseInt(newArr[1]-1)]} ${newArr[2]} ${newArr[0]}`
  return output
}

let x = document.getElementsByClassName("date");
for (let i = 0; i < x.length; i++) {
    x[i].innerHTML = (writeAsDate(x[i].innerHTML))
}

let y = document.getElementsByClassName("title");
for (let i = 0; i < x.length; i++) {
    y[i].addEventListener("mouseover",function(event){
        y[i].setAttribute("style","color:red;")
    })
    y[i].addEventListener("mouseout", func1, false);
    function func1(){  
        y[i].setAttribute("style", "color:black;")
    }
}

