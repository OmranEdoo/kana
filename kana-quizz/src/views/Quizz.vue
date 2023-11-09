<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref } from 'vue'

import MenuButton from '../components/MenuButton.vue';

let answers = ref<Array<string>>([])
let choices = ref<Array<number>>([])
let index = ref<number>(0)
const kanas = ref<Array<Object>>([
    { phonetique: 'a', hiragana: 'あ', katakana: 'ア' },
    { phonetique: 'i', hiragana: 'い', katakana: 'イ' },
    { phonetique: 'u', hiragana: 'う', katakana: 'ウ' },
    { phonetique: 'e', hiragana: 'え', katakana: 'エ' },
    { phonetique: 'o', hiragana: 'お', katakana: 'オ' },
    { phonetique: 'ka', hiragana: 'か', katakana: 'カ' },
    { phonetique: 'ki', hiragana: 'き', katakana: 'キ' },
    { phonetique: 'ku', hiragana: 'く', katakana: 'ク' },
    { phonetique: 'ke', hiragana: 'け', katakana: 'ケ' },
    { phonetique: 'ko', hiragana: 'こ', katakana: 'コ' },
    { phonetique: 'sa', hiragana: 'さ', katakana: 'サ' },
    { phonetique: 'shi', hiragana: 'し', katakana: 'シ' },
    { phonetique: 'su', hiragana: 'す', katakana: 'ス' },
    { phonetique: 'se', hiragana: 'せ', katakana: 'セ' },
    { phonetique: 'so', hiragana: 'そ', katakana: 'ソ' },
    { phonetique: 'ta', hiragana: 'た', katakana: 'タ' },
    { phonetique: 'chi', hiragana: 'ち', katakana: 'チ' },
    { phonetique: 'tsu', hiragana: 'つ', katakana: 'ツ' },
    { phonetique: 'te', hiragana: 'て', katakana: 'テ' },
    { phonetique: 'to', hiragana: 'と', katakana: 'ト' },
    { phonetique: 'na', hiragana: 'な', katakana: 'ナ' },
    { phonetique: 'ni', hiragana: 'に', katakana: 'ニ' },
    { phonetique: 'nu', hiragana: 'ぬ', katakana: 'ヌ' },
    { phonetique: 'ne', hiragana: 'ね', katakana: 'ネ' },
    { phonetique: 'no', hiragana: 'の', katakana: 'ノ' },
    { phonetique: 'ha', hiragana: 'は', katakana: 'ハ' },
    { phonetique: 'hi', hiragana: 'ひ', katakana: 'ヒ' },
    { phonetique: 'fu', hiragana: 'ふ', katakana: 'フ' },
    { phonetique: 'he', hiragana: 'へ', katakana: 'ヘ' },
    { phonetique: 'ho', hiragana: 'ほ', katakana: 'ホ' },
    { phonetique: 'ma', hiragana: 'ま', katakana: 'マ' },
    { phonetique: 'mi', hiragana: 'み', katakana: 'ミ' },
    { phonetique: 'mu', hiragana: 'む', katakana: 'ム' },
    { phonetique: 'me', hiragana: 'め', katakana: 'メ' },
    { phonetique: 'mo', hiragana: 'も', katakana: 'モ' },
    { phonetique: 'ya', hiragana: 'や', katakana: 'ヤ' },
    { phonetique: 'yu', hiragana: 'ゆ', katakana: 'ユ' },
    { phonetique: 'yo', hiragana: 'よ', katakana: 'ヨ' },
    { phonetique: 'ra', hiragana: 'ら', katakana: 'ラ' },
    { phonetique: 'ri', hiragana: 'り', katakana: 'リ' },
    { phonetique: 'ru', hiragana: 'る', katakana: 'ル' },
    { phonetique: 're', hiragana: 'れ', katakana: 'レ' },
    { phonetique: 'ro', hiragana: 'ろ', katakana: 'ロ' },
    { phonetique: 'wa', hiragana: 'わ', katakana: 'ワ' },
    { phonetique: 'wo', hiragana: 'を', katakana: 'ヲ' },
])
let chosenIndex = ref<number>(-1)
let answerArrayPosition = ref<number>(-1)
let showCorrection = ref<boolean>(false)
var isKanaBothType = false
let kanaType = ref<string>('test')

const route = useRoute()
if (route.params.kana == "hiragana_katakana") {
    isKanaBothType = true
} else {
    kanaType.value = <string>route.params.kana
}

for (let i = 0; i < +route.params.number; i++) {
    choices.value.push(Math.floor(Math.random() * kanas.value.length))
}
selectPropositions()

function selectPropositions() {
    answers.value = []
    const answerIndex = choices.value[index.value]
    var numberOfPropositions = 0
    if (+route.params.level == 0) {
        numberOfPropositions = 3
    } else if (+route.params.level == 1) {
        numberOfPropositions = 6
    }
    answerArrayPosition.value = Math.floor(Math.random() * (numberOfPropositions - 1))
    for (let i = 0; i < numberOfPropositions - 1; i++) {
        if (i == answerArrayPosition.value) {
            answers.value.push(Object(kanas.value[answerIndex])['phonetique'])
        }
        let propositionIndex = Math.floor(Math.random() * kanas.value.length)
        while (propositionIndex == answerIndex) {
            propositionIndex = Math.floor(Math.random() * kanas.value.length)
        }
        answers.value.push(Object(kanas.value[propositionIndex])['phonetique'])
    }
}

function chooseIndex(index: number) {
    if (!showCorrection.value) {
        chosenIndex.value = index
    }
}

function changeKanaType() {
    if (isKanaBothType) {
        if (kanaType.value == "hiragana") {
            kanaType.value = "katakana"
        } else {
            kanaType.value = "hiragana"
        }
    }
}

function changeQuestion() {
    changeKanaType()
    showCorrection.value = false
    if (index.value + 1 < +route.params.number) {
        index.value++
        selectPropositions()
    }
}

function correctQuestion() {
    showCorrection.value = true
}
</script>

<template>
    <MenuButton />
    <div class="d-flex flex-column width50">
        <div class="d-flex justify-center mb-6 text-h2">
            {{ Object(kanas[choices[index]])[kanaType] }}
        </div>
        <div class="d-flex flex-row justify-space-between mb-6">
            <div v-for="(answer, index) in answers"
                :class="[`proposition-${index}`, { outline: chosenIndex == index, goodAnswer: index == answerArrayPosition && showCorrection, badAnswer: index != answerArrayPosition && showCorrection }]"
                class="d-flex box width7 hover" @click="chooseIndex(index)">{{ answer }}
            </div>
        </div>
        <div class="d-flex flex-row justify-space-between">
            <button class="width23" @click="correctQuestion">Correct</button>
            <button class="width23" @click="changeQuestion">Next</button>
        </div>
    </div>
</template>

<style>
.goodAnswer {
    outline: solid;
    outline-color: green;
}

.badAnswer {
    outline-color: red;
}
</style>