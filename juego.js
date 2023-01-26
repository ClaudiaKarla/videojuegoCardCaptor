const lienzo= document.getElementById("Card")
    console.log(lienzo)

const ctx=lienzo.getContext("2d")
    console.log(ctx)

    let requestReference

    let idCrearEnemigos

//nivel1
const nivel=document.getElementById("nivel")

let frecEnemigos= 3000
//let cantidadBalas=4

    nivel.addEventListener("click",()=>{
        switch(nivel.innerText){  
            case "Facil":
                nivel.innerText="Medio"
                frecEnemigos=2500
                //cantidadBalas=3
                break;
                    case "Medio":
                        nivel.innerText="Dificil"
                        frecEnemigos=2000
                        //cantidadBalas=2
                            break;
                                default:
                                    nivel.innerText="Facil"
                                    frecEnemigos=3000
                                    //cantidadBalas=4
                                        break;
    }
})

//Pausa
let pausaBtn=document.getElementById("pausaToggle")

pausaBtn.addEventListener("click",()=>{
    if(pausaBtn.innerText==="Pausa"){
        pausaBtn.innerText="Play"
        cancelAnimationFrame(requestReference)
        clearInterval(idCrearEnemigos)
    }else{
        pausaBtn.innerText="Pausa"
        empezarJuego()
        crearEnemigos()
    }
})

pausaBtn.addEventListener("focus",function(){
this.blur()
})


//seleccion botones
const menu=document.querySelector(".botones")

//seleccion gameover
const gameOver=document.querySelector(".gameOver")

//seleccion Ganaste
const ganaste=document.querySelector(".ganaste")

//imagenes
const vida= new Image()
    vida.src="../imagen/kero2.png"
        console.log(vida)

const enemig= new Image()
    enemig.src="../imagen/22.jpg"

const enemig1= new Image()
    enemig1.src="../imagen/c2.png"

const enemig2= new Image()
    enemig2.src="../imagen/3.1.webp"

const enemig3= new Image()
    enemig3.src="../imagen/4.webp"

const enemig4= new Image()
    enemig4.src="../imagen/Bosque.webp"

const sak= new Image()
    sak.src="../imagen/ip.png"

const baston= new Image()
    baston.src="../imagen/estrellau.webp"

const pluma= new Image()
    pluma.src="../imagen/pluma.jpg"

const shaooran= new Image()
    shaooran.src="../imagen/liS.webp"

//Sonidos
const shoot=new Audio("../sonido/ataque.mp3")

const die=new Audio("../sonido/die.mpeg")

const ganar=new Audio("../sonido/ts22.mpeg")

//ARREGLO ENEMIGOS
const tiposEnemigos=[enemig, enemig1, enemig2, enemig3, enemig4]

//ataque
const ataques=[]
const ataque2=[]

//enemigos
const enemigo=[]

//shaoran
const shaorann=[]

class Sakura{
    constructor(x,y,w,h){
        this.x=x
        this.y=y
        this.w=w
        this.h=h
        this.velocidad=10
        this.kills=0
        this.lifes=5
        this.capturas=0
        this.direccion="d"
        this.img=sak
    }

//Metodos
dibujarse(){
    ctx.drawImage(this.img,this.x, this.y, this.w, this.h)
}


disparar(){
    const ataque=new Ataque(this.x+this.w,this.y+(this.h/2))
        ataques.push(ataque)

//Sonido
shoot.play()
}

adelante(){
    if(this.x<1050){
        this.x+= this.velocidad
    }
        this.img=sak
}
atras(){
    if(this.x>0){
        this.x-= this.velocidad
    }
}
arriba(){
    if(this.y>80){
        this.y-=this.velocidad
    }
}
abajo(){
    if(this.y<470){
        this.y+=this.velocidad
    }
}

}

   //shaoran
   class Shaoran{
    constructor(x,y,h,w){
        this.x=x
        this.y=y
        this.w=w
        this.h=h
       this.img=shaooran
       this.subir=false
    }
    
    dibujarse(){
        ctx.drawImage(this.img,this.x,this.y,50,80)
        
        if (this.y===470){
            this.subir=true
        }

        if (this.y===10){
            this.subir=false
        }

        if(this.y>=10&&this.subir===true){
            this.y--
        }
        else if(this.y<470&&this.subir===false){
            this.y++
        }
       
    }

    disparar2(){
        const ataq=new Ataque(this.x+this.w,this.y+(this.h/2))
            ataque2.push(ataq)
    }

}

//Ataque Clase (bala)
class Ataque{
    constructor(x,y){
        this.x=x;
        this.y=y;
 
    }
    dibujarse(){
        ctx.drawImage(baston,this.x,this.y, 25, 25)
          //  console.log({x: this.x})

        if(this.x>1080){
            ataques.shift()
        }
    }  
}

//enemigo
class Enemigos{
    constructor(x,y,img){
        this.x=x;
        this.y=y;
        this.img=img
    }
    dibujarse(){
        this.x -=1
        ctx.drawImage(this.img,this.x,this.y,50,80)
       
    }
}

ctx.fillStyle="white"
//ctx.fillRect(10,145,15,15)
 
const sakura=new Sakura(0,225,60,80)
    console.log(sakura)

const shaoran=new Shaoran(1000,225,60,80)
    console.log(shaoran)

