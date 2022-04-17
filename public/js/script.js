let socket = io();

let login = document.getElementById('login');
let retour = document.getElementById('retour');
let password = document.getElementById('motDePass');
let connecter = document.getElementById('connecter');
let cree = document.getElementById('cree');
let ajouter = document.getElementById('ajouter');
let connect = document.getElementById('connect');
let connection = document.getElementById('connection');
let cont = document.getElementById('cont');
let image = document.getElementById('image');
let train = document.getElementById('train');
let trainM = document.getElementById('trainM');
let nom = document.getElementById('nom');
let passwords = document.getElementById('password');
let feuil;
let main = document.getElementById('main');
let main2 = document.getElementById('main2');

let bd = document.getElementById('body');
let chercher = document.getElementById('chercher');
let conversation = document.getElementById('conversation');
let statut = document.getElementById('statut');
let tourne = document.getElementById('tourne');

let photos = [];
let i = 0;
for(;i<=2;i++){
    photos[i] = document.createElement('img');//.style.opacity = 0+'%';
    photos[i].setAttribute('src',`images/${i}.png`);
    photos[i].setAttribute('id', i);
    photos[i].setAttribute('class', 'slide');
    main.appendChild(photos[i]);
}
let x = 0;
setInterval(() => {
    if(x == 0){
        document.getElementById(`${0}`).style.opacity = 100+'%';
        document.getElementById(`${1}`).style.opacity = 0+'%';
        document.getElementById(`${2}`).style.opacity = 0+'%';
    }
    if(x == 1){
        document.getElementById(`${0}`).style.opacity = 0+'%';
        document.getElementById(`${1}`).style.opacity = 100+'%';
        document.getElementById(`${2}`).style.opacity = 0+'%';
    }
    if(x == 2){
        document.getElementById(`${0}`).style.opacity = 0+'%';
        document.getElementById(`${1}`).style.opacity = 0+'%';
        document.getElementById(`${2}`).style.opacity = 100+'%';
    }
    x++;
    if(x == 3){
        x = 0;
    }
}, 10000);
window.addEventListener('load',()=>{
    train.style.zIndex = 0;
    trainM.style.zIndex = 0;
})
retour.addEventListener('click',()=>{
    ajouter.style.visibility = 'hidden';
    connect.style.visibility = 'visible';
    connection.style.visibility = 'visible';
    cree.style.visibility = 'visible';
    cont.style.visibility = 'visible';
    login.style.visibility = 'hidden';
    password.style.visibility = 'hidden';
    connecter.style.visibility = 'hidden';
    retour.style.visibility = 'hidden';
    train.style.zIndex = 0;
    trainM.style.zIndex = 0;
    document.getElementById('feuil').remove();
})
cree.addEventListener('click',()=>{
    ajouter.style.visibility = 'visible';
    connect.style.visibility = 'hidden';
    connection.style.visibility = 'hidden';
    cree.style.visibility = 'hidden';
    cont.style.visibility = 'hidden';
    login.style.visibility = 'visible';
    password.style.visibility = 'visible';
    connecter.style.visibility = 'visible';
    retour.style.visibility = 'visible';
    train.style.zIndex = 1;
    trainM.style.zIndex = 1;
    feuil = document.createElement('div');
    feuil.setAttribute('id','feuil');
    main.appendChild(feuil);

    setInterval(() => {
        let f = document.createElement('div');
        f.setAttribute('class','feuille');
        f.style.left = Math.random()*100 + '%';
        if(feuil){
            feuil.appendChild(f);
        }
    }, 1000);
});
let utilisateur;
if(document.cookie){
    console.log(socket.id);
    socket.emit('chat message',['kk',document.cookie])
    if(document.cookie[0] == 1){
        main.style.visibility = 'hidden';
        main2.style.visibility = 'visible';
    }
}
connecter.addEventListener('click',()=>{
    if(login.value && password.value){
        socket.emit('chat message', ['ajout',login.value,password.value]);
        login.value = '';
        password.value = '';
        document.cookie = `1${login.value}`;
        console.log(document.cookie);
        main.style.visibility = 'hidden';
        main2.style.visibility = 'visible';
    }
});
connect.addEventListener('click',()=>{
    if(nom.value && passwords.value){
        console.log(socket.id);
        socket.emit('chat message', ['connect',nom.value,passwords.value,socket.id]);
        nom.value = '';passwords.value = '';
    }
});

socket.on('chat message', (msg)=> {
    if(msg[0] == 'success'){
        document.cookie = `1${msg[1]}`;
        console.log(document.cookie);
        main.style.visibility = 'hidden';
        main2.style.visibility = 'visible';
    }
    if(msg[0] == 'moi'){
        my = msg[1];
    }
    if(msg == 'hello'){
        alert('hello');
    }
    if(msg[0] == 'publie'){
        let s = document.createElement('div');
        s.textContent = msg[1];
        sms.appendChild(s);
    }
    if(msg[0] == 'nombre'){
        if(users.length == 0){
            users = msg[1];
            let membre = document.createElement('div');
            membre.setAttribute('id','membre');
            membre.style.transition = 0+'s';
            for(i in users){
                let gens = document.createElement('div');
                gens.setAttribute('class','profile');
                gens.setAttribute('id',`${users[i]}`);
                console.log(users[i]);
                gens.style.background = `rgb(${parseInt(Math.random()*255)},${parseInt(Math.random()*255)},${parseInt(Math.random()*255)})`;
                gens.textContent = users[i][0];
                membre.appendChild(gens);
                z++;
                let change = 0;
                gens.addEventListener('click',()=>{
                    if(change == 0){
                        let lui = document.createElement('div');
                        lui = gens;
                        sous.appendChild(lui);
                        change = 1;
                        lui.addEventListener('click',()=>{
                            //alert(lui.id);
                            socket.emit('chat message',['prive',lui.id])
                        })
                    }
                    /*else{
                        socket.emit('chat message', ['sms','destinateur','message']);
                    }*/
                });
            }
            main2.appendChild(membre);
        }
    }
});

