<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            level: {
                0: 'Easy',
                1: 'Medium',
                2: 'Difficult',
            },
            isHiragana: false,
            isKatakana: false,
        }
    },
    methods: {
        clickHiragana() {
            if (this.isHiragana) {
                this.isHiragana = false
            } else {
                this.isHiragana = true
            }
        },
        clickKatakana() {
            if (this.isKatakana) {
                this.isKatakana = false
            } else {
                this.isKatakana = true
            }
        }
    }
})
</script>

<template>
    <div class="d-flex flex-column width50">
        <div class="d-flex flex-row justify-space-between mb-6">
            <div class="box d-flex" :class="{ outline: isHiragana }" @click="clickHiragana">
                <p>Hiragana</p>
            </div>
            <div class="box d-flex" :class="{ outline: isKatakana }" @click="clickKatakana">
                <p>Katakana</p>
            </div>
        </div>
        <div class="d-flex flex-column align-start mb-6">
            <p>Number of questions</p>
            <v-text-field hide-details single-line type="number" min="1" max="100" class="width50" />
        </div>
        <div class="d-flex flex-column align-start mb-6">
            <p>Level</p>
            <v-row class="width50">
                <v-col>
                    <v-slider :ticks="level" min="0" max="2" :step="1" show-ticks="always" tick-size="4">
                    </v-slider>
                </v-col>
            </v-row>
        </div>
        <router-link class="d-flex flex-column width50 box" to="/quizz">Begin</router-link>
    </div>
</template>

<style>
.width50 {
    width: 50vw !important;
}

.box {
    display: table-cell;
    width: 23vw;
    height: 50px;
    border-radius: 7px;
    background-color: rgb(69, 69, 69);
    align-items: center;
    justify-content: center;
}

.outline {
    outline: solid;
}

.box:hover {
    background-color: rgb(113, 113, 113);
}
</style>