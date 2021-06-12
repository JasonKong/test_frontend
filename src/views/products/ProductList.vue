<template>
    <div class="product-list">
        <div class="pull-right">
            <router-link to="/product/create" class="btn btn-primary">
                <i class="fa fa-plus-circle"></i> Add Product
            </router-link>
        </div>
        <div>
            <product-list-component></product-list-component>
        </div>
    </div>
</template>

<script>
    import ProductListComponent from '../../components/product/ProductListComponent';

    export default {
        components: {
            ProductListComponent
        }
    }
</script>
