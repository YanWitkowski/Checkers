<template>
    <div class="user-info">
        <div class="user-info__title-wrap">
            <h2 class="user-info__title">{{ title }}</h2>
            <span v-if="isCurrentWay" class="user-info__title--way">Ваш ход</span>
        </div>
        <p class="user-info__score">Score: {{ score }}</p>

        <div class="user-info__table">
            <div v-for="(item, index) in table" class="user-info__table-item" :key="index">
                <div v-if="item !== 0" class="user-info__item-figure" :class="{
                    'user-info__item-figure--black': item === 1,
                    'user-info__item-figure--white': item === 2
                }" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, defineProps } from "vue";

const props = defineProps({
    data: {
        type: Object,
        default: () => { }
    }
})

const user = computed(() => props.data?.user);
const score = computed(() => user.value?.score || 0);
const table = computed(() => user.value?.table || []);
const title = computed(() => props.data?.title || "");

const isCurrentWay = computed(() => props.data?.isCurrentWay || false)
</script>

<style lang="less">
.user-info {
    box-sizing: border-box;
    width: 299px;
    padding: 0 20px;
    &__title-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 150px;
    }

    &__title {
        display: inline-block;

        &--way {
            padding: 5px 10px;
            border-radius: 10px;
            background-color: @green;
            color: @white;
            font-size: 16px;
        }
    }

    &__score {
        margin: 0 0 20px;
    }

    &__table {
        display: flex;
        flex-wrap: wrap;
        width: 120px;
        margin: -5px;
    }

    &__table-item {
        width: 50px;
        height: 50px;
        margin: 5px;
    }

    &__item-figure {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        box-shadow: 0 0 2px 2px @gray;

        &--black {
            background-color: @black;
        }

        &--white {
            background-color: @white;
        }
    }
}
</style>