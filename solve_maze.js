

//----Stack para el camino
const stack = []

function setup(){
//----Indicamos el nodo de entrada
    const first = cells[ryi][rxi] //---Primera celda
    first.visited //---La primera celda la marcamos como visitada
    first.north = false //---Le quitamos el borde superior
    stack.push(first) //---La insertamos en el stack
//----Indicamos el nodo de salida
    const last = cells[ryf][rxf] //---Última celda
    last.visited //---La última celda la marcamos como visitada
    last.south = false //---Le quitamos el borde inferior
    stack.push(last) //---La insertamos en el stack

    
}

function draw(){
    //---Pintamos las celdas recorridas e insertamos círculos para observar la creación del laberinto
    for(let s = 0; s < stack.length; s++){
        const el = stack[s]
        noStroke()
        fill('#EA7317')
        ellipse(
            el.x*pixelSize+(pixelSize/2),
            el.y*pixelSize+(pixelSize/2),
            pixelSize/2,
            pixelSize/2
        )
    }
}