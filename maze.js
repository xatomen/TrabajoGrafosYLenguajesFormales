//---Ancho y alto del recuadro que contiene al laberinto
const M = 800
const W = M
const H = M



const maze = 10
const mazeW = maze
const mazeH = maze

let posx
let posy

   //---Cantidad de celdas (ancho y alto) que tiene el laberinto
const cells = []
//---Stack
const stack = []

const solve = []
const solve_stack = []

//---Tamaño de las celdas del laberinto
const pixelSize = M/maze

function setup(){
    const canvas = createCanvas(W, H)
    canvas.parent('#canvasHolder')

    console.log("aca estamoas")
    
    for (let y = 0; y < mazeH; y++) { //----Creamos las MxM celdas
		const row = []
		for (let x = 0; x < mazeW; x++) {
			row.push(new Cell(x, y))
		}
		cells.push(row)
	}

    for (let y = 0; y < mazeH; y++) { //----Creamos las MxM celdas
		const row = []
		for (let x = 0; x < mazeW; x++) {
			row.push(new Ball(x, y))
		}
		solve.push(row)
	}

    //---Salida laberinto
    const rxf = Math.round(Math.random()*mazeW)  //---Elegimos el inicio, en este caso, en cualquier parte de la parte superior
    const ryf = mazeH-1  //---Elegimos el inicio, en este caso, siempre en la parte superior

    const last = cells[ryf][rxf] //---Última celda
    last.visited = false //---La última celda la marcamos como no visitada
    last.south = false //---Le quitamos el borde inferior
    last.final = true //---Es el final del laberinto
    stack.push(last) //---La insertamos en el stack

    //---Entrada laberinto
    const rxi = Math.round(Math.random()*mazeW)  //---Elegimos el inicio, en este caso, en cualquier parte de la parte superior
    const ryi = 0  //---Elegimos el inicio, en este caso, siempre en la parte superior
   
    const first = cells[ryi][rxi] //---Primera celda
    first.visited = true//---La primera celda la marcamos como visitada
    first.north = false //---Le quitamos el borde superior
    first.entry = true //---Es la entrada del laberinto
    stack.push(first) //---La insertamos en el stack

    const first2 = solve[ryi][rxi]
    first2.visited = true
    first2.north = false
    solve_stack.push(first2)

    posx=rxi
    posy=ryi

}

