

var grafo = [];

const gerarLabirinto = (n) => {
    grafo = []
    inicializarLabirinto(n)


    grafo.forEach(v => {
        v.adj.sort((a, b) => {
            return a.peso < b.peso ? -1 : a.peso > b.peso ? 1 : 0
        })
    })


    normalizarMapa(n)
    console.log(grafo)

    return grafo;
}

inicializarLabirinto = (n) => {

    MULT = 100
    for (let i = 0; i < n * n; i++) {
        v = {
            vi: i,
            adj: []
        }
        if (i == 0) {

            v.adj.push({ vf: i + 1, peso: Math.floor(Math.random() * MULT) })
            v.adj.push({ vf: i + n, peso: Math.floor(Math.random() * MULT) })

        } else if ((i + 1) % n == 0 && i != n - 1 && i != (n * n) - 1) {

            v.adj.push({ vf: i - 1, peso: Math.floor(Math.random() * MULT) })
            v.adj.push({ vf: i + n, peso: Math.floor(Math.random() * MULT) })
            v.adj.push({ vf: i - n, peso: Math.floor(Math.random() * MULT) })
        } else if ((i % n == 0 && i != (n * n) - n)) {
            v.adj.push({ vf: i - n, peso: Math.floor(Math.random() * MULT) })
            v.adj.push({ vf: i + 1, peso: Math.floor(Math.random() * MULT) })
            v.adj.push({ vf: i + n, peso: Math.floor(Math.random() * MULT) })

        } else if (i == (n * n) - n) {

            v.adj.push({ vf: i - n, peso: Math.floor(Math.random() * MULT) })
            v.adj.push({ vf: i + 1, peso: Math.floor(Math.random() * MULT) })

        } else if (i == (n * n) - 1) {

            v.adj.push({ vf: i - n, peso: Math.floor(Math.random() * MULT) })
            v.adj.push({ vf: i - 1, peso: Math.floor(Math.random() * MULT) })
        } else if (i < n - 1 && i != 0) {

            v.adj.push({ vf: i + 1, peso: Math.floor(Math.random() * MULT) })
            v.adj.push({ vf: i - 1, peso: Math.floor(Math.random() * MULT) })
            v.adj.push({ vf: i + n, peso: Math.floor(Math.random() * MULT) })

        } else if (i > (n * n) - n && i != (n * n) - 1) {

            v.adj.push({ vf: i + 1, peso: Math.floor(Math.random() * MULT) })
            v.adj.push({ vf: i - 1, peso: Math.floor(Math.random() * MULT) })
            v.adj.push({ vf: i - n, peso: Math.floor(Math.random() * MULT) })
        } else if (i == n - 1) {

            v.adj.push({ vf: i - 1, peso: Math.floor(Math.random() * MULT) })
            v.adj.push({ vf: i + n, peso: Math.floor(Math.random() * MULT) })
        } else {

            v.adj.push({ vf: i - 1, peso: Math.floor(Math.random() * MULT) })
            v.adj.push({ vf: i + n, peso: Math.floor(Math.random() * MULT) })
            v.adj.push({ vf: i + 1, peso: Math.floor(Math.random() * MULT) })
            v.adj.push({ vf: i - n, peso: Math.floor(Math.random() * MULT) })
        }


        grafo.push(v)

    }

}


normalizarMapa = (n) => {

    for (let i = 0; i < n * n; i++)
        for (let j = 0; j < grafo[i].adj.length; j++)
            for (let k = 0; k < grafo[grafo[i].adj[j].vf].adj.length; k++)
                if (grafo[grafo[i].adj[j].vf].adj[k].vf == grafo[i].vi)
                    grafo[grafo[i].adj[j].vf].adj[k].peso = grafo[i].adj[j].peso

}


