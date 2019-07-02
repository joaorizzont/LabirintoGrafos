var vertice = []
var chave = []
var pai = []
var Q = []
var X = []
var grafo = null
var vIni

const prim = (grafoNI, ini) => {
    Q = []
    X = []
    chave = []
    pai = []
    vertice = []


    grafo = grafoNI
    vIni = ini
    return inicializarPRIM(grafoNI, ini)
}

inicializarPRIM = (grafoNI, ini) => {

    grafoNI.forEach((v, index) => {
        chave[index] = Infinity,
            pai[index] = null
    });

    let index = grafoNI.map(v => v.vi).indexOf(ini)

    if (index == -1) {
        console.log("Um erro ocorreu ao tentar buscar o vertice inicial")
    }

    chave[index] = 0
    Q = []

    for (let i = 0; i < grafoNI.length; i++)
        Q[i] = "X"



    return buscaPRIM()

}


buscaPRIM = () => {
    while (verificaQ(Q)) {
        let u = buscaChaveMinima(chave, Q)
        let vu = grafo[u]


        if (u != vIni)
            X.push({ u, pai: pai[u] })

        vu.adj.forEach(adj => {


            if (Q[adj.vf] === "X" && adj.peso < chave[adj.vf]) {
                chave[adj.vf] = adj.peso;
                pai[adj.vf] = vu.vi
            }
        })
    }

    return X
}


verificaQ = (Q) => {

    let count = 0;

    Q.forEach(q => {
        if (q === '---')
            count++;
    })

    if (count === Q.length)
        return false

    return true

}

buscaChaveMinima = () => {

    let minimo = null
    let mIndex = null


    chave.forEach((c, index) => {


        if ((c < minimo || minimo == null) && Q[index] == "X") {
            minimo = c
            mIndex = index
        }

    })

    Q[mIndex] = "---"
    return mIndex

}

getPosVertice = (v) => {

    let index = grafo.map((aux) => {
        return aux.vi
    }).indexOf(v)

    if (index == -1) {
        console.log("Um erro ocorreu ao tentar buscar um vertice");
        process.exit(0)
    }

    return grafo[index]

}