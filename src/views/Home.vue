<template>
    <div class="home">
        <div>
            <login-component></login-component>
        </div>
    </div>
</template>

<script>
    import LoginComponent from '../components/auth/LoginComponent.vue';

    export default {
        components: {LoginComponent},
        name: "Home",
    };
</script>
