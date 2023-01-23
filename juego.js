const lienzo= document.getElementById("Card")
console.log(lienzo)

const ctx=lienzo.getContext("2d")
console.log(ctx)

//imagenes
const vida=new Image()
vida.src=" ../imagen/kero2.png"
console.log(vida)


//ataque
const ataques=[]

//enemigos
const enemigo=[]

class Sakura{
    constructor(x,y,w,h){
        this.x=x
        this.y=y
        this.w=w
        this.h=h
        this.velocidad=10
        this.kills=0
        this.lifes=5
    }


//Metodos
dibujarse(){
    ctx.fillRect(this.x, this.y, this.w, this.h)
}


disparar(){
    console.log("Dispara")
    const ataque=new Ataque(this.x+this.w,this.y+(this.h/2))
    ataques.push(ataque)
    console.log(ataques)
}
adelante(){
    if(this.x<1070){
     this.x+= this.velocidad
    }
}
atras(){
    if(this.x>0){
        this.x-= this.velocidad
    }
}
arriba(){
    if(this.y>40){
        this.y-=this.velocidad
    }
}
abajo(){
    if(this.y<520){
        this.y+=this.velocidad
    }
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
    constructor(x,y){
        this.x=x;
        this.y=y;
    }
    dibujarse(){
        this.x -=1
        ctx.fillRect(this.x,this.y,30,50)
    }
}

ctx.fillStyle="white"
//ctx.fillRect(10,145,15,15)
 
const sakura=new Sakura(0,225,30,30)
console.log(sakura)

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
   
console.log("Estamos jugando")
ctx.clearRect(0,0,1100,550)
//dibujar Sakura
sakura.dibujarse()

//dibujar ataque
ataques.forEach((ataque, indexAtaque)=>{
   ataque.x +=2
   console.log("dibujar")
        ataque.dibujarse()   

enemigo.forEach((enemigos, indexEnemigo)=>{
    console.log({ataqueX:ataque.x,ataqueY:ataque.y, enemigoX: enemigos.x, enemigoY: enemigos.y})
    
    if(enemigos.x <=ataque.x+10 &&ataque.y>= enemigos.y && ataque.y<=enemigos.y+50){
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
            alert("perdiste")
        }

//sakura vs enemigo
if(enemigos.x<=sakura.x+30 &&
     sakura.y+30>=enemigos.y &&
     sakura.x<=enemigos.x&&
     sakura.y<=enemigos.y+50
     ){
    sakura.lifes--
    enemigo.splice(indexEnemigo,1)
}

})

tiempo ++
ctx.font="25px Arial"
ctx.fillText(tiempo, 10,30)

//pintar muertos
ctx.fillText(`${sakura.kills} Eliminados`, 550,50)

//ctx.fillText(`${sakura.lifes} `,810,50)

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
    const posicionY=Math.floor((Math.random()*480)+40)
    console.log(posicionY)
    const a=new Enemigos(1100,posicionY)
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