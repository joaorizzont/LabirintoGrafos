
var grafo = []
var fila = []

var cores = []
var tentativasCor = 0

const Colorir = (grafoNI, u) => {


    [grafo, indexU] = inicializarColorir(grafoNI, u);

    fila = [grafo[indexU]]
    cores = []

    // console.log(fila)

    buscaColorir(fila)

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

buscaColorir = (fila) => {


    while (fila.length != 0) {
        let u = fila.shift()


        do {
            choqueADJ = false
            // console.log(u.cor)
            u.cor = atribuiCor()
            // console.log(u.cor)
            u.adj.forEach(adj => {


                // console.log(grafo[adj.vf].vi, u.vi, grafo[adj.vf].cor, u.cor)
                if (grafo[adj.vf].cor == u.cor)
                    choqueADJ = true

                // console.log(adj)
                if (grafo[adj.vf].cor == 'Branco') {
                    grafo[adj.vf].cor = 'Cinza'
                    grafo[adj.vf].distancia = u.distancia + 1
                    grafo[adj.vf].pai = u.vi
                    fila.push(grafo[adj.vf])
                }
            })
            // console.log(choqueADJ)

        } while (choqueADJ)
        tentativasCor = 0
    }

}

atribuiCor = () => {

    // console.log({ tentativasCor })
    if (tentativasCor == cores.length)
        cores.push(gera_cor())
    // console.log(cores)
    cor = cores[tentativasCor];
    tentativasCor++
    return cor
}



getPosVColorir = (v) => {

    let index = grafo.map((aux) => {
        return aux.vi
    }).indexOf(v)

    if (index == -1) {
        alert("Um erro ocorreu ao tentar buscar um vertice");

    }

    return grafo[index]

}


inicializarColorir = (grafo, u) => {


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


gera_cor = () => {
    var hexadecimais = '0123456789ABCDEF';
    var cor = '#';
    var cor_existe;

    // Pega um número aleatório no array acima

    do {
        cor_existe = false
        cor = '#'
        for (var i = 0; i < 6; i++) {
            //E concatena à variável cor
            cor += hexadecimais[Math.floor(Math.random() * 16)];
        }

        // console.log(cor)
        for (let i = 0; i < cores.length; i++) {
            // console.log({ tamanho: cores.length })
            if (cores[i] == cor)
                cor_existe = true
        }
        // console.log({ cor_existe })
    } while (cor_existe)

    return cor;
}