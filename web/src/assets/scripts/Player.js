import { AcGameObject } from "./AcGameObject";
import { Piece } from "./Piece";

export class Player extends AcGameObject {
    constructor(info, gamemap) {
        super();

        this.id = info.id; // 取出对应玩家的id
        this.colorIn = info.colorIn;
        this.colorOut = info.colorOut;
        this.gamemap = gamemap;

        this.pieces = []; // 用来保存组成该玩家棋情的所有棋子。
        this.store = gamemap.store;

        this.next_piece = "";

        this.next_x = -1;
        this.next_y = -1;
        this.status = "idle"; // wait表示等待对方监听，idle表示等待玩家操作，play表示正在下，die表示死亡。

    }

    start() {

    }

    set_next_position(x, y) {
        this.next_x = x;
        this.next_y = y;
    }

    next_step() {
        const x = this.next_x;
        const y = this.next_y;
        this.next_piece = new Piece(x, y);
        this.store.commit("updateNextStep", {
            x: this.next_piece.x.toString(),
            y: this.next_piece.y.toString(),
        })
        this.next_x = -1;
        this.next_y = -1;
        this.status = "move";
        this.step ++;
    }

    update_move() {
        this.pieces.push(this.next_piece);
        this.status = "idle";
    }

    update() {
        if(this.status === "move") 
            this.update_move();
        this.render();
    }

    render() {  // 绘制当前玩家的棋子
        const L = this.gamemap.L;
        const ctx = this.gamemap.ctx;
        // 实现渐变圆
        for(const piece of this.pieces) {
            ctx.beginPath();
            ctx.arc(piece.x * L, piece.y * L, L * 2 / 5, 0, Math.PI * 2); // 绘制棋子
            let canvasGradient = ctx.createRadialGradient(piece.x * L, piece.y * L, L * 1 / 15, piece.x * L, piece.y * L, L * 2 / 5);
            canvasGradient.addColorStop(0, this.colorIn);
            canvasGradient.addColorStop(1, this.colorOut);
            ctx.fillStyle = canvasGradient;
            ctx.fill();
            ctx.closePath();
        }
        let x = parseFloat(this.store.state.pk.nextStepX), y = parseFloat(this.store.state.pk.nextStepY);
        if(x >= 0 && y >= 0) {
            let dx = [0, 1, 0, -1], dy = [-1, 0, 1, 0];
            
            for(let i = 0; i < 4; i ++) {
                ctx.beginPath();
                ctx.lineWidth = L / 20;//设置线条宽度10
                ctx.strokeStyle = 'red';//设置线条颜色为绿色
                ctx.moveTo((x - dx[i] * 1 / 15) * L, (y - dy[i] * 1 / 15) * L);
                ctx.lineTo((x - dx[i] * 1 / 5) * L, (y - dy[i] * 1 / 5) * L);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}