function draw() {

    var color = 125
	background(color)

    //fill(0,255,0);
    //rect(posx*pixelSize,posy*pixelSize,pixelSize,pixelSize)
    //noStroke()
    //cells[5][5].draw(pixelSize)

    if(stack.length > 0){
        let current = stack[stack.length-1]

        let valid = false //---El camino elegido es valido/no valido
        let checks = 0 //---No buscar más caminos si es que ya revisamos norte, sur, este y oeste
        //let flag = false //---Usamos esta bandera/indicador, para avisar cuando seleccionamos un "final" abajo del laberinto
        while(!valid && checks < 10){
            checks++
            let direction = Math.round(Math.random()*4) //---Seleccionamos una dirección aleatoria para ir
            switch(direction){
                //---Oeste/West
                case 0:
                    if(current.x > 0){ //---Verificamos que no estemos en el borde izquierdo
                        let next = cells[current.y][current.x-1]
                        if(!next.visited){ //---Si no está visitado, es un camino valido
                            current.west = false    //---Quitamos el muro
                            next.east = false       //---Quitamos el muro
                            next.visited = true //---Asignamos el true al visitado
                            stack.push(next) //---Añadimos al stack
                            valid = true
                        }
                    }
                break;
                
                //---Norte/North
                case 1:
                    if(current.y > 0){ //---Verificamos que no estemos en el borde superior
                        let next = cells[current.y-1][current.x]
                        if(!next.visited){ //---Si no está visitado, es un camino valido
                            current.north = false    //---Quitamos el muro
                            next.south = false       //---Quitamos el muro
                            next.visited = true //---Asignamos el true al visitado
                            stack.push(next) //---Añadimos al stack
                            valid = true
                        }
                    }
                break;

                //---Este/East
                case 2:
                    if(current.x < (mazeW-1)){ //---Verificamos que no estemos en el borde derecho
                        let next = cells[current.y][current.x+1]
                        if(!next.visited){ //---Si no está visitado, es un camino valido
                            current.east = false    //---Quitamos el muro
                            next.west = false       //---Quitamos el muro
                            next.visited = true //---Asignamos el true al visitado
                            stack.push(next) //---Añadimos al stack
                            valid = true
                        }
                    }
                break;

                //---Sur/South
                case 3:
                    if(current.y < (mazeH-1)){ //---Verificamos que no estemos en el borde derecho
                        let next = cells[current.y+1][current.x]
                        if(!next.visited){ //---Si no está visitado, es un camino valido
                            current.south = false    //---Quitamos el muro
                            next.north = false       //---Quitamos el muro
                            /*if(flag==false){
                                next.south = false
                                flag = true
                            }
                            else{
                                next.south = true
                            }*/
                            next.visited = true //---Asignamos el true al visitado
                            stack.push(next) //---Añadimos al stack
                            valid = true
                        }
                    }
                break;

            }
        }
        
        if(!valid){ //---En el caso de no poder ir a ningún lado
            stack.pop() //---Volvemos hacia atras
        }
        
    }
    
	for (let y = 0; y < mazeH; y++) {
		for (let x = 0; x < mazeW; x++) {
			cells[y][x].draw(pixelSize)
		}
	}

    //---Pintamos las celdas recorridas e insertamos círculos para observar la creación del laberinto
    for(let s = 0; s < stack.length; s++){
        const el = stack[s]
        //noStroke()
        fill('#EA7317')
        ellipse(
            el.x*pixelSize+(pixelSize/2),
            el.y*pixelSize+(pixelSize/2),
            pixelSize/2,
            pixelSize/2
        )
    }

    //Insertamos el primer cuadrado de solución
    solve[posy][posx].draw(pixelSize)
    for(let s=0; s<solve_stack.length; s++){
        const el = solve_stack[s]
        //noStroke()
        if(el.visited==true){
            fill(255)
            ellipse(
            el.x*pixelSize+(pixelSize/2),
            el.y*pixelSize+(pixelSize/2),
            pixelSize/2,
            pixelSize/2
            )
        }
        
    }

}




function keyPressed(){
    //let previus = solve[posy][posx]
        if(keyCode==LEFT_ARROW && posx>0 && cells[posy][posx].west == false){
            posx -= 1
            
        }
        
        if(keyCode==RIGHT_ARROW && posx<maze-1 && cells[posy][posx].east == false){
          posx += 1
    
        }
        if(keyCode==DOWN_ARROW && posy<maze-1 && cells[posy][posx].south == false){
          posy += 1
    
        }
        if(keyCode==UP_ARROW && posy>0 && cells[posy][posx].north == false){
          posy -= 1
    
        }
        solve[posy][posx].visited=true
        solve_stack.push(solve[posy][posx])
        // if(solve[posy][posx]==solve_stack[solve_stack.length-1]){
        //     solve[posy][posx].visited=false
        //     solve_stack.pop()
        // }
}

// solve_stack.push(solve[posy][posx])
// if(solve_stack.solve[posy][posy]==solve_stack.solve[posy+1][posx]){
//     solve_stack.pop()
// }

