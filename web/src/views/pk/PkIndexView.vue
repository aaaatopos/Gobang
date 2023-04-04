<template>
    <PlayGround v-if="$store.state.pk.status === 'playing'"></PlayGround>
    <MatchGround v-if="$store.state.pk.status === 'matching'"></MatchGround>
    <ResultBoard v-if="$store.state.pk.winer !== 'none'"></ResultBoard>
    <BirthLocation v-if="$store.state.pk.status === 'matching' && $store.state.pk.birthLocation != 'none'"></BirthLocation>
</template>

<script>

import PlayGround from '@/components/PlayGround.vue'
import MatchGround from '@/components/MatchGround.vue';
import ResultBoard from '@/components/ResultBoard.vue'
import BirthLocation from '@/components/BirthLocation.vue'
import { onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';

export default {
    components: {
        PlayGround,
        MatchGround,
        ResultBoard,
        BirthLocation,
    },
    setup() {
        const store = useStore();
        const socketUrl = `ws://127.0.0.1:3000/websocket/${store.state.user.token}/`;

        store.commit("updateIsRecord", false);

        let socket = null;
        onMounted(() => {  // 挂载函数，页面打开时，会执行，创建一个websocket链接
            store.commit("updateOpponent", {
                username: "我的对手",
                photo: "https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png",
            });
            socket = new WebSocket(socketUrl);

            socket.onopen = () => {
                console.log("connected!");
                store.commit("updateSocket", socket);  // 将创建的socket保存
            }

            socket.onmessage = msg => {
                const data = JSON.parse(msg.data);
                if(data.event === "success-matching") {  // 表示匹配成功
                    store.commit("updateOpponent", {
                        username: data.opponent_username,
                        photo: data.opponent_photo,
                    });
                    let a_id = data.game.a_id;
                    let b_id = data.game.b_id;
                    if(store.state.user.id == a_id) 
                        store.commit("updateBirthLocation", "black");
                    else if(store.state.user.id == b_id) 
                        store.commit("updateBirthLocation", "white");
                    
                    setTimeout(() => {
                        store.commit("updateStatus", "playing");
                        store.commit("updateBirthLocation", "none");
                    }, 2000);
                    store.commit("updateGame", data.game);
                } else if(data.event === "move") {
                    const game = store.state.pk.gameObject;
                    const [player0, player1] = game.players;
                    console.log(data.nextStepX, data.nextStepY);
                    store.commit("updateCurrentPlayer", data.player);
                    if(data.player === "A") {
                        player0.set_next_position(data.nextStepX, data.nextStepY);
                    } else if(data.player === "B") {
                        player1.set_next_position(data.nextStepX, data.nextStepY);
                    }
                } else if(data.event === "result") {
                    const game = store.state.pk.gameObject;
                    const [player0, player1] = game.players;
                    console.log("Winer is " + data.winer);
                    if(data.winer === "A") {
                        player1.status = "die";
                    } 
                    if(data.winer === "B") {
                        player0.status = "die";
                    }
                    store.commit("updateWiner", data.winer);
                }
            }

            socket.onclose = () => {
                console.log("disconnected!");
            }
        });

        onUnmounted(() => {  // 卸载函数，离开页面时调用，需要将websocket链接断开，避免冗余链接
            socket.close();
            store.commit("updateStatus", "matching");
        });
    },
}
</script>

<style scoped>

</style>