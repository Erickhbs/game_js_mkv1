let canvas = document.getElementById('canvas')
let c = canvas.getContext('2d')

const collisionsMap = []
for(let i = 0; i < collisions.length; i += 50){
    collisionsMap.push(collisions.slice(i,50+i))
}

class Boundary{
    static width = 48
    static height = 48
    constructor({position}){
        this.position = position
        this.width = 48
        this.height = 48
    }

    draw(){
        c.fillStyle = 'rgba(255,255,255,0)'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = []
const offset = {
    x: -214,
    y: -1371
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol === 1025){
            boundaries.push(new Boundary({position:{
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y
            }}))
        }
    })
})

console.log(boundaries)

//Definindo largura do canvas
canvas.width = 960
canvas.height = 540

const speed = 4

//Criando objeto da imagem do mapa
const image = new Image()
image.src = 'img/map.png'

//Criando objeto da image do boneco
const jogadorImagem = new Image()
jogadorImagem.src = 'img/playerDown.png'

class Sprite{
    constructor({position, velocity, image, frames = {max: 1 }}){
        this.position = position
        this.image = image
        this.frames = frames
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height
            console.log(this.width)
            console.log(this.height)
        }
    }
    draw() {
        //c.drawImage(this.image, this.position.x, this.position.y)
        c.drawImage(
            this.image,
            0,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )
    }
}

const player = new Sprite({
    position:{
        x: canvas.width / 2 - jogadorImagem.width / 4 / 2,
        y: canvas.height / 2 //- jogadorImagem.height / 2
    },
    image: jogadorImagem,
    frames: {
        max: 4
    }
})

const background = new Sprite({
    position:{
        x: offset.x,
        y: offset.y
    },
    image: image
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

const movables = [background, ...boundaries]

function rectangularCollision({rectangle1, rectangle2}){
    return (rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y)
}

function animate(){
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach(boundary => {
        boundary.draw()
    })
    player.draw()

    
    let moving = true
    if(keys.w.pressed && lastKey === 'w'){
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, 
                        position:{
                            x: boundary.position.x,
                            y: boundary.position.y + speed
                        }
                    }
                })
            ){
                console.log('colidiu')
                moving = false
                break
            }
        }

        if(moving)
            movables.forEach(movable => {
                movable.position.y += speed
            })
    }
    else if(keys.a.pressed) {
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, 
                        position:{
                            x: boundary.position.x + speed,
                            y: boundary.position.y
                        }
                    }
                })
            ){
                console.log('colidiu')
                moving = false
                break
            }
        }

        if(moving)    
            movables.forEach(movable => {
                movable.position.x += speed
            })
    }
    else if(keys.s.pressed) {
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, 
                        position:{
                            x: boundary.position.x,
                            y: boundary.position.y - speed
                        }
                    }
                })
            ){
                console.log('colidiu')
                moving = false
                break
            }
        }

        if(moving)  
            movables.forEach(movable => {
                movable.position.y -= speed
            })
    }
    else if(keys.d.pressed) {
        for(let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
            if(
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary, 
                        position:{
                            x: boundary.position.x - speed,
                            y: boundary.position.y
                        }
                    }
                })
            ){
                console.log('colidiu')
                moving = false
                break
            }
        }

        if(moving)  
            movables.forEach(movable => {
                movable.position.x -= speed
            })
    }

}
animate()

let lastKey = ''
window.addEventListener('keydown', (e) => {
    switch(e.key){
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
})


window.addEventListener('keyup', (e) => {
    switch(e.key){
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})