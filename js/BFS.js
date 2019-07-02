
var grafo = []
var fila = []
const BFS = (grafoNI, u) => {


    [grafo, indexU] = inicializarBFS(grafoNI, u);

    fila = [grafo[indexU]]

    buscaBFS(fila)

    return grafo
    // try {
    //     grafo.forEach((v) => {
    //         // console.log(v)
    //         console.log("Vertice: " + v.vi)
    //         console.log("Cor: " + v.cor)
    //         console.log("distancia " + v.distancia)
    //         console.log("Pai: " + v.pai)
    //         console.log("Adjacentes:")
    //         console.log(v.adj)
    //         console.log("\n");
    //     })
    // } catch (err) {
    //     console.log(err)
    // }

    // console.log(grafo);
}

buscaBFS = (fila) => {
    console.log(fila)
    while (fila.length != 0) {
        let u = fila.shift()
        u.adj.forEach((vAdj) => {
            let adj = getPosV(vAdj.vf)

            if (adj.cor == 'Branco') {
                adj.cor = 'Cinza'
                adj.distancia = u.distancia + 1
                adj.pai = u.vi
                fila.push(adj)
            }
        })

        u.cor = 'Preto'
    }

}

getPosV = (v) => {

    let index = grafo.map((aux) => {
        return aux.vi
    }).indexOf(v)

    if (index == -1) {
        alert("Um erro ocorreu ao tentar buscar um vertice");

    }

    return grafo[index]

}


inicializarBFS = (grafo, u) => {


    let indexU = -1

    let vertices = grafo.map((v, index) => {

        if (v.vi == u) {
            indexU = index
            return {
                ...v,
                cor: 'Cinza',
                distancia: 0,
                pai: 'null',
                peso: v.peso
            }
        }

        else
            return {
                ...v,
                cor: 'Branco',
                distancia: Infinity,
                pai: null,
                peso: v.peso
            }
    })

    if (indexU == -1) {
        console.log("Um erro ocorreu ao buscar o vertice inicial")

    }

    vertices.forEach((v) => {

        v.adj = v.adj.sort((a, b) =>
            a.peso < b.peso ? -1 : a.peso > b.peso ? 1 : 0
        )
    })


    return [vertices, indexU]

}