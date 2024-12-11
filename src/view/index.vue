<script setup lang="ts">
import { onMounted, ref } from 'vue';
import resolucaoService from '../services/requires/requiresResolucao';

const { list } = resolucaoService();
const filteredResolucao = ref<Resolucao[]>([]);
const showModal = ref(false);
const isEditing = ref(false);
const editingIndex = ref<number | null>(null);

interface Resolucao {
    Numero: string;
    Data: string;
    Ementa: string;
    Link: string;
}

const newResolucao = ref<Resolucao>({
    Numero: '',
    Data: '',
    Ementa: '',
    Link: '',
});

const headersResolucao = ref([
    { title: 'Numero', align: 'start', sortable: true, key: 'Numero' },
    { title: 'Data', sortable: true, key: 'Data' },
    { title: 'Ementa', sortable: false, key: 'Ementa' },
    { title: 'Link', sortable: true, key: 'Link' },
    { title: 'Ações', key: 'actions', sortable: false },
]);

onMounted(() => {
    getPosts();
});

const getPosts = async () => {
    try {
        const data = await list();
        
        filteredResolucao.value = data.value;
    } catch (error) {
        console.log('Deu erro...', error);
    }
};

const saveResolucao = () => {
    if (
        newResolucao.value.Numero &&
        newResolucao.value.Data &&
        newResolucao.value.Ementa &&
        newResolucao.value.Link
    ) {
        if (isEditing.value && editingIndex.value !== null) {
            filteredResolucao.value[editingIndex.value] = { ...newResolucao.value };
        } else {
            filteredResolucao.value.push({ ...newResolucao.value });
        }

        newResolucao.value = { Numero: '', Data: '', Ementa: '', Link: '' };
        showModal.value = false;
        isEditing.value = false;
        editingIndex.value = null;
    } else {
        console.log('Preencha todos os campos!');
    }
};

const editResolucao = (index: number) => {
    const resolucao = filteredResolucao.value[index];
    newResolucao.value = { ...resolucao };
    editingIndex.value = index;
    isEditing.value = true;
    showModal.value = true;
};

const deleteResolucao = (index: number) => {
    const confirmDelete = confirm('Tem certeza que deseja excluir esta resolução?');
    if (confirmDelete) {
        filteredResolucao.value.splice(index, 1);
        console.log('Resolução excluída com sucesso.');
    }
};
</script>

<template>
    <v-row>
        <v-col cols="2" class="d-flex justify-start">
            <v-btn @click="() => { showModal = true; isEditing = false; newResolucao = { Numero: '', Data: '', Ementa: '', Link: '' } }" 
                class="custom-width-2" 
                color="primary" 
                variant="flat"
            >
                Cadastrar Resolução
            </v-btn>
        </v-col>
    </v-row>

    <v-row>
        <v-col cols="12">
            <v-data-table
                class="border rounded-md"
                :headers="headersResolucao"
                :items="filteredResolucao"
                item-value="Numero"
            >
                <template #item.actions="{ item, index }">
                    <v-btn @click="editResolucao(index)" color="primary" icon>
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn @click="deleteResolucao(index)" color="red" icon>
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </template>
            </v-data-table>
        </v-col>
    </v-row>

    <!-- Modal de Cadastro/Edição -->
    <v-dialog v-model="showModal" max-width="500">
        <v-card>
            <v-card-title>
                {{ isEditing ? 'Editar Resolução' : 'Cadastrar Resolução' }}
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field
                        v-model="newResolucao.Numero"
                        label="Número"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="newResolucao.Data"
                        label="Data"
                        type="date"
                        required
                    ></v-text-field>
                    <v-textarea
                        v-model="newResolucao.Ementa"
                        label="Ementa"
                        required
                    ></v-textarea>
                    <v-text-field
                        v-model="newResolucao.Link"
                        label="Link"
                        type="url"
                        required
                    ></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="showModal = false" >Cancelar</v-btn>
                <v-btn @click="saveResolucao" color="primary" >Salvar</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
