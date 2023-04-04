<template>
    <div class="playground">
        <GameMap>

        </GameMap>
    </div>
    <!-- <div class="timeboard">
        <TimingBoard>

        </TimingBoard>
    </div> -->
</template>

<script>

import GameMap from '@/components/GameMap.vue'
// import TimingBoard from './TimingBoard.vue';

export default {
    components: {
        GameMap,
        // TimingBoard,
    }
}

</script>

<style scoped>
    div.playground {
        width: 60vw;
        height: 70vh;
        /* background-color: lightblue; */
        margin: 40px auto 0;
        
    }
    /* div.timeboard {
        width: 60vw;
        height: 15vh;
        margin: 20px auto 0;
    } */
</style>