var tipo

var fileReader = new FileReader();
var fileContents;


var grafoOriginal = null


window.onload = function () {
    //Check the support for the File API support
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        var fileSelected = document.getElementById('pegarAnexo');
        fileSelected.addEventListener('change', function (e) {
            //Set the extension for the file
            var fileExtension = /text.*/;
            //Get the file object
            var fileTobeRead = fileSelected.files[0];
            //Check of the extension match
            if (fileTobeRead.type.match(fileExtension)) {
                //Initialize the FileReader object to read the 2file
                fileReader.onload = function (e) {

                    // console.log(fileReader.result);
                    [grafoOriginal, tipo] = getGrafo(fileReader.result);
                    console.log(grafoOriginal)
                    printBasicGraph(grafoOriginal, tipo)
                }
                fileReader.readAsText(fileTobeRead);
            }
            else {
                alert("Por favor selecione arquivo texto");
            }

        }, false);
    }
    else {
        alert("Arquivo(s) não suportado(s)");
    }
}

$('#reset').on('click', () => {
    // printBasicGraph(grafoOriginal, tipo)
    reset(grafoOriginal)
})


$('#removeAzuis').on('click', () => {
    removeAzuis(grafoOriginal)
})

$('#labirinto').on('click', async () => {

    let inicial = $('#nLabirinto').val();
    if (inicial == '')
        return

    // console.log(grafoOriginal)
    grafoOriginal = []
    grafoOriginal = await gerarLabirinto(parseInt(inicial, 10))

    result = prim(grafoOriginal, 0)

    novoGrafo = modelaMapaLabirinto(result)

    printBasicGraph(grafoOriginal, 1)

    

    desenharNoCanvas(novoGrafo, parseInt(inicial, 10));
})




$('#DFS').on('click', () => {

    let inicial = $('#inicialDFS').val();
    if (inicial == '')
        return

    let result = DFS(grafoOriginal, parseInt(inicial, 10))

    reprintGraphDFS(result)
})


$('#BFS').on('click', () => {
    let inicial = $('#inicialBFS').val();

    if (inicial == '')
        return

    console.log(inicial)
    let result = BFS(grafoOriginal, parseInt(inicial, 10))
    reprintGraphBFS(result)
})

$('#COLORIR').on('click', () => {
    let inicial = $('#iniciaColorir').val();

    if (inicial == '')
        return

    console.log(inicial)
    let result = Colorir(grafoOriginal, parseInt(inicial, 10))
    console.log(result)
    reprintGraphColorir(result)
})


$('#PRIM').on('click', () => {


    let inicial = $('#inicialPRIM').val();

    if (inicial == '')
        return


    let result = prim(grafoOriginal, parseInt(inicial, 10))

    reprintGraphPRIM(result)
})

$('#CMC').on('click', () => {


    let inicial = $('#inicialCMC').val();

    if (inicial == '')
        return

    console.log(inicial)
    let result = dijkstra(grafoOriginal, parseInt(inicial, 10))
    console.log(result)
    reprintGraphCMC(result)
})

$('#forteConexa').on('click', () => {

    let result = forteConexa(grafoOriginal)

    reprintFConexa(result)

})


