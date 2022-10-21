const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

console.log(collisions);

canvas.width = 1024
canvas.height = 576

const collisionsMap = []
for (let i = 0; i < collisions.length; i += 50) {
    collisionsMap.push(collisions.slice(i, 50 + i))
}

class Boundary {
    static width = 48
    static height = 48
    constructor(position){
        this.position = position 
        this.width = 48
        this.height = 48 
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

}

const boundaries = []

//collisionsMap.forEach((row) => {
//    row.forEach((symbol) => {
//        console.log(symbol)
//    })
//})

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025)
        boundaries.push(
            new Boundary({
                position: {
                    x:j*Boundary.width+offset.x,
                    y:i*Boundary.height+offset.y
                }
            })
        )
    })
})

console.log(boundaries)

const image = new Image()
image.src = 'seli.png'

const playerImage =new Image()
playerImage.src = 'playerDown.png'


const offset = {
    x: -115,
    y: -1350
}

//canvas.width = 1024
//canvas.height = 576

/*c.fillStyle = 'white'
//c.fillRect(0,0,canvas.width, canvas.height)*/

class Sprite {
    constructor({position, velocity, image, frames = {max: 1} }){
        this.position = position
        this.image = image
        this.frames = frames
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max
            this.height = this.image.height / this.frames.max
        }
    }

    draw(){
        c.drawImage(
            this.image,
            0,
            0,
            this.image.width/ this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width/ this.frames.max,
            this.image.height
        )
    }
}

const player = new Sprite({
    position: {
        x: canvas.width/2 - 192/4/2,
        y: canvas.height/2 - 68/2
    },
    image:  playerImage,
    frames: {
        max: 4
    }

})

const background = new Sprite({
    position: {
        x:offset.x,
        y:offset.y
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

let lastKey = ''

window.addEventListener('keydown', (e) => {
    switch (e.key){
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
        break

        case 's':
            keys.s.pressed = true
            lastKey = 's'
        break

        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
        break

        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
        break

    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key){
        case 'w':
            keys.w.pressed = false
        break

        case 's':
            keys.s.pressed = false
        break

        case 'a':
            keys.a.pressed = false
        break

        case 'd':
            keys.d.pressed = false
        break

    }
})


const movables = [background, ...boundaries]

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2. width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.heigth && 
        rectangle1.position.y + rectangle2.heigth >= rectangle2.position.y
    )
}

function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach(Boundary => {
        Boundary.draw()
        if (
            rectangularCollision({
                rectangle1: player,
                rectangle2: Boundary
    
            })
    
        ) {
            console.log('colliding')
        }

    })
    player.draw()

    if(keys.w.pressed && lastKey === 'w') {
        movables.forEach((movable) => {
            movable.position.y += 3
        })
    }else if (keys.a.pressed && lastKey === 'a') {
        movables.forEach((movable) => {
            movable.position.x += 3
        })
    }else if (keys.d.pressed && lastKey === 'd') {
        movables.forEach((movable) => {
            movable.position.x -= 3
        })
    }else if (keys.s.pressed && lastKey === 's') {
        movables.forEach((movable) => {
            movable.position.y -= 3
        })
    }
}

animate()

image.onload = () => {  
    c.drawImage(image, -200,-1300)
    c.drawImage(
        playerImage,
        0,
        0,
        playerImage.width/4,
        playerImage.height,
        canvas.width/2 - playerImage.width/2,
        canvas.height/2 - playerImage.height/2,
        playerImage.width/4,
        playerImage.height
    )

}