function solve_maze(){
    //while(cells[posy][posx].final==false){
        //---Calculamos la cantidad de "salidas" que tenemos
        let cruceposx = posx
        let cruceposy = posy
        let cruce=0
        let flag=0 //---Usamos la bandera como marca y valor para devolvernos (1->sur, 2->norte, 3->este, 4->oeste)
        let avance=0
        if(cells[posy][posx].south == false){cruce+=1}
        if(cells[posy][posx].north == false){cruce+=1}
        if(cells[posy][posx].east == false){cruce+=1}
        if(cells[posy][posx].west == false){cruce+=1}
        
        if(cruce==1){//---Avanzamos en la posición que esté disponible
            console.log("cruce = ",cruce)
            if(cells[posy][posx].south == false && solve[posy+1][posx].visited==false && flag==0){
                posy += 1
                flag=1
                //avance++
                solve[posy][posx].visited=true
                solve_stack.push(solve[posy][posx])
                console.log("sur")
            }
            if(cells[posy][posx].north == false && solve[posy-1][posx].visited==false && flag==0){
                posy -= 1
                flag=2
                //avance++
                solve[posy][posx].visited=true
                solve_stack.push(solve[posy][posx])
                console.log("norte")
            }
            if(cells[posy][posx].east == false && solve[posy][posx+1].visited==false && flag==0){
                posx += 1
                flag=3
                //avance++
                solve[posy][posx].visited=true
                solve_stack.push(solve[posy][posx])
                console.log("este")
            }
            if(cells[posy][posx].west == false && solve[posy][posx-1].visited==false && flag==0){
                posx -= 1
                flag=4
                //avance++
                solve[posy][posx].visited=true
                solve_stack.push(solve[posy][posx])
                console.log("oeste")
            }
        }
        if(cruce==2){//---Avanzamos a la posición que no hayamos visitado
            console.log("cruce = ",cruce)
            if(cells[posy][posx].south == false && solve[posy+1][posx].visited==false && flag==0){
                posy += 1
                flag=1
                //avance++
                solve[posy][posx].visited=true
                solve_stack.push(solve[posy][posx])
                console.log("sur")
            }
            if(cells[posy][posx].north == false && solve[posy-1][posx].visited==false && flag==0 && cells[posy][posx].entry==false){
                posy -= 1
                flag=2
                //avance++
                solve[posy][posx].visited=true
                solve_stack.push(solve[posy][posx])
                console.log("norte")
            }
            if(cells[posy][posx].east == false && solve[posy][posx+1].visited==false && flag==0){
                posx += 1
                flag=3
                //avance++
                solve[posy][posx].visited=true
                solve_stack.push(solve[posy][posx])
                console.log("este")
            }
            if(cells[posy][posx].west == false && solve[posy][posx-1].visited==false && flag==0){
                posx -= 1
                flag=4
                //avance++
                solve[posy][posx].visited=true
                solve_stack.push(solve[posy][posx])
                console.log("oeste")
            }
            //SI LLEGAMOS A UN MURO DEBEMOS DEVOLVERNOS HASTA EL CRUCE ANTERIOR Y AVANZAR EN LA OTRA POSICIÓN
        }
        if(cruce==3){//---
            console.log("cruce = ",cruce)
            if(cells[posy][posx].south == false && solve[posy+1][posx].visited==false && flag!==0){
                posy += 1
                flag=1
                //avance++
                solve[posy][posx].visited=true
                solve_stack.push(solve[posy][posx])
                console.log("sur")
            }
            if(cells[posy][posx].north == false && solve[posy-1][posx].visited==false && flag==0){
                posy -= 1
                flag=2
                //avance++
                solve[posy][posx].visited=true
                solve_stack.push(solve[posy][posx])
                console.log("norte")
            }
            if(cells[posy][posx].east == false && solve[posy][posx+1].visited==false && flag==0){
                posx += 1
                flag=3
                //avance++
                solve[posy][posx].visited=true
                solve_stack.push(solve[posy][posx])
                console.log("este")
            }
            if(cells[posy][posx].west == false && solve[posy][posx-1].visited==false && flag==0){
                posx -= 1
                flag=4
                //avance++
                solve[posy][posx].visited=true
                solve_stack.push(solve[posy][posx])
                console.log("oeste")
            }
            // if(cells[posy][posx].south==true || cells[posy][posx].north==true || cells[posy][posx].east==true || cells[posy][posx].west==true){
            //     switch(flag){
            //         case 1:

            //         break;

            //         case 2:

            //         break;

            //         case 3:

            //         break;

            //         case 4:

            //         break;
            //     }
            // }
            //SI LLEGAMOS A UN MURO DEBEMOS DEVOLVERNOS HASTA EL CRUCE ANTERIOR Y AVANZAR EN LA OTRA POSICIÓN
        }
        if(cruce==4){
            console.log("cruce = ",cruce)
        }
        if(cells[posy][posx].final==true){
            console.log("FINAL DEL LABERINTO")
        }

        
        cruce = 0

        // while(cells[posy][posx].south == false){
        //     posy += 1
        //     solve[posy][posx].visited=true
        //     solve_stack.push(solve[posy][posx])
        // }
        // console.log("no se puede ir más abajo")
        // while(cells[posy][posx].east == false){
        //     posx += 1
        //     solve[posy][posx].visited=true
        //     solve_stack.push(solve[posy][posx])
        // }
    //}
}
