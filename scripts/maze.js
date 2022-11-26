var maze = prompt("Ingrese el tamaño laberinto","10")
//---Ancho y alto del recuadro que contiene al laberinto
const M = 800
const W = M
const H = M

//const maze = RS
const mazeW = maze
const mazeH = maze

let posx
let posy

var to_solve = 0

   //---Cantidad de celdas (ancho y alto) que tiene el laberinto
const cells = []
//---Stack
const stack = []

const solve = []
const solve_stack = []

//---Tamaño de las celdas del laberinto
const pixelSize = M/maze

//Función para realizar el setup/inicialización del laberinto
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

    if(stack.length > 0){
        let current = stack[stack.length-1]

        let valid = false //---El camino elegido es valido/no valido
        let checks = 0 //---No buscar más caminos si es que ya revisamos norte, sur, este y oeste
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
        fill('#EA7317')
        ellipse(
            el.x*pixelSize+(pixelSize/2),
            el.y*pixelSize+(pixelSize/2),
            pixelSize/2,
            pixelSize/2
        )
    }

    //Insertamos el primer cuadrado de solución (Cuadrado verde)
    solve[posy][posx].draw(pixelSize)
    //Vamos dibujando el camino de la solución del laberinto
    for(let s=0; s<solve_stack.length; s++){
        const el = solve_stack[s]
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

    //Si se presionó el botón de solucionar laberinto o este había sido presionado, se ejecuta la sentencia
    if(to_solve == 1){
        //Verificamos si la celda actual es la celda final, si es así, terminamos el proceso
        if(cells[posy][posx].final==true){
            console.log("Proceso Finalizado")
            to_solve = 0
        }
        //Si no es celda final, debemos seguir con el proceso
        else{
                //Verificamos si podemos ir hacia el sur
                if(cells[posy][posx].south == false && solve[posy+1][posx].visited==false){
                    posy += 1                           //Nos movemos al sur
                    solve[posy][posx].visited=true      //Marcamos como celda visitada
                    solve_stack.push(solve[posy][posx]) //Insertamos la celda en el stack de solución
                    return 0                            //Acabamos con la "verificación"
                }
                //Verificamos si podemos ir al norte, pero primero, debemos verificar si la celda es celda de entrada o primera celda, si es así, no podemos viajar al norte
                if(cells[posy][posx].entry == false){
                    //Ahora verificamos si es posible ir al norte, verificando mediante los índices (posiciones) de las celdas
                    if(cells[posy][posx].north == false && solve[posy-1][posx].visited==false){
                        posy -= 1                           //Nos movemos al norte
                        solve[posy][posx].visited=true      //Marcamos como celda visitada
                        solve_stack.push(solve[posy][posx]) //Insertamos la celda en el stack de solución
                        return 0                            //Acabamos con la "verificación"
                    }
                }
                //Verificamos si podemos ir al este
                if(cells[posy][posx].east == false && solve[posy][posx+1].visited==false){
                    posx += 1                           //Nos movemos al este
                    solve[posy][posx].visited=true      //Marcamos como celda visitada
                    solve_stack.push(solve[posy][posx]) //Insertamos la celda en el stack de solución
                    return 0                            //Acabamos con la "verificación"
                }
                //Verificamos si podemos ir al oeste
                if(cells[posy][posx].west == false && solve[posy][posx-1].visited==false){
                    posx -= 1                           //Nos movemos al oeste
                    solve[posy][posx].visited=true      //Marcamos como celda visitada
                    solve_stack.push(solve[posy][posx]) //Insertamos la celda en el stack de solución
                    return 0                            //Acabamos con la "verificación"
                }
                //Si no podemos viajar a ningún lado, es porque llegamos a un muro y debemos devolvernos, este else contempla ese caso
                //y el caso en que ya nos estemos devolviendonos
                else{
                    var largo = solve_stack.length-1        //Obtenemos el largo del stack
                    posy = solve_stack[largo-1]["y"]    //Nos movemos a la celda anterior
                    posx = solve_stack[largo-1]["x"]    //Nos movemos a la celda anterior
                    solve_stack.pop()                   //Sacamos la última celda que no nos sirve
                    return 0                            //Acabamos con la "verificación"
                }
                            
        }

    }

}
//Función que se utiliza para indicar a la función draw de que debe comenzar a resovler el laberinto
function solve_maze(){
    to_solve = 1
}

//Función que permite refrescar la página
function refresh_page(){
    location.reload()
}