//Escuchamos las Teclas
document.addEventListener("keydown", (evento)=>{
 console.log(evento.key)
 switch (evento.key){
    case "ArrowRight":
     sakura.adelante()
        break; 
            case "ArrowLeft":
                sakura.atras()
                    break;
                        case "ArrowUp":
                            sakura.arriba()
                                 break;
                                    case "ArrowDown": 
                                     sakura.abajo()
                                         break;
                                            case " ":
                                                sakura.disparar()
                                                     shaoran.disparar2()
                                                        break;
     }
})

let tiempo=0

//funcion empezar juego
function empezarJuego(){

ctx.clearRect(0,0,1100,550)
//dibujar Sakura
sakura.dibujarse()
shaoran.dibujarse()


//Verificar si sigue vivo
if(sakura.lifes===0){
    setGameOver()
}


//dibujar ataque
ataques.forEach((ataque, indexAtaque)=>{
   ataque.x +=2
        ataque.dibujarse()   

enemigo.forEach((enemigos, indexEnemigo)=>{
    console.log({ataqueX:ataque.x,ataqueY:ataque.y, enemigoX: enemigos.x, enemigoY: enemigos.y})
    
    if(enemigos.x <=ataque.x+25 &&ataque.y>= enemigos.y && ataque.y<=enemigos.y+80){
        enemigo.splice(indexEnemigo, 1)
        ataques.splice(indexAtaque, 1)
            sakura.kills++
    }

})

})


//dibujar ataque2
ataque2.forEach((ataq)=>{
    ataq.x -=1
         ataq.dibujarse() 
         
         if(sakura.x<=ataq.x+25&&
            ataq.y+25>=sakura.y&&
            ataq.x<=sakura.x+60&&
            ataq.y<=sakura.y+80
             ){
                 sakura.lifes--
                    ataque2.shift()
             }
})



//dibujar enemigo
enemigo.forEach((enemigos, indexEnemigo)=>{
    enemigos.dibujarse()

        if(enemigos.x<=0){
            setGameOver()
            cancelAnimationFrame(requestReference)
            clearInterval(idCrearEnemigos)
        }

//sakura vs enemigo
if(enemigos.x<=sakura.x+60 &&
     sakura.y+80>=enemigos.y &&
     sakura.x<=enemigos.x&&
     sakura.y<=enemigos.y+80
     ){
    sakura.lifes--
    enemigo.splice(indexEnemigo,1)
}

})

tiempo ++
ctx.font="25px arial"
//ctx.strokeStyle="#369";
ctx.fillStyle="black"
ctx.fillText(tiempo, 10,30)

//pintar capturas
ctx.fillText(`${sakura.kills} Cartas Capturadas`, 400,50)

//capturar cartas ganas
if(sakura.kills>=5){
    setGanaste()
    cancelAnimationFrame(requestReference)
    clearInterval(idCrearEnemigos)
    }

mostrarVidas()

   let reqId=requestAnimationFrame(empezarJuego)
   //console.log(reqId)
    requestReference=reqId

}

//Seleccionamos el btn y empezamos el juego
let btn=document.getElementById("jugar")
btn.addEventListener("click",()=>{
    empezarJuego()
    crearEnemigos()
    btn.classList.add("none")

    nivel.setAttribute("disabled","" )
    
})

//Creacion de los enemigos
function crearEnemigos(){

idCrearEnemigos=setInterval(()=>{
    const posicionY=Math.floor((Math.random()*400)+70)
    console.log(posicionY)
    const posicionAleatorio=Math.floor(Math.random()*tiposEnemigos.length)
    const enemigoAleatorio=tiposEnemigos[posicionAleatorio]
    const a=new Enemigos(1100,posicionY, enemigoAleatorio)
    enemigo.push(a)
},frecEnemigos)
}

//mostrar vidas
function mostrarVidas(){
 if(sakura.lifes===5){
    ctx.drawImage(vida,800,30,40,40)
    ctx.drawImage(vida,850,30,40,40)
    ctx.drawImage(vida,900,30,40,40)
    ctx.drawImage(vida,950,30,40,40)
    ctx.drawImage(vida,1000,30,40,40)
 }
 if(sakura.lifes===4){
    ctx.drawImage(vida,800,30,40,40)
    ctx.drawImage(vida,850,30,40,40)
    ctx.drawImage(vida,900,30,40,40)
    ctx.drawImage(vida,950,30,40,40)
 }

 if(sakura.lifes===3){
    ctx.drawImage(vida,800,30,40,40)
    ctx.drawImage(vida,850,30,40,40)
    ctx.drawImage(vida,900,30,40,40)
 }

 if(sakura.lifes===2){
    ctx.drawImage(vida,800,30,40,40)
    ctx.drawImage(vida,850,30,40,40)
 }
 if(sakura.lifes===1){
    ctx.drawImage(vida,800,30,40,40)
 }
}


//Game Over
function setGameOver(){
    //agregar la clase none al menu y canvas
    lienzo.classList.add("none")//lienzo.setAttribute("class","none")
    menu.classList.add("none")
    gameOver.classList.remove("none")
    
    die.play()
}

//ganaste
function setGanaste(){
   lienzo.classList.add("none")//lienzo.setAttribute("class","none")
   menu.classList.add("none")
  ganaste.classList.remove("none")

  ganar.play()
}