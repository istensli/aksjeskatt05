var visInndataBool = false;

var kursKjopsListe = [];
var antallKjopsListe = [];

var kursSalgsListe = [];
var antallSalgsListe = [];


var langKjopsListe = [];
var langSalgsListe = [];

var urealiserteObj = {
    "antall": [],
    "kurs": []

};


function visInndata(){
    var html = `<p><h3>Kj&oslash;p:</h3></p> <table>
    <tr><td>Antall:</td><td>Kurs:</td><td>Kurtasje:</td>
    </tr>
    <tr>
    <td colspan="1">
        <input size="6" type="text" id="kjopsAntall"/>
    </td>
    <td colspan="1">  
        <input size="6" type="text" id="kjopsKurs"/>
    </td>
    <td colspan="1">   
        <input size="6" type="text" id="kjopsKurtasje"/>
    </td>
        <td colspan="1"><button class="leggTilKnapp" onclick="leggTilKjopsData()">legg til data</button>
    </td>  
      
    
    </tr>
    
    <tr><td>&nbsp;</td></tr>
    </table>
    
    <p><h3>Salg:</h3></p>

    <table>
    <tr><td>Antall:</td><td>Kurs:</td><td>Kurtasje:</td>
    </tr>
    <tr>
    <td colspan="1">
        <input size="6" type="text" id="salgsAntall"/>
    </td>
    <td colspan="1">  
        <input size="6" type="text" id="salgsKurs"/>
    </td>
    <td colspan="1">   
        <input size="6" type="text" id="salgsKurtasje"/>
    </td>
        <td colspan="1"><button class="leggTilnKnapp" onclick="leggTilSalgsData()">legg til data</button>
    </td>  
      
    
    </tr>
    
    <tr><td>&nbsp;</td></tr>
    </table>
    
    `;

    

   

    if (visInndataBool == false){
        document.getElementById('inndata').innerHTML = html;
        visInndataBool = true;
    }
    else {
        document.getElementById('inndata').innerHTML = '';
        visInndataBool = false;

    }
 

}

function leggTilKjopsData(){
    var antall = parseInt(document.getElementById('kjopsAntall').value);
    var kurs = Number(document.getElementById('kjopsKurs').value);
    var kurtasje = Number(document.getElementById('kjopsKurtasje').value);
    kurs += kurtasje/antall;

    kursKjopsListe.push(kurs.toFixed(2));
    antallKjopsListe.push(antall);

    visKjopsliste();



}

function leggTilSalgsData(){
    var antall = parseInt(document.getElementById('salgsAntall').value);
    var kurs = Number(document.getElementById('salgsKurs').value);
    var kurtasje = Number(document.getElementById('salgsKurtasje').value);
    kurs -= kurtasje/antall;

    kursSalgsListe.push(kurs.toFixed(2));
    antallSalgsListe.push(antall);

    visSalgsListe();

}



function visKjopsliste(){
    var html = `<p><h3>Kj&oslash;psliste:</h3></p> <table>
    <tr><td>Antall:</td><td>Kurs:</td>
    </tr>`;
    
    for(var i=0;i<kursKjopsListe.length;i++){
        html += `<tr>
        <td>
            ${antallKjopsListe[i]}
            
        </td>
        <td>
            ${kursKjopsListe[i]}  
            
        </td>
        </tr>`;
    }    
    
    html += `<tr><td>&nbsp;</td></tr>
        </table>`;

    html += `<br><button onclick="slettSiste(kursKjopsListe, antallKjopsListe)">Slett siste</button>`;    

        document.getElementById('kjopsdata').innerHTML = html;    

}

function visSalgsListe(){
    var html = `<p><h3>Salgsliste:</h3></p> <table>
    <tr><td>Antall:</td><td>Kurs:</td>
    </tr>`;
    
    for(var i=0;i<kursSalgsListe.length;i++){
        html += `<tr>
        <td>
            ${antallSalgsListe[i]}
            
        </td>
        <td>
            ${kursSalgsListe[i]}  
            
        </td>
        </tr>`;
    }    
    
    html += `<tr><td>&nbsp;</td></tr>
        </table>`;

    html += `<br><button onclick="slettSiste(kursSalgsListe, antallSalgsListe)">Slett siste</button>`;       

        document.getElementById('salgsdata').innerHTML = html;

}




function tilLangliste(kursliste, antalliste){
    var langListe = []
    var i = 0;
    for(var x = 0; x<kursliste.length;x++){
        for(var y = 0;y<antalliste[i];y++){
            langListe.push(kursliste[i]);

        }
        i++;
    }
    return langListe;


}

function kalkulerAvkastning(_langListeKjop, _langListeSalg){
    var avkastningsliste = [];
    for(var i = 0;i<_langListeSalg.length;i++){
        avkastningsliste.push(_langListeSalg[i] - _langListeKjop[i]);
    }
    var sum_ = 0;
    for(var j = 0;j<avkastningsliste.length;j++){
        sum_ += avkastningsliste[j];

    }
    return sum_;


}

