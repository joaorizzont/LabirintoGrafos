

var grafoINI
var grafoDFS = []
var grafoDFST = []
var arestasT = []

var conexa = []




var cores = []
var nComponentes = 0

const forteConexa = (grafoINI1) => {

    corAtual = gera_cor()

    tempo = 0
    grafoINI = grafoINI1;
    grafoDFS = DFS(grafoINI1, grafoINI1[0].vi);

    gerarTransposto();
    ordenarPorDescoberta();


    console.log(grafoDFST)
    grafoDFST.forEach(v => {
        if (v.cor == "Branco")
            buscaTransposta(v)
    })

    return (grafoDFST)
}


buscaTransposta = (vertice) => {

    vertice.cor = cores[nComponentes]

    vertice.adj.forEach(v => {
        adjv = grafoDFST.filter(f => f.vi == v.vf)
        adj = adjv[0]
        if (adj.cor == "Branco") {
            conexa.push(adj)
            buscaTransposta(adj)
        }
    })

    gera_cor();
    nComponentes++;


}

gerarTransposto = () => {
    grafoDFS.forEach((v, index) => {
        v.adj.forEach(a => {
            arestasT.push({
                vi: a.vf,
                vf: index,
                peso: a.peso
            })
        })
    })
}

ordenarPorDescoberta = () => {

    grafoDFST = grafoDFS.sort((a, b) => {
        // tempo_1 = a.tempoDescoberta / a.tempoFinalizacao
        // tempo_2 = b.tempoDescoberta / b.tempoFinalizacao
        // return tempo_1 < tempo_2 ? 1 : tempo_1 > tempo_2 ? -1 : 0

        return a.tempoFinalizacao < b.tempoFinalizacao ?
            1 : a.tempoFinalizacao > b.tempoFinalizacao ?
                -1 : 0

    })

    grafoDFST.forEach(e => {

        e.adj = []
        e.cor = "Branco"
        e.tempoDescoberta = 0
        e.tempoFinalizacao = 0
        e.adj = arestasT
            .filter(f => e.vi == f.vi)
            .sort((a, b) => a.peso < b.peso ? -1 : a.peso > b.peso ? 1 : 0)
            .map(v => {
                return {
                    vf: v.vf,
                    peso: v.peso
                }
            })
    })
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

    cores.push(cor);

    return cor;
}