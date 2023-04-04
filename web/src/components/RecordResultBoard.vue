<template>
    <div class="result-board">
        <div class="result-board-text" v-if="$store.state.pk.winer === 'A' && $store.state.record.is_record"> 
            Black is Winer
        </div>
        <div class="result-board-text" v-else-if="$store.state.pk.winer === 'B' && $store.state.record.is_record"> 
            White is Winer
        </div>
        <div class="result-board-button">
            <button @click="restart" type="button" class="btn btn-warning btn-lg">
                返回对战记录页面
            </button>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
import router from '@/router/index';

export default {
    setup() {
        const store = useStore();
        const restart = () => {
            store.commit("updateIsRecord", false);  // 进入匹配界面
            store.commit("updateWiner", "none");
            router.push({ name : "record_index" });
        };

        return {
            restart,
        };
    }
}

</script>

<style scoped>
    div.result-board{
        height: 30vh;
        width: 30vw;
        background-color: rgba(50, 50, 50, 0.5);
        position: absolute;
        top: 30vh;
        left: 35vw;
    }
    div.result-board-text {
        text-align: center;
        color: white;
        font-size: 50px;
        font-weight: 600;
        font-style: italic;
        padding-top: 5vh;
    }
    div.result-board-button {
        text-align: center;
        padding-top: 7vh;
    }
</style>