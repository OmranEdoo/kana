<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router'

export default defineComponent({
    data() {
        return {
            answers: ['wa', 'ji', 'nou'],
            choices: [] as Array<number>,
            index: 0,
            kanas: [
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
            ]
        }
    },
    mounted() {
        const route = useRoute()
        for (let i = 0; i < +route.params.number; i++) {
            this.choices.push(Math.floor(Math.random() * this.kanas.length))
        }
        console.log(this.choices)
    }
})
</script>

<template>
    <div class="d-flex flex-column width50">
        <div class="box mb-6">
            {{ kanas[choices[index]]['hiragana'] }}
        </div>
        <div class="d-flex flex-row justify-space-between mb-6">
            <div v-for="answer in answers" class="box width15 hover">{{ answer }}</div>
        </div>
        <div class="d-flex flex-row justify-space-between">
            <button class="width23">Correct</button>
            <button class="width23">Next</button>
        </div>
    </div>
</template>

<style></style>