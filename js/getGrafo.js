
var vertices = []
const getGrafo = (datar) => {
    // console.log(datar);
    try {

        data = datar.split(/\r+\n/)
        var tipo = data.splice(0, 1)
        var numVertices = parseInt(data.splice(0, 1), 10)
        var vertices = data;

        // console.log({tipo,numVertices})

        // if (tipo == 0) {
        //     console.log("A estrutura apresentada não é um GRAFO");
        //     return
        // }
    }
    catch (err) {
        console.error("Houve um erro ao tentar ler o arquivo!");
        console.log(err);
    }




    return [inicializaVertices(vertices, numVertices, tipo), tipo];


}

inicializaVertices = (V, numVertices,tipo) => {


    vertices = []
    console.log(numVertices)

    for (let i = 0; i < V.length; i++) {

        let v = V[i].split(' ')
        let vi = v[0]
        let vf = v[1]
        let peso = v[2]

        if(peso == undefined)
            peso = 0


        vAux = {
            vi: parseInt(vi, 10),
            adj: [{ vf: parseInt(vf, 10), peso: parseInt(peso, 10) }],
        }

        let index = vertices.map((v) => { return v.vi }).indexOf(vAux.vi)
        if (index == -1)
            vertices.push(vAux)
        else {
            vertices[index].adj.push(vAux.adj[0])
        }
    }


    //Adiciona os vertices que nao estao declarados no arquivo explicitamente
    // try {
    //     vertices.forEach((v) => {
    //         v.adj.forEach((a) => {
    //             if (getPos(a.vf) == -1) {
    //                 vertices.push({
    //                     vi: a.vf,
    //                     adj: [],
    //                 })
    //             }

    //         })
    //     })
    // } catch (err) {
    //     console.log("Um erro ocorreu", err)
    //     process.exit(0)
    // }



    try {
        for (let i = 0; i < numVertices; i++) {
            if (getPos(i) == -1) {
                vertices.push({
                    vi: i,
                    adj: [],
                })
            }
        }
    } catch (err) {
        console.log("Um erro ocorreu", err)
        process.exit(0)
    }





    // Transformando e grafo
    if (tipo == 1) {
        vertices.forEach((v) => {
            v.adj.forEach((vAdj) => {
                let adj = vertices[getPos(vAdj.vf)]
                
                if (adj.adj.map((aux) => aux.vf).indexOf(v.vi) == -1)
                    adj.adj.push({
                        vf: v.vi,
                        peso: parseInt(v.adj[v.adj.map((aux) => aux.vf).indexOf(adj.vi)].peso, 10)
                    })

            })
        })
    }


    //Verificando se todos os vertices foram criados
    if (vertices.length == numVertices - 1) {

        let vAuxVer = vertices.map(v => v.vi)

        for (let i = 0; i < numVertices; i++) {
            if (vAuxVer.indexOf(i) == -1) {
                vAuxVer.push(i)
                vertices.push({
                    vi: i,
                    adj: []
                })

            }

        }
    }



    //Odernando adjacentes por peso
    vertices.forEach(v => {
        v.adj.sort((a, b) => {
            return a.peso < b.peso ? -1 : a.peso > b.peso ? 1 : 0
        })
    })

    vertices.sort((a, b) => {
        return a.vi < b.vi ? -1 : a.vi > b.vi ? 1 : 0
    })




    //FIM
    return vertices;


}

getPos = (v) => {

    let index = vertices.map((aux) => {
        return aux.vi
    }).indexOf(v)
    return index

}