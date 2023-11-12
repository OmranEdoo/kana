<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'

import MenuButton from '../components/MenuButton.vue';

let answer = ref<string>('')
let answers = ref<Array<string>>([])
let choices = ref<Array<number>>([])
let index = ref<number>(0)
let score = ref<number>(0)
let isFinish = ref<boolean>(false)
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

const isEnded = computed(() => index.value + 1 == +route.params.number)
const isGoodByValue = computed(() => answer.value == Object(kanas.value[choices.value[index.value]])['phonetique'] && showCorrection.value)
const isBadByValue = computed(() => answer.value != Object(kanas.value[choices.value[index.value]])['phonetique'] && showCorrection.value)

function isGoodByIndex(aswIndex: number): boolean {
    return aswIndex == answerArrayPosition.value && showCorrection.value
}
function isBadByIndex(aswIndex: number): boolean {
    return aswIndex != answerArrayPosition.value && showCorrection.value && chosenIndex.value == aswIndex
}

const isLevelTwo = computed(() => +route.params.level == 2)

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
    answer.value = ''
    showCorrection.value = false
    if (index.value + 1 < +route.params.number) {
        index.value++
        selectPropositions()
    }
}

function correctQuestion() {
    showCorrection.value = true
    if ((chosenIndex.value == answerArrayPosition.value && !isLevelTwo.value) || (isGoodByValue.value && isLevelTwo.value)) {
        score.value++
    }
    if (index.value + 1 == +route.params.number) {
        isFinish.value = true
    }
}
</script>

<template>
    <MenuButton />
    <div class="d-flex flex-column width50">
        <div class="d-flex flex-row justify-center mb-6">
            <div class="d-flex justify-center text-h2 whiteFont">
                {{ Object(kanas[choices[index]])[kanaType] }}
            </div>
            <div class="d-flex align-center text-h4 whiteFont"
                v-if="showCorrection && ((isBadByValue && isLevelTwo) || (chosenIndex != answerArrayPosition && !isLevelTwo))">
                → {{
                    Object(kanas[choices[index]])['phonetique'] }}</div>
        </div>

        <div v-if="+$route.params.level == 2" class="mb-6" :class="{
            goodAnswerBackground: isGoodByValue,
            badAnswerBackground: isBadByValue
        }">
            <v-text-field v-model="answer" hide-details single-line type="text" class="width50" density="compact" />
        </div>
        <div v-else class="d-flex flex-row flex-wrap justify-center mb-6" style="gap: 10px">
            <div v-for="(asw, aswIndex) in answers"
                :class="[`proposition-${index}`, { outline: chosenIndex == aswIndex, goodAnswerOutline: isGoodByIndex(aswIndex), badAnswerOutline: isBadByIndex(aswIndex) }]"
                class="d-flex box width7 hover" @click="chooseIndex(aswIndex)">{{ asw }}
            </div>
        </div>
        <div class="d-flex flex-row justify-space-between mb-6">
            <button class="width23 d-flex justify-center quizzButton whiteFont fitContent" @click="correctQuestion" :class="{
                disabledButton: showCorrection
            }">Correct</button>
            <button class="width23 d-flex justify-center quizzButton whiteFont fitContent" @click="changeQuestion"
                :class="{ disabledButton: isEnded }">Next</button>
        </div>
        <b v-if="isFinish" class="score">Score : {{ score }} / {{ $route.params.number }}</b>
        <p v-else class="whiteFont">{{ index + 1 }} / {{ $route.params.number }}</p>
    </div>
</template>

<style>
.goodAnswerOutline {
    outline: solid 5px;
    outline-color: green;
}

.badAnswerOutline {
    outline: solid;
    outline-color: red;
}

.goodAnswerBackground {
    background-color: rgba(0, 128, 0, 0.5);
}

.badAnswerBackground {
    background-color: rgba(255, 0, 0, 0.5);
}

.disabledButton {
    background-color: rgb(60, 60, 60) !important;
    color: rgb(139, 139, 139);
    pointer-events: none;
    border-width: 0;
}

.disabledButton:focus {
    outline: none;
}

.score {
    font-size: large;
    color: rgb(96, 96, 255);
}

.quizzButton {
    background-color: rgb(139, 139, 139);
}
</style>