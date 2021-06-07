<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h6>Edit Product</h6>
            </div>
            <div class="card-body">
                <Form @submit="onSubmit" :validation-schema="schema">
                    <div v-if="product !== null">
                        <div class="form-group row mb-2">
                            <div class="col-6">
                                <label>Category</label>
                                <select class="form-control"
                                        id="category_id"
                                        name="category_id"
                                        :value="product.category_id"
                                        @change="updateProductInputAction"
                                >
                                    <option v-for="category in categories"
                                            v-bind:key="category.id"
                                            v-bind:value="category.id">
                                        {{ category.name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row mb-2">
                            <div class="col-6">
                                <label>Product Name:</label>
                                <Field
                                        id="name"
                                        name="name"
                                        type="text"
                                        class="form-control"
                                        :value="product.name"
                                        @input="updateProductInputAction"
                                />
                                <ErrorMessage name="name" class="text-danger"/>
                            </div>
                        </div>
                        <div class="form-group row mb-2">
                            <div class="col-6">
                                <label>Product Descriptioin:</label>
                                <Field
                                        name="description"
                                        as="textarea"
                                        class="form-control"
                                        :value="product.description"
                                        @input="updateProductInputAction"
                                />
                                <ErrorMessage name="description" class="text-danger"/>
                            </div>
                        </div>
                        <div class="form-group">
                            <router-link to="/" class="btn btn-secondary "
                            >Cancel
                            </router-link
                            >
                            <input
                                    type="submit"
                                    class="btn btn-primary mx-2"
                                    value="Update"
                                    v-if="!isUpdating"
                            />
                            <button class="btn btn-primary " type="button" disabled v-if="isUpdating">
                <span
                        class="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                ></span>
                                Saving...
                            </button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";
    import {Field, Form, ErrorMessage} from "vee-validate";
    import * as yup from "yup";

    export default {
        data() {
            return {
                id: null,
            };
        },
        components: {
            Field,
            Form,
            ErrorMessage,
        },

        created: function () {
            this.id = this.$route.params.id;
            this.fetchDetailProduct(this.id);
            this.fetchAllCategories();
        },

        computed: {...mapGetters(["isUpdating", "updatedData", "product", "categories"])},

        methods: {
            ...mapActions(["updateProduct", "updateProductInput", "fetchDetailProduct", "fetchAllCategories"]),
            onSubmit() {
                const {category_id, name, description} = this.product;
                // return false;
                this.updateProduct({
                    id: this.id,
                    name: name,
                    description: description,
                    category_id: category_id,
                });
            },
            updateProductInputAction(e) {
                this.updateProductInput(e);
            },
        },

        watch: {
            updatedData: function () {
                if (this.updatedData !== null && !this.isUpdating) {
                    this.$swal.fire({
                        text: "Success, Product has been updated successfully !",
                        icon: "success",
                        position: "centre",
                        timer: 2000,
                    });

                    this.$router.push({name: "Home"});
                }
            },
        },

        setup() {
            // Define a validation schema
            const schema = yup.object({
                name: yup.string().required().min(5),
                description: yup.string().required().min(5),
            });

            return {
                schema,
            };
        },

    };
</script>
