<template>
    <div class="container">
        <div class="col-3">
            <h4 class="text-left my-2">Products</h4>
        </div>
        <div class="row my-2">
            <div class="col-3">
                <span>Category</span>
                <select class="form-control" v-model="query.search" @change="filterProductsByCategory">
                    <option value="">Select a category</option>
                    <option v-for="category in categories" v-bind:key="category.id" v-bind:value="category.id">
                        {{ category.name }}
                    </option>
                </select>
            </div>
            <div class="col-3">
                <span>Sub Category</span>
                <select class="form-control" v-model="query.sub_category_id" @change="filterProductsByCategory">
                    <option value="">Select a sub category</option>
                    <option v-for="category in subCategories" v-bind:key="category.id" v-bind:value="category.id">
                        {{ category.name }}
                    </option>
                </select>
            </div>
        </div>
        <div class="">
            <div class="row border-bottom border-top p-2 bg-light">
                <div class="col-2">Category</div>
                <div class="col-2">Sub Category</div>
                <div class="col-2">Product Name</div>
                <div class="col-4">Description</div>
                <div class="col-2">Actions</div>
            </div>
            <div v-for="(item) in productList" :key="item.id">
                <product-detail :product="item"/>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from "vuex";
    import ProductDetail from "./ProductDetailComponent";

    export default {
        data() {
            return {
                query: {
                    search: "",
                    sub_category_id: ''
                },
            };
        },
        components: {
            ProductDetail
        },
        computed: {...mapGetters(["productList", "categories", "subCategories"])},

        methods: {
            ...mapActions(["fetchAllProducts", "fetchAllCategories", "fetchSubCategories"]),

            getResults() {
                this.fetchAllProducts(this.query);
            },
            filterProductsByCategory() {
                this.fetchSubCategories(this.query.search);
                this.fetchAllProducts(this.query);
            },
        },

        created() {
            this.fetchAllCategories();
            this.fetchSubCategories(this.query.sub_category_id);
            this.fetchAllProducts(this.query);
        },
    };
</script>
