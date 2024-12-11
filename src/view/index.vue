<script setup lang="ts">
import resolucaoService from '@/services/requires/requiresResolucao';
import { onMounted, ref } from 'vue';

const { list } = resolucaoService()
const filteredResolucao = ref<Resolucao[]>([])
const resolucao = ref<Resolucao[]>([])


interface Resolucao {
    Numero: string,
    Data: string,
    Ementa: string,
    Link: string,
}


const headersResolucao = ref([
    { title: 'Numero', align: 'start', sortable: true, key: 'Numero' },
    { title: 'Data', sortable: true, key: 'Data' },
    { title: 'Ementa', sortable: false, key: 'Ementa' },
    { title: 'Link', sortable: true, key: 'Link' },

])

onMounted(() => {
    getPosts();
})

const getPosts = async () => {
    try {
        const data = await list();
        filteredResolucao.value = data.value;
    } catch (error) {
        console.log('Deu erro...', error);
    }
};

</script>

<template>
    <v-row>
        <v-col cols="2" class="d-flex justify-start">
            <v-btn class="custom-width-2" color="primary" variant="flat">
                Cadastrar Resolução
            </v-btn>
        </v-col>
    </v-row>

    <v-row>
        <v-cols cols="12">
            <v-data-table class="border rounded-md" :headers="headersResolucao" :items="filteredResolucao">
            </v-data-table>
        </v-cols>
    </v-row>


</template>