const modelaMapaLabirinto = (grafoPrim) => {

    // console.log(grafo,grafoPrim)

    novoGrafo = new Array(grafoPrim.length + 1)

    grafoPrim.forEach((n) => {

        let peso = Math.floor(Math.random() * 10)

        if (novoGrafo[n.pai] == undefined) {
            novoGrafo[n.pai] = {
                vi: n.pai,
                adj: [{
                    vf: n.u,
                    peso
                }]
            }
        } else {

            novoGrafo[n.pai].adj.push({
                vf: n.u,
                peso
            })

        }

    })


    for (let i = 0; i < grafoPrim.length + 1; i++)
        if (novoGrafo[i] == undefined)
            novoGrafo[i] = {
                vi: i,
                adj: []
            }

    // console.log(novoGrafo)

    novoGrafoTransformado = transformarEmGrafo(novoGrafo)
    // console.log(novoGrafoTransformado)
    return transformarEmGrafo(novoGrafo)


}

transformarEmGrafo = (novoGrafo) => {

    console.log(novoGrafo)
    novoGrafo.forEach((v) => {
        v.adj.forEach((vAdj) => {
            let adj = novoGrafo[vAdj.vf]
            // console.log(v, vAdj.vf, adj)
            if (adj.adj.map((aux) => aux.vf).indexOf(v.vi) == -1)
                adj.adj.push({
                    vf: v.vi,
                    peso: parseInt(v.adj[v.adj.map((aux) => aux.vf).indexOf(adj.vi)].peso, 10)
                })

        })
    })

    return novoGrafo
}


const verificaAdjacencia = (novoGrafo, i, v) => {



    for (let j = 0; j < novoGrafo[i].adj.length; j++)
        if (novoGrafo[i].adj[j].vf == v)
            return true







}



buscaCaminhoComBFS = (grafoNI, u, v) => {

    grafoB = BFS(grafoNI, u);

    if (grafoB[v].pai == null)
        alert("Vertice \"v\" é inalcançavel a partir de u")
    else {

        let aux = grafoB[v]
        let caminho = []

        do {
            console.log(aux)
            caminho.push({ v: aux.vi, pai: aux.pai })
            aux = grafoB[aux.pai]

        } while (aux != null)
        return caminho

    }
}

const verificaLigaçao = (b, u, v) => {

    for (let i = 0; i < b.length; i++)
        if ((u == b[i].v && v == b[i].pai) || (v == b[i].v && u == b[i].pai))
            return true

    return false

}

const verificaNo = (b, u) => {

    for (let i = 0; i < b.length; i++)
        if ((u == b[i].v || u == b[i].pai))
            return true

    return false

}


