var grafo = []

var S = []
var Q = []
var pai = []
var chave = []



const dijkstra = (grafoNI, ini) => {

    inicializaDijkstra(grafoNI, ini);


    // console.log(chave,S,Q,pai)

    while (verificaQDij()) {

        let u = buscaChaveMinimaDij();
        S[u] = "X"
        grafo[u].adj.forEach(adj => relaxa(u, adj.vf, getPeso(u, adj.vf)))
    }

    let caminhos = []


    
    pai.forEach((p,index) => {
        aux = pai[index];
        caminhos[index] = []
        while(aux != null){
            caminhos[index].push(aux)
            aux = pai[aux]
        } 
        
        caminhos[index].unshift(index)
    })
    console.log({caminhos})
    console.log(pai, chave)




    return pai

}

getPeso = (u, v) => {
    let indexADJ = grafo[u].adj.map(adj => adj.vf).indexOf(v)

    // console.log(indexADJ)

    if (indexADJ != -1) return grafo[u].adj[indexADJ].peso
    else {
        console.log("Erro ao buscar peso dos vertices")
        process.exit(0)
    }


}

relaxa = (u, v, w) => {
    // console.log(u,v,w)
    if (chave[v] > (chave[u] + w)) {
        chave[v] = chave[u] + w
        pai[v] = u
    }
}


verificaQDij = () => {

    let count = 0;

    Q.forEach(q => {
        if (q === '---')
            count++;
    })

    if (count === Q.length)
        return false

    return true

}

inicializaDijkstra = (grafoNI, ini) => {
    grafo = grafoNI
    chave = grafoNI.map((x, index) => x.vi == ini ? 0 : Infinity)
    S = grafoNI.map((x, index) => "---")
    Q = grafoNI.map((x, index) => "X")
    pai = grafoNI.map(x => null)
}

buscaChaveMinimaDij = () => {

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

