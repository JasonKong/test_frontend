<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h6>Add Product</h6>
            </div>
            <div class="card-body">
                <Form @submit="onSubmit" :validation-schema="schema">
                    <div class="form-group row mb-2">
                        <div class="col-6">
                            <label>Category</label>
                            <select class="form-control"
                                    id="category_id"
                                    name="category_id"
                                    v-model="product.category_id"
                                    @change="getSubCategories"
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
                            <label>Sub category</label>
                            <select class="form-control"
                                    id="sub_category_id"
                                    name="sub_category_id"
                                    v-model="product.sub_category_id"
                            >
                                <option v-for="category in subCategories"
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
                                    v-model="product.name"
                            />
                            <ErrorMessage name="name" class="text-danger"/>
                        </div>
                    </div>
                    <div class="form-group row mb-2">
                        <div class="col-6">
                            <label>Product Description:</label>
                            <Field
                                    name="description"
                                    as="textarea"
                                    class="form-control"
                                    v-model="product.description"
                            />
                            <ErrorMessage name="description" class="text-danger"/>
                        </div>
                    </div>
                    <div class="form-group mb-2">
                        <router-link to="/" class="btn btn-secondary">
                            Cancel
                        </router-link>
                        <input
                                type="submit"
                                class="btn btn-primary mx-2"
                                value="Add Product"
                                v-if="!isCreating"
                        />
                        <button class="btn btn-primary " type="button" disabled v-if="isCreating">
              <span
                      class="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
              ></span>
                            Saving...
                        </button>
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
    // import CategoryList from "../category/CategoryListComponent";

    export default {
        data() {
            return {
                product: {}
            };
        },

        components: {
            Field,
            Form,
            ErrorMessage,
            // CategoryList
        },

        computed: {...mapGetters(["isCreating", "createdData", "categories", "subCategories"])},

        methods: {
            ...mapActions(["storeProduct", "fetchAllCategories", "fetchSubCategories"]),
            onSubmit() {
                const {category_id, sub_category_id, name, description} = this.product;
                this.storeProduct({
                    category_id: category_id,
                    sub_category_id: sub_category_id,
                    name: name,
                    description: description,
                });
            },
            getSubCategories() {
                const {category_id} = this.product;
                this.fetchSubCategories(category_id);
            },
        },

        watch: {
            createdData: function () {
                if (this.createdData !== null && !this.isCreating) {
                    this.$swal.fire({
                        text: "Success, Product has been added.",
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
                name: yup.string().required().min(5),
                description: yup.string().required().min(5),
            });

            return {
                schema
            };
        },
        created() {
            this.fetchAllCategories();
        },
    };
</script>
