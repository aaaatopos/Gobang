import { AcGameObject } from "./AcGameObject";
import { Player } from "./Player";

// 地图是15*15,从[this.L / 2, this.L / 2]开始{左上角}。 0~14
export class GameMap extends AcGameObject {
    constructor(ctx, parent) {
        super();

        this.ctx = ctx;
        this.parent = parent;
        this.L = 0;  // 地图中每一小块的宽度

        this.rows = 15;  // 棋盘大小，多分配一个，棋盘上下左右需要预留空间。实际是14*14
        this.cols = 15;

        this.players = [
            new Player({id: 0, colorIn: "#F9F9F9", colorOut: "#AAAAAA", r: 3, c: 3}, this),
            new Player({id: 1, colorIn: "#636766", colorOut: "#0D0D0D", r: 3, c: 4}, this),
        ]
    }

    add_listening_events() {
        this.ctx.canvas.focus();

        const [player0, player1] = this.players;
        this.ctx.canvas.addEventListener("click", e => {
            let r = e.clientX;
            let c = e.clientY;
            let rect = this.ctx.canvas.getBoundingClientRect();  // 用来获取canvas相对于window的位置
            r -= rect.left; 
            c -= rect.top;
            r /= this.L;
            c /= this.L;
            if(player0.step <= player1.step) {  // 黑棋
                player0.set_next_position(r, c); 
                player0.status = "move";
            } else if(player1.step < player0.step) {
                player1.set_next_position(r, c);
                player1.status = "move";
            }
        });
    }

    start() {
        this.add_listening_events();
    }

    update_size() {
        this.L = Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows);
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
    }

    // 判断两个玩家是否准备好
    check_ready() {
        for(const player of this.players) {
            if(player.status !== "idle") 
                return true; // 如果有一个玩家不是idle，则准备好进入下一回合了
        }
        return false ;
    }

    // 将舍得状态
    next_step() {
        const [player0, player1] = this.players;
        if(player0.status === "move") {
            player0.next_step();
        } else if(player1.status === "move") {
            player1.next_step();
        }
    }

    update() {  
        this.update_size();
        if(this.check_ready()) {
            this.next_step();
        }
        this.render();
    }

    render() {
        // 绘制棋盘
        this.ctx.fillStyle = '#F6E6B6';
        this.ctx.fillRect(0, 0, this.rows * this.L, this.cols * this.L);

        // 绘制线条横15条，竖15条
        for(let i = 0; i < this.rows; i ++ ) {
            this.ctx.lineWidth = this.L / 20;
            this.ctx.strokeStyle = '#C0A379';
            this.ctx.moveTo(this.L / 2 + this.L * i, this.L / 2);
            this.ctx.lineTo(this.L / 2 + this.L * i, this.rows * this.L - this.L / 2);
            this.ctx.moveTo(this.L / 2, this.L / 2 + this.L * i);
            this.ctx.lineTo(this.rows * this.L - this.L / 2, this.L / 2 + this.L * i);
        }
        this.ctx.stroke();

        // 绘制棋盘上的圆形
        let center_x = this.L / 2 + this.L * 7;
        let center_y = this.L / 2 + this.L * 7;
        this.ctx.fillStyle = '#C0A379';
        this.ctx.beginPath();
        this.ctx.arc(center_x, center_y, this.L / 4, 0, 2 * Math.PI);
        this.ctx.fill();
        let dx = [-4, 4, 4, -4], dy = [-4, -4, 4, 4];
        for(let i = 0; i < 4; i ++) {
            let x = center_x + dx[i] * this.L;
            let y = center_y + dy[i] * this.L;
            this.ctx.fillStyle = '#C0A379';
            this.ctx.beginPath();
            this.ctx.arc(x, y, this.L / 4, 0, 2 * Math.PI);
            this.ctx.fill();
        }
    }

    destroy() {
        
    }
}