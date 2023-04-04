<template>
    <div class="timing">
        <div class="row">
            <div class="col-2">
                <div class="user-photo">
                    <img :src="$store.state.user.photo" alt="">
                </div>
                <div :class="$store.state.pk.currentPlayer === 'A' ? 'user-username active' : 'user-username'">
                    {{ $store.state.user.username }}
                </div>
            </div>
            <div class="col-3">
                <div :class = "$store.state.pk.currentPlayer === 'A' ? 'piece active' : 'piece'">
                    {{ Piece1 }}
                    <!-- White Chess -->
                </div>
            </div>
            <div class="col-2">
                <div class="timing-board">
                    {{ stor.state.pk.time }}
                </div>
            </div>
            <div class="col-3">
                <div :class = "$store.state.pk.currentPlayer === 'A' ? 'piece active' : 'piece'">
                    {{ Piece2 }}
                    <!-- White Chess -->
                </div>
            </div>
            <div class="col-2">
                <div class="user-photo">
                    <img :src="$store.state.pk.opponent_photo" alt="">
                </div>
                <div :class="$store.state.pk.currentPlayer === 'B' ? 'user-username active' : 'user-username'">
                    {{ $store.state.pk.opponent_username }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
    setup() {
        const store = useStore();
        let time = 29;
        let currTime = ref("30");
        let Piece1 = ref("");
        let Piece2 = ref("");
        let currentPlayer = store.state.pk.currentPlayer;

        if(store.state.user.id == store.state.pk.a_id) {
            Piece1.value = "Black Chess";
            Piece2.value = "White Chess";
        }
        if(store.state.user.id == store.state.pk.b_id) {
            Piece1.value = "White Chess";
            Piece2.value = "Black Chess";
        }

        
        const interval_id = setInterval(() => {
            currTime.value = time.toString();
            if(currentPlayer !== store.state.pk.currentPlayer) {
                currentPlayer = store.state.pk.currentPlayer;
                time = 30;
            }
            else if(time <= 0) {
                clearInterval(interval_id);
            }
            time --;
        }, 1000);  // 每300ms设置下一步位置

        return {
            currTime,
            Piece1,
            Piece2,
        }
    }
}

</script>

<style scoped>

    div.timing{
        width: 100%;
        height: 100%;
        background-color: rgba(50, 50, 50, 0.5);
    }

    div.user-photo{
        text-align: center;
        padding-top: 3vh;
    }
    div.user-photo > img {
        border-radius: 50%;
        width: 5vh;
    }
    div.user-username{
        text-align: center;
        font-size: 24px;
        font-weight: 600;
        color: #aaa;
        padding-top: 2vh;
    }
    div.piece {
        text-align: center;
        font-size: 30px;
        font-weight: 600;
        color: #aaa;
        padding-top: 5vh;
    }
    div.active {
        color: white;
    }
    div.timing-board {
        text-align: center;
        font-size: 60px;
        font-weight: 600;
        color: white;
        padding-top: 3vh;
    }
</style>