function visAvkastning(){

    var html = '';

    var formatter = new Intl.NumberFormat('nb-NO', {
        style: 'currency',
        currency: 'NOK',

    });

    //  var _langKjopsListe = tilLangliste(kursKjopsListe, antallKjopsListe);
    langKjopsListe = tilLangliste(kursKjopsListe, antallKjopsListe);
    langSalgsListe = tilLangliste(kursSalgsListe, antallSalgsListe);
    //burde strengt tatt hatt andre variabelnavn her..
    var avkastning = kalkulerAvkastning(langKjopsListe, langSalgsListe).toFixed(2);

    if (isNaN(avkastning)){
        html += `<p>DU HAR SOLGT FOR MANGE AKSJER!</p>`;
        avkastning = 0;
    }


    var avkastningNOK = formatter.format(avkastning);

    //skatt også:
    var skatt = (avkastning * 0.3168).toFixed(2);
    var skattNOK = formatter.format(skatt);

    //etter skatt:
    var etterSkatt = avkastning - skatt;
    var etterSkattNOK = formatter.format(etterSkatt);



    


    if(avkastning < 0){
        html += `<p>DU HAR NEGATIV AVKASTNING!</p>`;
    }    
        
    
    html += `<p><b>Avkastning:<b> ${avkastningNOK}</p><br>`;

    html += `<p><b>Skatt:<b> ${skattNOK}</p><br>`;

    html += `<p><b>Etter skatt:<b> ${etterSkattNOK}</p><br>`;


    document.getElementById('avkastning').innerHTML = html;

    
    visUrealiserte();

}

function slettData(){

    kursKjopsListe = [];
    antallKjopsListe = [];

    kursSalgsListe = [];
    antallSalgsListe = [];

    langKjopsListe = [];
    langSalgsListe = [];

    urealiserteObj.kurs = [];
    urealiserteObj.antall = [];


    visKjopsliste();
    visSalgsListe();

    visUrealiserte();
}


function visUrealiserte(){

    var html = '<p><h3>Urealiserte aksjer:</h3></p>';
    var ny_liste_kurs = [];
    var ny_liste_antall = [];
    var start_urealisert = langSalgsListe.length;
    var aksje_count = 1;
    

    for(var i=0;i<(langKjopsListe.length - langSalgsListe.length);i++){

        

         
        if((start_urealisert+i)>=(langKjopsListe.length - 1)){
           

            ny_liste_kurs.push(langKjopsListe[start_urealisert+i]);
            ny_liste_antall.push(aksje_count);
            break;
        }
        if(langKjopsListe[start_urealisert+i] != langKjopsListe[start_urealisert+i+1]){
            ny_liste_kurs.push(langKjopsListe[start_urealisert+i]);
            ny_liste_antall.push(aksje_count);
            aksje_count = 1;
        }
        else{
            aksje_count +=1;
        }
        

    }
    //logikk for å printe ut..
    if(ny_liste_kurs.length == 0)
        html += `<p>Alle aksjer er realisert!</p>`;


    
    html += `<table>
    <tr><td>Antall:</td><td>Kurs:</td>
    </tr>`;
    
    for(var j=0;j<ny_liste_kurs.length;j++){
        html += `<tr>
        <td>
            ${ny_liste_antall[j]}
            
        </td>
        <td>
            ${ny_liste_kurs[j]}  
            
        </td>
        </tr>`;
    }    
    
    html += `<tr><td>&nbsp;</td></tr>
        </table>`;

    html += `<button id="lagre" onclick="lagreJSON()">Lagre urealiserte til fil...</button>`;   


    //kode for output av JSON?? ja maa vaere her..

    urealiserteObj.antall = [];
    urealiserteObj.kurs = [];
    
    for (var k in ny_liste_antall){
        urealiserteObj.antall.push(ny_liste_antall[k]);
        console.log(ny_liste_antall[k]);
    }
    for (var l in ny_liste_kurs){
        urealiserteObj.kurs.push(ny_liste_kurs[l]);
        console.log(ny_liste_kurs[l]);
    }

    

    document.getElementById('urealiserteData').innerHTML = html;

}


function slettSiste(kursListe, antalListe){
    kursListe.pop();
    antalListe.pop();
    visKjopsliste();
    visSalgsListe();
}

function hentAksjer(){
    var kursListe = [];
    var antalListe = [];

    var fil1 = document.getElementById('opplasting').files[0];
    //console.log(fil1);
    //console.log("Test1");

    var reader = new FileReader();
    reader.onload = function() {
        try{
            var obj = JSON.parse(reader.result);
        }    
        catch (e){
            console.log(e);
        }       
        //console.log(obj);
        
        kursListe = obj.kurs;
        antalListe = obj.antall;
        //console.log(obj.kurs);
        //console.log(obj.antall);

        for (var i in kursListe){
            kursKjopsListe.push(kursListe[i]);
            //console.log(kursListe[i]);
        }
        for (var j in antalListe){
            antallKjopsListe.push(antalListe[j]);
            //console.log(antalListe[j]);
        }
        visKjopsliste();

    };
    reader.readAsText(fil1); 
    
   
    
}


//https://stackoverflow.com/questions/34156282/how-do-i-save-json-to-local-text-file
class JavascriptDataDownloader {

    constructor(data={}) {
        this.data = data;
    }

    download (type_of = "application/JSON", filename= "urealiserte.json") {
        let body = document.body;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(new Blob([JSON.stringify(this.data, null, 2)], {
            type: type_of
        }));
        a.setAttribute("download", filename);
        body.appendChild(a);
        a.click();
        body.removeChild(a);
    }
} 





function lagreJSON(){
    new JavascriptDataDownloader({"antall": urealiserteObj.antall, "kurs": urealiserteObj.kurs }).download();


}