statut.addEventListener('click',()=>{
    statut.style.transition = 1 + 's';
    tourne.style.transform = 'rotate('+ 300 + 'deg)';
    setTimeout(() => {
        tourne.style.transform = 'rotate('+ 0 + 'deg)';
    }, 1000);
});
let sms = document.getElementById('sms');
let publie = document.getElementById('publie');
publie.addEventListener('keydown',(e)=>{
    if(e.key == "Enter"){
        socket.emit('chat message', ['publie',publie.value])
        publie.value = '';
    }
})
let moi = document.getElementById('moi');
conversation.style.background = 'rgba(155, 197, 162)';
main2.style.background = 'rgba(155, 197, 162)';
conversation.style.border = 'solid 6px rgba(155, 197, 162)';
conversation.style.marginBottom = 12 +'vh';
moi.addEventListener('click',()=>{
    document.getElementById('souscription').style.visibility = 'hidden';
    publie.style.visibility = 'hidden';
    sms.style.visibility = 'hidden';
    sms.style.opacity = 0 + '%';
    publie.style.opacity = 0 + '%';
    moi.style.marginBottom = 12 +'vh';
    moi.style.background = 'rgba(197, 155, 155)';
    main2.style.background = 'rgba(197, 155, 155)';
    moi.style.border = 'solid 6px rgba(197, 155, 155)';
    statut.style.marginBottom = 1.5 +'vh';
    statut.style.border = 'none';
    statut.style.background = 'rgb(250,250,250)';
    conversation.style.background = 'rgb(250,250,250)';
    conversation.style.marginBottom = 1.5 +'vh';
    conversation.style.border = 'none';
    chercher.style.background = 'rgb(250,250,250)';
    chercher.style.marginBottom = 1.5 +'vh';
    chercher.style.border = 'none';
    document.getElementById('membre').style.visibility = 'hidden';
});
statut.addEventListener('click',()=>{
    document.getElementById('souscription').style.visibility = 'hidden';
    publie.style.visibility = 'visible';
    sms.style.visibility = 'visible';
    publie.style.opacity = 100 + '%';
    sms.style.opacity = 100 + '%';
    statut.style.background = 'rgba(155, 185, 197)';
    main2.style.background = 'rgba(155, 185, 197)';
    statut.style.border = 'solid 6px rgba(155, 185, 197)';
    statut.style.marginBottom = 12 +'vh';
    moi.style.marginBottom = 1.5 +'vh';
    moi.style.border = 'none';
    moi.style.background = 'rgb(250,250,250)';
    conversation.style.background = 'rgb(250,250,250)';
    conversation.style.marginBottom = 1.5 +'vh';
    conversation.style.border = 'none';
    chercher.style.background = 'rgb(250,250,250)';
    chercher.style.marginBottom = 1.5 +'vh';
    chercher.style.border = 'none';
    document.getElementById('membre').style.visibility = 'hidden';
});
conversation.addEventListener('click',()=>{
    document.getElementById('souscription').style.visibility = 'visible';
    publie.style.visibility = 'hidden';
    sms.style.visibility = 'hidden';
    sms.style.opacity = 0 + '%';
    publie.style.opacity = 0 + '%';
    conversation.style.background = 'rgba(155, 197, 162)';
    main2.style.background = 'rgba(155, 197, 162)';
    conversation.style.border = 'solid 6px rgba(155, 197, 162)';
    conversation.style.marginBottom = 12 +'vh';
    moi.style.background = 'rgb(250,250,250)';
    moi.style.marginBottom = 1.5 +'vh';
    moi.style.border = 'none';
    statut.style.marginBottom = 1.5 +'vh';
    statut.style.border = 'none';
    statut.style.background = 'rgb(250,250,250)';
    chercher.style.background = 'rgb(250,250,250)';
    chercher.style.marginBottom = 1.5 +'vh';
    chercher.style.border = 'none';
    document.getElementById('membre').style.visibility = 'hidden';
});
chercher.addEventListener('click',()=>{
    document.getElementById('souscription').style.visibility = 'hidden';
    publie.style.visibility = 'hidden';
    sms.style.visibility = 'hidden';
    sms.style.opacity = 0 + '%';
    publie.style.opacity = 0 + '%';
    chercher.style.background = 'rgba(197, 194, 155)';
    main2.style.background = 'rgba(197, 194, 155)';
    chercher.style.border = 'solid 6px rgba(197, 194, 155)';
    chercher.style.marginBottom = 12 +'vh';
    moi.style.background = 'rgb(250,250,250)';
    moi.style.marginBottom = 1.5 +'vh';
    moi.style.border = 'none';
    statut.style.marginBottom = 1.5 +'vh';
    statut.style.border = 'none';
    statut.style.background = 'rgb(250,250,250)';
    conversation.style.background = 'rgb(250,250,250)';
    conversation.style.marginBottom = 1.5 +'vh';
    conversation.style.border = 'none';
    document.getElementById('membre').style.visibility = 'visible';
});
let users = [];
let z = 0;
let sous = document.createElement('div');
sous.setAttribute('id','souscription');
main2.appendChild(sous);
