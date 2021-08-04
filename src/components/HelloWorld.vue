<template>
    <h1>Hello Bee-template</h1>
    <img src="../assets/logo.png" alt="" />
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
export default defineComponent({
    name: 'HelloWorld',
    props: {
            msg: {
                type: String,
                required: true,
            },
        },
    setup: () => {
        const count = ref(0)
        return { count }
    },
})
</script>

<style scoped>
h1 {
    text-align: center;
    margin-top: 20px;
}

img {
    display: block;
    margin: 20px auto;
}
</style>
