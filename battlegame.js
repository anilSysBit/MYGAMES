const canvas = document.getElementById("canvas");

canvas.height = innerHeight;
canvas.width = innerWidth;

const ctx = canvas.getContext('2d');

ctx.strokeStyle = 'white';

let mouse = {
    x:10,
    y:10
}


const img = new Image();
img.src = 'https://th.bing.com/th/id/R.680e81cb7ec688478dd8d1af2078b347?rik=LRpMALGp9DbuVQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fcartoon-gun-png-this-cartoon-pistol-cartoon-gun-clipart-1037-555-1037.png&ehk=QJ%2b0GCmv9xO7SUJeoDjq2eQni6Inc4x6fGmq%2buqaAcg%3d&risl=&pid=ImgRaw&r=0';
const img2 = new Image();
img2.src = 'https://www.jing.fm/clipimg/full/171-1717505_guns-clipart-9mm-trigger.png';

const DrawTriangle =()=>{
    ctx.beginPath();
ctx.moveTo(canvas.width/2,canvas.height/2);
ctx.fillRect(100,100,20,20)
ctx.lineTo(100,100);
ctx.fillRect(100,500,20,20)
ctx.lineTo(100,500)
ctx.fillRect(canvas.width/2,canvas.height/2,20,20)
ctx.lineTo(canvas.width/2,canvas.height/2)
ctx.stroke();
ctx.closePath();
}
// DrawTriangle();

const DrawCircle=()=>{
    ctx.beginPath();
    ctx.fillStyle = 'yellow'
    ctx.arc(canvas.width/2,canvas.height/2,100,0,2*Math.PI,false);
    ctx.fill(); 
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(canvas.width/2-40,canvas.height/2-40,30,0,2*Math.PI,false)
    ctx.moveTo(canvas.width/2+70,canvas.height/2-40);
    ctx.arc(canvas.width/2+40,canvas.height/2-40,30,0,2*Math.PI,false)
    ctx.moveTo(canvas.width/2-50,canvas.height/2+20);
    ctx.arc(canvas.width/2,canvas.height/2+20,60,0,Math.PI,false)
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.stroke();
}
// DrawCircle();

const players = [
    {
        x:canvas.width/2+120,
        y:canvas.height/2,
        size:30,
        color:'red',
        speed:5,
        cooldown:0,
        posText:canvas.width/4,
        score:0,
        image:img2,
        subtractGun:0
    },
    {
        x:canvas.width/2-120,
        y:canvas.height/2,
        size:30,
        color:'white',
        speed:5,
        cooldown:0,
        posText:canvas.width/2 + canvas.width/4,
        score:0,
        image:img,
        subtractGun:200
    }
]

const game = {
    req:'',
    bullet:[],
    bulletSpeed:10
}
const keys = {
    ArrowLeft:false,
    ArrowRight:false,
    ArrowUp:false,
    ArrowDown:false,
    KeyA:false,
    KeyS:false,
    KeyD:false,
    KeyW:false
}

const movement =()=>{
    if(keys['ArrowLeft'] && players[0].x >canvas.width/2+players[0].size){players[0].x -= players[0].speed}
    if(keys['ArrowRight'] && players[0].x < canvas.width-players[0].size){players[0].x += players[0].speed}
    if(keys['ArrowUp'] && players[0].y > 0+players[0].size){players[0].y -= players[0].speed}
    if(keys['ArrowDown'] && players[0].y < canvas.height-players[0].size){players[0].y += players[0].speed}
    if(keys['KeyA'] && players[1].x > 0+players[1].size){players[1].x -= players[1].speed}
    if(keys['KeyD'] && players[1].x < canvas.width/2-players[1].size){players[1].x += players[1].speed}
    if(keys['KeyW'] && players[1].y >0+players[1].size){players[1].y -= players[1].speed}
    if(keys['KeyS'] && players[1].y < canvas.height-players[1].size){players[1].y += players[1].speed}
}






// window.addEventListener('click',()=>{
//     player.speed = -player.speed
// })
window.addEventListener('keydown',(e)=>{
    if(e.code in keys){
        keys[e.code] = true;
    }


    if(e.code == 'Space' && players[0].cooldown <= 0){
        players[0].cooldown = 5;
        game.bullet.push({
            x: players[0].x - 25,
            y:players[0].y,
            speed: -game.bulletSpeed,
            size:10,
            color:'yellow',
        })
    }


    if(e.code == 'KeyX' && players[1].cooldown <= 0){
        players[1].cooldown = 5;
        game.bullet.push({
            x: players[1].x + 25,
            y:players[1].y,
            speed: game.bulletSpeed,
            size:10,
            color:'white',
        })
    }

    // console.log(keys)
// console.log(game.bullet)
})

window.addEventListener('keyup',(e)=>{
    if(e.code in keys){
        keys[e.code] = false;
    }
    // console.log(keys)
})


// addEventListener('mousemove',(e)=>{
//     mouse.x = e.clientX;
//     mouse.y = e.clientY;
// ctx.clearRect(0,0,canvas.height,canvas.width)
// ctx.beginPath();
// ctx.arc(mouse.x,mouse.y,30,0,2*Math.PI,false);
// ctx.stroke();

// })

const collisionDetection =(a,b)=>{
    return a.x < b.x + b.size && a.x + a.size * 2 > b.x && a.y < b.y + b.size * 2 && a.y + a.size * 2 > b.y;
}

const DrawMove=()=>{ 
    ctx.clearRect(0,0,canvas.width,canvas.height);
    movement();
    game.bullet.forEach((bull,index)=>{
        ctx.fillStyle = bull.color;
        ctx.fillRect(bull.x,bull.y,bull.size,bull.size);
        bull.x += bull.speed;

        if(bull.x <= 0){
            game.bullet.splice(index,1)
        }
        players.forEach((player,i)=>{
            if(collisionDetection(bull,player)){
                console.log('Collided ')
                player.score++; 
                game.bullet.splice(index,1)
   
            }
        })
    })
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(canvas.width/2,0);
    ctx.lineTo(canvas.width/2,canvas.height)
    ctx.stroke();
    ctx.closePath();
    players.forEach(player=>{
        if(player.cooldown > 0){player.cooldown--}
        ctx.font = '40px Jokerman';
        ctx.fillStyle = 'white'
        ctx.textAlign = 'center';
        ctx.fillText("BATTLE GUN",canvas.width/2,40);
        ctx.fillText(`SCORE : [${player.score}]`,player.posText,100);
        ctx.beginPath();
        ctx.arc(player.x,player.y,player.size,0,2*Math.PI,false)
        ctx.fillStyle = player.color;
        ctx.fill();
        ctx.fillStyle = 'black';
        ctx.drawImage(player.image,player.x-player.subtractGun,player.y-20,200,100)
        ctx.fillRect(player.x,player.y,5,5);
        ctx.stroke();
    })
    game.req = requestAnimationFrame(DrawMove);
}

game.req = requestAnimationFrame(DrawMove);
  