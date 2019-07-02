
var nodes, edges, options, network = null

var tipoGrafo

var hide = false

const removeAzuis = () => {
    edges.map(e => {

        if (e.color.color == "#2b7ce9" && hide == false) {
            edges.update({ id: e.id, hidden: true })
        } else {

            edges.update({ id: e.id, hidden: false })
        }
    })

    hide = !hide
}


const printBasicGraph = (grafo, tipo) => {''

    // { id: 1, label: 'Node 1' },

    // { from: 1, to: 2, title: "" },
    tipoGrafo = tipo

    let nd = grafo.map((it, id) => { return { id, label: it.vi.toString() } });


    let edgs = []
    let adj = grafo.map(it => it.adj)
    adj.forEach((it, index) => {
        it.forEach(sadj => {
            edgs.push({
                from: index,
                to: sadj.vf,
                label: sadj.peso.toString(),
                color:
                {
                    color: "#2b7ce9"
                },
                hidden: false
            })
        })
    })


    // create an array with node
    nodes = new vis.DataSet(nd);

    // create an array with edges
    edges = new vis.DataSet(edgs);

    // create a network
    var container = document.getElementById('network');

    // provide the data in the vis format
    var data = {
        nodes: nodes,
        edges: edges
    };

    var options = tipo == 1 || tipo == "1" ?
        {
            "edges": {
                "smooth": false
            },
            "physics": {
                "repulsion": {
                    "centralGravity": 0,
                    "springLength": 165,
                    "springConstant": 0,
                    "damping": 1
                },
                "minVelocity": 0.75,
                "solver": "repulsion",
                "timestep": 1
            }
        } :
        {
            "edges": {
                "smooth": false,
                "arrows": "to"
            },
            "physics": {
                "repulsion": {
                    "centralGravity": 0,
                    "springLength": 165,
                    "springConstant": 0,
                    "damping": 1
                },
                "minVelocity": 0.75,
                "solver": "repulsion",
                "timestep": 1
            }

        }



    // verificarLigacoes()

    // initialize your network!
    network = new vis.Network(container, data, options);
}


const reset = (grafo) => {

    nodes.clear()
    nodes.add(grafo.map((it, id) => { return { id, label: it.vi.toString() } }))


    edges.clear()
    let edgs = []
    let adj = grafo.map(it => it.adj)
    // adj.forEach((it, index) => {
    //     it.forEach(sadj => {
    //         edgs.push({ from: index, to: sadj.vf, label: sadj.peso.toString() })
    //     })
    // })

    adj.forEach((it, index) => {
        it.forEach(sadj => {
            edgs.push({ from: index, to: sadj.vf, label: sadj.peso.toString() })
        })
    })
    edges.add(edgs)



}

// const reprintGraphDFS = (result) => {
//     nodes = nodes.map((nd, index) => {
//         nd.label = `${index}\n ${result[index].tempoDescoberta}/${result[index].tempoFinalizacao}`

//         return nd
//     })

//     nodes = new vis.DataSet(nodes)
//     network.setData({ nodes, edges })

// }


const reprintFConexa = (grafo) => {

    nodes.map(n => {
        grafo.map(n2 => {
            // console.log(n, n2)
            if (n.id == n2.vi) {
               
                nodes.update({
                    id: n.id,
                    color: {
                        background: n2.cor
                    }
                })
            }

        })
    })


}

const reprintGraphBFS = (result2) => {
    edgs = result2.map((e, index) => {
        return {
            from: e.pai,
            to: e.vi,
        }

    })

    edges.map(e => {
        edgs.map(e2 => {
            if (e.to == e2.to && e.from == e2.from) {
                edges.update({ id: e.id, color: { color: "#ff0000" }, arrows: 'to' })
            } else

                if (e.to == e2.from && e.from == e2.to) {
                    edges.remove({ id: e.id })
                }


        })
    })










    // nodes = new vis.DataSet(nodes)
    // edges = new vis.DataSet(edges)
    // console.log({ tipoGrafo })
    // network.setData({ nodes, edges })
    // network.setOptions(options)


}

const reprintGraphColorir = (result2) => {
    console.log(result2)
    nodes = nodes.map((nd, index) => {
        console.log(nd)
        nd.color = result2[index].cor
        return nd
    })






    nodes = new vis.DataSet(nodes)

    console.log({ tipoGrafo })
    network.setData({ nodes, edges })
    // network.setOptions(options)


}


const reprintGraphAGM = (result2) => {


    // edges.clear()



    edgs = result2.map(e => {
        console.log(e)
        return {
            from: e.u,
            to: e.v,
            label: e.peso.toString()
        }
    })
    // edges.add(edgs)


    adges.map(e => {

        edgs.map(e2 => {
            if (e.to == e2.to && e.from == e2.from) {
                edges.update({ id: e.id, color: { color: "#ff0000" }, arrows: 'to' })
            }

            if (e.to == e2.from && e.from == e2.to) {
                edges.remove({ id: e.id })
            }
        })


    })





    // edges = new vis.DataSet(edges)
    // console.log({ tipoGrafo })
    // network.setData({ nodes, edges })
    // network.setOptions(options)


}


const reprintGraphPRIM = (result2) => {

    edgs = result2.map((e, index) => {
        return {
            from: e.pai,
            to: e.u,
        }

    })

    edges.map(e => {
        edgs.map(e2 => {
            if (e.to == e2.to && e.from == e2.from) {
                edges.update({ id: e.id, color: { color: "#ff0000" }, arrows: 'to' })
            }

            // if (e.to == e2.from && e.from == e2.to) {
            //     edges.remove({ id: e.id })
            // }
        })
    })




}

const reprintGraphCMC = (result2) => {

    edgs = result2.map((e, index) => {
        return {
            from: e,
            to: index,
        }

    })

    edges.map(e => {
        edgs.map(e2 => {
            if (e.to == e2.to && e.from == e2.from) {
                edges.update({ id: e.id, color: { color: "#ff0000" }, arrows: 'to' })
            }

            if (e.to == e2.from && e.from == e2.to) {
                edges.remove({ id: e.id })
            }
        })
    })

    // edges.add(edgs)

}










// const verificarLigacoes = () => {
//     var edg = edges.get();
//     var nd = nodes.get();

//     var att = [];

//     for (var i = 0; i < edg.length; i++) {
//         for (var j = i + 1; j < edg.length; j++) {
//             console.log( edg[i].to,edg[j].from,edg[i].from,edg[j].to);

//             if (
//                 edg[i].to == edg[j].from &&
//                 edg[i].from == edg[j].to 
//             ) {
//                 console.log(
//                     "Encontrado:  de: " +
//                     nd[edg[i].to].id +
//                     "   Para : " +
//                     nd[edg[i].from].id
//                 );

//                 edges.update({
//                     id: parseInt(edg[i].id),
//                     smooth: {
//                         enabled: true,
//                         type: "diagonalCross",
//                         roundness: 0.5
//                     }
//                 });

//                 edges.update({
//                     id: parseInt(edg[j].id),
//                     smooth: {
//                         enabled: true,
//                         type: "diagonalCross",
//                         roundness: 0.5
//                     }
//                 });

//                 att.push(edg[i].id, edg[j].id);
//             }
//         }
//     }
// }