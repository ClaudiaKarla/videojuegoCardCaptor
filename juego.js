const lienzo= document.getElementById("Card")
console.log(lienzo)

const ctx=lienzo.getContext("2d")
console.log(ctx)

//seleccion botones
const menu=document.querySelector(".botones")

//seleccion gameover
const gameOver=document.querySelector(".gameOver")

//imagenes
const vida= new Image()
vida.src=" ../imagen/kero2.png"
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
baston.src="../imagen/bastonS.jpg"

const pluma= new Image()
pluma.src="../imagen/pluma.jpg"

const shaooran= new Image()
shaooran.src="../imagen/liS.webp"

//Sonidos
const shoot=new Audio("../sonido/ataque.mp3")

const die=new Audio("../sonido/gemeover.mp3")

//ARREGLO ENEMIGOS
const tiposEnemigos=[enemig, enemig1, enemig2, enemig3, enemig4]

//ataque
const ataques=[]

//ataque2
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
    constructor(x,y,h){
        this.x=x
        this.y=y
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


    //////////////////////////////////////////////////////////
    disparar(){
     const ataque=new Ataque(this.x+this.w,this.y+(this.h/2))
        ataques.push(ataque)
    }

}

//Ataque Clase (bala)
class Ataque{
    constructor(x,y){
        this.x=x;
        this.y=y;
 
    }
    dibujarse(){
        ctx.fillRect(this.x,this.y, 10, 5)
        console.log({x: this.x})
   
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
 //console.log(evento.key)
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
    
    if(enemigos.x <=ataque.x+10 &&ataque.y>= enemigos.y && ataque.y<=enemigos.y+80){
        enemigo.splice(indexEnemigo, 1)
        ataques.splice(indexAtaque, 1)
        sakura.kills++
    }

})

})


//dibujar enemigo
enemigo.forEach((enemigos, indexEnemigo)=>{
    enemigos.dibujarse()

        if(enemigos.x<=0){
            setGameOver()
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
ctx.font="25px Arial"
ctx.fillText(tiempo, 10,30)

//pintar muertos
ctx.fillText(`${sakura.kills} Capturada`, 550,50)

mostrarVidas()

   requestAnimationFrame(empezarJuego)
}

//Seleccionamos el btn y empezamos el juego
let btn=document.getElementById("jugar")
btn.addEventListener("click",()=>{
    empezarJuego()
    crearEnemigos()
    btn.classList.add("none")
})

//Creacion de los enemigos
function crearEnemigos(){

setInterval(()=>{
    const posicionY=Math.floor((Math.random()*400)+70)
    console.log(posicionY)
    const posicionAleatorio=Math.floor(Math.random()*tiposEnemigos.length)
    const enemigoAleatorio=tiposEnemigos[posicionAleatorio]
    const a=new Enemigos(1100,posicionY, enemigoAleatorio)
    enemigo.push(a)
},3000)
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