const desenharNoCanvas = (novoGrafo, n) => {


    let rBusca = buscaCaminhoComBFS(novoGrafo, 0, (n * n) - 1)


    dv = (2 * n)
    canvasSize = 700
    block = Math.floor(canvasSize / dv);


    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = 'black  ';
    ctx.fillRect(10, 10, canvasSize, canvasSize);


    console.log(n)



    x = 20
    y = 20
    for (let i = 0; i < novoGrafo.length; i++) {

        if (i == 0 || i == novoGrafo.length - 1) {
            ctx.fillStyle = i == 0 ? "green" : "blue"
            ctx.fillRect(x, y, block, block)

            ctx.fillStyle = 'red';
            ctx.font = '17px Trebuchet MS';
            ctx.fillText(novoGrafo[i].vi, x + block / 2, y + block / 2);
        } else {

            ctx.fillStyle = verificaNo(rBusca, i) ? "red" : "grey"
            ctx.fillRect(x, y, block, block)

            ctx.fillStyle = 'white';
            ctx.font = '17px Trebuchet MS';
            ctx.fillText(novoGrafo[i].vi, x + block / 2, y + block / 2);
        }





        // if (verificaAdjacencia(novoGrafo, i, i + 1)) {
        //     ctx.fillStyle = 'grey';
        //     ctx.fillRect(x + block, y, block, block)
        //     ctx.fillText(novoGrafo[i].vi, x + block, y);
        // }
        if (i == 0) {

            if (verificaAdjacencia(novoGrafo, i, i + 1)) {

                ctx.fillStyle = verificaLigaçao(rBusca, i, i + 1) ? 'red' : 'grey';
                ctx.fillRect(x + block, y, block, block)
                ctx.fillStyle = 'white';
                ctx.font = '17px Trebuchet MS';
                ctx.fillText(novoGrafo[i].vi, x + block / 2, y + block / 2);



            }
            if (verificaAdjacencia(novoGrafo, i, i + n)) {
                ctx.fillStyle = verificaLigaçao(rBusca, i, i + n) ? 'red' : 'grey';
                ctx.fillRect(x, y + block, block, block)
                ctx.fillStyle = 'white';
                ctx.font = '17px Trebuchet MS';
                ctx.fillText(novoGrafo[i].vi, x + block / 2, y + block / 2);
            }

            // v.adj.push({ vf: i + 1, peso: Math.floor(Math.random() * MULT) })
            // v.adj.push({ vf: i + n, peso: Math.floor(Math.random() * MULT) })

        } else if ((i + 1) % n == 0 && i != n - 1 && i != (n * n) - 1) {

            if (verificaAdjacencia(novoGrafo, i, i - 1)) {
                ctx.fillStyle = verificaLigaçao(rBusca, i, i - 1) ? 'red' : 'grey';
                ctx.fillRect(x - block, y, block, block)
                ctx.fillStyle = 'white';
                ctx.font = '17px Trebuchet MS';
                ctx.fillText(novoGrafo[i].vi, x + block / 2, y + block / 2);
            }
            if (verificaAdjacencia(novoGrafo, i, i - n)) {
                ctx.fillStyle = verificaLigaçao(rBusca, i, i - n) ? 'red' : 'grey';
                ctx.fillRect(x, y - block, block, block)
                ctx.fillStyle = 'white';
                ctx.font = '17px Trebuchet MS';
                ctx.fillText(novoGrafo[i].vi, x + block / 2, y + block / 2);
            }
            if (verificaAdjacencia(novoGrafo, i, i + n)) {
                ctx.fillStyle = verificaLigaçao(rBusca, i, i + n) ? 'red' : 'grey';
                ctx.fillRect(x, y + block, block, block)
                ctx.fillStyle = 'white';
                ctx.font = '17px Trebuchet MS';
                ctx.fillText(novoGrafo[i].vi, x + block / 2, y + block / 2);
            }

            // v.adj.push({ vf: i - 1, peso: Math.floor(Math.random() * MULT) })
            // v.adj.push({ vf: i + n, peso: Math.floor(Math.random() * MULT) })
            // v.adj.push({ vf: i - n, peso: Math.floor(Math.random() * MULT) })
        } else if ((i % n == 0 && i != (n * n) - n)) {

            if (verificaAdjacencia(novoGrafo, i, i - n)) {
                ctx.fillStyle = verificaLigaçao(rBusca, i, i - n) ? 'red' : 'grey';
                ctx.fillRect(x, y - block, block, block)
                ctx.fillStyle = 'white';
                ctx.font = '17px Trebuchet MS';
                ctx.fillText(novoGrafo[i].vi, x + block / 2, y + block / 2);
            }
            if (verificaAdjacencia(novoGrafo, i, i + 1)) {
                ctx.fillStyle = verificaLigaçao(rBusca, i, i + 1) ? 'red' : 'grey';
                ctx.fillRect(x + block, y, block, block)
                ctx.fillStyle = 'white';
                ctx.font = '17px Trebuchet MS';
                ctx.fillText(novoGrafo[i].vi, x + block / 2, y + block / 2);
            }
            if (verificaAdjacencia(novoGrafo, i, i + n)) {
                ctx.fillStyle = verificaLigaçao(rBusca, i, i + n) ? 'red' : 'grey';
                ctx.fillRect(x, y + block, block, block)
                ctx.fillStyle = 'white';
                ctx.font = '17px Trebuchet MS';
                ctx.fillText(novoGrafo[i].vi, x + block / 2, y + block / 2);
            }



            // v.adj.push({ vf: i - n, peso: Math.floor(Math.random() * MULT) })
            // v.adj.push({ vf: i + 1, peso: Math.floor(Math.random() * MULT) })
            // v.adj.push({ vf: i + n, peso: Math.floor(Math.random() * MULT) })

        } else if (i == (n * n) - n) {
            if (verificaAdjacencia(novoGrafo, i, i - n)) {
                ctx.fillStyle = verificaLigaçao(rBusca, i, i - n) ? 'red' : 'grey';
                ctx.fillRect(x, y - block, block, block)
                ctx.fillStyle = 'white';
                ctx.font = '17px Trebuchet MS';
                ctx.fillText(novoGrafo[i].vi, x + block / 2, y + block / 2);
            }
            if (verificaAdjacencia(novoGrafo, i, i + 1)) {
                ctx.fillStyle = verificaLigaçao(rBusca, i, i + 1) ? 'red' : 'grey';
                ctx.fillRect(x + block, y, block, block)
                ctx.fillStyle = 'white';
                ctx.font = '17px Trebuchet MS';
                ctx.fillText(novoGrafo[i].vi, x + block / 2, y + block / 2);
            }

            // v.adj.push({ vf: i - n, peso: Math.floor(Math.random() * MULT) })
            // v.adj.push({ vf: i + 1, peso: Math.floor(Math.random() * MULT) })

        } else if (i == (n * n) - 1) {

            if (verificaAdjacencia(novoGrafo, i, i - n)) {
                ctx.fillStyle = verificaLigaçao(rBusca, i, i - n) ? 'red' : 'grey';
                ctx.fillRect(x, y - block, block, block)
                ctx.fillStyle = 'white';
                ctx.font = '17px Trebuchet MS';
                ctx.fillText(novoGrafo[i].vi, x + block / 2, y + block / 2);
            }
            if (verificaAdjacencia(novoGrafo, i, i - 1)) {
                ctx.fillStyle = verificaLigaçao(rBusca, i, i - 1) ? 'red' : 'grey';
                ctx.fillRect(x - block, y, block, block)
                ctx.fillStyle = 'white';
                ctx.font = '17px Trebuchet MS';
                ctx.fillText(novoGrafo[i].vi, x + block / 2, y + block / 2);
            }

            // v.adj.push({ vf: i - n, peso: Math.floor(Math.random() * MULT) })
            // v.adj.push({ vf: i - 1, peso: Math.floor(Math.random() * MULT) })
        } else if (i < n - 1 && i != 0) {

            if (verificaAdjacencia(novoGrafo, i, i + 1)) {
                ctx.fillStyle = verificaLigaçao(rBusca, i, i + 1) ? 'red' : 'grey';
                ctx.fillRect(x + block, y, block, block)
                ctx.fillStyle = 'white';
                ctx.font = '17px Trebuchet MS';
                ctx.fillText(novoGrafo[i].vi, x + block / 2, y + block / 2);
            }
            if (verificaAdjacencia(novoGrafo, i, i - 1)) {
                ctx.fillStyle = verificaLigaçao(rBusca, i, i - 1) ? 'red' : 'grey';
                ctx.fillRect(x - block, y, block, block)
                ctx.fillStyle = 'white';
                ctx.font = '17px Trebuchet MS';
                ctx.fillText(novoGrafo[i].vi, x + block / 2, y + block / 2);
            }
            if (verificaAdjacencia(novoGrafo, i, i + n)) {
                ctx.fillStyle = verificaLigaçao(rBusca, i, i + n) ? 'red' : 'grey';
                ctx.fillRect(x, y + block, block, block)
                ctx.fillStyle = 'white';
                ctx.font = '17px Trebuchet MS';
                ctx.fillText(novoGrafo[i].vi, x + block / 2, y + block / 2);
            }

            // v.adj.push({ vf: i + 1, peso: Math.floor(Math.random() * MULT) })
            // v.adj.push({ vf: i - 1, peso: Math.floor(Math.random() * MULT) })
            // v.adj.push({ vf: i + n, peso: Math.floor(Math.random() * MULT) })

        } else if (i > (n * n) - n && i != (n * n) - 1) {

            if (verificaAdjacencia(novoGrafo, i, i + 1)) {
                ctx.fillStyle = verificaLigaçao(rBusca, i, i + 1) ? 'red' : 'grey';
                ctx.fillRect(x + block, y, block, block)
                ctx.fillStyle = 'white';
                ctx.font = '17px Trebuchet MS';
                ctx.fillText(novoGrafo[i].vi, x + block / 2, y + block / 2);
            }
            if (verificaAdjacencia(novoGrafo, i, i - 1)) {
                ctx.fillStyle = verificaLigaçao(rBusca, i, i - 1) ? 'red' : 'grey';
                ctx.fillRect(x - block, y, block, block)
                ctx.fillStyle = 'white';
                ctx.font = '17px Trebuchet MS';
                ctx.fillText(novoGrafo[i].vi, x + block / 2, y + block / 2);
            }
            if (verificaAdjacencia(novoGrafo, i, i - n)) {
                ctx.fillStyle = verificaLigaçao(rBusca, i, i - n) ? 'red' : 'grey';
                ctx.fillRect(x, y - block, block, block)
                ctx.fillStyle = 'white';
                ctx.font = '17px Trebuchet MS';
                ctx.fillText(novoGrafo[i].vi, x + block / 2, y + block / 2);
            }

            // v.adj.push({ vf: i + 1, peso: Math.floor(Math.random() * MULT) })
            // v.adj.push({ vf: i - 1, peso: Math.floor(Math.random() * MULT) })
            // v.adj.push({ vf: i - n, peso: Math.floor(Math.random() * MULT) })
        } else if (i == n - 1) {

            if (verificaAdjacencia(novoGrafo, i, i - 1)) {
                ctx.fillStyle = verificaLigaçao(rBusca, i, i - 1) ? 'red' : 'grey';
                ctx.fillRect(x - block, y, block, block)
                ctx.fillStyle = 'white';
                ctx.font = '17px Trebuchet MS';
                ctx.fillText(novoGrafo[i].vi, x + block / 2, y + block / 2);
            }
            if (verificaAdjacencia(novoGrafo, i, i + n)) {
                ctx.fillStyle = verificaLigaçao(rBusca, i, i + n) ? 'red' : 'grey';
                ctx.fillRect(x, y + block, block, block)
                ctx.fillStyle = 'white';
                ctx.font = '17px Trebuchet MS';
                ctx.fillText(novoGrafo[i].vi, x + block / 2, y + block / 2);
            }

            // v.adj.push({ vf: i - 1, peso: Math.floor(Math.random() * MULT) })
            // v.adj.push({ vf: i + n, peso: Math.floor(Math.random() * MULT) })
        } else {
            if (verificaAdjacencia(novoGrafo, i, i - 1)) {
                ctx.fillStyle = verificaLigaçao(rBusca, i, i - 1) ? 'red' : 'grey';
                ctx.fillRect(x - block, y, block, block)
                ctx.fillStyle = 'white';
                ctx.font = '17px Trebuchet MS';
                ctx.fillText(novoGrafo[i].vi, x + block / 2, y + block / 2);
            }
            if (verificaAdjacencia(novoGrafo, i, i - n)) {
                ctx.fillStyle = verificaLigaçao(rBusca, i, i - n) ? 'red' : 'grey';
                ctx.fillRect(x, y - block, block, block)
                ctx.fillStyle = 'white';
                ctx.font = '17px Trebuchet MS';
                ctx.fillText(novoGrafo[i].vi, x + block / 2, y + block / 2);
            }
            if (verificaAdjacencia(novoGrafo, i, i + 1)) {
                ctx.fillStyle = verificaLigaçao(rBusca, i, i + 1) ? 'red' : 'grey';
                ctx.fillRect(x + block, y, block, block)
                ctx.fillStyle = 'white';
                ctx.font = '17px Trebuchet MS';
                ctx.fillText(novoGrafo[i].vi, x + block / 2, y + block / 2);
            }
            if (verificaAdjacencia(novoGrafo, i, i + n)) {
                ctx.fillStyle = verificaLigaçao(rBusca, i, i + n) ? 'red' : 'grey';
                ctx.fillRect(x, y + block, block, block)
                ctx.fillStyle = 'white';
                ctx.font = '17px Trebuchet MS';
                ctx.fillText(novoGrafo[i].vi, x + block / 2, y + block / 2);
            }



            // v.adj.push({ vf: i - 1, peso: Math.floor(Math.random() * MULT) })
            // v.adj.push({ vf: i + n, peso: Math.floor(Math.random() * MULT) })
            // v.adj.push({ vf: i + 1, peso: Math.floor(Math.random() * MULT) })
            // v.adj.push({ vf: i - n, peso: Math.floor(Math.random() * MULT) })
        }


        console.log(x, y, i, block)
        if ((i + 1) % n == 0) {
            x = 20
            y += block * 2;
        } else {
            x += block * 2;
        }
    }




}