const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

console.log(collisions)

canvas.width = 1024
canvas.height = 576

c.fillStyle = 'white'
c.fillRect(0,0,canvas.width, canvas.height)

const image = new Image()
image.src = 'seli.png'

const imJogador =new Image()
imJogador.src = 'playerDown.png'

class Sprite {
    constructor({posicao, velocidade, image}){
        this.posicao = posicao
        this.image = image
    }

    draw(){
        c.drawImage(this.image, this.posicao.x, this.posicao.y)
    }
}

const fundo = new Sprite({
    posicao: {
        x:-115,
        y: -1350
    },
    image: image
})

const chaves = {
    w: {
        clicando: false
    },
    a: {
        clicanda: false
    },
    s: {
        clicanda: false
    },

    d: {
        clicanda: false
    }
}

function animate() {
    window.requestAnimationFrame(animate)
    fundo.draw()
    c.drawImage(
        imJogador,
        0,
        0,
        imJogador.width/4,
        imJogador.height,
        canvas.width/2 - imJogador.width/4/2,
        canvas.height/2 - imJogador.height/2,
        imJogador.width/4,
        imJogador.height
    )

    if(chaves.w.clicando && ultimaChave === 'w') 
    {fundo.posicao.y += 3
        limite.posicao.y += 3
    }
    else if (chaves.a.clicando && ultimaChave === 'a') fundo.posicao.x += 3
    else if (chaves.d.clicando && ultimaChave === 'd') fundo.posicao.x -= 3
    else if (chaves.s.clicando && ultimaChave === 's') fundo.posicao.y -= 3

}

animate()

image.onload = () => {  
    c.drawImage(image, -200,-1300)
    c.drawImage(
        imJogador,
        0,
        0,
        imJogador.width/4,
        imJogador.height,
        canvas.width/2 - imJogador.width/2,
        canvas.height/2 - imJogador.height/2,
        imJogador.width/4,
        imJogador.height
    )

}

let ultimaChave = ''

window.addEventListener('keydown', (e) => {
    switch (e.key){
        case 'w':
            chaves.w.clicando = true
            ultimaChave = 'w'
        break

        case 's':
            chaves.s.clicando = true
            ultimaChave = 's'
        break

        case 'a':
            chaves.a.clicando = true
            ultimaChave = 'a'
        break

        case 'd':
            chaves.d.clicando = true
            ultimaChave = 'd'
        break

    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key){
        case 'w':
            chaves.w.clicando = false
        break

        case 's':
            chaves.s.clicando = false
        break

        case 'a':
            chaves.a.clicando = false
        break

        case 'd':
            chaves.d.clicando = false
        break

    }
})
