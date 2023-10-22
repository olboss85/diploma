<template>
    <div class="card flex justify-content-center">
        <Button class="btn" label="Show" icon="pi pi-external-link" @click="visible = true">Add trip</Button>
        <Dialog v-model:visible="visible" modal header="Add your trip" :style="{ width: '50vw' }">
            <template #default>
                <div class="card flex flex-column align-items-center gap-3">
                    <InputText v-model="newContent.author" type="text" placeholder="Your name" />
                </div>
                <div class="card flex justify-content-center">
                    <Dropdown v-model="newContent.selectedCity" :options="destinations" optionLabel="label" optionGroupLabel="label" optionGroupChildren="items" placeholder="Select Destination" class="w-full md:w-14rem">
                        <template #optiongroup="slotProps">
                            <div class="flex align-items-center">
                                <img :alt="slotProps.option.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px" />
                                <div>{{ slotProps.option.label }}</div>
                            </div>
                        </template>
                    </Dropdown>
                </div>
               
                <div class="card flex justify-content-center">
                    <InputText v-if="newContent.selectedCity && newContent.selectedCity.value === 'Add other'" type="text" v-model="newContent.value" />
                </div>
                <div class="card flex justify-content-center">
                    <label for="calendar">Date</label>
                    <Calendar v-model="newContent.date" showIcon />
                </div>
                <div class="card flex justify-content-center">
                    <label for="currency-us" class="font-bold block mb-2"> Price </label>
                    <InputNumber v-model="newContent.price" inputId="currency-us" mode="currency" currency="KZT" locale="en-US" />
                </div>
            </template>
            <template #footer>
                <Button label="Add trip" icon="pi pi-check" @click="add" autofocus />
                <Button label="Cancel" icon="pi pi-times" @click="clear" text />
            </template>
        </Dialog>
    </div>
</template>

<script setup>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import { useContent } from '@/composables/useContent'
import { ref } from 'vue';

const { newContent, addContent } = useContent()


const visible = ref(false); 
const destinations = ref([
    {
        label: 'Almaty Region',
        code: 'KZ',
        items: [
            { label: 'The Kolsay lakes', value: 'The Kolsay lakes' },
            { label: 'Khan Tengri mountain', value: 'Khan Tengri mountain;' },
            { label: 'Lake Kaindy', value: 'Lake Kaindy' },
            { label: 'Tamgaly Gorge', value: 'Tamgaly Gorge' },
            { label: 'Tamgaly Tas', value: 'Tamgaly Tas' },
            { label: 'Medeo', value: 'Medeo' },
            { label: 'Zenkov Cathedral', value: 'Zenkov Cathedral' },
            { label: 'Kok Tobe Park', value: 'Kok Tobe Park' },
            { label: 'Magic Singing Dune', value: 'Magic Singing Dune' },
            { label: 'Green Bazaar', value: 'Green Bazaar' },
            { label: 'Big Almaty Lake', value: 'Big Almaty Lake' },
            { label: 'Turgen Waterfall', value: 'Turgen Waterfall' },
            { label: 'Chimbulak', value: 'Chimbulak' },
            { label: 'Add other', value: 'Add other' },
        ]
    },
]);


async function add(){
    await addContent()
    visible.value = false;
}

function clear(){
newContent.value = {
    author: '',
    date: '',
    value: '',
    price: '',
}
}
</script>

<style scoped>
.btn {
    display: block;
    position: absolute;
    left: 1000px;
    top: 20px;
    padding: 10px 35px;
    gap: 10px;
    border-radius: 10px;
    background: #0d606f;
    box-shadow:
      0px 2px 3px 0px rgba(13, 96, 111, 0.16),
      0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  }
</style>