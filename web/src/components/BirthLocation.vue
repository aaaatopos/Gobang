<template>
    <div class="result-board">
        <div class="result-board-text" v-if="$store.state.pk.status === 'matching' && $store.state.pk.birthLocation === 'black'"> 
            你是黑棋 - 先手
        </div>
        <div class="result-board-text" v-if="$store.state.pk.status === 'matching' && $store.state.pk.birthLocation === 'white'"> 
            你是白棋 - 后手
        </div>
    </div>
</template>

<script>

export default {
    setup() {
        
    }
}

</script>

<style scoped>
    div.result-board{
        height: 20vh;
        width: 30vw;
        background-color: rgba(50, 50, 50, 0.5);
        position: absolute;
        top: 35vh;
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
</style>