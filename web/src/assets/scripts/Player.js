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

        this.next_piece = "";

        this.next_x = -1;
        this.next_y = -1;
        this.status = "idle"; // idle表示等待玩家操作，play表示正在下，die表示死亡。

        this.step = 0; // 表示回合数。
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
        }
    }
}