
var grafo;
var tempo = 0

const DFS = (grafoNI, u) => {
    tempo = 0

    grafo = inicializaDFS(grafoNI)

    vInicial = grafo.map((v) => {
        return v.vi
    }).indexOf(u)

    if (vInicial == -1) {
        console.log("Vertice inicial não encontrado");

    }

    buscaDFS(grafo[vInicial]);

    grafo.forEach((v => v.cor == 'Branco' ? buscaDFS(v) : null))



    return grafo
    // grafo.forEach((v) => {
    //     console.log("Vertice: " + v.vi)
    //     console.log("Cor: " + v.cor)
    //     console.log("Tempo de descoberta: " + v.tempoDescoberta)
    //     console.log("Tempo de Finalizaçao: " + v.tempoFinalizacao)
    //     console.log("Adjacentes:")
    //     console.log(v.adj)
    //     console.log("\n");
    // })
}

inicializaDFS = (grafo) => {

    let auxGrafo = grafo.map(v => {
        return {
            ...v,
            cor: 'Branco',
            tempoDescoberta: 0,
            tempoFinalizacao: 0
        }
    })

    auxGrafo.forEach((v) => {
        v.adj = v.adj.sort((a, b) =>
            a.peso < b.peso ? -1 : a.peso > b.peso ? 1 : 0
        )
    })

    return auxGrafo



}

getPosVerticeDFS = (v) => {

    let index = grafo.map((aux) => {
        return aux.vi
    }).indexOf(v)

    if (index == -1) {
        console.log("Vertice inicial nao encontrado"); 
    }

    return grafo[index]

}

buscaDFS = (v) => {
    // console.log(tempo)
    tempo++;
    v.cor = 'Cinza'
    v.tempoDescoberta = tempo;


    for (let i = 0; i < v.adj.length; i++) {
        let aux = getPosVerticeDFS(v.adj[i].vf)
        if (aux.cor == "Branco")
            buscaDFS(aux)
    }

    v.cor = 'Preto'
    tempo++;
    v.tempoFinalizacao = tempo;

}