<template>
    <div class="container">
        <div class="row my-2">
            <div class="col-3">
                <h4 class="text-left my-2">Products</h4>
            </div>
            <div class="col-3">
                <select class="form-control" v-model="query.search" @change="filterProductsByCategory">
                    <option value="">Select a category</option>
                    <option v-for="category in categories" v-bind:key="category.id" v-bind:value="category.id">
                        {{ category.name }}
                    </option>
                </select>
            </div>
        </div>
        <div class="">
            <div class="row border-bottom border-top p-2 bg-light">
                <div class="col-3">Category</div>
                <div class="col-3">Product Name</div>
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
                },
            };
        },
        components: {
            ProductDetail
        },
        computed: {...mapGetters(["productList", "categories"])},

        methods: {
            ...mapActions(["fetchAllProducts", "fetchAllCategories"]),

            getResults() {
                this.fetchAllProducts(this.query);
            },
            filterProductsByCategory() {
                this.fetchAllProducts(this.query);
            },
        },

        created() {
            this.fetchAllCategories();
            this.fetchAllProducts(this.query);
        },
    };
</script>
