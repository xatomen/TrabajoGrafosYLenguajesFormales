var maze = prompt("Ingrese tamaño laberinto","5")
//---Ancho y alto del recuadro que contiene al laberinto
const M = 800
const W = M
const H = M

//const maze = RS
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



/*Función para manejar con las flechas (Para ir probando)*/
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
}

/*Implementación recursiva para solucionar el laberinto*/
function solve_maze(){  /*Cruce = N° de posibilidades de avanzar a otra celda*/
    var cruce=0
    //Verificamos si la celda actual es final
    if(cells[posy][posx].final==true){
        console.log("Proceso Finalizado")
    }
    else{
        //Calculamos cantidad de cruces
        if(cells[posy][posx].south == false){cruce+=1}
        if(cells[posy][posx].north == false){cruce+=1}
        if(cells[posy][posx].east == false){cruce+=1}
        if(cells[posy][posx].west == false){cruce+=1}
        console.log("Cruces: ",cruce)
        //Elegimos el camino a partir de los cruces
        if(cruce==0 || cruce==1){//No podemos seguir avanzando porque hay muro
            return 0
        }
        /*------HALLAR LA FORMA DE DEVOLVERSE AL ULTIMO NODO Y MARCAR EN OTRO COLOR LOS NODOS "QUE NO SE VAN A UTILIZAR" O "YA RECORRIDOS"------*/
        else{
            if(cells[posy][posx].south == false && solve[posy+1][posx].visited==false){
                                posy += 1
                                solve[posy][posx].visited=true
                                solve_stack.push(solve[posy][posx])
                                console.log("sur")
                                return solve_maze()
            }
            if(cells[posy][posx].north == false && solve[posy-1][posx].visited==false){
                                posy -= 1
                                solve[posy][posx].visited=true
                                solve_stack.push(solve[posy][posx])
                                console.log("norte")
                                return solve_maze()
            }
            if(cells[posy][posx].east == false && solve[posy][posx+1].visited==false){
                                posx += 1
                                solve[posy][posx].visited=true
                                solve_stack.push(solve[posy][posx])
                                console.log("este")
                                return solve_maze()
            }
            if(cells[posy][posx].west == false && solve[posy][posx-1].visited==false){
                                posx -= 1
                                solve[posy][posx].visited=true
                                solve_stack.push(solve[posy][posx])
                                console.log("oeste")
                                return solve_maze()
            }
        }
    }
    
}

