<script setup lang="ts">
import resolucaoService from '@/services/requires/requiresResolucao';
import { onMounted, ref } from 'vue';

const resolucao = ref([])
const { list } = resolucaoService()


onMounted(() => {
    getPosts()
})

const getPosts = async () => {
    try {
        const data = await list()
        resolucao.value = data.value
    } catch (error) {
        console.error(error)
    }
}



</script>


<template>
    <main></main>
</template>