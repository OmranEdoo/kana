<script setup lang="ts">
import { ref } from 'vue'

const levels = ref({
    0: 'Easy',
    1: 'Medium',
    2: 'Hard',
})

let level = ref(0)
let numberQuestions = ref(1)
let isHiragana = ref(false)
let isKatakana = ref(false)

function clickHiragana() {
    if (isHiragana.value) {
        isHiragana.value = false
    } else {
        isHiragana.value = true
    }
}

function clickKatakana() {
    if (isKatakana.value) {
        isKatakana.value = false
    } else {
        isKatakana.value = true
    }
}
</script>

<template>
    <div class="d-flex flex-column width50">
        <div class="d-flex flex-row justify-space-between mb-6">
            <div class="box hover width23 d-flex" :class="{ outline: isHiragana }" @click="clickHiragana">
                <p>Hiragana</p>
            </div>
            <div class="box hover width23 d-flex" :class="{ outline: isKatakana }" @click="clickKatakana">
                <p>Katakana</p>
            </div>
        </div>
        <div class="d-flex flex-column align-start mb-6">
            <p>Number of questions</p>
            <v-text-field v-model="numberQuestions" hide-details single-line type="number" min="1" max="100" class="width50"
                density="compact" />
        </div>
        <div class="d-flex flex-column align-start mb-6">
            <p>Level</p>
            <v-row class="width50">
                <v-col>
                    <v-slider v-model="level" :ticks="levels" min="0" max="2" :step="1" show-ticks="always" tick-size="5"
                        thumb-size="20" />
                </v-col>
            </v-row>
        </div>
        <router-link v-if="isHiragana && isKatakana" class="d-flex flex-column width50 box hover" :to="{
            name: 'quizz', params: {
                number: numberQuestions, kana: 'hiragana_katakana', level: level
            }
        }">Begin</router-link>
        <router-link v-else-if="isHiragana" class="d-flex flex-column width50 box hover" :to="{
            name: 'quizz', params: {
                number: numberQuestions, kana: 'hiragana', level: level
            }
        }">Begin</router-link>
        <router-link v-else-if="isKatakana" class="d-flex flex-column width50 box hover" :to="{
            name: 'quizz', params: {
                number: numberQuestions, kana: 'katakana', level: level
            }
        }">Begin</router-link>
        <div v-else class="d-flex flex-column width50 box" disabled="true">Begin</div>
    </div>
</template>

<style>
.width7 {
    width: 7vw;
}

.width15 {
    width: 15vw;
}

.width23 {
    width: 23vw;
}

.width50 {
    width: 50vw !important;
}

@media only screen and (max-width: 700px) {
    .width50 {
        width: 80vw !important;
    }
}

.box {
    display: table-cell;
    height: 50px;
    border-radius: 6px;
    align-items: center;
    justify-content: center;
    background-color: rgb(60, 60, 60);
    color: rgb(139, 139, 139);
}

.outline {
    outline: solid;
}

.hover {
    background-color: rgb(69, 69, 69);
    color: rgb(225, 225, 225);
}

.hover:hover {
    background-color: rgb(113, 113, 113) !important;
    color: rgb(255, 255, 255);
}
</style>