<template>
    <!-- Default form login -->
    <div class="container d-flex align-items-center justify-content-center vh-100">
        <div class="row">
            <div class="col-md-12 p-0">
                <p class="h4 text-center mb-4">Sign in</p>
                <Form @submit="onSubmit" :validation-schema="schema">
                    <div class="form-group row mb-2">
                        <div>
                            <label>Email</label>
                            <Field
                                    id="email"
                                    name="email"
                                    type="email"
                                    class="form-control"
                                    v-model="loginForm.email"
                            />
                            <ErrorMessage name="email" class="text-danger"/>
                        </div>
                    </div>
                    <div class="form-group row mb-2">
                        <div>
                            <label>Password</label>
                            <Field
                                    id="password"
                                    name="password"
                                    type="password"
                                    class="form-control"
                                    v-model="loginForm.password"
                                    style="min-width:320px;"
                            />
                            <ErrorMessage name="password" class="text-danger"/>
                        </div>
                    </div>
                    <div class="form-group my-3">
                        <button class="btn btn-primary w-100" type="submit">Submit</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
    <!-- Default form login -->
</template>
<script>
    import {mapGetters, mapActions} from "vuex";
    import {Field, Form, ErrorMessage} from "vee-validate";
    import * as yup from "yup";

    export default {
        data() {
            return {
                loginForm: {
                    email: "jasonkongnz@gmail.com",
                    password: "12345678"
                }
            };
        },

        components: {
            Field,
            Form,
            ErrorMessage,
            // CategoryList
        },

        computed: {...mapGetters(["userData"])},

        methods: {
            ...mapActions(["login"]),
            onSubmit() {
                const {email, password} = this.loginForm;
                this.login({
                    email: email,
                    password: password,
                });
            },
        },

        watch: {
            userData: function () {
                if (this.userData !== null
                    // && !this.isCreating
                ) {
                    this.$swal.fire({
                        text: "Login Succeed",
                        icon: "success",
                        position: "center",
                        timer: 2000,
                    });

                    this.$router.push({name: "Products"});
                }
            },
        },

        setup() {
            // Define a validation schema
            const schema = yup.object({
                email: yup.string().required(),
                password: yup.string().required(),
            });

            return {
                schema
            };
        },
    };

</script>


